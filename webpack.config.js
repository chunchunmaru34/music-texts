const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const rules = [
  { test: /\.tsx?$/, loader: "babel-loader" },
  { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
  {
    test: /\.scss$/i,
    loader: [
      { loader: MiniCssExtractPlugin.loader },
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
];

const resolve = {
  alias: {
    "@app": path.resolve(__dirname, "src/app"),
    "@services": path.resolve(__dirname, "src/app/services"),
    "@components": path.resolve(__dirname, "src/app/components"),
    "@interfaces": path.resolve(__dirname, "src/app/interfaces"),
    "@constants": path.resolve(__dirname, "src/app/constants"),
    "@utils": path.resolve(__dirname, "src/app/utils"),
    "@assets": path.resolve(__dirname, "src/app/assests"),
    "@actions": path.resolve(__dirname, "src/app/actions"),
    "@models": path.resolve(__dirname, "src/app/models"),
    "@enums": path.resolve(__dirname, "src/app/enums")
  },
  extensions: [".ts", ".tsx", ".js", ".json"]
};


const clientConfig = {
  entry: [
    // 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    './src/index.tsx'
  ],

  plugins: [
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'public/index.html' ) }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.EnvironmentPlugin(['MUSIXMATCH_API_KEY']),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false,
    })
    // new CleanWebpackPlugin()
  ],

  devtool: 'source-map',

  output: {
    // filename: '[name].[hash].js',
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist/public'),
    publicPath: '/'
  },

  watch: true,

  resolve,

  module: {
    rules
  },

  optimization: {
    // splitChunks: {
    //   chunks: 'all'
    // }
  }
}

const serverConfig = {
  target: 'node',
  node: {
    __dirname: false
  },
  devtool: 'source-map',
  entry: {
    'index.js': path.resolve(__dirname, 'server/index.tsx')
  },
  module: {
    rules
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]'
  },
  resolve,
  plugins: [new MiniCssExtractPlugin({
    filename: '[name].css',
    chunkFilename: '[id].css',
    ignoreOrder: false,
  })]
}

module.exports = [serverConfig, clientConfig];