const {merge} = require('webpack-merge')
const path = require('path')
const webpackConfigBase = require('./webpack.config')

const webpackConfigProd = {
    mode: 'production',
    output: { // 配置输出信息
        path: path.join(__dirname, '../dist'),
        filename: '[name].[contenthash:8].js',  // 列在 entry 中,打包输出的文件名称
        chunkFilename: '[name].[contenthash:8].chunk.js', // 未列在 entry 中，却又需要被打包出来的文件的名称
        clean: true
    }
}
module.exports = merge(webpackConfigBase, webpackConfigProd)
