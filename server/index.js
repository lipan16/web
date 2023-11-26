const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()
// 解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))
// 解析 application/json
app.use(bodyParser.json())
app.set('trust proxy', true)
// 全局配置
app.all('*', (req, res, next) => {
    res.header({
        'Access-Control-Allow-Origin': '*', // 允许跨域访问
        'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type,Authorization',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Content-Type': 'application/json;charset=utf-8',
        'server': 'nginx'
    })
    if(req.method === 'OPTIONS'){ // 让options请求快速返回
        res.sendStatus(200)
    }else{
        next()
    }
})
//配置任何请求都转到index.html，而index.html会根据React-Router规则去匹配任何一个route
// app.get('*', function (request, response){
//     response.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
// })
function getClientIp(req) {
    const referer = req.get('referer')
    if(referer){
        const url = new URL(referer)
        return url.hostname
    }
    return
}

app.get('/sse', (req, res) => {
    console.log('/sse 服务器每隔一段时间向客户端发送数据')

    res.header({
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
        'X-Accel-Buffering': 'no'
    })
    const interval = setInterval(() => {
        res.write('data:' + new Date() + '\n\n')
    }, 1000)

    setTimeout(() => {
        clearInterval(interval)
        res.write('data: EventSource close!!!\n\n')
        res.write('event: EventSource close!!!\n')
    }, 5000)
})

app.get('/api/name/:id', (req, res) => {
    console.log('/api/:id 接受的参数：', req.params.id)
    res.send(JSON.stringify({
        flag: 200,
        info: {
            name: 'xiaobing',
            pwd: '520',
            verify: true
        }
    }))
})

app.get('/api/login', (req, res) => {
    const ip = getClientIp(req)
    console.log('/api/login 接受到的参数：', req.query, req.headers, req.get('referer'), req.ips, ip)
    res.send(JSON.stringify({
        flag: 200,
        info: {
            name: 'xiaobing',
            pwd: '520',
            verify: true
        }
    }))
})

app.get('/api/badge', (req, res) => {
    console.log('/api/login 接受到的参数：', req.query)
    res.send(JSON.stringify({
        flag: 200,
        info: {
            badge: '5'
        }
    }))
})

app.post('/api/post', (req, res) => {
    console.log('/api/post 接受到的参数：', req.body)

    res.send(JSON.stringify({
        flag: 200,
        info: {
            name: 'xiaobing',
            pwd: '520',
            verify: true
        }
    }))
})

let bigList = []

// create 100,000 records
for (let i = 0; i < 100_000; i++) {
    bigList.push({
        text: `hello world ${i}`,
        tid: i
    })
}

app.get('/api/bigList', (req, res) => {
    console.log('/api/login 接受到的参数：', req.query)
    res.send(JSON.stringify({
        flag: 200,
        info: {bigList}
    }))
})

app.listen(3000, () => {
    console.log('app listen 3000 port')
})
