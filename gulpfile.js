var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var wrap = require('gulp-wrap');
var Server = require('karma').Server;

gulp.task('wrap', function () {
	gulp.src('./js/selection-box.js')
		.pipe(wrap({ src: './template.txt'}))
		.pipe(gulp.dest("./build"));
});

gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});


