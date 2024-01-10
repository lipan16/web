function createFetchWithTimeout(timeout = 5000){
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

export default fetchRequest
