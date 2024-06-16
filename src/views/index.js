import React, {useEffect, useRef, useCallback} from 'react'
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {useHover, useTitle} from 'ahooks'
import {Tag} from 'antd'
import {MailOutlined, TagsOutlined} from '@ant-design/icons'

import TimeCapsule from '@/components/timeCapsule'
import Battery from '@/components/battery'
import {BASE_URL} from '@/constants'
import {useClientInfo, useThemeToken, useVisitTime} from '@/hooks'
import {randomColor} from '@/utils'
import './index.less'

const imgs = [
    '1597550702059.jpg', '1597551240750.jpg', '2735011818.jpg', '1597550850648.jpg', '1597551250418.jpg',
    '2735052109.jpg', '1597550857008.jpg', '1597551257997.jpg', '2735080516.jpg', '1597550925381.jpg',
    '1698638136.jpg', '   2735103011.jpg', '1597550949010.jpg', '2735011818111.jpg', '2735110309.jpg',
    '1597551149762.jpg', '2735011818112.jpg', '2735110817.jpg', '1597551212238.jpg',
    // '2735011818121.jpg'
]
const tags = [
    'web', 'javascript', 'css', 'webpack', 'react', 'react router', 'redux', 'ahooks', 'antd', 'babel', 'less', 'svg',
    'git', 'nginx'
]

const Index = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const token = useThemeToken()
    const {clientName, clientVersion} = useClientInfo() // 客户端信息
    const visitTime = useVisitTime() // 首次访问网站时间
    useTitle('lipan | 个人主页')

    const {verse, plat, geolocation, weather} = useSelector(state => state.user)
    const avatarRef = useRef(null) // 头像
    const isHovering = useHover(avatarRef) // 头像是否hover

    useEffect(() => {
        let img = []
        for(let i = 0; i < 3; i++){
            img[i] = `${BASE_URL}/static/${imgs[Math.floor(Math.random() * imgs.length)]}`
        }
    }, [])

    const onClickWeather = useCallback((link) => {
        navigate(`/tools?link=${link}`, {replace: true})
    }, [])

    return (
        <div className='index'>
            <div className='content'>
                <TimeCapsule/>
            </div>
            <div className='person'>
                <div className='card avatar'>
                    <img ref={avatarRef} className='avatar-img' alt='' style={{background: token.colorWhite}}
                         src={isHovering ? `${BASE_URL}/static/20181104.jpg` : `${BASE_URL}/favicon.ico`}/>
                    <div className='title'>拓荒者, 守护繁华</div>
                    <div style={{color: token.colorPrimary}}>前端开发</div>
                    <div className='addr' style={{color: token.colorLink}}>上海-浦东</div>
                    <a href='mailto:lipan16@lzu.edu.cn'><MailOutlined/>lipan16@lzu.edu.cn</a>
                    <div className='verse'>{verse?.data?.content}</div>
                </div>

                <div className='card your-info'>
                    <div className='battery'><span>电量:&nbsp;</span><Battery/></div>
                    os: <span>{plat}</span><br/>
                    ip: <span className='ip' style={{color: token.colorPrimary}}>{verse?.ipAddress}</span><br/>
                    城市: <span>{geolocation?.city}</span><br/>
                    天气: <span>{weather?.text}{weather?.temp}<span className='weather'>℃</span>{weather?.windDirection}风{weather?.windPower}级</span><br/>
                    浏览器: <span style={{color: token.colorLink}}>{clientName}-{clientVersion}</span><br/>
                    您在<span style={{color: token.colorLink}}>{visitTime}</span>访问了本站
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
