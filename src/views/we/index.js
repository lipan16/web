import {useThemeToken} from '@/hooks'
import React, {useCallback, useState, useEffect} from 'react'
import {Outlet, useNavigate, useLocation, useMatches, useNavigation, useMatch} from 'react-router-dom'
import {useTitle, useInterval} from 'ahooks'
import {Button} from 'antd'

import {BPI_TIME} from '@/constants'
import {showTime} from '@/utils'
import './index.less'

const WE = [
    {name: 'lipan', realName: '李攀', birthday: ''},
    {name: 'xiaobing', realName: '肖冰', birthday: ''}
]

const We = () => {
    const token = useThemeToken()
    const navigate = useNavigate()
    const location = useLocation()
    useTitle('我们')

    const [bpiTime, setBpiTime] = useState('')
    const [activeBtn, setActiveBtn] = useState('')

    useEffect(() => {
        const pathname = location.pathname
        WE.map(m => {
            if(pathname.endsWith(m.name)){
                setActiveBtn(m.name)
            }
        })
        console.log(location)
    }, [location])

    useInterval(() => {
        const time = showTime(BPI_TIME)
        setBpiTime(time.replace(/(\d+)/g, `<strong class='time'>$1</strong>`))
    }, 1000, {immediate: true})

    const onClickBtn = useCallback((path) => {
        navigate(path)
    }, [])

    return (
        // <section className='we' style={{backgroundImage: 'url(http://8.133.162.30/static/2735011818111.jpg)'}}>
        <section className='we'>
            <div className='love-time'>
                <div className='title'>这是我们在一起的</div>
                <div dangerouslySetInnerHTML={{__html: '第' + bpiTime}}/>
            </div>
            <div className='content'>
                <div className='btn'>
                    {WE.map(m =>
                        <Button key={m.name} style={activeBtn === m.name ? {color: token.colorPrimary, borderColor: token.colorPrimary} : {}}
                                onClick={() => onClickBtn(m.name)}>{m.name}</Button>
                    )}
                </div>
                <Outlet/>
            </div>
        </section>
    )
}

export default We
