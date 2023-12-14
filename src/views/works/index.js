import {useTitle} from 'ahooks'
import {Flex} from 'antd'
import React from 'react'

import './index.less'

const Works = () => {
    useTitle('作品')

    const workList = [
        {link: '/', bgImage: '/static/asi.png', title: '个人主页', desc: '记录个人日常'},
        {link: '/web-knowledge', bgImage: '/static/web_knowledge.png', title: 'web 前端知识', desc: '日常学习、面试的前端知识在线库'},
        {
            link: 'https://pvp.qq.com/web201605/wallpaper.shtml',
            bgImage: '/static/2735011818.jpg',
            title: '王者荣耀',
            desc: '王者荣耀游戏壁纸'
        }
    ]

    return (
        <section className='works'>
            <h1>作品</h1>
            <Flex wrap='wrap' gap='2.5rem' className='works-content'>
                {workList.map(work =>
                    <div
                        key={work.link}
                        className='works-item'
                        onClick={() => window.open(work.link)}
                        style={{backgroundImage: `url(${work.bgImage})`}}>

                        <div className='title'>{work.title}</div>
                        <div className='desc'>{work.desc || work.title}</div>
                    </div>
                )}
            </Flex>
        </section>
    )
}

export default Works
