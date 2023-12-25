function fetchRequest({url, method = 'POST', data, loading = false, loadingContent = '加载中...'}){
    let body = ''

    if(['get', 'GET', 'head', 'HEAD'].includes(method)){
        for(let key in data){
            body += `${key}=${data[key]}&`
        }
        if(body){
            url += '?' + body.slice(0, -1)
        }
        body = null
    }else{
        body = data
    }

    return fetch(url, {
        method,
        // credentials: 'include', // 每次都带上 cookies
        headers: {
            'Content-Type': 'application/json;charset: utf-8',
            'X-Requested-With': 'XMLHttpRequest', // 标明为异步请求
            'Accept': 'application/json;*/*;',
            'Cache-Control': 'no-cache'
        },
        mode: 'cors',
        body // get 或者head 提交的请求不能有body
    }).then(res => res.json())
}

export default fetchRequest
