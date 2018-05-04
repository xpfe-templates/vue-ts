module.exports = {
  lintOnSave: false,
  // 路径配置，如果是二级目录，需要配置成'/sub/'
  baseUrl: '/',
  // devServer配置
  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 3000,
    https: false,
    hotOnly: false,
    proxy: null, // string | Object
    before: app => {}
  },
  // pwa设置
  pwa: {
    themeColor: '#2591D0'
  }
}
