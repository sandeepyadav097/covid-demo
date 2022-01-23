const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  context:__dirname,
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath:'/'
  },
  devServer:{
      historyApiFallback:true
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module:{
      rules:[
        {
            test:/\.js$/,
            use:'babel-loader'
        },
        {
            test:/\.css$/,
            use:['style-loader','css-loader']
        },
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.svg$/,
          use: ['@svgr/webpack'],
        }
      ],
  },
  plugins: [new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'public/index.html'),
    filename: 'index.html',
  })],
};