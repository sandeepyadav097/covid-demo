const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const {InjectManifest} = require('workbox-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin')

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
  }), 
  new CopyPlugin({
    patterns:[
      {from:"./src/manifest.json", to:""},
      {from:"./src/icon-192x192.png", to:""},
      {from:"./src/icon-256x256.png", to:""},
      {from:"./src/icon-384x384.png", to:""},
      {from:"./src/icon-512x512.png", to:""},
    ]
  }),
  new InjectManifest({
    swSrc: './src/src-sw.js',
    swDest:'sw.js',
  })],
};