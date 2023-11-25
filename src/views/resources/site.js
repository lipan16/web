import {useTitle} from 'ahooks'
import {Flex, Image} from 'antd'
import React from 'react'

import {FINE_WEBSITE} from '@/constants'
import './index.less'

const Site = () => {
    useTitle('共享资源 | 精品网站')

    return (
        <section className='resource site'>
            <h1>site</h1>
            {
                FINE_WEBSITE.map((m, index) =>
                    <div key={index} className='group'>
                        <h3>{m.title}</h3>
                        <Flex wrap='wrap' gap='middle'>
                            {m.site.map(site =>
                                <div key={site.link} className='item' onClick={() => window.open(site.link)}>
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
        </section>
    )
}

export default Site
