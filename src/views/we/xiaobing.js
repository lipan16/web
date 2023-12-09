import React from 'react'
import dayjs from 'dayjs'
import {useTitle} from 'ahooks'

const Xiaobing = () => {
    useTitle('Xiaobing')

    return (
        <section className='xiaobing'>
            <h2>你来世界的1万天是：{dayjs('1999-06-20').add(10000, 'days').format('YYYY-MM-DD')}</h2>
        </section>
    )
}

export default Xiaobing
