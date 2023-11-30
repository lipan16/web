import React, {useEffect, useMemo} from 'react'
import {useSelector} from 'react-redux'
import {useTitle} from 'ahooks'
import {Divider, Collapse, Switch} from 'antd'
import {QqCircleFilled, GithubFilled} from '@ant-design/icons'

import HelloWorld from '@/components/helloWorld'
import fetchRequest from '@/utils/request'
import './index.less'

const About = () => {
    const ip = useSelector(state => state.user.ip)

    useTitle('关于')
    useEffect(() => {
        // fetchRequest({url: '/api/login', method: 'GET', data: {username: 'lipan'}}).then(r => {
        //     console.log(r)
        // })
    }, [])

    const visitTime = useMemo(() => {
        return localStorage.getItem('USER_VISIT_TIME')
    }, [])

    return (
        <section className='about'>
            <h1>关于</h1>
            <div className='main'>
                <div className='content'>
                    <div className='me'>
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
                    </div>
                    <div className='site'>
                        <Divider orientation='left'>⚙&nbsp;关于本站</Divider>
                        <ul className='box'>
                            <li>前端：webpack + React + react-router-dom + reduxjs/toolkit + Antd</li>
                            <li>后端：Node.js + MySql</li>
                        </ul>
                    </div>
                </div>

                <div className='aside'>
                    <Collapse
                        className='setting'
                        defaultActiveKey={1}
                        expandIconPosition='end'
                        ghost
                        items={[{
                            key: '1',
                            label: '设置',
                            children:
                                <div className='setting-content'>
                                    <div className='item'>
                                        <span>暗色主题: </span>
                                        <Switch checkedChildren='开启' unCheckedChildren='关闭' size='small'/>
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
                        defaultActiveKey={1}
                        expandIconPosition='end'
                        ghost
                        items={[{
                            key: '1',
                            label: '流量信息',
                            children:
                                <div className='log-content'>
                                    访问时间: <span className='time'>{visitTime}</span><br/>
                                    ip: <span className='ip'>{ip}</span><br/>
                                    历史访问量: {1000}<br/>
                                    历史访客量: {1000}<br/>
                                    今日访问量: {10}<br/>
                                    今日访客量: {10}<br/>
                                </div>
                        }]}
                    />
                </div>
            </div>
            <HelloWorld/>
            <div>游戏</div>
        </section>
    )
}

export default About
