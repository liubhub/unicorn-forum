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
          // test: /\.css$/,
          test:/\.(s*)css$/,
          use: ['style-loader', 'css-loader', 'sass-loader']
        }
      ]
    },
    watch:true,
    // watchOptions:{
    //   aggregateTimeout:100, по умолчанию 300 - как у редактора
    // }
    // "devtool":"source-map", - удобно для дебагера, чтобы не лазить в одном бандле
  };