const merge = require('webpack-merge')
const common = require('./webpack.base')
const path =require('path')
module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: '../dist'
  },
  output: {
    filename: 'js/[name].[hash].js',
    path: path.resolve(__dirname, '../dist')
  },
  module: {

  },
  plugins: [],
  mode: 'development'
})
