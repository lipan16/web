// 判断系统平台 手机、ipad、pc
import dayjs from 'dayjs'

export const systemPlatform = () => {
    if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)){
        return 'mobile'
    }else if(/iPad/i.test(navigator.userAgent)){
        return 'iPad'
    }else{
        return 'pc'
    }
}

export const networkChange = () => {
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

/**
 * 根据码点截取字符串 可以截取四个字节的字符，如emoji表情
 *
 * @param pStart 开始位置
 * @param pEnd 结束位置
 * @returns {string}
 */
String.prototype.sliceByPoint = function(pStart, pEnd){
    let result = '' // 截取的结果
    let pIndex = 0 // 码点的指针
    let cIndex = 0 // 码元的指针
    while(1){
        if(pIndex >= pEnd || cIndex >= this.length){
            break
        }
        // 获取字符的码点值
        const point = this.codePointAt(cIndex)
        if(pIndex >= pStart){
            // 根据码点恢复字符
            result += String.fromCodePoint(point)
        }
        // 码点值大于0xFFFF 表示该字符存储占四个字节两个字符，码元的指针往后加2
        cIndex += point > 0xFFFF ? 2 : 1
        pIndex++
    }
    return result
}

// 😀
// console.log('😀死了'.sliceByPoint(0, 1))
// '\uD83D'
// console.log('😀死了'.slice(0, 1))

const chineseUppercaseMap = {
    '零': '零',
    '一': '壹',
    '二': '贰',
    '三': '叁',
    '四': '肆',
    '五': '伍',
    '六': '陆',
    '七': '柒',
    '八': '捌',
    '九': '玖',
    '十': '拾',
    '百': '佰',
    '千': '仟',
    '万': '万',
    '亿': '亿'
}

/**
 * 数字转中文
 * @param num
 */
const toChineseNumber = (num) => {
    const numStr = num.toString().replace(/(?=(\d{4})+$)/g, ',').split(',').filter(Boolean)

    const chars = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
    const units = ['', '十', '百', '千']
    const bigUnits = ['', '万', '亿']


    function handleZero(str){ // 处理零的读法 如1002，1000，0000
        return str.replace(/零{2,}/g, '零').replace(/零+/g, '')
    }

    function _transform(n){ // 四位数字转换为字符串
        if(n === '0000'){
            return chars[0]
        }
        let result = ''
        for(let i = 0; i < n.length; i++){
            const c = chars[+n[i]]
            let u = units[n.length - 1 - i]
            if(c === chars[0]){
                u = ''
            }
            result += c + u
        }
        return handleZero(result)
    }

    let result = ''
    for(let i = 0; i < numStr.length; i++){
        const c = _transform(numStr[i])
        let u = bigUnits[numStr.length - 1 - i]
        if(c === chars[0]){
            u = ''
        }
        result += c + u
    }
    return handleZero(result)
}

export const showTime = (beginDate, type = true) => {
    const duration = dayjs.duration(dayjs().diff(beginDate)) // 开始至今的时长

    const days = Math.floor(duration.asDays()) // 开始至今的天数
    const date = duration.format('Y年M月D天') // 年月日
    const time = duration.format('H时m分s秒') // 时分秒

    return (type ? days + '天' : date) + time
}

// js label 语法
const breakFor = () => {
    out: for(let i = 0; i < 5; i++){
        for(let j = 0; j < 5; j++){
            if(j > i){
                break out // 退出外层循环
            }
        }
    }
}

const safe = () => {
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
// safe()
