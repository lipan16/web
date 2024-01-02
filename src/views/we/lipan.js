import React from 'react'
import dayjs from 'dayjs'
import {useTitle} from 'ahooks'

import {LIPAN_BIRTHDAY} from '@/constants'

const Lipan = () => {
    useTitle('Lipan')

    return (
        <section className='lipan'>
            <h2>来世界已经{Math.floor(dayjs.duration(dayjs().diff(LIPAN_BIRTHDAY)).asDays())}天</h2>
            <h2>你来世界的1万天是：{dayjs(LIPAN_BIRTHDAY).add(10000, 'days').format('YYYY-MM-DD')}</h2>
        </section>
    )
}

export default Lipan
