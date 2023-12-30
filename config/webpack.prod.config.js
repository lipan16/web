const {merge} = require('webpack-merge')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const webpackConfigBase = require('./webpack.config')

const webpackConfigProd = (env) => {
    const isAnalyse = env.mode === 'analyse' // 是否打包分析
    // console.log('webpackConfig Prod: ',env, isAnalyse)

    return {
        mode: 'production',
        optimization: {
            minimizer: [
                `...`,
                new CssMinimizerPlugin()
            ],
            splitChunks: {
                chunks: 'all'
            }
        },
        plugins: [
            isAnalyse && new BundleAnalyzerPlugin(),
            new MiniCssExtractPlugin({
                filename: 'assets/css/[name].[contenthash:8].bundle.css',
                chunkFilename: 'assets/css/[name].[contenthash:8].bundle.css'
            })
        ]
    }
}
module.exports = (env) => merge(webpackConfigBase(env), webpackConfigProd(env))
