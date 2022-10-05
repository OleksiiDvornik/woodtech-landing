// Импорт пакетов

const gulp = require('gulp');
const del = require('del');
const size = require('gulp-size');
const sass = require('gulp-sass')(require('sass'));
const sourcemap = require('gulp-sourcemaps');
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const mediaQueries = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const replace = require('gulp-replace')
const htmlmin = require('gulp-htmlmin');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();
const webp = require('gulp-cwebp');
const imagemin = require("gulp-imagemin");

// Пути к файлам

const paths = { 
    html: {
        src: './src/*.html',
        dest: './dist'
    },
    styles: {
        src: './src/styles/scss/**/*.+(sass|scss)',
        dest: './src/styles/css/'
    },
    scripts: {
        src: './src/scripts/modules/*.js',
        dest: './src/scripts/'
    },
    images: {
        src: './src/img/**/*.+(jpg|png)',
        dest: './src/img/',
    },
    fonts: {
        src: './src/fonts/*.*',
        dest: './dist/fonts/'
    }
}

// Задачи для разработки

function styles() {
    return gulp.src(paths.styles.src)
        .pipe(sourcemap.init())
        .pipe(sass())
        .pipe(postcss([autoprefixer()]))
        .pipe(sourcemap.write("."))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.stream())
}

function scripts() {
    return gulp.src(paths.scripts.src)
        .pipe(sourcemap.init())
        .pipe(concat('index.js'))
        .pipe(sourcemap.write("."))
        .pipe(gulp.dest(paths.scripts.dest))
        .pipe(browserSync.stream())
}

function webpCreate() {
    return gulp.src([
            'src/img/**/*.{png,jpg}', 
            '!src/img/favicons/**/*.*', 
            '!src/img/partners/**/*.*'
        ])
        .pipe(webp())
        .pipe(gulp.dest(paths.images.dest))
}

// Задачи для продакшена

function clean() {
    return del(['dist'])
}

function rootCopy() {
    return gulp.src(['./src/*.*', '!src/*.html'])
        .pipe(gulp.dest('dist/'))
}

function fontsCopy() {
    return gulp.src(paths.fonts.src)
        .pipe(gulp.dest(paths.fonts.dest))
}

function libsCopy() {
    return gulp.src('src/libs/*.*')
        .pipe(gulp.dest('dist/libs'))
}

function htmlProd() {
    return gulp.src(paths.html.src)
        .pipe(replace('style.css', 'style.min.css'))
        .pipe(replace('index.js', 'index.min.js'))
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(size())
        .pipe(gulp.dest(paths.html.dest));
}

function stylesProd() {
    return gulp.src(paths.styles.src)
        .pipe(sass())
        .pipe(mediaQueries())
        .pipe(postcss([autoprefixer()]))
        .pipe(cleanCSS())
        .pipe(rename({ suffix: '.min' }))
        .pipe(size())
        .pipe(gulp.dest('dist/styles/css'));
}

function scriptsProd() {
    return gulp.src('./src/scripts/index.js')
        .pipe(babel({ presets: ['@babel/env'] }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(size())
        .pipe(gulp.dest('dist/scripts'))
}

function webpProd() {
    return gulp.src([
            'src/img/**/*.{png,jpg}', 
            '!src/img/favicons/**/*.*', 
            '!src/img/partners/**/*.*'
        ])
        .pipe(webp())
        .pipe(gulp.dest('dist/img'))
}

function imageMin() {
    return gulp.src([
            'src/img/**/*.{png,jpg}', 
        ])
        .pipe(imagemin([
            imagemin.mozjpeg({ progressive: true }),
            imagemin.optipng({ optimizationLevel: 3 }),
            imagemin.svgo()
        ]))
        .pipe(gulp.dest('dist/img'));
}

function imageCopy() {
    return gulp.src('src/img/**/*.{svg,avif}')
    .pipe(gulp.dest('dist/img/'))
}

// Отслеживание изменений в файлах и запуск лайв сервера

function watch() {
    browserSync.init({
        server: {
            baseDir: "./src"
        }
    })
    gulp.watch(paths.html.src).on('change', browserSync.reload);
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.scripts.src, scripts);
}

// Команды для запуска задач

const dev = gulp.parallel(styles, scripts, watch);
const build = gulp.series(clean, rootCopy, fontsCopy, libsCopy, htmlProd, stylesProd, scriptsProd, webpProd, imageMin, imageCopy);

exports.default = dev;
exports.build = build;
exports.webp = webpCreate;
