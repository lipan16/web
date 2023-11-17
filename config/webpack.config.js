const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development', // webpack打包环境是开发环境
    entry: './src/index.js', // 项目的入口文件,相对根目录
    devServer: {},
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '../src'),
            '@config': path.resolve(__dirname, './')
        },
        extensions: ['.js', '.css', '.less']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ],
    optimization: { // 添加抽离公共代码插件的配置
        splitChunks: {
            cacheGroups: {
                commons: { // 打包公共模块
                    chunks: 'initial', // initial表示提取入口文件的公共部分
                    minChunks: 2, // 表示提取公共部分最少的文件数
                    minSize: 0, // 表示提取公共部分最小的大小
                    name: 'commons' // 提取出来的文件命名
                }
            }
        }
    }
}
