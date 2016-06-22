var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var wrap = require('gulp-wrap');
var sass = require('gulp-sass');
var Server = require('karma').Server;



gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./web"
        }
    });
});

gulp.task('build', function () {
	gulp.src([
	  'bower_components/jquery/dist/jquery.js',
	  'bower_components/richardUtils/src/dom.js',
	  'bower_components/richardUtils/src/sundry.js'])
		.pipe(gulp.dest('./web/lib'));
});

gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('sass', function () {
	gulp.src('./scss/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./web/css'));
});

gulp.task('wrap', function () {
	gulp.src('./js/*.js')
		.pipe(wrap('+function(global){\n<%= contents %>\n\tglobal.SelectionBox = SelectionBox;\n\n}(window);'))
		.pipe(gulp.dest("./web/js"));
});

// watchers

gulp.task('watch-scss', function () {
   gulp.watch('./scss/**/*.scss', ['sass']);
});

