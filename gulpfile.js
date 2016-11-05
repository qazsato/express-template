const gulp              = require('gulp');
const $                 = require('gulp-load-plugins')();
const del               = require('del');
const runSequence       = require('run-sequence');
const browserSync       = require('browser-sync');
const postcssNested     = require('postcss-nested');
const postcssImport     = require('postcss-import');
const postcssSimpleVars = require('postcss-simple-vars');

const ENV = process.env.NODE_ENV ? process.env.NODE_ENV.trim() : 'development';

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
  SCRIPTS    : './public/src/scripts/**/*.js',
  STYLES     : './public/src/styles/**/*.css',
  VIEWS      : './public/src/views/**/*.html'
};

const DEST = {
  ROOT       : './public/dist',
  COMPONENTS : './public/dist/components',
  IMAGES     : './public/dist/images',
  SCRIPTS    : './public/dist/scripts',
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

gulp.task('scripts', () => {
  gulp.src(SRC.SCRIPTS)
      .pipe($.plumber({errorHandler: $.notify.onError('Error: <%= error.message %>')}))
      .pipe($.if(ENV === 'development', $.sourcemaps.init()))
      .pipe($.cached('scripts'))
      .pipe($.babel({presets: ['es2015']}))
      .pipe($.uglify())
      .pipe($.remember('scripts'))
      .pipe($.if(ENV === 'development', $.sourcemaps.write('../sourcemaps')))
      .pipe(gulp.dest(DEST.SCRIPTS));
});

gulp.task('styles', () => {
  gulp.src(SRC.STYLES)
      .pipe($.plumber({errorHandler: $.notify.onError('Error: <%= error.message %>')}))
      .pipe($.if(ENV === 'development', $.sourcemaps.init()))
      .pipe($.postcss([postcssImport, postcssNested, postcssSimpleVars]))
      .pipe($.cssmin())
      .pipe($.autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
      .pipe($.if(ENV === 'development', $.sourcemaps.write('../sourcemaps')))
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
 * browserSyncタスク。
 * ローカルと同期し、自動でブラウザリロードをおこないます。
 * このタスクは開発時のみ使用します。
 */
gulp.task('sync', function() {
  browserSync.init({
    files: ['public/**/*.*', 'views/**/*.*', '!**/.*'],
    proxy: 'http://localhost:3000',
    port: 4000,
    open: true
  });
});

/**
 * Watchタスク。
 * srcフォルダ内の全ファイルを監視し、変更があった場合各タスクを実行します。
 * このタスクは開発時のみ使用します。
 */
gulp.task('watch', () => {
  gulp.watch(SRC.ROOT, ['root']);
  gulp.watch(SRC.COMPONENTS, ['components']);
  gulp.watch(SRC.IMAGES, ['images']);
  gulp.watch(SRC.SCRIPTS, ['scripts']);
  gulp.watch(SRC.STYLES, ['styles']);
  gulp.watch(SRC.VIEWS, ['views']);
});

/**
 * Buildタスク。
 * distフォルダをクリーンしたのち、srcフォルダの各ファイルをdistフォルダに出力します。
 * このタスクは開発・本番ともに使用します。
 */
gulp.task('build', () => {
  runSequence('clean', ['root', 'components', 'images', 'scripts', 'styles', 'views']);
});
