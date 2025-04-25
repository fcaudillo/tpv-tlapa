const path = require('path')
const webpack = require('webpack')
const TersetJSPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = {
  entry: {
    modules: [
      'react',
      'react-dom',
      'react-router-dom',
    ]
  },
  optimization: {
    minimizer: [
      new TersetJSPlugin(),
      new CssMinimizerPlugin()
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[hash].dll.js',
    library: '[name]',
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]',
      path: path.join(__dirname, '[name]-manifest.json')
    })
  ],
}
