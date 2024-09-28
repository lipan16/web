const {merge} = require('webpack-merge')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const webpackConfigBase = require('./webpack.config')
const TerserPlugin = require('terser-webpack-plugin')

const webpackConfigProd = (env) => {
    const isAnalyse = env.mode === 'analyse' // 是否打包分析
    // console.log('webpackConfig Prod: ',env, isAnalyse)

    return {
        mode: 'production',
        performance: {
            maxAssetSize: 1024 * 1024, // 单个资源体积超过2MB提示
            maxEntrypointSize: 1024 * 1024, // 入口起点体积超过1MB提示
        },
        optimization: {
            minimize: true,
            minimizer: [
                `...`,
                new CssMinimizerPlugin(),
                new TerserPlugin({
                    extractComments: false // 不将注释提取到单独的文件中
                })
            ],
            chunkIds: 'named', // 用文件名作为chunk的名字
            splitChunks: {
                chunks: 'all', // 对所有模块进行分包
                minSize: 200 * 1024, // 最小分包提示 200KB
                // minChunks: 1, // 拆分前必须共享模块的最小 chunks 数
                cacheGroups: {
                    vendors: {
                        name: 'vendors',
                        test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom|react-redux|antd|ahooks|'@ant-design\/icons')/,
                        priority: 30, // 优先级
                        reuseExistingChunk: true // 不需要重复拆根chunk
                    },
                    commons: { // 打包公共模块
                        name: 'commons', // 提取出来的文件命名
                        test: /[\\/]node_modules[\\/]/,
                        priority: 20,
                        reuseExistingChunk: true,
                        // chunks: 'all', // initial表示提取入口文件的公共部分
                        // minChunks: 4, // 表示提取公共部分最少的文件数
                        // minSize: 0, // 表示提取公共部分最小的大小
                    },
                    source: {
                        name: 'source',
                        test: /([\\/]src[\\/]|[\\/]config[\\/])/,
                        // test(module, chunks){
                        //     console.log('chunk: ', module.resource)
                        //     return module.resource && !['react', 'react-dom', 'react-router-dom', 'react-redux', 'antd', 'ahooks'].some(s => module.resource.includes(s))
                        // },
                        priority: 10,
                        reuseExistingChunk: true
                    },
                    // default: {
                    //     name: 'abs',
                    //     minChunks: 2, // 拆分前必须共享模块的最小 chunks 数
                    //     minSize: 100 * 1024, // 最小分包提示 100KB
                    // }
                }
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
