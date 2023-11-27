import React, {useLayoutEffect} from 'react'

/**
 * 同域名下多个标签页间广播信息
 * @returns {JSX.Element}
 * @constructor
 */
const BroadcastChannelCard = () => {
    useLayoutEffect(() => {
        const card = document.querySelector('.img-card')

        const barHeight = () => { // 浏览器导航栏高度
            return window.outerHeight - window.innerHeight
        }

        const clientToScreen = (clientX, clientY) => { // 视口位置 => 屏幕位置
            const screenX = clientX + window.screenX
            const screenY = clientY + window.screenY + barHeight()
            return [screenX, screenY]
        }
        const screenToClient = (screenX, screenY) => { // 屏幕位置 => 视口位置
            const clientX = screenX - window.screenX
            const clientY = screenY - window.screenY - barHeight()
            return [clientX, clientY]
        }
        // 创建频道
        const channel = new BroadcastChannel('card')
        // 同频道的发送广播
        channel.onmessage = (e) => {
            const clientPoints = screenToClient(...e.data)
            card.style.left = clientPoints[0] + 'px'
            card.style.top = clientPoints[1] + 'px'
        }

        card.onmousedown = (e) => { // 拖拽
            let x = e.pageX - card.offsetLeft
            let y = e.pageY - card.offsetTop
            window.onmousemove = e => {
                const cx = e.pageX - x
                const cy = e.pageY - y
                card.style.left = cx + 'px'
                card.style.top = cy + 'px'
                const screenPoints = clientToScreen(cx, cy)
                channel.postMessage(screenPoints)
            }
            window.onmouseup = () => {
                window.onmousemove = null
                window.onmouseup = null
            }
        }
    }, [])

    return (
        <img src='http://8.133.162.30/static/asi.png' draggable='false' className='img-card' alt=''
             style={{width: 200, position: 'absolute'}}/>
    )
}

export default BroadcastChannelCard
