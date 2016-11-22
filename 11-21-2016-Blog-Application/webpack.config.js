// require autoprefixers
// makes sure all your code html/css/js works for last 2 versions of all browsers
const autoprefixer = require ( 'autoprefixer' )

//config options so you can run only 'webpack' in console to compile
const config = {
	// this file doesn't reach browser, so you use es6 and require modules
	// this still IS a frontend file
  entry: __dirname + '/static/js/main.js',
  output: {
  	// compiles main.js to new file app.js (front end)
  	path: __dirname + '/static/js/',
    filename: 'app.js'
  },
  module: {
  	// module has object with options
  	// what webpacks must find and compile
  	// loaders only load everything what is being required in the entry file
    loaders: [
      {
      	// get all files ending with .js
        test: /\.js$/,
        // use babel-loader
        // babel-loader is a lib that makes sure you can use es6 (i.e. arrow functions) not only in node backend but also in frontend js
        loader: 'babel-loader',
        // send to babel-loader queries: es2015 = es6 -> compiles es6 to js compatible with browser
        query: {
          presets: ['es2015']
        }
      },
      {
      	// get all files ending with .scss
        test: /\.scss$/,
        // uses style, css, sass, postcss loaders (without queries)
        loaders: ["style", "css", "sass", "postcss"]
      }
    ]
  },
  // options postcss
  postcss: [
    autoprefixer( { browsers: ['last 2 versions'] } )
  ]
}

// export config so webpack can run it with these configurations
module.exports = config;

// NOTE, devDependencies:
// npm install --save-dev webpack
// npm install --save-dev autoprefixer babel-loader babel-core babel-preset-es2015 css-loader postcss-loader sass-loader style-loader

// NOTE: require sass in main.js
// main.js will not touch browser
// so has to require sass
// so its compiles in app.js (frontend)
// require('../sass/main.scss')

// NOTE: footer.pug has to point to compiled app.js now instead of main.js

// NOTE: after all this 'webpack' in console to run this and compile
// can use webpack in console because I did 'npm install -g webpack'