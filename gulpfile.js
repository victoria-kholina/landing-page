var gulp = require('gulp'), 
    sass = require('gulp-sass'),
    browserSync = require('browser-sync');

// SASS //

gulp.task('sass', function(){
    return gulp.src('app/sass/main.sass') 
        .pipe(sass()) 
        .pipe(gulp.dest('app/css')) 
        .pipe(browserSync.reload({stream: true})) // live reload/updating CSS 
});

// BROWSER SYNC - live files reloader //

gulp.task('browser-sync', function() { 
    browserSync({ 
        server: { 
            baseDir: 'app' 
        },
        notify: false // Disable Browser sync notifications
    });
});

gulp.task('watch', ['browser-sync', 'sass'], function() {
    gulp.watch('app/sass/**/*.sass', ['sass']); // Monitoring sass files
});