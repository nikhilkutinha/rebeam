module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.glb$/i,
          use: "file-loader"
        }
      ]
    }
  }
};
