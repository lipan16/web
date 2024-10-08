<h1 align="center"><a href='https://8.133.162.30'>个人主页</a></h1>

- [x] 首页面
  - [x] 作者信息
  - [x] 用户信息，电量，ip，浏览器，访问时间
  - [x] 浏览器tab间通信
  - [x] 标签
  - [ ] 搜索
- [x] 我们
  - [x] 1 w 天倒计时
- [x] 日历
- [x] 面试题
  - [x] 第三方借鉴
  - [ ] 自己的理解
- [x] 王者
  - [x] 英雄列表(服务端nodejs 接口)
  - [ ] 英雄关系图谱
  - [ ] 英雄壁纸
- [x] 共享资源
  - [x] 网站
  - [x] 工具 改用iframe实现
  - [ ] 乾坤
- [x] [AiEditor](https://aieditor.dev/zh/getting-started.html)
- [x] 音乐播放页面：点击具体歌时仅第一次新开tab页（tab通信）
- [x] 关于
  - [x] 个人介绍
  - [x] 本站技术介绍
  - [x] 设置 暗色设置，主题风格定制
  - [x] 音乐播放器
  - [ ] 流量信息 访问量，用户量
  - [x] gsap动画
  - [x] 引入[高德地图](https://lbs.amap.com/api/javascript-api-v2/summary)定位
  - [x] [和风天气预报](https://dev.qweather.com/docs/api/weather/weather-now/)
  - [ ] 背景跟随天气预报，24节气背景图
  - [x] 日期进度，今天，本周，本月，本年
  - [ ] 字体切换

前端资源路径：/usr/local/nginx/html/
后端资源：node /usr/local/nodejsServer/index.js 正向代理

| 正向代理                                   | 反向代理                                                 |
| ------------------------------------------ | -------------------------------------------------------- |
| 部署在客户端，突破访问控制，隐藏客户端信息 | 部署在服务端，实现负载均衡，安全防护，隐藏真实服务器信息 |




| 依赖                           | 说明                                                                                                |
|------------------------------|---------------------------------------------------------------------------------------------------|
| express@4.18.2               | 简洁而灵活的 node.js Web应用框架                                                                            |
| webpack                      | 前端构建工具                                                                                            |
| webpack-cli                  | 让 webpack 支持命令行执行                                                                                 |
| webpack-dev-server           | 开发模式下启动服务器，修改代码，浏览器会自动刷新                                                                          |
| html-webpack-plugin          | 将webpack打包生成的文件（js，css）嵌入html                                                                     |
| @babel/core                  | 将es6===>es5                                                                                       |
| @babel/preset-env            | 是一个智能预设，允许你使用最新的 JavaScript，而无需微观管理目标环境需要哪些语法转换（以及可选的浏览器 polyfill）。 这既让你的生活更轻松，也让 JavaScript 包更小！ |
| @babel/preset-react          | 让 babel 支持 react 的预设                                                                              |
| babel-loader                 | 是让 webpack 支持 babel 的加载器                                                                          |
| style-loader                 | 通过使用多个 `<style></style>`标签的形式自动把 styles 插入到 DOM 中                                                 |
| css-loader                   | 用于解析 css 文件                                                                                       |
| react                        | 核心，构建交互界面的库。核心思想是虚拟Dom                                                                            |
| react-dom                    | 只做和浏览器或DOM相关的操作                                                                                   |
| react-router-dom             | react spa应用实现路由核心                                                                                 |
| react-redux                  | react状态管理                                                                                         |
| webpack-merge                | 合并webpack配置                                                                                       |
| dayjs                        | 时间处理工具                                                                                            |
| svg-sprite-loader            | 利用svg的`symbol`元素，将每个icon包括在`symbol`中，通过`use`元素使用该`symbol`                                         |
| svgo-loader                  | svg 优化器。引入项目中的 svg 文件会经过 svgo-loader => svg-sprite-loader 的处理。先处理 svg 图像，然后在页面中生成 svg-symbols     |
| webpack-manifest-plugin      | 将生成的静态资源文件名与实际访问的文件名之间建立映射关系，以方便浏览器加载资源，从而提升应用的性能和用户体验                                            |
| mini-css-extract-plugin      | CSS 代码从 JavaScript 中分离出来，生成单独的 CSS 文件，减小js文件体积                                                    |
| less                         | 支持less格式的样式文件                                                                                     |
| less-loader                  | webpack解析less文件                                                                                   |
| css-minimizer-webpack-plugin | 使用 [cssnano](https://cssnano.co/) 优化和压缩 CSS                                                       |
| webpack-bundle-analyzer      | 分析打包结果                                                                                            |
| terser-webpack-plugin        | 使用 [terser](https://github.com/terser/terser) 来压缩 JavaScript。                                     |
| antd                         | UI组件                                                                                              |
| @ant-design/cssinjs          | 样式兼容低版本浏览器                                                                                        |
| ahooks                       | 高质量react hooks库                                                                                   |
| @reduxjs/toolkit             | redux最佳实践                                                                                         |
| prop-types                   | props 类型检查                                                                                        |
| @ant-design/icons            | antd Icon图标                                                                                       |
| jinrishici                   | 今日诗词推荐                                                                                            |
| postcss                      | 一个用 JavaScript 工具和插件转换 CSS 代码的工具                                                                  |
| postcss-loader               | 进一步处理 CSS 文件，比如添加浏览器前缀，压缩 CSS 等                                                                   |
| postcss-pxtorem              | px -> rem (pc端                                                                                    |
| postcss-px-to-viewport       | px -> vw (移动端                                                                                     |
| gsap                         | 为专业人士构建的非常强大的 JavaScript 动画库                                                                      |
| lodash                       | 一个一致性、模块化、高性能的 JavaScript 实用工具库                                                                   |
| aieditor                     | 一个面向 AI 的下一代富文本编辑器                                                                                |
| copy-webpack-plugin          | webpack中拷贝文件和文件夹                                                                                  |
| ~~aplayer~~                  | 音乐播放组件（**未使用**）                                                                                   |
| lunar-javascript             | 无依赖的阳历、阴历、道历和佛历工具库[lunar](https://6tail.cn/calendar/api.html#overview.html)                       |
| ~~vanta~~                    | 网站动态背景（**未使用**）                                                                                   |
| ~~intro~~                    | 用户引导组件（**未使用**）                                                                                   |
| tailwindcss                  | 原子化css                                                                                            |
| postcss-nesting              | tailwind嵌套                                                                                        |
| react-activation             | 实现keepAlive                                                                                       |
| ~~lottie-web~~               | 实现动画                                                                                              |
| ~~raw-loader~~               | 将代码文件导出为字符串                                                                                       |

**module**：不同文件类型的模块，这些文件都会被 loader 转换为有效的模块，然后被应用所使用并且加入到依赖关系图中。相对于一个完整的程序代码，模块化的好处在于，模块化将程序分散成小的功能块，这就提供了可靠的抽象能力以及封装的边界，让设计更加连贯、目的更加明确。

**chunk** ：chunk是 webpack 在进行模块的依赖分析的时候，代码分割出来的代码块。

**bundle**：捆绑好的最终文件。如果说，chunk 是各种片段，那么 bundle 就是一堆 chunk 组成的“集大成者”，是源码经过webpack处理后的最终版本
