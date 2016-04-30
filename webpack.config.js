require('babel/register') // compiles JSX for things we require subsequently
var getConfig = require('hjs-webpack')
var React = require('react')
var PublicPage = require('./src/pages/public') // has ES6 & JSX that babel compiles

module.exports = getConfig({
  in: 'src/app.js',
  out: 'public',
  clearBeforeBuild: true,
  html: function(context){
    const publicPage = React.renderToString(React.createElement(PublicPage)) // cannot do JSX here
    return{
      'index.html': context.defaultTemplate({html: publicPage}),
      '200.html': context.defaultTemplate()
    }
  }
})
