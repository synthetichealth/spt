const webpack = require('webpack');
const watch = process.env.WATCH !== 'false';
const mode = process.env.NODE_ENV || (watch ? 'development' : 'production');

module.exports = {
  entry: __dirname + '/src/ui/index.jsx',
  mode,
  output: {
    path: __dirname + '/public/js',
    filename: 'bundle.js',
    clean: true,
  },
  watch: watch,
  resolve: { extensions: ['.js', '.jsx', '.mjs'] },
  plugins: [new webpack.EnvironmentPlugin({ FRONTEND_ONLY: 'false', SYNTHETICMASS_API_KEY: '' })],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env'], ['@babel/preset-react']],
          },
        },
      },
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
