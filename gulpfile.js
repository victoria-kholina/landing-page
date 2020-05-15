'use strict';

const   gulp = require("gulp"),
            sass = require("gulp-sass"),
            postcss = require("gulp-postcss"),
            autoprefixer = require("autoprefixer"),
            cssnano = require("cssnano"),
            sourcemaps = require("gulp-sourcemaps"),
            concat = require("gulp-concat"),
            rename= require("gulp-rename"),
            browserSync = require("browser-sync").create(),
            uglify = require('gulp-uglify'),
            pipeline = require('readable-stream').pipeline;


let paths = {
    styles: {
        src: "app/sass/*.sass",
        dest: "dist/css/"
    },
    scripts: {
        src: "app/js/*.js",
        dest: "dist/js/"
    }
};

function style() {
    return gulp
        .src(paths.styles.src)
        // Initialize sourcemaps before compilation starts
        .pipe(sourcemaps.init())
        .pipe(sass())
        .on("error", sass.logError)
        .pipe(concat('main.min.css'))
        // Use postcss with autoprefixer and compress the compiled file using cssnano
        .pipe(postcss([autoprefixer(), cssnano()]))
        // Now add/write the sourcemaps
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.styles.dest))
        // Add browsersync stream pipe after compilation
        .pipe(browserSync.stream());
}
function scripts() {
    return gulp
        .src(paths.scripts.src)
            .pipe(concat('scripts.js'))
            .pipe(gulp.dest(paths.scripts.dest))
            .pipe(rename('scripts.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest(paths.scripts.dest));
}
function watch() {
    browserSync.init({
        proxy: "http://landing-page/dist",
        host: 'landing-page',
        open: "external",
        notify: false,
        browser: "chrome"
    });
    gulp.watch(paths.styles.src, style);
    gulp.watch('index.html').on("change", browserSync.reload);
}
exports.style = style;
exports.watch = watch;
exports.scripts = scripts;

let build = gulp.series(style, scripts, watch);

gulp.task('build', build);

gulp.task('default', build);