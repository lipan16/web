import ResourceCom from '@/views/resources/resourceCom'
import {useTitle} from 'ahooks'
import React from 'react'

import {FINE_WEBSITE, FINE_TOOLS} from '@/constants'
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
