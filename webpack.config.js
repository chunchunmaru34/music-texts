const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: "./src/index.tsx",

  plugins: [
    new HtmlWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin()
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
      }
    ]
  },

  optimization: {
    // splitChunks: {
    //   chunks: 'all'
    // }
  }
}