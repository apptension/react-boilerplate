/**
 * COMMON WEBPACK CONFIGURATION
 */

/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const webpack = require('webpack');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const WebpackAppversionPlugin = require('webpack-appversion-plugin');
const SpritesmithPlugin = require('webpack-spritesmith');
const fs = require('fs');
/* eslint-enable import/no-extraneous-dependencies */
/* eslint-enable import/no-extraneous-dependencies */

const LOCAL_ENV_CONFIG_NAME = 'local-env-config';

const appDirPath = path.join(process.cwd(), 'app');
const envConfigDirPath = path.join(appDirPath, 'environment');
const localEnvConfigPath = path.join(envConfigDirPath, 'local.js');

const externals = {};
const alias = {
  'env-config': path.join(envConfigDirPath, `${process.env.ENV_CONFIG || 'development'}.js`),
  'report-error': path.join(process.cwd(), 'app', 'utils', 'reportError.js'),
};

if (fs.existsSync(localEnvConfigPath)) {
  alias[LOCAL_ENV_CONFIG_NAME] = localEnvConfigPath;
} else {
  externals[LOCAL_ENV_CONFIG_NAME] = JSON.stringify({});
}

const buildSpritePlugin = (name) => new SpritesmithPlugin({
  retina: '-2x',
  src: {
    cwd: path.join(process.cwd(), `app/images/sprites/${name}`),
    glob: '*.png',
  },
  target: {
    image: path.join(process.cwd(), `app/images/generated/${name}-sprite.png`),
    css: path.join(process.cwd(), `app/images/generated/${name}-sprite.json`),
  },
  apiOptions: {
    cssImageRef: `images/generated/${name}-sprite.png`,
  },
  spritesmithOptions: {
    padding: 2,
  },
});

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
        options: {
          cacheDirectory: true,
        },
        query: options.babelQuery,
      }, {
        // Do not transform vendor's CSS with CSS-modules
        // The point is that they remain in global scope.
        // Since we require these CSS files in our JS or CSS files,
        // they will be a part of our compilation either way.
        // So, no need for ExtractTextPlugin here.
        test: /\.css$/,
        include: /node_modules/,
        loaders: [{
          loader: 'style-loader',
          options: {
            hmr: options.styleHMR,
          },
        }, {
          loader: 'css-loader',
        }],
      }, {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader',
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
      buildSpritePlugin('mobile'),
      buildSpritePlugin('desktop'),

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
      alias: alias,
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
    externals: externals,
    devtool: options.devtool,
    target: 'web',
    performance: options.performance || {},
  };

  if (process.env.SHOW_VERSION === 'true') {
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

