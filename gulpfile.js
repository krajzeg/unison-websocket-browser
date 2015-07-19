var gulp = require('gulp');
var path = require('path');
var _ = require('lodash');

gulp.task('default', ['compile']);

gulp.task('compile', ['compile-browser', 'compile-lib']);

gulp.task('clean-lib', makeCleanTask('dist/lib'));
gulp.task('compile-lib', ['clean-lib'], makeES6CompileTask('lib'));

gulp.task('compile-browser', makeBrowserifyTask('lib/browser.js'));

function makeCleanTask(directory) {
  var del = require('del');
  return function(cb) {
    del(directory, cb);
  }
}

function makeES6CompileTask(sourceDirectory) {
  var sources = path.join(sourceDirectory, '**/*.js');
  var destination = path.join('dist', sourceDirectory);

  return function() {
    var babel = require('gulp-babel');
    var sourcemaps = require('gulp-sourcemaps');

    return gulp.src(sources)
      .pipe(sourcemaps.init())
      .pipe(babel({
        retainLines: true
      }))
      .pipe(sourcemaps.write('.', {
        sourceRoot: function(file) {
          // we have to go the right number of directories up
          var depth = file.relative.split(path.sep).length + 1;
          var rootRelativePath = _.range(0, depth).map(function() { return '..' + path.sep;} ).join('');
          return rootRelativePath + sourceDirectory;
        }
      }))
      .pipe(gulp.dest(destination));
  }
}

function makeBrowserifyTask(sourceFile) {
	var browserify = require('browserify');
	var babelify = require('babelify');
	var source = require('vinyl-source-stream');

	return function() {
	    return browserify({
		    entries: [sourceFile],
		    transform: [babelify]
	    })
	    .bundle()
	    .on('error', logErrors)
	    .pipe(source('browser.js'))
	    .pipe(gulp.dest('./dist'));
	};
}

function logErrors(e) {
	console.error("Build error:", e.message);
}
