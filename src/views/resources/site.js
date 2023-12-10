import {Flex, Image} from 'antd'
import React from 'react'
import {useTitle} from 'ahooks'

import {useThemeToken} from '@/hooks'
import {FINE_WEBSITE} from '@/constants'
import './index.less'

const Site = () => {
    useTitle('共享资源 | 精品网站')
    const token = useThemeToken()

    return (
        <section className='resource'>
            <h1>精品网站</h1>
            <div className='content'>
                {
                    FINE_WEBSITE.map((m, index) =>
                        <div key={index} className='resource-group'>
                            <h3>{m.title}</h3>
                            <Flex wrap='wrap' gap='1rem'>
                                {m.site?.map(site =>
                                    <div key={site.link} className='item' style={{background: token.colorBgContainer}} onClick={() => window.open(site.link)}>
                                        <Image className='site-img' src={site.logo} preview={false} height={48} width={48}/>
                                        <div className='title'>
                                            <p>{site.title}</p>
                                            <div>{site.desc || site.title}</div>
                                        </div>
                                    </div>
                                )}
                            </Flex>
                        </div>
                    )
                }
            </div>
        </section>
    )
}

export default Site
