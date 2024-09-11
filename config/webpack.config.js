const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {WebpackManifestPlugin} = require('webpack-manifest-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')

const pathJoin = dir => path.join(__dirname, dir)

module.exports = (env) => {
    const isBuild = env.mode !== 'dev' // 是否打包环境
    // console.log('webpackConfig: ', env, isBuild)

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
                }
            }
        },
        output: { // 配置输出信息
            publicPath: '/',
            path: pathJoin('../dist'), // 输出的路径，相对当前目录
            filename: isBuild ? 'js/[name].[contenthash:8].js' : '[name].js',  // 列在 entry 中,打包输出的文件名称
            chunkFilename: isBuild ? 'js/[name].[contenthash:8].bundle.js' : '[name].bundle.js', // 未列在 entry 中，却又需要被打包出来的文件的名称
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
                    test: /\.css$/,
                    use: [
                        isBuild ? MiniCssExtractPlugin.loader : 'style-loader',
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: {
                                    plugins: [
                                        // require('postcss-px-to-viewport')({
                                        //     viewportUnit: 'vw',
                                        //     viewportWidth: 1920,
                                        //     viewportHeight: 1080,
                                        //     unitPrecision: 3,
                                        //     minPixelValue: 1, // 最小替换像素
                                        //     mediaQuery: true, // 允许媒体查询中转换
                                        // }),
                                        require('postcss-pxtorem')({
                                            rootValue: 16, // 根元素大小
                                            propList: ['*'], // 存储将被转换的存储列表，‘*’表示所有
                                            unitPrecision: 3 // rem保留小数点位数
                                        })
                                    ]
                                }
                            }
                        }
                    ]
                },
                {
                    test: /\.less$/,
                    use: [
                        isBuild ? MiniCssExtractPlugin.loader : 'style-loader',
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: {
                                    plugins: [
                                        // require('postcss-px-to-viewport')({
                                        //     viewportUnit: 'vw',
                                        //     viewportWidth: 1920,
                                        //     viewportHeight: 1080,
                                        //     unitPrecision: 3,
                                        //     minPixelValue: 1, // 最小替换像素
                                        //     mediaQuery: true, // 允许媒体查询中转换
                                        // }),
                                        require('postcss-pxtorem')({
                                            rootValue: 16, // 根元素大小
                                            propList: ['*'], // 存储将被转换的存储列表，‘*’表示所有
                                            unitPrecision: 3 // rem保留小数点位数
                                        })
                                    ]
                                }
                            }
                        },
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
                    include: pathJoin('../src/assets/svg')
                },
                {
                    test: /\.(png|jpg|jpeg|gif)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'assets/imgs/[hash].[name][ext]'
                    },
                    exclude: pathJoin('../node_modules'),
                    include: pathJoin('../src/assets/imgs')
                },
                {
                    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'assets/fonts/[hash].[name][ext]'
                    },
                    exclude: /node_modules/,
                    include: pathJoin('../src/assets')
                },
                {
                    test: /\.txt$/,
                    use: [
                        {loader: 'raw-loader'},
                        {
                            loader: pathJoin('./reverse-txt-loader.js'),
                            options: {}
                        }
                    ]
                }
            ]
        },
        resolve: {
            alias: {
                '@': pathJoin('../src')
            },
            extensions: ['.js', '.css', '.less']
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './index.html'
            }),
            new WebpackManifestPlugin({}),
            new webpack.DefinePlugin({
                'process.env': JSON.stringify(env)
            }),
            new CopyPlugin({
                patterns: [
                    {
                        from: pathJoin('../iframe'),
                        to: 'assets/iframe',
                        toType: 'dir'
                    }
                ]
            })
        ],
        optimization: { // 添加抽离公共代码插件的配置
            splitChunks: {
                cacheGroups: {
                    commons: { // 打包公共模块
                        chunks: 'initial', // initial表示提取入口文件的公共部分
                        minChunks: 4, // 表示提取公共部分最少的文件数
                        minSize: 0, // 表示提取公共部分最小的大小
                        name: 'commons' // 提取出来的文件命名
                    }
                }
            },
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    extractComments: false // 不将注释提取到单独的文件中
                })
            ]
        }
    }
}
