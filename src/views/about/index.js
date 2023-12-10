import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useTitle} from 'ahooks'
import {Divider, Collapse, Switch, Card, ColorPicker} from 'antd'
import {QqCircleFilled, GithubFilled} from '@ant-design/icons'

import {useThemeToken, useVisitTime} from '@/hooks'
import HelloWorld from '@/components/helloWorld'
import {setDarkTheme, setThemeToken} from '@/store/setting'
import './index.less'

const About = () => {
    const token = useThemeToken()
    const dispatch = useDispatch()
    const visitTime = useVisitTime() // 首次访问网站时间

    const ip = useSelector(state => state.user.ip)
    const colorPrimary = useSelector(state => state.setting.theme.token.colorPrimary)
    const dark = useSelector(state => state.setting.theme.dark)

    useTitle('关于')

    const onChangeThemeAlgorithm = bool => {
        dispatch(setDarkTheme(bool))
    }

    const onChangeColorPrimary = color => {
        dispatch(setThemeToken({key: 'colorPrimary', value: color.toHexString()}))
    }

    return (
        <section className='about'>
            <h1>关于</h1>
            <div className='content'>
                <Card className='about-card'>
                    <Divider orientation='left'>✒&nbsp;关于我</Divider>
                    <ul className='box'>
                        <li>一名默默无闻的前端研发工程师</li>
                        <li>
                            联系方式：
                            <a href='tencent://message/?uin=2254566040' target='_blank'><QqCircleFilled/></a>
                            &nbsp;&nbsp;
                            <a href='https://github.com/lipan16' target='_blank'><GithubFilled/></a>
                        </li>
                    </ul>
                    <Divider orientation='left'>⚙&nbsp;关于本站</Divider>
                    <ul className='box'>
                        <li>前端：webpack + React + react-router-dom + reduxjs/toolkit + Antd</li>
                        <li>后端：Node.js + MySql</li>
                    </ul>
                </Card>

                <div className='aside'>
                    <Collapse
                        className='setting'
                        defaultActiveKey={1}
                        expandIconPosition='end'
                        style={{boxShadow: `0 0 10px ${token.colorPrimary}69`}}
                        ghost
                        items={[{
                            key: '1',
                            label: '设置',
                            children:
                                <div className='setting-content'>
                                    <div className='item'>
                                        <span>暗色模式: </span>
                                        <Switch size='small' checked={dark} onChange={onChangeThemeAlgorithm}/>
                                    </div>
                                    <div className='item'>
                                        <span>主题色: </span>
                                        <ColorPicker size='small' value={colorPrimary} onChangeComplete={onChangeColorPrimary}/>
                                    </div>
                                    <div className='item'>
                                        <span>音乐播放器: </span>
                                        <Switch size='small'/>
                                    </div>
                                </div>
                        }]}
                    />
                    <Collapse
                        className='log'
                        style={{boxShadow: `0 0 4px ${token.colorPrimary}69`}}
                        defaultActiveKey={1}
                        expandIconPosition='end'
                        ghost
                        items={[{
                            key: '1',
                            label: '流量信息',
                            children:
                                <div className='log-content'>
                                    访问时间: <span className='time'>{visitTime}</span><br/>
                                    ip: <span className='ip' style={{color: token.colorPrimary}}>{ip}</span><br/>
                                    历史访问量: {1000}<br/>
                                    历史访客量: {1000}<br/>
                                    今日访问量: {10}<br/>
                                    今日访客量: {10}<br/>
                                </div>
                        }]}
                    />
                </div>
            </div>
            <HelloWorld pointColor={token.colorPrimary}/>
        </section>
    )
}

export default About
