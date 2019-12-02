const _ = require('lodash');

const sharedConfigs = {
  context: __dirname,
  entry: {
    // app: './src/entrypoint.js'
    app: './entrypoint.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env']
          }
        }
      },
      {
        test: require.resolve('webrtc-adapter'),
        use: 'expose-loader'
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
        exclude: /node_modules/,
        use: ['file-loader?name=[name].[ext]'] // ?name=[name].[ext] is only necessary to preserve the original file name
      }
    ]
  }
};

const mergeResolver = (objValue, srcValue) => (
  _.isArray(objValue) ? objValue.concat(srcValue) : undefined
);

module.exports = configs => _.mergeWith(sharedConfigs, configs, mergeResolver);
