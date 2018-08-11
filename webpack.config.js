module.exports = {
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test:/\.(s*)css$/,
          use: ['style-loader', 'css-loader', 'sass-loader']
        }
      ]
    },
    watch:true,
  };