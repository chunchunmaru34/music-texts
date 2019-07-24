const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: "./src/index.tsx",

  plugins: [
    new HtmlWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.EnvironmentPlugin(['SPOTIFY_API_KEY', 'MUSIXMATCH_API_KEY'])
  ],

  devtool: 'source-map',

  output: {
    filename: '[name].[hash].js'
  },

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    hot: true,
    compress: true,
    // host: '192.168.14.229'
  },

  resolve: {
    alias: {
      "@app": path.resolve(__dirname, "src/app"),
      "@services": path.resolve(__dirname, "src/app/services"),
      "@components": path.resolve(__dirname, "src/app/components"),
      "@interfaces": path.resolve(__dirname, "src/app/interfaces"),
      "@constants": path.resolve(__dirname, "src/app/constants"),
      "@utils": path.resolve(__dirname, "src/app/utils"),
      "@assets": path.resolve(__dirname, "src/app/assests"),
      "@actions": path.resolve(__dirname, "src/app/actions")
    },
    extensions: [".ts", ".tsx", ".js", ".json"]
  },

  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader" },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      {
        test: /\.scss$/i,
        loader: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[name]__[local]__[hash:base64:5]'
              },
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
        loader: 'file-loader',
        // include: path.join(__dirname, 'assets'),
        options: {
          name: '[path][name].[ext]'
        }
      }
    ]
  },

  optimization: {
    // splitChunks: {
    //   chunks: 'all'
    // }
  }
}