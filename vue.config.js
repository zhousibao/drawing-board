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
      '/img-api': {
        target: 'https://raw.githubusercontent.com',
        changeOrigin: true,
        pathRewrite: {
          '/img-api': '',
        },
        onProxyRes() {},
      },
    },
  },
  lintOnSave: true,

  productionSourceMap: false,

  chainWebpack: (config) => {

    config.module.rules.delete("svg");
    config.module
      .rule('svg-smart') 
      .test(/\.svg$/)
      .include
      .add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
          symbolId: 'icon-[name]'
      })

    // alias
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'));
  },


};
