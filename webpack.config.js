const webpack = require('webpack');
const watch = process.env.WATCH !== 'false';
module.exports = {
  entry: __dirname + '/src/ui/index.jsx',
  mode: 'development',
  output: {
    path: __dirname + '/public/js',
    filename: 'bundle.js'
  },
  watch: watch,
  resolve: { extensions: ['.js', '.jsx'] },
  plugins: [
    new webpack.EnvironmentPlugin({ FRONTEND_ONLY: 'false', SYNTHETICMASS_API_KEY: '' }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env'], ['@babel/preset-react']]
          }
        }
      },
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};
