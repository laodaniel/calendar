import HtmlWebpackPlugin from 'html-webpack-plugin';

const config = {
  entry: './index.js',
  output: {
    path: 'build',
    filename: 'index.js'
  },
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: 'html-loader',
        exclude: /node_modules|build/
      },
      {
        test: /\.css$/,
        exclude: /(node_modules|build)/,
        loader: 'style!css'
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|build)/,
        loader: 'babel'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: 'index.html',
      filename: 'index.html'
    })
  ],
  debug: true,
  devtool: 'eval',
  eslint: {
    formatter: require('eslint-friendly-formatter')
  }
};

module.exports = config;
