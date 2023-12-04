import React from 'react'
import {useTitle} from 'ahooks'

import ResourceCom from '@/views/resources/resourceCom'
import {FINE_WEBSITE} from '@/constants'
import './index.less'

const Site = () => {
    useTitle('共享资源 | 精品网站')

    return (
        <section className='resource site'>
            <h1>site</h1>
            <ResourceCom list={FINE_WEBSITE}/>
        </section>
    )
}

export default Site
