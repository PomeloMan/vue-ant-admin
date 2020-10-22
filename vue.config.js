'use strict';
require('./scripts/color'); // antd-theme-generator
const path = require('path');
const isProduction = process.env.NODE_ENV === 'production';
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  publicPath: isProduction ? './' : '/', // 部署应用包时的基本 URL
  outputDir: 'dist', // 当运行 vue-cli-service build 时生成的生产环境构建文件的目录
  assetsDir: './', // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  productionSourceMap: false, // 是否为生产环境构建生成 source map
  css: {
    sourceMap: !isProduction,
    loaderOptions: {
      less: { javascriptEnabled: true }
    }
  },

  configureWebpack: config => {
    // config.resolve.alias['@'] = path.resolve(__dirname, 'src')
    if (isProduction) {
      // 为生产环境修改配置...
    } else {
      // 为开发环境修改配置...
      config.devtool = 'inline-source-map';
    }
  },

  chainWebpack(config) {
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/icons'))
      .end();
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end();
  }
};
