const { resolve } = require('path');

module.exports = {
  publicPath: process.env.VUE_APP_BASE_URL,
  devServer: {
    overlay: {
      warnings: true,
      errors: true,
    },
    // https: true,
    hot: true,
    hotOnly: true,
    disableHostCheck: true,
    port: 8011,
    proxy: {
      '/api': {
        target: 'https://aaa-bbb-ccc.com',
        changeOrigin: true,
        pathRewrite: {
          '/api': '',
        },
        onProxyRes() {},
      },
    },
  },
  lintOnSave: true,

  productionSourceMap: false,

  chainWebpack: (config) => {
    // svga
    config.module
      .rule('url')
      .test(/\.svga$/)
      .use('url-loader')
      .loader('url-loader')
      .end();

    // alias
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'));
  },


};
