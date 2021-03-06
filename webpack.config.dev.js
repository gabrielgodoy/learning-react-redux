const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  devtool: 'eval',
  entry: {
    app: [
      // Ativa HMR para o React
      'react-hot-loader/patch',

      // Junta o client para o webpack-dev-server
      // e conecta o endpoint declarado
      'webpack-dev-server/client?http://localhost:3000',

      // Junta o client para hot reloading
      // only- significa hot reload somente para updates com sucesso
      'webpack/hot/only-dev-server',
      './src/assets/js/index.jsx',
    ],
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        use: ['eslint-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [['es2015', { modules: false }], 'stage-0', 'react'],
              plugins: [
                'transform-object-rest-spread',
                'babel-plugin-transform-runtime',
                'react-hot-loader/babel',
                [
                  'react-css-modules',
                  {
                    filetypes: {
                      '.scss': {
                        syntax: 'postcss-scss',
                      },
                    },
                  },
                ],
              ],
              babelrc: false,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1,
              localIdentName: '[path]___[name]__[local]___[hash:base64:5]',
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true,
              importLoaders: 1,
              localIdentName: '[path]___[name]__[local]___[hash:base64:5]',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins() {
                return [autoprefixer({
                  browsers: ['> 1%', 'last 2 versions'],
                })];
              },
            },
          },
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [
                './src/assets/styles/settings/*.scss',
                './src/assets/styles/tools/_mixins.scss',
                './src/assets/styles/tools/_functions.scss',
                './node_modules/sass-mq/_mq.scss',
              ],
            },
          },
        ],
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.(png|jpe?g|gif|webm|mp4|ogv|txt|mp3|ogg|wav|pdf)$/,
        loader: 'file-loader',
        options: {
          context: path.resolve(__dirname, './src'),
          name: '[path][name].[ext]',
        },
      },
      {
        test: /\.(eot|otf|woff|woff2|ttf|svg)$/,
        use: ['url-loader?name=fonts/[name].[ext]'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new StyleLintPlugin({
      syntax: 'scss',
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      favicon: path.resolve(__dirname, './src/favicon.ico'),
      template: './src/index.html',
    }),

    // Habilita HMR globalmente
    new webpack.HotModuleReplacementPlugin(),

    // Imprime o nome dos módulos de forma mais legível no console do navegador em atualizações HMR
    new webpack.NamedModulesPlugin(),

    new CopyWebpackPlugin([
      {
        from: './src/assets/data',
        to: './data',
      },
    ]),
  ],
  devServer: {
    hot: true,
    port: 3000,
    historyApiFallback: true,
  },
  output: {
    filename: 'bundle.js',
    publicPath: '/',
    path: path.resolve(__dirname, './dist'),
  },
};
