const path = require('path');
const slsw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');
const WebpackPluginCopy = require('webpack-plugin-copy');

const rootModules = path.resolve(__dirname, '../../../node_modules');

module.exports = {
  entry: './handler',
  target: 'node',
  externals: [
    nodeExternals({
      modulesDir: rootModules,
    }),
  ],
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: 'index.js',
  },
  resolve: {
    modules: ['node_modules', rootModules],
  },
  plugins: [
    new WebpackPluginCopy([
      { from: 'nubabitest1-firebase-adminsdk-r7bmb-4056976942.json' },
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
                ['transform-define', '../../../core/config/getConfig.js'],
                ['inline-import', { extensions: ['.graphql', '.graphqls'] }],
                [
                  'module-resolver',
                  {
                    extensions: ['.js'],
                    alias: {
                      core: '../../../core',
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
