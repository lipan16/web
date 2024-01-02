import React from 'react'
import dayjs from 'dayjs'
import {useTitle} from 'ahooks'

import {XIAOBING_BIRTHDAY} from '@/constants'

const Xiaobing = () => {
    useTitle('Xiaobing')

    return (
        <section className='xiaobing'>
            <h2>来世界已经{Math.floor(dayjs.duration(dayjs().diff(XIAOBING_BIRTHDAY)).asDays())}天</h2>
            <h2>你来世界的1万天是：{dayjs(XIAOBING_BIRTHDAY).add(10000, 'days').format('YYYY-MM-DD')}</h2>
        </section>
    )
}

export default Xiaobing
