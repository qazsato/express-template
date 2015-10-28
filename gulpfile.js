var gulp        = require('gulp');
var $           = require('gulp-load-plugins')();
var del         = require('del');
var runSequence = require('run-sequence');

var AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'ios >= 7',
  'android >= 4.4'
];

var SRC_PATH = {
  ROOT   : './public/src',
  SCRIPT : ['./public/src/**/*.js'],
  STYLE  : ['./public/src/**/*.+(css|scss)'],
  IMAGE  : ['./public/src/**/*.+(jpg|jpeg|png|gif|svg)']
};

var DEST_PATH = {
  ROOT   : './public/dist'
};

gulp.task('script', function () {
  gulp.src(SRC_PATH.SCRIPT)
      .pipe($.plumber({errorHandler: $.notify.onError('Error: <%= error.message %>')}))
      .pipe($.uglify())
      .pipe(gulp.dest(DEST_PATH.ROOT));
});

gulp.task('style', function () {
  gulp.src(SRC_PATH.STYLE)
      .pipe($.plumber({errorHandler: $.notify.onError('Error: <%= error.message %>')}))
      .pipe($.if('*.css', $.csso()))
      .pipe($.if('*.css', $.cssmin()))
      .pipe($.if('*.scss', $.sass({outputStyle: 'compressed'})))
      .pipe($.if('*.scss', $.cached('sass')))
      .pipe($.autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
      .pipe(gulp.dest(DEST_PATH.ROOT));
});

gulp.task('image', function () {
  gulp.src(SRC_PATH.IMAGE)
      .pipe($.plumber({errorHandler: $.notify.onError('Error: <%= error.message %>')}))
      .pipe($.changed(DEST_PATH.ROOT))
      .pipe($.imagemin())
      .pipe(gulp.dest(DEST_PATH.ROOT));
});

gulp.task('clean', function () {
  return del(DEST_PATH.ROOT);
});

gulp.task('watch', function () {
  gulp.watch(SRC_PATH.SCRIPT, ['script']);
  gulp.watch(SRC_PATH.STYLE, ['style']);
  gulp.watch(SRC_PATH.IMAGE, ['image']);
});

gulp.task('default', function () {
  runSequence('clean', ['script', 'style', 'image']);
});
