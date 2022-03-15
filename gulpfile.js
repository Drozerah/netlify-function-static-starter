/**
 * Node modules
 */
const path = require('path')
const fs = require('fs')
/**
 * NPM modules 
 */

/**
 * Gulp modules 
 */
const gulp = require('gulp')
const { src, dest, watch, series, parallel } = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const rename = require('gulp-rename')
const cleanCSS = require('gulp-clean-css')
const htmlmin = require('gulp-htmlmin')
/**
 * Variables 
 */
const ouputDir = path.join('.', 'dist')
const config = {
  html: {
    src: path.join('.', 'index.html'),
    dest: path.join('.', ouputDir,)
  },
  scss: {
    src: path.join('.', 'main.scss'),
    dest: path.join('.', ouputDir, 'css')
  }
}

/**
 * * GULP TASKS
 */

// ensuite output directory exist
gulp.task('ensureOuputDir', (done) => {
  if (!fs.existsSync(ouputDir)){
    console.log("Directory must be created")
    return fs.mkdir(ouputDir, (error) => {
      if (error) throw error
      done()
    })
  } else {
    console.log("Directory already exist")
    return done()
  }
})

// Copy HTML
gulp.task('copy:html', (done) => {
  src(config.html.src)
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(dest(config.html.dest))
  return done()
})
// Build CSS from SCSS
gulp.task('build:css', (done) => {
  src(config.scss.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(rename('style.css'))
    .pipe(dest(config.scss.dest))
  return done()
})
/**
 * * GULP DEV WATCHER 
 */
gulp.task('watch', () => {
  // watch html
  watch(config.html.src, series('copy:html'))
  // watch scss
  watch(config.scss.src, series('build:css'))
})
/**
 * * GULP BUILD 
 */
gulp.task('build', 
  series('ensureOuputDir', 'copy:html', 'build:css')
)
