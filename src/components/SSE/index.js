// SSE是客户端请求服务器后，服务器每隔一段时间向客户端发送数据（是单向的）

import React, {useState} from 'react'

const SSE = () => {
    let sse
    const [sseData, setSSEData] = useState('')
    const sseOpen = () => {
        sse = new EventSource('/sse')
        sse.onmessage = res => {
            console.log(res.data)
            setSSEData(res.data)
        }
        sse.onerror = () => {
            sse.close()
        }
        sse.addEventListener('close', () => {
            sse.close()
        }, false)
    }

    return (
        <div>
            <div>{sseData}</div>
            <button onClick={sseOpen}>sse open</button>
        </div>
    )
}

export default SSE
