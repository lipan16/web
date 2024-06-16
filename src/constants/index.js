export const BPI_TIME = '2018-11-04 18:36:00'
export const WEBSITE_TIME = '2020-7-1 9:0:0'
export const BASE_URL = 'http://8.133.162.30'
export const WEEK_HEADER = ['一', '二', '三', '四', '五', '六', '日']
export const LIPAN_BIRTHDAY = '1998-12-17'
export const XIAOBING_BIRTHDAY = '1999-06-20'

export const INTERVIEW_LIST = [
    {
        text: 'Vue系列',
        collapsable: true,
        children: [
            {link: '/vue/vue', text: '说说你对vue的理解?'},
            {link: '/vue/spa', text: '说说你对SPA（单页应用）的理解?'},
            {link: '/vue/show_if', text: 'Vue中的v-show和v-if怎么理解？'},
            {link: '/vue/new_vue', text: 'Vue实例挂载的过程中发生了什么?'},
            {link: '/vue/lifecycle', text: '说说你对Vue生命周期的理解?'},
            {link: '/vue/if_for', text: '为什么Vue中的v-if和v-for不建议一起用?'},
            {link: '/vue/first_page_time', text: 'SPA（单页应用）首屏加载速度慢怎么解决？'},
            {link: '/vue/data', text: '为什么data属性是一个函数而不是一个对象？'},
            {link: '/vue/data_object_add_attrs', text: 'Vue中给对象添加新属性界面不刷新?'},
            {link: '/vue/components_plugin', text: 'Vue中组件和插件有什么区别？'},
            {link: '/vue/communication', text: 'Vue组件间通信方式都有哪些?'},
            {link: '/vue/bind', text: '说说你对双向绑定的理解?'},
            {link: '/vue/nexttick', text: '说说你对nexttick的理解?'},
            {link: '/vue/mixin', text: '说说你对vue的mixin的理解，有什么应用场景？'},
            {link: '/vue/slot', text: '说说你对slot的理解？slot使用场景有哪些？'},
            {link: '/vue/observable', text: 'Vue.observable你有了解过吗？说说看'},
            {link: '/vue/key', text: '你知道vue中key的原理吗？说说你对它的理解？'},
            {link: '/vue/keepalive', text: '怎么缓存当前的组件？缓存后怎么更新？说说你对keep-alive的理解是什么？'},
            {link: '/vue/modifier', text: 'Vue常用的修饰符有哪些？有什么应用场景？'},
            {link: '/vue/directive', text: '你有写过自定义指令吗？自定义指令的应用场景有哪些？'},
            {link: '/vue/filter', text: 'Vue中的过滤器了解吗？过滤器的应用场景有哪些？'},
            {link: '/vue/vnode', text: '什么是虚拟DOM？如何实现一个虚拟DOM？说说你的思路'},
            {link: '/vue/diff', text: '你了解vue的diff算法吗？说说看'},
            {link: '/vue/axios', text: 'Vue项目中有封装过axios吗？主要是封装哪方面的？'},
            {link: '/vue/axiosCode', text: '你了解axios的原理吗？有看过它的源码吗？'},
            {link: '/vue/ssr', text: 'SSR解决了什么问题？有做过SSR吗？你是怎么做的？'},
            {link: '/vue/structure', text: '说下你的vue项目的目录结构，如果是大型项目你该怎么划分结构和划分组件呢？'},
            {link: '/vue/permission', text: 'vue要做权限管理该怎么做？如果控制到按钮级别的权限怎么做？'},
            {link: '/vue/cors', text: 'Vue项目中你是如何解决跨域的呢？'},
            {link: '/vue/404', text: 'vue项目本地开发完成后部署到服务器后报404是什么原因呢？'},
            {link: '/vue/error', text: '你是怎么处理vue项目中的错误的？'},
            {link: '/vue/vue3_vue2', text: 'Vue3有了解过吗？能说说跟Vue2的区别吗？'}
        ]
    },
    {
        text: 'Vue3系列',
        collapsable: true,
        children: [
            {link: '/vue3/goal', text: 'Vue3.0的设计目标是什么？做了哪些优化?'},
            {link: '/vue3/performance', text: 'Vue3.0 性能提升主要是通过哪几方面体现的？'},
            {link: '/vue3/proxy', text: 'Vue3.0里为什么要用 Proxy API 替代 defineProperty API ？'},
            {link: '/vue3/composition', text: 'Vue3.0 所采用的 Composition Api 与 Vue2.x 使用的 Options Api 有什么不同？'},
            {link: '/vue3/treeshaking', text: '说说Vue 3.0中Treeshaking特性？举例说明一下？'},
            {link: '/vue3/modal_component', text: '用Vue3.0 写过组件吗？如果想实现一个 Modal你会怎么设计？'}
        ]
    },
    {
        text: 'ES6系列',
        collapsable: true,
        children: [
            {link: '/es6/var_let_const', text: '说说var、let、const之间的区别'},
            {link: '/es6/array', text: 'ES6中数组新增了哪些扩展?'},
            {link: '/es6/object', text: 'ES6中对象新增了哪些扩展?'},
            {link: '/es6/function', text: 'ES6中函数新增了哪些扩展?'},
            {link: '/es6/set_map', text: 'ES6中新增的Set、Map两种数据结构怎么理解?'},
            {link: '/es6/promise', text: '你是怎么理解ES6中 Promise的？使用场景？'},
            {link: '/es6/generator', text: '怎么理解ES6中 Generator的？使用场景？'},
            {link: '/es6/proxy', text: '你是怎么理解ES6中Proxy的？使用场景?'},
            {link: '/es6/module', text: '你是怎么理解ES6中Module的？使用场景？'},
            {link: '/es6/decorator', text: '你是怎么理解ES6中 Decorator 的？使用场景？'}
        ]
    },
    {
        text: 'JavaScript系列',
        collapsable: true,
        children: [
            {link: '/javaScript/data_type', text: '说说JavaScript中的数据类型？存储上的差别？'},
            {link: '/javaScript/array_api', text: '数组的常用方法有哪些？'},
            {link: '/javaScript/string_api', text: 'JavaScript字符串的常用方法有哪些？'},
            {link: '/javaScript/type_conversion', text: '谈谈 JavaScript 中的类型转换机制'},
            {link: '/javaScript/equal', text: '== 和 ===区别，分别在什么情况使用'},
            {link: '/javaScript/copy', text: '深拷贝浅拷贝的区别？如何实现一个深拷贝？'},
            {link: '/javaScript/closure', text: '说说你对闭包的理解？闭包使用场景'},
            {link: '/javaScript/scope', text: '说说你对作用域链的理解'},
            {link: '/javaScript/prototype', text: 'JavaScript原型，原型链 ? 有什么特点？'},
            {link: '/javaScript/inherit', text: 'Javascript如何实现继承？'},
            {link: '/javaScript/this', text: '谈谈this对象的理解'},
            {link: '/javaScript/context_stack', text: 'JavaScript中执行上下文和执行栈是什么？'},
            {link: '/javaScript/event_Model', text: '说说JavaScript中的事件模型'},
            {link: '/javaScript/typeof_instanceof', text: 'typeof 与 instanceof 区别'},
            {link: '/javaScript/event_agent', text: '解释下什么是事件代理？应用场景？'},
            {link: '/javaScript/new', text: '说说new操作符具体干了什么？'},
            {link: '/javaScript/ajax', text: 'ajax原理是什么？如何实现？'},
            {link: '/javaScript/bind_call_apply', text: 'bind、call、apply 区别？如何实现一个bind?'},
            {link: '/javaScript/regexp', text: '说说你对正则表达式的理解？应用场景？'},
            {link: '/javaScript/event_loop', text: '说说你对事件循环的理解'},
            {link: '/javaScript/Dom', text: 'DOM常见的操作有哪些？'},
            {link: '/javaScript/BOM', text: '说说你对BOM的理解，常见的BOM对象你了解哪些？'},
            {link: '/javaScript/tail_recursion', text: '举例说明你对尾递归的理解，有哪些应用场景'},
            {link: '/javaScript/memory_leak', text: '说说 JavaScript 中内存泄漏的几种情况？'},
            {link: '/javaScript/cache', text: 'Javascript本地存储的方式有哪些？区别及应用场景？'},
            {link: '/javaScript/functional_programming', text: '说说你对函数式编程的理解？优缺点？'},
            {link: '/javaScript/function_cache', text: 'Javascript中如何实现函数缓存？函数缓存有哪些应用场景？'},
            {link: '/javaScript/loss_accuracy', text: '说说 Javascript 数字精度丢失的问题，如何解决？'},
            {link: '/javaScript/debounce_throttle', text: '什么是防抖和节流？有什么区别？如何实现？'},
            {link: '/javaScript/visible', text: '如何判断一个元素是否在可视区域中？'},
            {link: '/javaScript/continue_to_upload', text: '大文件上传如何做断点续传？'},
            {link: '/javaScript/pull_up_loading_pull_down_refresh', text: '如何实现上拉加载，下拉刷新？'},
            {link: '/javaScript/single_sign', text: '什么是单点登录？如何实现？'},
            {link: '/javaScript/security', text: 'web常见的攻击方式有哪些？如何防御？'}
        ]
    },
    {
        text: 'CSS系列',
        collapsable: true,
        children: [
            {link: '/css/box', text: '说说你对盒子模型的理解?'},
            {link: '/css/selector', text: 'css选择器有哪些？优先级？哪些属性可以继承？'},
            {link: '/css/em_px_rem_vh_vw', text: '说说em/px/rem/vh/vw区别?'},
            {link: '/css/dp_px_dpr_ppi', text: '说说设备像素、css像素、设备独立像素、dpr、ppi 之间的区别？'},
            {link: '/css/hide_attributes', text: 'css中，有哪些方式可以隐藏页面元素？区别?'},
            {link: '/css/BFC', text: '谈谈你对BFC的理解？'},
            {link: '/css/center', text: '元素水平垂直居中的方法有哪些？如果元素不定宽高呢？'},
            {link: '/css/column_layout', text: '如何实现两栏布局，右侧自适应？三栏布局中间自适应呢？'},
            {link: '/css/flexbox', text: '说说flexbox（弹性盒布局模型）,以及适用场景？'},
            {link: '/css/grid', text: '介绍一下grid网格布局'},
            {link: '/css/css3_features', text: 'CSS3新增了哪些新特性？'},
            {link: '/css/animation', text: 'css3动画有哪些？'},
            {link: '/css/layout_painting', text: '怎么理解回流跟重绘？什么场景下会触发？'},
            {link: '/css/responsive_layout', text: '什么是响应式设计？响应式设计的基本原理是什么？如何做？'},
            {link: '/css/css_performance', text: '如果要做优化，CSS提高性能的方法有哪些？'},
            {link: '/css/single_multi_line', text: '如何实现单行／多行文本溢出的省略样式？'},
            {link: '/css/visual_scrolling', text: '如何使用css完成视差滚动效果?'},
            {link: '/css/triangle', text: 'CSS如何画一个三角形？原理是什么？'},
            {link: '/css/less_12px', text: '让Chrome支持小于12px 的文字方式有哪些？区别？'},
            {link: '/css/sass_less_stylus', text: '说说对Css预编语言的理解？有哪些区别?'}
        ]
    },
    {
        text: 'Webpack系列',
        collapsable: true,
        children: [
            {link: '/webpack/webpack', text: '说说你对webpack的理解？解决了什么问题？'},
            {link: '/webpack/build_process', text: '说说webpack的构建流程?'},
            {link: '/webpack/Loader', text: '说说webpack中常见的Loader？解决了什么问题？'},
            {link: '/webpack/Plugin', text: '说说webpack中常见的Plugin？解决了什么问题？'},
            {link: '/webpack/Loader_Plugin', text: '说说Loader和Plugin的区别？编写Loader，Plugin的思路？'},
            {link: '/webpack/HMR', text: '说说webpack的热更新是如何做到的？原理是什么？'},
            {link: '/webpack/proxy', text: '说说webpack proxy工作原理？为什么能解决跨域?'},
            {link: '/webpack/performance', text: '说说如何借助webpack来优化前端性能？'},
            {link: '/webpack/improve_build', text: '如何提高webpack的构建速度？'},
            {link: '/webpack/Rollup_Parcel_snowpack_Vite', text: '与webpack类似的工具还有哪些？区别？'}
        ]
    },
    {
        text: 'HTTP系列',
        collapsable: true,
        children: [
            {link: '/http/HTTP_HTTPS', text: '什么是HTTP? HTTP 和 HTTPS 的区别?'},
            {link: '/http/HTTPS', text: '为什么说HTTPS比HTTP安全? HTTPS是如何保证安全的？'},
            {link: '/http/UDP_TCP', text: '如何理解UDP 和 TCP? 区别? 应用场景?'},
            {link: '/http/OSI', text: '如何理解OSI七层模型?'},
            {link: '/http/TCP_IP', text: '如何理解TCP/IP协议?'},
            {link: '/http/DNS', text: 'DNS协议 是什么？说说DNS 完整的查询过程?'},
            {link: '/http/CDN', text: '如何理解CDN？说说实现原理？'},
            {link: '/http/1.0_1.1_2.0', text: '说说 HTTP1.0/1.1/2.0 的区别?'},
            {link: '/http/status', text: '说说 HTTP 常见的状态码有哪些，适用场景？'},
            {link: '/http/GET_POST', text: '说一下 GET 和 POST 的区别？'},
            {link: '/http/headers', text: '说说 HTTP 常见的请求头有哪些? 作用？'},
            {link: '/http/after_url', text: '说说地址栏输入 URL 敲下回车后发生了什么？'},
            {link: '/http/handshakes_waves', text: '说说TCP为什么需要三次握手和四次挥手？'},
            {link: '/http/WebSocket', text: '说说对WebSocket的理解？应用场景？'}
        ]
    },
    {
        text: 'NodeJS系列',
        collapsable: true,
        children: [
            {link: '/nodejs/nodejs', text: '说说你对 Node.js 的理解？优缺点？应用场景？'},
            {link: '/nodejs/global', text: '说说 Node.js 有哪些全局对象？'},
            {link: '/nodejs/process', text: '说说对 Node 中的 process 的理解？有哪些常用方法？'},
            {link: '/nodejs/fs', text: '说说对 Node 中的 fs模块的理解? 有哪些常用方法'},
            {link: '/nodejs/Buffer', text: '说说对 Node 中的 Buffer 的理解？应用场景？'},
            {link: '/nodejs/Stream', text: '说说对 Node 中的 Stream 的理解？应用场景？'},
            {link: '/nodejs/EventEmitter', text: '说说Node中的EventEmitter? 如何实现一个EventEmitter?'},
            {link: '/nodejs/event_loop', text: '说说对 Nodejs 中的事件循环机制理解?'},
            {link: '/nodejs/require_order', text: '说说 Node 文件查找的优先级以及 Require 方法的文件查找策略?'},
            {link: '/nodejs/middleware', text: '说说对中间件概念的理解，如何封装 node 中间件？'},
            {link: '/nodejs/jwt', text: '如何实现jwt鉴权机制？说说你的思路'},
            {link: '/nodejs/file_upload', text: '如何实现文件上传？说说你的思路'},
            {link: '/nodejs/paging', text: '如果让你来设计一个分页功能, 你会怎么设计? 前后端如何交互?'},
            {link: '/nodejs/performance', text: 'Node性能如何进行监控以及优化？'}
        ]
    },
    {
        text: 'React系列',
        collapsable: true,
        children: [
            {link: '/react/React', text: '说说对React的理解？有哪些特性？'},
            {link: '/react/Real_DOM_VirtualDOM', text: '说说 Real DOM和 Virtual DOM 的区别？优缺点？'},
            {link: '/react/life_cycle', text: '说说 React 生命周期有哪些不同阶段？每个阶段对应的方法是？'},
            {link: '/react/state_props', text: 'state 和 props有什么区别？'},
            {link: '/react/super()_super(props)', text: 'super()和super(props)有什么区别？'},
            {link: '/react/setState', text: '说说 React中的setState执行机制'},
            {link: '/react/SyntheticEvent', text: '说说React的事件机制？'},
            {link: '/react/Binding_events', text: 'React事件绑定的方式有哪些？区别？'},
            {link: '/react/Building_components', text: 'React构建组件的方式有哪些？区别？'},
            {link: '/react/communication', text: 'React中组件之间如何通信？'},
            {link: '/react/key', text: 'React中的key有什么作用？'},
            {link: '/react/React_refs', text: '说说对React refs 的理解？应用场景？'},
            {link: '/react/class_function_component', text: '说说对React中类组件和函数组件的理解？有什么区别？'},
            {link: '/react/controlled_Uncontrolled', text: '说说对受控组件和非受控组件的理解？应用场景？'},
            {link: '/react/High_order_components', text: '说说对高阶组件的理解？应用场景?'},
            {link: '/react/React_Hooks', text: '说说对React Hooks的理解？解决了什么问题？'},
            {link: '/react/import_css', text: '说说react中引入css的方式有哪几种？区别？'},
            {link: '/react/animation', text: '在react中组件间过渡动画如何实现？'},
            {link: '/react/redux', text: '说说你对Redux的理解？其工作原理？'},
            {link: '/react/Redux_Middleware', text: '说说对Redux中间件的理解？常用的中间件有哪些？实现原理？'},
            {link: '/react/how_to_use_redux', text: '你在React项目中是如何使用Redux的? 项目结构是如何划分的？'},
            {link: '/react/React_Router', text: '说说你对React Router的理解？常用的Router组件有哪些？'},
            {link: '/react/React_Router_model', text: '说说React Router有几种模式？实现原理？？'},
            {link: '/react/immutable', text: '说说你对immutable的理解？如何应用在react项目中？'},
            {link: '/react/render', text: '说说React render方法的原理？在什么时候会被触发？'},
            {link: '/react/improve_render', text: '说说你是如何提高组件的渲染效率的？在React中如何避免不必要的render？'},
            {link: '/react/diff', text: '说说React diff的原理是什么？'},
            {link: '/react/Fiber', text: '说说对Fiber架构的理解？解决了什么问题？'},
            {link: '/react/JSX_to_DOM', text: '说说React Jsx转换成真实DOM过程？'},
            {link: '/react/Improve_performance', text: '说说 React 性能优化的手段有哪些？'},
            {link: '/react/capture_error', text: '说说你在React项目是如何捕获错误的？'},
            {link: '/react/server_side_rendering', text: '说说React服务端渲染怎么做？原理是什么？'},
            {link: '/react/summary', text: '说说你在使用React 过程中遇到的常见问题？如何解决?'}
        ]
    },
    {
        text: '版本控制系列',
        collapsable: true,
        children: [
            {link: '/git/versionControl', text: '说说你对版本管理的理解？常用的版本管理工具有哪些？'},
            {link: '/git/git', text: '说说你对Git的理解？'},
            {link: '/git/fork_clone_branch', text: '说说Git中 fork, clone,branch这三个概念，有什么区别?'},
            {link: '/git/command', text: '说说Git常用的命令有哪些？'},
            {link: '/git/HEAD_tree_index', text: '说说Git 中 HEAD、工作树和索引之间的区别？'},
            {link: '/git/git_pull_git_fetch', text: '说说对git pull 和 git fetch 的理解？有什么区别？'},
            {link: '/git/git_stash', text: '说说你对git stash 的理解？应用场景？'},
            {link: '/git/git_rebase_git_merge', text: '说说你对git rebase 和 git merge的理解？区别？'},
            {link: '/git/conflict', text: '说说 git 发生冲突的场景？如何解决？'},
            {link: '/git/git_reset_git_revert', text: '说说你对git reset 和 git revert 的理解？区别？'}
        ]
    },
    {
        text: '操作系统系列',
        collapsable: true,
        children: [
            {link: '/linux/linux', text: '说说你对操作系统的理解？核心概念有哪些？'},
            {link: '/linux/thread_process', text: '说说什么是进程？什么是线程？区别？'},
            {link: '/linux/file', text: '说说 linux系统下 文件操作常用的命令有哪些？'},
            {link: '/linux/vim', text: '说说 linux 系统下 文本编辑常用的命令有哪些？'},
            {link: '/linux/users', text: '说说你对 linux 用户管理的理解？相关的命令有哪些？'},
            {link: '/linux/redirect_pipe', text: '说说你对输入输出重定向和管道的理解？应用场景？'},
            {link: '/linux/shell', text: '说说你对 shell 的理解？常见的命令？'}
        ]
    },
    {
        text: 'TypeScript 系列',
        collapsable: true,
        children: [
            {link: '/typescript/typescript_javascript', text: '说说你对 TypeScript 的理解？与 JavaScript 的区别？'},
            {link: '/typescript/data_type', text: '说说 typescript 的数据类型有哪些？'},
            {link: '/typescript/enum', text: '说说你对 TypeScript 中枚举类型的理解？应用场景？'},
            {link: '/typescript/interface', text: '说说你对 TypeScript 中接口的理解？应用场景？'},
            {link: '/typescript/class', text: '说说你对 TypeScript 中类的理解？应用场景？'},
            {link: '/typescript/function', text: '说说你对 TypeScript 中函数的理解？与 JavaScript 函数的区别？'},
            {link: '/typescript/generic', text: '说说你对 TypeScript 中泛型的理解？应用场景？'},
            {link: '/typescript/high_type', text: '说说你对 TypeScript 中高级类型的理解？有哪些？'},
            {link: '/typescript/decorator', text: '说说你对 TypeScript 装饰器的理解？应用场景？'},
            {link: '/typescript/namespace_module', text: '说说对 TypeScript 中命名空间与模块的理解？区别？'},
            {link: '/typescript/react', text: '说说如何在 React 项目中应用 TypeScript？'},
            {link: '/typescript/vue', text: '说说如何在Vue项目中应用TypeScript？'}
        ]
    },
    {
        text: '算法与数据结构系列',
        collapsable: true,
        children: [
            {link: '/algorithm/algorithm', text: '说说你对算法的理解？应用场景？'},
            {link: '/algorithm/time_space', text: '说说你对算法中时间复杂度，空间复杂度的理解？如何计算？'},
            {link: '/algorithm/structure', text: '说说你对数据结构的理解？有哪些？区别？'},
            {link: '/algorithm/stack_queue', text: '说说你对栈、队列的理解？应用场景？'},
            {link: '/algorithm/linkedList', text: '说说你对链表的理解？常见的操作有哪些？'},
            {link: '/algorithm/set', text: '说说你对集合的理解？常见的操作有哪些？'},
            {link: '/algorithm/tree', text: '说说你对树的理解？相关的操作有哪些？'},
            {link: '/algorithm/heap', text: '说说你对堆的理解？如何实现？应用场景？'},
            {link: '/algorithm/graph', text: '说说你对图的理解？相关操作有哪些？'},
            {link: '/algorithm/sort', text: '说说常见的排序算法有哪些？区别？'},
            {link: '/algorithm/bubbleSort', text: '说说你对冒泡排序的理解？如何实现？应用场景？'},
            {link: '/algorithm/selectionSort', text: '说说你对选择排序的理解？如何实现？应用场景？'},
            {link: '/algorithm/insertionSort', text: '说说你对插入排序的理解？如何实现？应用场景？'},
            {link: '/algorithm/mergeSort', text: '说说你对归并排序的理解？如何实现？应用场景？'},
            {link: '/algorithm/quickSort', text: '说说你对快速排序的理解？如何实现？应用场景？'},
            {link: '/algorithm/binarySearch', text: '说说你对二分查找的理解？如何实现？应用场景？'},
            {link: '/algorithm/design1', text: '说说说你对分而治之、动态规划的理解？区别？'},
            {link: '/algorithm/design2', text: '说说你对贪心算法、回溯算法的理解？应用场景？'}
        ]
    },
    {
        text: '小程序系列',
        collapsable: true,
        children: [
            {link: '/applet/applet', text: '说说你对微信小程序的理解？优缺点？'},
            {link: '/applet/lifecycle', text: '说说微信小程序的生命周期函数有哪些？'},
            {link: '/applet/navigate', text: '说说微信小程序中路由跳转的方式有哪些？区别？'},
            {link: '/applet/optimization', text: '说说提高微信小程序的应用速度的手段有哪些？'},
            {link: '/applet/login', text: '说说微信小程序的登录流程？'},
            {link: '/applet/publish', text: '说说微信小程序的发布流程？'},
            {link: '/applet/requestPayment', text: '说说微信小程序的支付流程？'},
            {link: '/applet/webView_jscore', text: '说说微信小程序的实现原理？'}
        ]
    },
    {
        text: '设计模式系列  ( 进行中..)',
        collapsable: true,
        children: [
            {link: '/design/design', text: '说说对设计模式的理解？常见的设计模式有哪些？'},
            {link: '/design/singletonPattern', text: '说说你对单例模式的理解？如何实现？'},
            {link: '/design/factoryPattern', text: '说说你对工厂模式的理解？应用场景？'},
            {link: '/design/strategyPattern', text: '说说你对策略模式的理解？应用场景？'},
            {link: '/design/proxyPattern', text: '说说你对代理模式的理解？应用场景？'},
            {link: '/design/observerPattern', text: '说说你对发布订阅、观察者模式的理解？区别？'}
        ]
    }
]

