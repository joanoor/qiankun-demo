const { defineConfig } = require('@vue/cli-service')
const path = require('path')
const { name } = require('../package.json') // NOTE:qiankun

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = defineConfig({
  publicPath: '/subapp/sub-vue01',
  transpileDependencies: true,
  chainWebpack: config => config.resolve.symlinks(false),
  devServer: {
    port: process.env.VUE_APP_PORT, // NOTE:qiankun
    headers: {
      // NOTE:qiankun
      'Access-Control-Allow-Origin': '*',
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
      },
    },
    // qiankun所需配置 // NOTE:qiankun
    output: {
      library: `${name}-[name]`,
      libraryTarget: 'umd', // 把微应用打包成 umd 库格式
      chunkLoadingGlobal: `webpackJsonp_${name}`,
    },
  },
})
