import {useInterval} from 'ahooks'
import {Button} from 'antd'
import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'

import {showTime} from '@/utils'

const Index = () => {
    const navigate = useNavigate()

    const [bpiTime, setBpiTime] = useState('')
    useInterval(() => {
        setBpiTime(showTime('2018-11-04 18:36:00'))
    }, 1000)

    return (
        <div style={{textAlign: 'center'}}>
            <Button type="primary" onClick={() => navigate('/about')}>about</Button>
            <h1>Hello World!</h1>

            <div>{bpiTime}</div>
        </div>
    )
}
export default Index