export const FINE_WEBSITE = [
    {
        title: '✨推荐',
        site: [
            {
                title: 'HTML文档',
                desc: 'web开发者社群',
                link: 'https://developer.mozilla.org/zh-CN/docs/Web/HTML',
                logo: 'https://developer.mozilla.org/favicon-48x48.cbbd161b.png'
            },
            {title: '前端开发者手册', desc: '', link: 'https://dwqs.gitbooks.io/frontenddevhandbook/content'}
        ]
    },
    {
        title: 'CSS',
        site: [
            {title: 'less', desc: 'less官网', link: 'https://lesscss.org', logo: 'https://lesscss.org/public/ico/favicon.ico'},
            {
                title: 'Tailwind CSS',
                desc: '只需书写HTML代码，无需书写 CSS',
                link: 'https://www.tailwindcss.cn/docs/installation',
                logo: 'https://www.tailwindcss.cn/favicons/apple-touch-icon.png'
            }
        ]
    },
    {
        title: 'JavaScript',
        site: [
            {
                title: 'ES6 入门教程',
                desc: '阮一峰-JavaScript 语言教程',
                link: 'https://es6.ruanyifeng.com',
                logo: 'https://es6.ruanyifeng.com/favicon.ico'
            },
            {
                title: 'Babel',
                desc: '一个 JavaScript compiler，将ES6代码转换为 JavaScript 向后兼容版本的代码',
                link: 'https://babel.docschina.org/docs',
                logo: 'https://babel.docschina.org/img/babel.svg'
            }
        ]
    },
    {
        title: 'TypeScript',
        site: [
            {
                title: 'TypeScript中文文档',
                desc: '',
                link: 'https://www.tslang.cn/docs/home.html',
                logo: 'https://www.tslang.cn/assets/images/icons/favicon.ico'
            }
        ]
    },
    {
        title: '构建工具',
        site: [
            {
                title: 'webpack',
                desc: '一个用于现代 JavaScript 应用程序的 静态模块打包工具',
                link: 'https://www.webpackjs.com/concepts',
                logo: 'https://www.webpackjs.com/icon-square-small.85ba630cf0c5f29ae3e3.svg'
            },
            {title: 'Vite', desc: '下一代前端开发与构建工具', link: 'https://vitejs.cn', logo: 'https://vitejs.cn/logo.svg'}
        ]
    },
    {
        title: 'Nodejs',
        site: [
            {
                title: 'Node.js',
                desc: '一个开源的、跨平台的 JavaScript 运行时环境',
                link: 'https://nodejs.cn/learn',
                logo: 'https://img.nodejs.cn/logo.svg'
            },
            {
                title: 'Express',
                desc: '快速、独立、极简的 Node.js Web 框架',
                link: 'https://express.nodejs.cn',
                logo: 'https://express.nodejs.cn/images/favicon.png'
            }
        ]
    },
    {
        title: '框架',
        site: [
            {
                title: 'React',
                desc: '用于构建 Web 和原生交互界面的库',
                link: 'https://react.docschina.org/learn',
                logo: 'https://react.docschina.org/favicon.ico'
            },
            {title: 'Vue', desc: '渐进式 JavaScript 框架', link: 'https://cn.vuejs.org', logo: 'https://cn.vuejs.org/logo.svg'},
            {
                title: 'React技术揭秘',
                desc: '卡颂-本书的宗旨是打造一本严谨、易懂的React源码分析教程',
                link: 'https://react.iamkasong.com',
                logo: 'https://react.docschina.org/favicon.ico'
            }
        ]
    },
    {
        title: 'UI库',
        site: [
            {
                title: 'Vant',
                desc: '面向vue移动端轻量、可定制的移动端组件库',
                link: 'https://vant-contrib.gitee.io/vant/#/zh-CN',
                logo: 'https://fastly.jsdelivr.net/npm/@vant/assets/logo.png'
            },
            {
                title: 'Element Plus',
                desc: '基于 Vue 3，面向设计师和开发者的pc端组件库',
                link: 'https://element-plus.org/zh-CN/#/zh-CN',
                logo: 'https://element-plus.org/images/element-plus-logo-small.svg'
            },
            {
                title: 'Ant Design',
                desc: '面向react pc端',
                link: 'https://ant-design.antgroup.com/index-cn',
                logo: 'https://gw.alipayobjects.com/zos/antfincdn/UmVnt3t4T0/antd.png'
            },
            {
                title: 'Ant Design Mobile',
                desc: '面向react 移动端',
                link: 'https://mobile.ant.design/zh',
                logo: 'https://gw.alipayobjects.com/zos/bmw-prod/69a27fcc-ce52-4f27-83f1-c44541e9b65d.svg'
            }
        ]
    },
    {
        title: '其他',
        site: [
            {
                title: '王者荣耀体验服',
                desc: '体验服',
                link: 'https://pvp.qq.com/cp/a20161115tyf/index.shtml',
                logo: 'https://pvp.qq.com/favicon.ico'
            },
            {title: '兰州大学校友网', desc: '', link: 'https://alumni.lzu.edu.cn', logo: 'https://www.lzu.edu.cn/res/favicon.ico'},
            {
                title: '软考',
                desc: '报名',
                link: 'https://bm.ruankao.org.cn/sign/welcome',
                logo: 'https://bm.ruankao.org.cn/asset/image/public/logo.png'
            },
        ]
    }
]

