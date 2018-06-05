const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  configureWebpack: {
    plugins: [
      new HtmlWebpackPlugin({
        templateParameters: {
          BASE_URL: '/'
        },
        template: `${__dirname}/public/static-image.html`,
        filename: 'static-image.html'
      }),
      new HtmlWebpackPlugin({
        templateParameters: {
          BASE_URL: '/'
        },
        template: `${__dirname}/public/external-svg.html`,
        filename: 'external-svg.html'
      }),
      new HtmlWebpackPlugin({
        templateParameters: {
          BASE_URL: '/'
        },
        template: `${__dirname}/public/embedded-svg.html`,
        filename: 'embedded-svg.html'
      }),
      new HtmlWebpackPlugin({
        templateParameters: {
          BASE_URL: '/'
        },
        template: `${__dirname}/public/convert-sample.html`,
        filename: 'convert-sample.html'
      })
    ]
  },

  chainWebpack: config => {
    /** CopyWebpackPlugin */
    config
      .plugin('copy')
      .tap(args => {
        args[0][0]
          .ignore
          .push(
            'static-image.html',
            'embedded-svg.html',
            'embedded-svg.html'
          )

        return args
      })
  }
}
