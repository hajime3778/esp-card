module.exports = {
  devServer: {
    port: 9000,
    disableHostCheck: true,
  },
  configureWebpack: {
    devtool: 'source-map'
  },
  "transpileDependencies": [
    "vuetify"
  ]
}