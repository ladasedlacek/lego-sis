const { src, dest, series, watch } = require('gulp')

// styles
const scss = require('gulp-sass')(require('sass'))
const autoprefixer = require('gulp-autoprefixer')
const cssnano = require('gulp-cssnano')
const rename = require('gulp-rename')

// scripts
const jsConcat = require('gulp-concat')
const jsMinify = require('gulp-terser')

// images
const imagemin = require('gulp-imagemin')
const pngquant = require('imagemin-pngquant')
const mozjpeg = require('imagemin-mozjpeg')
const webp = require('gulp-webp')

/// svg
const svgstore = require('gulp-svgstore')
const svgmin = require('gulp-svgmin')
const path = require('path')

// *** STYLE - TASK
const styles = () => src('./scss/main.scss')
    .pipe(scss()) // Převod SCSS na CSS
    .pipe(autoprefixer('last 2 versions')) // Přidání autoprefixerů pro podporu různých prohlížečů
    .pipe(rename({ basename: 'style.min' })) // Přejmenování výstupního souboru
    .pipe(cssnano()) // Minifikace CSS
    .pipe(dest('./build/css/')); // Build CSS souboru

// *** SCRIPTS - TASK
const scripts = () => src([
    './js/!(script)*.js', // Zpracuj nejprve všechny soubory (fce) až na script.js
    /* './js/script.js' */ // Zpracuj i script.js
  ])
    .pipe(jsConcat('script.min.js')) // Sloučení všech souborů do jednoho
    .pipe(jsMinify()) // Minimalizace JavaScriptu
    .pipe(dest('./build/js/')) // Build JS souboru

// *** IMAGES - TASK
const images = () => {
    return src('./img/**/*.{jpg,jpeg,png,svg}')
      .pipe(imagemin([
        pngquant({
          speed: 1,
          quality: [0.75, 0.80]
        }),
        mozjpeg({quality: 88})
      ]))
      .pipe(dest('./build/img/'))
      .pipe(webp({quality: 88}))
      .pipe(dest('./build/img/'))
  };

// *** SVG ICONS - TASK
const svgicons = () => src('./img/sprite/*')
.pipe(svgmin((file) => {
    const prefix = path.basename(file.relative, path.extname(file.relative))
    return {
        plugins: [{
            cleanupIDs: {
                prefix: prefix + '-',
                minify: true
            }
        }]
    }
}))
.pipe(svgstore())
.pipe(dest('./build/img/'))

// *** WATCH TASK
const watchTask = () => {
    watch(
        ['./scss/**/*.scss', './js/{,*/}*.js'],
        series(styles, scripts)
    )
}

exports.default = series(styles, scripts, watchTask)
exports.svg = series(svgicons)
exports.img = series(images)
exports.watch = series(watchTask)