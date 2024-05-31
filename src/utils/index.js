import dayjs from 'dayjs'

// 判断系统平台 手机、ipad、pc
export const systemPlatform = () => {
    if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)){
        return 'mobile'
    }else if(/iPad/i.test(navigator.userAgent)){
        return 'iPad'
    }else{
        return 'pc'
    }
}

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

export const randomColor = () => '#' + Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, '0')

// 获取充电状态
export const getBattery = cb => {
    try{
        navigator.getBattery().then(battery => {
            cb({charging: battery.charging, level: battery.level * 100})

            battery.addEventListener('chargingchange', () => {
                cb({charging: battery.charging})
            })
            battery.addEventListener('levelchange', () => {
                cb({level: battery.level * 100})
            })
        })
    }catch(e){
        console.error('navigator.getBattery error: ', e.message)
    }
}

/**
 * 将歌词解析为数组
 * @param lrc
 * @returns {time: 时间, words: 歌词}
 */
export const parseLrc = lrc => {
    const parseTime = str => {
        const time = str.split(':')
        return time[0] * 60 + Number(time[1])
    }

    const lines = lrc.split('\n')
    return lines.map(line => {
        const parts = line.split(']')
        const time = parts[0].substring(1)

        return {time: parseTime(time), words: parts[1]}
    })
}

/**
 * 函数重载
 * 1. 同名函数可以订阅多次
 * 2. 参数数量或者类型不一样
 * @returns function {overload}
 */
export const createOverload = () => {
    const fnMap = new Map()

    function overload(...args){
        const key = args.map(it => typeof it).join(',')
        const fn = fnMap.get(key)
        if(!fn){
            throw new TypeError('没有找到对应的实现')
        }
        return fn.apply(this, args)
    }

    overload.addImpl = function(...args){
        const fn = args.pop()
        if(typeof fn !== 'function'){
            throw new Error('最后一个参数必须是函数！')
        }
        const key = args.join(',')
        fnMap.set(key, fn)
    }

    return overload
}

// const getUser = createOverload()
// const searchPage = (page, size = 10) => {console.log('number, number')}
// getUser.addImpl(() => {console.log('all')})
// getUser.addImpl('number', searchPage)
// getUser.addImpl('number', 'number', searchPage)
// getUser.addImpl('string', () => {console.log('string')})
// getUser()
// getUser(2)
// getUser(2, 10)
// getUser('2, 10')

const className = createOverload()
className.addImpl('object', obj => {
    return Object.keys(obj).filter(f => !!obj[f]).join(' ')
})

className.addImpl('', arr => {})
className({a: true, b: 'b', c: false, d: [], e: {}})
