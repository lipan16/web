import {useTitle} from 'ahooks'
import React from 'react'

import ResourceCom from '@/views/resources/resourceCom'
import {FINE_TOOLS} from '@/constants'
import './index.less'

const Tools = () => {
    useTitle('共享资源 | 工具集')

    return (
        <section className='resource tools'>
            <h1>工具集</h1>
            <ResourceCom list={FINE_TOOLS}/>
        </section>
    )
}

export default Tools
