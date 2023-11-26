import dayjs from 'dayjs'

// 禁止调试，右键，保存网页
export const safe = () => {
    const div = document.createElement('div')
    const loop = setInterval(function(){
        console.log(div.id) // 禁止调试
        // console.clear()
    }, 2000)

    Object.defineProperty(div, 'id', {
        get: function(){
            console.log('get')
            clearInterval(loop)
            alert('禁止非法调试！请关闭开发者工具！')
            setInterval(breakDebugger, 100) // 防止其他外部调试
        }
    })

    function checkDebugger(){
        const d = new Date()
        debugger;
        const dur = Date.now() - d
        if(dur < 3){
            return false
        }else{
            alert('禁止非法调试！请关闭开发者工具！')
            return true
        }
    }

    function breakDebugger(){
        if(checkDebugger()){
            breakDebugger()
        }
    }

    // 禁止右键
    window.oncontextmenu = function(){
        console.log('右键')
        return false
    }

    const preventS = function(e){
        if(e.keyCode === 123 || e.keyCode === 83){ // 屏蔽Ctrl+F12 和 Ctrl+S
            e.preventDefault()
            return false
        }
        return true
    }

    const preventCtrl = function(e){
        if(e.keyCode === 123){ // 屏蔽F12
            console.log('prevent keycode 123')
            e.preventDefault()
            return false
        }else if(e.keyCode === 17){ // ctrl
            console.log('prevent keycode ctrl+s')
            document.onkeydown = preventS
            return false
        }
        return true
    }

    const noPreventS = function(e){
        if(e.keyCode === 17){
            console.log('no prevent keycode ctrl+s')
            document.onkeydown = preventCtrl
        }

    }

    //屏蔽f12, ctrl+f12, ctrl+s
    document.onkeydown = preventCtrl // 键盘按下
    document.onkeyup = noPreventS // 键盘抬起
}

const networkChange = () => {
    const {rtt, downlink, effectiveType, saveData} = navigator.connection
    console.log(`有效网络连接类型：${effectiveType}`)
    console.log(`估算下行速度：${downlink}Mb/s`)
    console.log(`估算往返时间：${rtt}ms`)
    console.log(`打开/请求数据保护模式(用户是否已请求用户代理减少数据使用量)：${saveData} `)
}

navigator.connection.addEventListener('change', networkChange)

// js判断横竖屏
window.addEventListener('resize', () => {
    if(window.screen.orientation.angle === 180 || window.screen.orientation.angle === 0){
        // 正常方向或屏幕旋转180度
        console.log('竖屏')
    }
    if(window.screen.orientation.angle === 90 || window.screen.orientation.angle === -90){
        // 屏幕顺时钟旋转90度或屏幕逆时针旋转90度
        console.log('横屏')
    }
})

// 当 HTML 文档完全解析，且所有延迟脚本（<script defer> 和 <script type="module">）下载和执行完毕后，会触发 DOMContentLoaded 事件
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded')
    localStorage.setItem('USER_VISIT_TIME', dayjs().format('YYYY/MM/DD HH:mm:ss'))
})

// 浏览器窗口关闭或者刷新
window.addEventListener('beforeunload', () => {
    localStorage.setItem('USER_VISIT_TIME', dayjs().format('YYYY/MM/DD HH:mm:ss'))
})
