#  Netlify Function Static Starter

> TODO write better README.md

Ensure `netlify-cli` is installed globally on your system...
````bash
npm install -g netlify-cli
````
Install dependencies
````bash
npm install
````
Commands:

````bash
npm run serve
````
This command will start the `netlify-cli` [local server](https://cli.netlify.com/commands/dev) in development mode `process.env.NODE_ENV = developement` and the `gulp watch` task...

````bash
npm run dev
````
This comman will start the `gulp watch` task only...

````javascript
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
````

````bash
npm run build
````
This comman will start the `gulp build` task...

````javascript
/**
 * * GULP BUILD 
 */
gulp.task('build', 
  series('ensure:outputDir', 'clean:outputDir',  'copy:html', 'build:css', 'esbuild')
)
````
~~{dependencies}~~