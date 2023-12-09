import React from 'react'
import dayjs from 'dayjs'
import {useTitle} from 'ahooks'

const Lipan = () => {
    useTitle('Lipan')

    return (
        <section className='lipan'>
            <h2>你来世界的1万天是：{dayjs('1998-12-17').add(10000, 'days').format('YYYY-MM-DD')}</h2>
        </section>
    )
}

export default Lipan
