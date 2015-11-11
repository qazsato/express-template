var gulp        = require('gulp');
var $           = require('gulp-load-plugins')();
var del         = require('del');
var runSequence = require('run-sequence');
var browserify  = require('browserify');
var through2    = require('through2');
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

var SRC_PATH = {
  ROOT   : 'public/src',
  JS     : 'public/src/**/*.js',
  CSS    : 'public/src/**/*.css',
  SASS   : 'public/src/**/*.scss',
  IMAGE  : 'public/src/**/*.+(jpg|jpeg|png|gif|svg)',
  OTHER  : ['public/src/**/*.*', '!public/src/**/*.+(js|css|scss|jpg|jpeg|png|gif|svg)']
};

var DEST_PATH = {
  ROOT   : 'public/dist'
};

gulp.task('js', function () {
  var browserified = through2.obj(function(file, encode, callback){
    browserify(file.path).bundle(function(err, res){
      file.contents = res;
      callback(null, file);
    });
  });
  gulp.src(SRC_PATH.JS)
      .pipe($.changed(DEST_PATH.ROOT))
      .pipe($.plumber({errorHandler: $.notify.onError('Error: <%= error.message %>')}))
      .pipe($.sourcemaps.init())
      .pipe(browserified)
      .pipe($.sourcemaps.write())
      .pipe($.if(ENV === 'production', $.uglify()))
      .pipe(gulp.dest(DEST_PATH.ROOT));
});

gulp.task('css', function () {
  gulp.src(SRC_PATH.CSS)
      .pipe($.changed(DEST_PATH.ROOT))
      .pipe($.plumber({errorHandler: $.notify.onError('Error: <%= error.message %>')}))
      .pipe($.csso())
      .pipe($.cssmin())
      .pipe($.autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
      .pipe(gulp.dest(DEST_PATH.ROOT));
});

gulp.task('sass', function () {
  gulp.src(SRC_PATH.SASS)
      .pipe($.cached('sass'))
      .pipe($.plumber({errorHandler: $.notify.onError('Error: <%= error.message %>')}))
      .pipe($.sourcemaps.init())
      .pipe($.sass())
      .pipe($.sourcemaps.write())
      .pipe($.if(ENV === 'production', $.cssmin()))
      .pipe($.autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
      .pipe(gulp.dest(DEST_PATH.ROOT));
});

gulp.task('image', function () {
  gulp.src(SRC_PATH.IMAGE)
      .pipe($.changed(DEST_PATH.ROOT))
      .pipe($.plumber({errorHandler: $.notify.onError('Error: <%= error.message %>')}))
      .pipe($.imagemin())
      .pipe(gulp.dest(DEST_PATH.ROOT));
});

gulp.task('other', function () {
  gulp.src(SRC_PATH.OTHER)
      .pipe(gulp.dest(DEST_PATH.ROOT));
});

gulp.task('clean', function () {
  return del(DEST_PATH.ROOT);
});

gulp.task('watch', function () {
  gulp.watch(SRC_PATH.JS, ['js']);
  gulp.watch(SRC_PATH.CSS, ['css']);
  gulp.watch(SRC_PATH.SASS, ['sass']);
  gulp.watch(SRC_PATH.IMAGE, ['image']);
  gulp.watch(SRC_PATH.OTHER, ['other']);
});

gulp.task('sync', function() {
  browserSync.init({
    files: ['public/**/*.*', 'views/**/*.*'],
    proxy: 'http://localhost:3000',
    port: 4000,
    open: true
  });
});

gulp.task('lint', function () {
  gulp.src(['public/src/**/*.js', '!public/src/**/*min.js'])
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'));
});

gulp.task('browse', function () {
  runSequence('watch', 'sync');
});

gulp.task('build', function () {
  runSequence('clean', ['js', 'css', 'sass', 'image', 'other']);
});
