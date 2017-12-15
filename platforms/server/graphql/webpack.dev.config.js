const path = require('path');
const slsw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');
const WebpackPluginCopy = require('webpack-plugin-copy');

const rootModules = path.resolve(__dirname, '../../../node_modules');

module.exports = {
  entry: './handler-dev',
  target: 'node',
  externals: [
    nodeExternals({
      modulesDir: rootModules,
    }),
  ],
  devtool: 'eval-source-map',
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: 'handler.js',
  },
  resolve: {
    modules: ['node_modules', rootModules],
  },
  plugins: [
    new WebpackPluginCopy([
      { from: 'nubabitest1-firebase-adminsdk-r7bmb-2f00516d5e.json' },
    ]),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: ['react-native'],
              plugins: [
                'transform-runtime',
                ['inline-import', { extensions: ['.graphql', '.graphqls'] }],
                [
                  'module-resolver',
                  {
                    extensions: ['.js'],
                    alias: {
                      core: '../../../core',
                      'graphql-utils': '../../../libs/graphql-utils'
                    },
                  },
                ],
              ],
            },
          },
        ],
      },
    ],
  },
};
