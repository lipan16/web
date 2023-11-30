import React, {useState, useEffect, useRef, useMemo} from 'react'
import {useHover} from 'ahooks'
import {useDispatch} from 'react-redux'
import {Image, Tag} from 'antd'
import {MailOutlined, TagsOutlined} from '@ant-design/icons'
const jinrishici = require('jinrishici')

import {randomColor} from '@/utils'
import {setIp} from '@/store/user'
import './index.less'

const imgs = [
    '1597550702059.jpg', '1597551240750.jpg', '2735011818.jpg', '1597550850648.jpg', '1597551250418.jpg',
    '2735052109.jpg', '1597550857008.jpg', '1597551257997.jpg', '2735080516.jpg', '1597550925381.jpg',
    '1698638136.jpg', '   2735103011.jpg', '1597550949010.jpg', '2735011818111.jpg', '2735110309.jpg',
    '1597551149762.jpg', '2735011818112.jpg', '2735110817.jpg', '1597551212238.jpg', '2735011818121.jpg'
]
const tags = [
    'web', 'javascript', 'css', 'webpack', 'react', 'react router', 'redux', 'ahooks', 'antd', 'babel', 'less', 'svg',
    'git', 'nginx'
]

const Index = () => {
    const dispatch = useDispatch()

    const avatarRef = useRef(null) // 头像
    const [imgSrc, setImgSrc] = useState([])
    const [verse, setVerse] = useState(null) // 诗词
    const isHovering = useHover(avatarRef) // 头像是否hover

    const {name, version} = useMemo(() => {
        const ua = window.navigator.userAgent.toLowerCase()
        let b, name, version

        if((b = ua.match(/chrome\/([\d.]+)/))){
            name = 'chrome'
            version = b[1]
        }else if((b = ua.match(/edge\/([\d.]+)/))){
            name = 'edge'
            version = b[1]
        }else if((b = ua.match(/firefox\/([\d.]+)/))){
            name = 'firefox'
            version = b[1]
        }else if((b = ua.match(/opera.([\d.]+)/))){
            name = 'opera'
            version = b[1]
        }else if((b = ua.match(/version\/([\d.]+).*safari/))){
            name = 'safari'
            version = b[1]
        }else{
            name = 'Unknown'
        }
        version = version ? parseFloat(version) : ''

        return {name, version}
    }, [])

    useEffect(() => {
        let img = []
        for(let i = 0; i < 3; i++){
            img[i] = `http://8.133.162.30/static/${imgs[Math.floor(Math.random() * imgs.length)]}`
        }
        setImgSrc(img)
        jinrishici.load(result => {
            setVerse(result)
            dispatch(setIp(result.ipAddress))
        })
    }, [])

    const visitTime = useMemo(() => {
        return localStorage.getItem('USER_VISIT_TIME')
    }, [])

    return (
        <div className='index'>
            <div className='content'>
                {imgSrc.map((img, index) => <Image key={index} src={img} preview={false}/>)}
            </div>
            <div className='person'>
                <div className='card avatar'>
                    <img ref={avatarRef} className='avatar-img' alt=''
                         src={isHovering ? 'http://8.133.162.30/static/20181104.jpg' : 'http://8.133.162.30/favicon.ico'}/>
                    <div className='title'>拓荒者, 守护繁华</div>
                    <div className='profession'>前端开发</div>
                    <div className='addr'>上海-浦东</div>
                    <a href='mailto:lipan16@lzu.edu.cn'><MailOutlined/>lipan16@lzu.edu.cn</a>
                    <div className='verse'>{verse?.data.content}</div>
                </div>

                <div className='card your-info'>
                    ip: <span className='ip'>{verse?.ipAddress}</span><br/>
                    浏览器: <span className='browser'>{name}-{version}</span><br/>
                    您在<span className='time'>{visitTime}</span>访问了本站
                </div>

                <div className='card'>
                    <div className='tag'>标签<TagsOutlined/></div>
                    <div>
                        {tags.map(tag => <Tag key={tag} bordered={false} color={randomColor()} style={{margin: '2px'}}>{tag}</Tag>)}
                    </div>
                </div>
            </div>
            {/*<BroadcastChannelCard/>*/}
        </div>
    )
}
export default Index