export const FINE_TOOLS = [
    {
        title: 'remove bg',
        desc: '背景消除',
        link: 'https://www.remove.bg/zh',
        logo: 'https://www.remove.bg/safari-pinned-tab.svg?v=YAXaAv7pao'
    },
    {
        title: 'regulex',
        desc: '正则表达式匹配',
        link: 'https://jex.im/regulex/#!flags=&re=',
        logo: 'https://jex.im/favicon.ico'
    },
    {
        title: '工具猫',
        desc: '在线生成透明ICO图标—工具猫',
        link: 'https://www.toolscat.com/img/ico',
        logo: 'https://www.toolscat.com/static/common/favicon.ico'
    },
    {
        title: '字体转换',
        desc: '',
        link: 'https://transfonter.org',
        logo: 'https://transfonter.org/favicon.ico'
    },
    {
        title: 'APP 影院',
        desc: '',
        link: 'https://www.appmovie.vip',
        logo: 'https://cdn.wyteam.net/webapps/maccms/template/blueghost/img/favicon.ico'
    },
    {
        title: 'VidHub 视频库',
        desc: '',
        link: 'https://vidhub.tv',
        logo: 'https://vidhub.tv/mxstatic/image/logo2.png'
    },
    {
        title: 'NavNav+',
        desc: '动画效果分享',
        link: 'https://navnav.co/',
        logo: 'https://navnav.co/assets/logo-7d2e3e19995a6030c546114a9d5133d0c30ca2c8025e47c40b68d67347dbfa07.png'
    },
    {
        title: 'UI verse',
        desc: '动画效果分享',
        link: 'https://uiverse.io/',
        logo: 'https://uiverse.io/favicon-32x32.png'
    },
    {
        title: 'clock Dot',
        desc: '',
        link: '/assets/iframe/clockDots',
        logo: ''
    },
    {
        title: '延时实现动画',
        desc: '',
        link: '/assets/iframe/delayAnimation',
        logo: ''
    },
    {
        title: 'link',
        desc: 'https://zsyyblog.com/effects/',
        link: 'https://go.itab.link/',
        logo: ''
    },
]
