const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {WebpackManifestPlugin} = require('webpack-manifest-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = (env) => {
    const isProduction = !env.development // 是否生产环境
    // console.log('webpackConfig: ', env, isProduction)

    return {
        mode: 'development', // webpack打包环境是开发环境
        entry: './src/index.js', // 项目的入口文件,相对根目录
        devServer: {
            proxy: {
                '/api': {
                    target: 'http://127.0.0.1:3000/',
                    secure: false,
                    changeOrigin: true
                },
                '/sse': {
                    target: 'http://127.0.0.1:3000/',
                    secure: false,
                    changeOrigin: true
                },
            }
        },
        output: { // 配置输出信息
            publicPath: '/',
            path: path.join(__dirname, '../dist'), // 输出的路径，相对当前目录
            filename: isProduction ? 'js/[name].[contenthash:8].js' : '[name].js',  // 列在 entry 中,打包输出的文件名称
            chunkFilename: isProduction ? 'js/[name].[contenthash:8].bundle.js' : '[name].bundle.js', // 未列在 entry 中，却又需要被打包出来的文件的名称
            clean: true
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader'
                },
                {
                    test: /\.(css|less)$/,
                    use: [
                        isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                        'css-loader',
                        {
                            loader: 'less-loader',
                            options: {
                                // additionalData: (content, loaderContent) => {
                                //     const {resourcePath, rootContext} = loaderContent
                                //     const relativePath = path.relative(rootContext, resourcePath)
                                //     if(relativePath.includes('src')){
                                //         return `@import "~@/styles/variables.less";` + '\n' + content
                                //     }
                                //     return content
                                // }
                            }
                        }
                    ]
                },
                {
                    test: /\.svg$/,
                    use: [
                        {loader: 'svg-sprite-loader', options: {}},
                        {
                            loader: 'svgo-loader', options: {
                                plugins: [
                                    {name: 'removeAttrs', params: {attrs: 'fill'}}
                                ]
                            }
                        }
                    ],
                    include: path.join(__dirname, '../src/assets/svg')
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'imgs/[hash].[name][ext]'
                    },
                    exclude: path.join(__dirname, '../node_modules', '../src/assets/svg'),
                    include: path.join(__dirname, '../src/assets')
                },
                {
                    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'fonts/[hash].[name][ext]'
                    },
                    exclude: /node_modules/,
                    include: path.join(__dirname, '../src/assets')
                }
            ]
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, '../src'),
            },
            extensions: ['.js', '.css', '.less']
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './index.html'
            }),
            new WebpackManifestPlugin({})
        ],
        optimization: { // 添加抽离公共代码插件的配置
            // splitChunks: {
            //     cacheGroups: {
            //         commons: { // 打包公共模块
            //             chunks: 'initial', // initial表示提取入口文件的公共部分
            //             minChunks: 1, // 表示提取公共部分最少的文件数
            //             minSize: 0, // 表示提取公共部分最小的大小
            //             name: 'commons' // 提取出来的文件命名
            //         }
            //     }
            // },
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    extractComments: false // 不将注释提取到单独的文件中
                })
            ]
        }
    }
}
