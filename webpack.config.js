const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')

const configDev = {
  mode: 'development',
  
  entry: path.resolve(__dirname, 'app', 'client', 'src', 'index.js'),
  watchOptions: {
    aggregateTimeout: 1500,
    poll: 1000
  },
  output: {
    path: path.join(__dirname, 'app', 'client', 'dist'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  }
}

const configProd = {
  ...configDev,
  mode: 'production',
  optimization: {
    usedExports: true,
    minimize: true,
    minimizer: [new TerserPlugin()]
  }
}

module.exports = (env) => {
  // return configProd
  return env.production ? configProd : configDev
}
