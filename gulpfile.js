// Импорт пакетов

const gulp = require('gulp');
const del = require('del');
const sass = require('gulp-sass')(require('sass'));
const sourcemap = require('gulp-sourcemaps');
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const concat = require('gulp-concat');
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
        src: './src/scripts/index.js',
        dest: './src/scripts/'
    },
    images: {
        src: './src/img/**/*.+(jpg|png)',
        dest: './src/img/'
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
    return gulp.src(['./node_modules/swiper/swiper-bundle.js', paths.scripts.src])
        .pipe(sourcemap.init())
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest(paths.scripts.dest))
        .pipe(browserSync.stream())
}

function webpCreate() {
    return gulp.src(['app/img/**/*.{png,jpg}', '!app/img/favicons/**/*.*'])
        .pipe(webp())
        .pipe(gulp.dest(paths.images.dest))
}

// Задачи для продакшена

function clean() {
    return del(['dist'])
}

function imageMin() {
    return gulp.src(paths.images.src)
        .pipe(imagemin([
            imagemin.mozjpeg({ progressive: true }),
            imagemin.optipng({ optimizationLevel: 3 }),
            imagemin.svgo()
        ]))
        .pipe(gulp.dest('dist/img'));
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
const build = gulp.series(clean, imageMin);

exports.default = dev;
exports.build = build;
exports.webp = webpCreate;
