import React, {useCallback, useState} from 'react'
import {Outlet, useNavigate} from 'react-router-dom'
import {Button} from 'antd'
import {useTitle, useInterval} from 'ahooks'

import {BPI_TIME} from '@/constants'
import {showTime} from '@/utils'

const We = () => {
    useTitle('We')
    const navigate = useNavigate()

    const [bpiTime, setBpiTime] = useState(showTime(BPI_TIME))

    useInterval(() => {
        setBpiTime(showTime(BPI_TIME))
    }, 1000)

    const onClickBtn = useCallback((path) => {
        navigate(path)
    }, [])


    return (
        <section className='lipan'>
            <h1>We: {bpiTime}</h1>
            <Button onClick={() => onClickBtn('lipan')}>lipan</Button>
            <Button onClick={() => onClickBtn('xiaobing')}>xiaobing</Button>
            <Outlet/>
        </section>
    )
}

export default We
