require('dotenv').config()
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
const gulpif = require('gulp-if')
const gulpEsbuild = require('gulp-esbuild')
const clean = require('gulp-clean')
const replace = require('gulp-replace')
// print NODE_ENV
console.log(`[NODE_ENV] ${process.env.NODE_ENV}`) // !DEBUG
// print project name
console.log(`[APP_NAME] ${process.env.APP_NAME}`) // !DEBUG
/**
 * Variables 
 */
const APP_NAME = process.env.APP_NAME
const date = new Date()
const hash = date.getTime()
const year = date.getFullYear()
const isDevelopment = process.env.NODE_ENV === 'development'
const isProduction = process.env.NODE_ENV === 'production'
const outputDir = path.join('.', 'dist')
const config = {
  html: {
    src: path.join('.', 'index.html'),
    dest: path.join('.', outputDir,)
  },
  scss: {
    src: path.join('.', 'main.scss'),
    dest: path.join('.', outputDir, 'css')
  },
  js: {
    outfile: 'app.bundle.js',
    src: path.join('.', 'app.js'),
    dest: path.join('.', outputDir, 'js')
  }
}
/**
 * * GULP TASKS
 */
// ensuite output directory exist
gulp.task('ensure:outputDir', (done) => {
  if (!fs.existsSync(outputDir)){
    console.log(`[${outputDir}] Directory must be created`)
    return fs.mkdir(outputDir, (error) => {
      if (error) throw error
      console.log(`[${outputDir}] Directory was created`)
      return done()
    })
  } else {
    console.log("Directory already exist")
    return done()
  }
})
// clean output directory sub files end folders
gulp.task('clean:outputDir', (done) => {
  src(`${outputDir}/*`, {read: false})
    .pipe(clean())
  return done()
})
// Copy HTML
gulp.task('copy:html', (done) => {
  src(config.html.src)
  .pipe(gulpif(isProduction, htmlmin({ collapseWhitespace: true }))) // minify if production
  .pipe(replace('APP_NAME', APP_NAME)) // add title content
  .pipe(dest(config.html.dest))
  return done()
})
// Build CSS from SCSS
gulp.task('build:css', (done) => {
  src(config.scss.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpif(isProduction, cleanCSS())) // minify if production
    .pipe(rename('style.css'))
    .pipe(dest(config.scss.dest))
  return done()
})
// esbuild
gulp.task('esbuild', done => {
  src(config.js.src)
    .pipe(gulpEsbuild({
      outfile: config.js.outfile,
      bundle: true,
      sourcemap: isDevelopment,
      ignoreAnnotations: true,
      legalComments: 'none',
      minify: isProduction,
      minifyIdentifiers: isProduction,
      minifyWhitespace: isProduction,
      minifySyntax: isProduction,
      format: 'cjs', // common js module
      banner: {
        js: 
`/*!
* ${APP_NAME}
* Author: Thomas G. aka Drozerah
* https://gist.github.com/Drozerah/c21e5763d4d92bc429b995854e27f4ac
* Copyright © ${year}
*/`}}))
  .pipe(dest(config.js.dest))
  return done()
})
/**
 * * GULP DEV WATCHER 
 */
gulp.task('watch', () => {
  // watch html
  watch(config.html.src, series('copy:html'))
  // watch compile scss
  watch(config.scss.src, series('build:css'))
  // watch js
  watch(config.js.src, series('esbuild'))
})
/**
 * * GULP BUILD 
 */
gulp.task('build', 
  series('ensure:outputDir', 'clean:outputDir',  'copy:html', 'build:css', 'esbuild')
)
