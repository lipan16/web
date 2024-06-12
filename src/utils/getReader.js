/**
 * 流式获取web服务器返回内容
 * @param url
 * @returns {Promise<void>}
 */
const getReader = async (url) => {
    const resp = await fetch(url, {
        'Content-Type': 'application/json'
    })
    const reader = resp.body.getReader()
    const decoder = new TextDecoder('utf-8')
    while(true){
        const {done, value} = await reader.read()
        if(done) break
        const txt = decoder.decode(value)
        console.log(txt)
    }
    console.log('Done')
}
