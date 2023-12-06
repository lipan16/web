import React, {useCallback, useState} from 'react'
import {Outlet, useNavigate} from 'react-router-dom'
import dayjs from 'dayjs'
import {useTitle, useInterval} from 'ahooks'
import {Button} from 'antd'

import {BPI_TIME} from '@/constants'
import {showTime} from '@/utils'
import './index.less'

const We = () => {
    useTitle('We')
    const navigate = useNavigate()

    const [bpiTime, setBpiTime] = useState('')

    useInterval(() => {
        const time = showTime(BPI_TIME)
        setBpiTime(time.replace(/(\d+)/g, `<strong class='time'>$1</strong>`))
    }, 1000, {immediate: true})

    const onClickBtn = useCallback((path) => {
        navigate(path)
    }, [])

    return (
        <section className='we' style={{backgroundImage: 'url(http://8.133.162.30/static/2735011818111.jpg)'}}>
            <div className='love-time'>
                <div className='title'>这是我们相爱的</div>
                <div dangerouslySetInnerHTML={{__html: '第' + bpiTime}}/>
            </div>
            <h2>来世界的1万天是：{dayjs('1998-12-17').add(10000, 'days').format('YYYY-MM-DD')}</h2>
            <h2>来世界的1万天是：{dayjs('1999-06-20').add(10000, 'days').format('YYYY-MM-DD')}</h2>
            <Button onClick={() => onClickBtn('lipan')}>lipan</Button>
            <Button onClick={() => onClickBtn('xiaobing')}>xiaobing</Button>
            <Outlet/>
        </section>
    )
}

export default We
