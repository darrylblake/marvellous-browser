const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const BaseHrefWebpackPlugin = require('base-href-webpack-plugin').BaseHrefWebpackPlugin

module.exports = {
  entry: './app/index.js',
  output: {
    path: path.resolve('public'),
    filename: 'build/[name].[hash:8].js',
    publicPath: '/',
    chunkFilename: 'build/[id].[chunkhash:8].chunk.js'
  },
  resolve: {
    alias:{
      'whatwg-fetch': path.resolve(__dirname, './app/helpers/polyfillFetch.js')
    },
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.p?css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader'
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('build/[name].[hash:8].css'),
    new HtmlWebpackPlugin({
      template: 'app/index.ejs',
      filename: 'index.html',
      inject: 'body',
      cache: false,
      locals: {
        baseHref: process.env.BASE_HREF,
        ravenToken: process.env.RAVEN_URL_FRONTEND
      }
    }),
    new webpack.DefinePlugin({
      'process.env.GOOGLE_ANALYTICS_ID': JSON.stringify(process.env.GOOGLE_ANALYTICS_ID),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.DEBUG': JSON.stringify(process.env.DEBUG),
      'process.env.GRAPHQL_ENDPOINT': JSON.stringify(process.env.GRAPHQL_ENDPOINT)
    }),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      threshold: 10240,
      minRatio: 0.8
    }),
    new BaseHrefWebpackPlugin({
      baseHref: process.env.BASE_HREF
    })
  ]
}
