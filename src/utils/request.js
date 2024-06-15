function createFetchWithTimeout(timeout = 5000){
    /**
     * 创建带超时的 fetch 函数
     * @param options url 请求地址
     * @param options object
     * @param options.timeout number 超时时间，默认 5000ms
     * @param options.method 'GET'|'POST' 请求方式
     * @param options.body object 请求体
     * @param options.headers object 请求头
     * @param options.signal AbortSignal 终止信号
     *
     * */
    return function(url, options = {}){
        return new Promise((resolve, reject) => {
            const controller = new AbortController() // 终止信号控制器
            if(options.signal){ // 配置里面存在终止信号
                const signal = options.signal
                signal.addEventListener('abort', () => {
                    controller.abort()
                })
            }
            options.signal = controller.signal

            fetch(url, {
                // credentials: 'include', // 每次都带上 cookies
                headers: {
                    'Content-Type': 'application/json;charset: UTF-8',
                    'X-Requested-With': 'XMLHttpRequest', // 标明为异步请求
                    'Accept': 'application/json;*/*;',
                    'Cache-Control': 'no-cache'
                },
                mode: 'cors',
                ...options,
            }).then(resolve, reject)

            setTimeout(() => {
                reject(new Error('请求超时'))
                controller.abort() // 终止请求
            }, timeout)
        })
    }
}

const fetchWithTimeout = createFetchWithTimeout(3000)

function fetchRequest({url, method = 'POST', data, loading = false, loadingContent = '加载中...', headers}){
    let body = ''

    if(['get', 'GET', 'head', 'HEAD'].includes(method)){
        for(let key in data){
            body += `${key}=${data[key]}&`
        }
        if(body){
            url += '?' + body.slice(0, -1)
        }
        body = null // get 或者 head 提交的请求不能有body
    }else{
        body = data
    }

    return fetchWithTimeout(url, {method, headers, body}).then(res => res.json())
}

/**
 * 并发请求
 * @param urls 请求地址数组
 * @param maxNum 最大并发数
 */
const fetchRequestMax = (urls, maxNum = 5) => {
    if(urls.length === 0) return Promise.resolve([])

    return new Promise(resolve => {
        const results = [] // 请求结果数组
        let count = 0 // 已完成的请求数
        let index = 0 // 当前请求的索引

        async function _fetchRequest(){
            const i = index
            const url = urls[i]
            index++
            try{
                results[i] = await fetchRequest({url})
            }catch(err){
                results[i] = err
            }finally{
                count++
                if(count === urls.length){
                    resolve(results)
                }
                if(index < urls.length){
                    _fetchRequest()
                }
            }
        }

        for(let i = 0; i < Math.min(urls.length, maxNum); i++){
            _fetchRequest()
        }
    })
}

/**
 * 请求重试
 * @param url 请求地址
 * @param retryNum 重试次数
 */
const fetchRequestRetry = (url, retryNum = 3) => {
    return fetchRequest({url}).catch(err =>retryNum <= 0 ? Promise.reject(err) : fetchRequestRetry(url, retryNum - 1))
}

export default fetchRequest
