var gulp = require('gulp'), 
    sass = require('gulp-sass'),
    cssbeautify = require('gulp-cssbeautify'),
    browserSync = require('browser-sync');

// HTML //

gulp.task('html', function(){
  gulp.src('app/index.html')
  .pipe(browserSync.reload({stream:true}));
});

// JavaScript //

gulp.task('js', function(){
  gulp.src('app/js/main.js')
  .pipe(browserSync.reload({stream:true}));
});

// SASS //

gulp.task('sass', function(){
    return gulp.src('app/sass/main.sass') 
        .pipe(sass()) 
        .pipe(cssbeautify())
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

gulp.task('watch', ['browser-sync', 'html', 'js', 'sass'], function() {
    gulp.watch('app/sass/**/*.sass', ['sass']); // Monitoring sass files
    gulp.watch('app/index.html', ['html']);
    gulp.watch('app/js/main.js', ['js']); 
});