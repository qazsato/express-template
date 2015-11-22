var gulp        = require('gulp');
var $           = require('gulp-load-plugins')();
var del         = require('del');
var runSequence = require('run-sequence');
var browserify  = require('browserify');
var through2    = require('through2');
var fs          = require('fs');
var path        = require('path');
var browserSync = require('browser-sync');

var ENV = process.env.NODE_ENV;

var AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'ios >= 7',
  'android >= 4.4'
];

var SRC = {
  ROOT   : 'public/src',
  JS     : ['public/src/**/*.js'],
  CSS    : ['public/src/**/*.css'],
  SASS   : ['public/src/**/*.scss'],
  IMAGE  : ['public/src/**/*.+(jpg|jpeg|png|gif|svg)', '!public/src/**/sprite/*.png'],
  SPRITE : ['public/src/**/sprite/*.png'],
  OTHER  : ['public/src/**/*.*', '!public/src/**/*.+(js|css|scss|jpg|jpeg|png|gif|svg)']
};

var DEST = {
  ROOT   : 'public/dist'
};

gulp.task('js', function () {
  var browserified = through2.obj(function(file, encode, callback){
    browserify(file.path).bundle(function(err, res){
      file.contents = res;
      callback(null, file);
    });
  });
  gulp.src(SRC.JS)
      .pipe($.plumber({errorHandler: $.notify.onError('Error: <%= error.message %>')}))
      // .pipe($.sourcemaps.init())
      .pipe(browserified)
      // .pipe($.sourcemaps.write())
      .pipe($.if(ENV === 'production', $.uglify()))
      .pipe(gulp.dest(DEST.ROOT));
});

gulp.task('css', function () {
  gulp.src(SRC.CSS)
      .pipe($.plumber({errorHandler: $.notify.onError('Error: <%= error.message %>')}))
      .pipe($.csso())
      .pipe($.cssmin())
      .pipe($.autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
      .pipe(gulp.dest(DEST.ROOT));
});

gulp.task('sass', function () {
  gulp.src(SRC.SASS)
      .pipe($.plumber({errorHandler: $.notify.onError('Error: <%= error.message %>')}))
      // .pipe($.sourcemaps.init())
      .pipe($.sass())
      .pipe($.if(ENV === 'production', $.cssmin()))
      .pipe($.autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
      // .pipe($.sourcemaps.write())
      .pipe(gulp.dest(DEST.ROOT));
});

gulp.task('image', function () {
  gulp.src(SRC.IMAGE)
      .pipe($.changed(DEST.ROOT))
      .pipe($.plumber({errorHandler: $.notify.onError('Error: <%= error.message %>')}))
      .pipe($.imagemin())
      .pipe(gulp.dest(DEST.ROOT));
});

gulp.task('other', function () {
  gulp.src(SRC.OTHER)
      .pipe(gulp.dest(DEST.ROOT));
});

gulp.task('clean', function () {
  return del(DEST.ROOT);
});

gulp.task('watch', function () {
  gulp.watch(SRC.JS, ['js']);
  gulp.watch(SRC.CSS, ['css']);
  gulp.watch(SRC.SASS, ['sass']);
  gulp.watch(SRC.IMAGE, ['image']);
  gulp.watch(SRC.SPRITE, ['sprite']);
  gulp.watch(SRC.OTHER, ['other']);
});

gulp.task('sync', function() {
  browserSync.init({
    files: ['public/**/*.*', 'views/**/*.*', '!**/.*'],
    proxy: 'http://localhost:3000',
    port: 4000,
    open: true
  });
});

gulp.task('sprite', function () {
  // spriteフォルダを再帰的に探索する
  var spriteEach = function(p, callback) {
    fs.readdir(p, function(err, files) {
      if (err) return;
      files.forEach(function(f) {
        var fp = path.join(p, f);
        if(fs.statSync(fp).isDirectory()) {
          if (f === 'sprite') {
            callback(fp);
          } else {
            spriteEach(fp, callback);
          }
        }
      });
    });
  };
  var getSrcPath = function (p) {
    return p + '/*.png';
  };
  var getImgPath = function (p) {
    return p.replace(SRC.ROOT, '/dist') + '/sprite.png';
  };
  var getDestImgPath = function (p) {
    return p.replace('/src/', '/dist/');
  };
  var getDestCssPath = function (p) {
    return p.replace('/images/', '/styles/');
  };
  spriteEach(SRC.ROOT, function(path) {
    var spriteData = gulp.src(getSrcPath(path))
                         .pipe($.spritesmith({
                           imgName:   'sprite.png',
                           imgPath:   getImgPath(path),
                           cssName:   '_sprite.scss',
                           cssFormat: 'scss'
                         }));
    spriteData.img.pipe(gulp.dest(getDestImgPath(path)));
    spriteData.css.pipe(gulp.dest(getDestCssPath(path)));
  });
});

gulp.task('browse', function () {
  runSequence('watch', 'sync');
});

gulp.task('build', function () {
  runSequence('clean', 'sprite', ['js', 'css', 'sass', 'image', 'other']);
});
