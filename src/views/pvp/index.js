import fetchRequestRetry from '@/utils/request'
import React, {useEffect, useState} from 'react'
import {useTitle} from 'ahooks'
import {Flex, Row, Col, Grid} from 'antd'

import './index.less'

const Pvp = () => {
    useTitle('王者荣耀')
    const [hero, setHero] = useState([])

    useEffect(() => {
        fetchRequestRetry({url: '/api/hero', method: 'GET'}).then(res => {
            console.log(res)
            setHero(res)
        })
    }, [])
    console.log('pvp')

    // https://game.gtimg.cn/images/yxzj/img201606/heroimg/118/118-smallskin-7.jpg
    // https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/118/118-bigskin-2.jpg
    // https://game.gtimg.cn/images/yxzj/img201606/heroimg/118/118.jpg

    // https://shp.qpic.cn/ishow/2735053118/1717152191_829394697_34252_sProdImgNo_8.jpg/0 1920x1440
    // https://shp.qpic.cn/ishow/2735053118/1717152190_829394697_34252_sProdImgNo_7.jpg/0 1920x1200
    //
    // https://shp.qpic.cn/ishow/2735022115/1708501878_829394697_31112_sProdImgNo_2.jpg/0 1024 768 2-8
    // https://shp.qpic.cn/ishow/2735022115/1708501886_829394697_31112_sProdImgNo_8.jpg/0 1920 1440
    // {
    //     cname:'廉颇'
    //     ename:105
    //     hero_type:3
    //     id_name:'lianpo'
    //     moss_id:3627
    //     new_type:0
    //     skin_name:'正义爆轰|地狱岩魂|无尽征程|寅虎·御盾|功夫炙烤'
    //     title:'正义爆轰'
    // }

    return (
        <section className='pvp'>
            <h1>王者荣耀 grid布局</h1>
            <div wrap='wrap' gap='2.5rem' className='pvp-content'>
                {hero.map(h =>
                    <div key={h.moss_id} className='pvp-item'
                         style={{backgroundImage: `url(https://game.gtimg.cn/images/yxzj/img201606/heroimg/${h.ename}/${h.ename}.jpg)`}}>
                        <div className='title'>{h.cname}</div>
                        <div className='desc'>{h.title}</div>
                    </div>
                )}
            </div>
        </section>
    )
}

export default Pvp
