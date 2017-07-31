/**
 * COMMON WEBPACK CONFIGURATION
 */

/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const webpack = require('webpack');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const WebpackAppversionPlugin = require('webpack-appversion-plugin');
/* eslint-enable import/no-extraneous-dependencies */

module.exports = (options) => {
  const webpackConfig = {
    entry: options.entry,
    output: Object.assign({
      path: path.resolve(process.cwd(), 'dist'),
      publicPath: '/',
    }, options.output),
    module: {
      loaders: [{
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: options.babelQuery,
      }, {
        // Do not transform vendor's CSS with CSS-modules
        // The point is that they remain in global scope.
        // Since we require these CSS files in our JS or CSS files,
        // they will be a part of our compilation either way.
        // So, no need for ExtractTextPlugin here.
        test: /\.css$/,
        include: /node_modules/,
        loaders: ['style-loader', 'css-loader'],
      }, {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader',
      }, {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
        }, {
          loader: 'sass-loader',
        }],
      }, {
        test: /\.(jpg|png|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              query: {
                name: '[name].[ext]',
              },
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              query: {
                progressive: true,
                optimizationLevel: 7,
                interlaced: false,
                pngquant: {
                  quality: '65-90',
                  speed: 4,
                },
              },
            },
          },
        ],
      }, {
        test: /\.html$/,
        loader: 'html-loader',
      }, {
        test: /\.json$/,
        loader: 'json-loader',
      }, {
        test: /\.(mp4|webm)$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
        },
      }],
    },
    plugins: options.plugins.concat([
      new FaviconsWebpackPlugin(path.join(process.cwd(), 'app', 'images', 'favicon.png')),
      new webpack.ProvidePlugin({
        // make fetch available
        fetch: 'exports-loader?self.fetch!whatwg-fetch',
      }),

      // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
      // inside your code for any environment checks; UglifyJS will automatically
      // drop any unreachable code.
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        },
      }),
      new webpack.NamedModulesPlugin(),
    ]),
    resolve: {
      alias: {
        'env-config': path.join(process.cwd(), 'app', 'environment', `${process.env.ENV_CONFIG || 'development'}.js`)
      },
      modules: ['app', 'node_modules'],
      extensions: [
        '.js',
        '.jsx',
        '.react.js',
      ],
      mainFields: [
        'browser',
        'jsnext:main',
        'main',
      ],
    },
    devtool: options.devtool,
    target: 'web',
    performance: options.performance || {},
  };

  if (process.env.SHOW_VERSION) {
    webpackConfig.plugins.push(
      new WebpackAppversionPlugin({
        entries: ['main'],
        version: '1.0.0',
        isOpen: true,
      })
    );
  }

  return webpackConfig;
};

