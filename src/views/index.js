import {isEmpty} from 'lodash'
import React, {useState, useEffect, useRef} from 'react'
import {useHover} from 'ahooks'
import {useDispatch, useSelector} from 'react-redux'
import {Image, Tag} from 'antd'
import {MailOutlined, TagsOutlined} from '@ant-design/icons'

const jinrishici = require('jinrishici')

import Battery from '@/components/battery'
import {useClientInfo, useThemeToken, useVisitTime} from '@/hooks'
import {randomColor} from '@/utils'
import {setIp, setVerse} from '@/store/user'
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
    const token = useThemeToken()
    const {clientName, clientVersion} = useClientInfo() // 客户端信息
    const visitTime = useVisitTime() // 首次访问网站时间

    const [imgSrc, setImgSrc] = useState([])
    const verse = useSelector(state => state.user.verse) // 诗词
    const avatarRef = useRef(null) // 头像
    const isHovering = useHover(avatarRef) // 头像是否hover

    useEffect(() => {
        let img = []
        for(let i = 0; i < 3; i++){
            img[i] = `http://8.133.162.30/static/${imgs[Math.floor(Math.random() * imgs.length)]}`
        }
        setImgSrc(img)
        if(isEmpty(verse)){
            jinrishici.load(result => {
                dispatch(setVerse(result))
                dispatch(setIp(result.ipAddress))
            })
        }
    }, [])

    console.log(12)
    return (
        <div className='index'>
            <div className='content'>
                {imgSrc.map((img, index) => <Image key={index} src={img} preview={false}/>)}
            </div>
            <div className='person'>
                <div className='card avatar'>
                    <img ref={avatarRef} className='avatar-img' alt='' style={{background: token.colorWhite}}
                         src={isHovering ? 'http://8.133.162.30/static/20181104.jpg' : 'http://8.133.162.30/favicon.ico'}/>
                    <div className='title'>拓荒者, 守护繁华</div>
                    <div className='profession'>前端开发</div>
                    <div className='addr' style={{color: token.colorPrimary}}>上海-浦东</div>
                    <a href='mailto:lipan16@lzu.edu.cn'><MailOutlined/>lipan16@lzu.edu.cn</a>
                    <div className='verse'>{verse?.data?.content}</div>
                </div>

                <div className='card your-info'>
                    <div className='battery'><span>电量:&nbsp;</span><Battery/></div>
                    ip: <span className='ip' style={{color: token.colorPrimary}}>{verse?.ipAddress}</span><br/>
                    浏览器: <span className='browser'>{clientName}-{clientVersion}</span><br/>
                    您在<span className='time'>{visitTime}</span>访问了本站
                </div>

                <div className='card' style={{color: token.colorPrimary}}>
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
