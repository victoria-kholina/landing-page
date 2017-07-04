var gulp = require('gulp'), 
    sass = require('gulp-sass'), // Preprocessor SASS
    cssbeautify = require('gulp-cssbeautify'), // beautiful CSS 
    browserSync = require('browser-sync'), // live files reloader
    concat      = require('gulp-concat'), // to join files
    uglify      = require('gulp-uglifyjs'), // Compress JS
    cssnano     = require('gulp-cssnano'), // Minification CSS
    rename      = require('gulp-rename'), // Rename files
    imagemin    = require('gulp-imagemin'),
    cache       = require('gulp-cache');

// HTML //

gulp.task('html', function(){
  gulp.src('app/index.html')
  .pipe(browserSync.reload({stream:true}));
});

// JavaScript //

gulp.task('js', function(){
  gulp.src('app/js/main.js')
      .pipe(browserSync.reload({stream:true}))
      .pipe(uglify()) 
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('dist/js')); 
});

gulp.task('scripts', function() {
    return gulp.src([ 
        'app/js/jquery-3.2.0.min.js', 
        'app/js/swiper.jquery.min.js' 
        ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// SASS / CSS //

gulp.task('sass', function(){
    return gulp.src('app/sass/main.sass') 
        .pipe(sass()) 
        .pipe(cssbeautify())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true})) // live reload/updating CSS 
});

gulp.task('css', ['sass'], function() {
    return gulp.src(['app/css/**/*.css', '!app/css/**/*.min.css'])
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/css'));
});


// Compress IMAGES

gulp.task('img', function() {
    return gulp.src('app/img/**/*')
        .pipe(cache(imagemin({  
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}]
        })))
        .pipe(gulp.dest('dist/img')); 
});

// BROWSER SYNC  //

gulp.task('browser-sync', function() { 
    browserSync({ 
        server: { 
            baseDir: 'app' 
        },
        notify: false // Disable Browser sync notifications
    });
});

gulp.task('watch', ['browser-sync', 'html', 'js', 'sass'], function() { // Monitoring files
    gulp.watch('app/sass/**/*.sass', ['sass']); 
    gulp.watch('app/index.html', ['html']);
    gulp.watch('app/js/main.js', ['js']); 
});

gulp.task('build', ['css', 'js', 'scripts', 'img'], function() {
    var buildCss = gulp.src(['app/css/**/*.min.css','app/css/**/*.otf'])
        .pipe(gulp.dest('dist/css'));
});
