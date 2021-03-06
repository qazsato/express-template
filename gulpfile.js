const gulp              = require('gulp');
const $                 = require('gulp-load-plugins')();
const del               = require('del');
const runSequence       = require('run-sequence');
const postcssNested     = require('postcss-nested');
const postcssImport     = require('postcss-import');
const postcssSimpleVars = require('postcss-simple-vars');

const AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'last 2 ff versions',
  'last 2 edge versions',
  'last 2 chrome versions',
  'last 2 safari versions',
  'ios >= 7',
  'android >= 4.0'
];

const SRC = {
  ROOT       : './public/src/*.*',
  COMPONENTS : './public/src/components/**/*.*',
  IMAGES     : './public/src/images/**/*.+(jpg|jpeg|png|gif|svg)',
  STYLES     : './public/src/styles/**/*.css',
  VIEWS      : './public/src/views/**/*.html'
};

const DEST = {
  ROOT       : './public/dist',
  COMPONENTS : './public/dist/components',
  IMAGES     : './public/dist/images',
  STYLES     : './public/dist/styles',
  VIEWS      : './public/dist/views'
};

gulp.task('root', () => {
  gulp.src(SRC.ROOT)
      .pipe(gulp.dest(DEST.ROOT));
});

gulp.task('components', () => {
  gulp.src(SRC.COMPONENTS)
      .pipe(gulp.dest(DEST.COMPONENTS));
});

gulp.task('images', () => {
  gulp.src(SRC.IMAGES)
      .pipe($.changed(DEST.IMAGES))
      .pipe($.plumber({errorHandler: $.notify.onError('Error: <%= error.message %>')}))
      .pipe($.imagemin())
      .pipe(gulp.dest(DEST.IMAGES));
});

gulp.task('styles', () => {
  gulp.src(SRC.STYLES)
      .pipe($.plumber({errorHandler: $.notify.onError('Error: <%= error.message %>')}))
      .pipe($.postcss([postcssImport, postcssNested, postcssSimpleVars]))
      .pipe($.cssmin())
      .pipe($.autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
      .pipe(gulp.dest(DEST.STYLES));
});

gulp.task('views', () => {
  gulp.src(SRC.VIEWS)
      .pipe($.plumber({errorHandler: $.notify.onError('Error: <%= error.message %>')}))
      .pipe($.htmlmin({collapseWhitespace: true}))
      .pipe(gulp.dest(DEST.VIEWS));
});

gulp.task('clean', () => del(DEST.ROOT));

/**
 * Defaultタスク。
 * BuildタスクとWatchタスクを実行します。
 * このタスクは開発時のみ使用します。
 */
gulp.task('default', ['build', 'watch']);

/**
 * Buildタスク。
 * distフォルダをクリーンしたのち、srcフォルダの各ファイルをdistフォルダに出力します。
 * このタスクは開発・本番ともに使用します。
 */
gulp.task('build', () => runSequence('clean', ['root', 'components', 'images', 'styles', 'views']));

/**
 * Watchタスク。
 * srcフォルダ内の全ファイルを監視し、変更があった場合各タスクを実行します。
 * このタスクは開発時のみ使用します。
 */
gulp.task('watch', () => {
  gulp.watch(SRC.ROOT, ['root']);
  gulp.watch(SRC.COMPONENTS, ['components']);
  gulp.watch(SRC.IMAGES, ['images']);
  gulp.watch(SRC.STYLES, ['styles']);
  gulp.watch(SRC.VIEWS, ['views']);
});

/**
 * Pre Testタスク。
 * テスト実行前にカバレッジファイルを生成します。
 * このタスクはテスト時に使用します。
 */
gulp.task('pre-test', () => {
  return gulp.src('routes/**/*.js')
             .pipe($.istanbul())
             .pipe($.istanbul.hookRequire());
});

/**
 * Testタスク。
 * testsフォルダ配下のテストコードを実行します。
 * このタスクはテスト時に使用します。
 */
gulp.task('test', ['pre-test'], () => {
  gulp.src('tests/**/*.js')
      .pipe($.mocha())
      .pipe($.istanbul.writeReports());
});
