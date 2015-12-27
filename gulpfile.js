var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var Server = require('karma').Server;

gulp.task('default', ['test'],  function () {
	console.log('this is the gulp default task');
});
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./web"
        }
    });
});

gulp.task('build', function () {
	gulp.src('bower_components/jquery/dist/jquery.js')
		.pipe(gulp.dest('./web/js'));

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

// watchers

gulp.task('watch-scss', function () {
   gulp.watch('./scss/**/*.scss', ['sass']);
});
