import dayjs from 'dayjs'
import React, {useCallback, useState} from 'react'
import {Outlet, useNavigate} from 'react-router-dom'
import {Button} from 'antd'
import {useTitle, useInterval} from 'ahooks'

import {BPI_TIME} from '@/constants'
import {showTime} from '@/utils'

const We = () => {
    useTitle('We')
    const navigate = useNavigate()

    const [bpiTime, setBpiTime] = useState('')

    useInterval(() => {
        setBpiTime(showTime(BPI_TIME))
    }, 1000, {immediate: true})

    const onClickBtn = useCallback((path) => {
        navigate(path)
    }, [])


    return (
        <section className='lipan'>
            <h1>We: {bpiTime}</h1>
            <h2>来世界的1万天是：{dayjs('1998-12-17').add(10000, 'days').format('YYYY-MM-DD')}</h2>
            <h2>来世界的1万天是：{dayjs('1999-06-20').add(10000, 'days').format('YYYY-MM-DD')}</h2>
            <Button onClick={() => onClickBtn('lipan')}>lipan</Button>
            <Button onClick={() => onClickBtn('xiaobing')}>xiaobing</Button>
            <Outlet/>
        </section>
    )
}

export default We
