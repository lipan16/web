<h1 align="center"><a href='http://8.133.162.30'>个人主页</a></h1>



|                              |                                                              |
| ---------------------------- | ------------------------------------------------------------ |
| webpack                      | 前端构建工具                                                 |
| webpack-cli                  | 让 webpack 支持命令行执行                                    |
| webpack-dev-server           | 开发模式下启动服务器，修改代码，浏览器会自动刷新             |
| html-webpack-plugin          | 将webpack打包生成的文件（js，css）嵌入html                   |
| @babel/core                  | 将es6===>es5                                                 |
| @babel/preset-env            | 是一个智能预设，允许你使用最新的 JavaScript，而无需微观管理目标环境需要哪些语法转换（以及可选的浏览器 polyfill）。 这既让你的生活更轻松，也让 JavaScript 包更小！ |
| @babel/preset-react          | 让 babel 支持 react 的预设                                   |
| babel-loader                 | 是让 webpack 支持 babel 的加载器                             |
| style-loader                 | 通过使用多个 `<style></style>`标签的形式自动把 styles 插入到 DOM 中 |
| css-loader                   | 用于解析 css 文件                                            |
| react                        | 核心，构建交互界面的库。核心思想是虚拟Dom                    |
| react-dom                    | 只做和浏览器或DOM相关的操作                                  |
| react-router-dom             | react spa应用实现路由核心                                    |
| react-redux                  | react状态管理                                                |
| webpack-merge                | 合并webpack配置                                              |
| dayjs                        | 时间处理工具                                                 |
| svg-sprite-loader            | 利用svg的`symbol`元素，将每个icon包括在`symbol`中，通过`use`元素使用该`symbol` |
| svgo-loader                  | svg 优化器。引入项目中的 svg 文件会经过 svgo-loader => svg-sprite-loader 的处理。先处理 svg 图像，然后在页面中生成 svg-symbols |
| webpack-manifest-plugin      | 将生成的静态资源文件名与实际访问的文件名之间建立映射关系，以方便浏览器加载资源，从而提升应用的性能和用户体验 |
| mini-css-extract-plugin      | CSS 代码从 JavaScript 中分离出来，生成单独的 CSS 文件，减小js文件体积 |
| less                         | 支持less格式的样式文件                                       |
| less-loader                  | webpack解析less文件                                          |
| css-minimizer-webpack-plugin | 使用 [cssnano](https://cssnano.co/) 优化和压缩 CSS           |
| webpack-bundle-analyzer      | 分析打包结果                                                 |
| terser-webpack-plugin        | 使用 [terser](https://github.com/terser/terser) 来压缩 JavaScript。 |
|                              |                                                              |
|                              |                                                              |
|                              |                                                              |
|                              |                                                              |



**module**：不同文件类型的模块，这些文件都会被 loader 转换为有效的模块，然后被应用所使用并且加入到依赖关系图中。相对于一个完整的程序代码，模块化的好处在于，模块化将程序分散成小的功能块，这就提供了可靠的抽象能力以及封装的边界，让设计更加连贯、目的更加明确。

**chunk** ：chunk是 webpack 在进行模块的依赖分析的时候，代码分割出来的代码块。

**bundle**：捆绑好的最终文件。如果说，chunk 是各种片段，那么 bundle 就是一堆 chunk 组成的“集大成者”，是源码经过webpack处理后的最终版本