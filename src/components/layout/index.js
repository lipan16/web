import {useScroll, useDebounceFn, useUpdateEffect} from 'ahooks'
import React, {useState, useEffect} from 'react'
import {MenuOutlined} from '@ant-design/icons'
import {Layout, Menu, Affix, Image} from 'antd'
import {Outlet} from 'react-router-dom'


const {Header, Content, Footer} = Layout

import WebDevPng from '@/assets/imgs/webdev.png'
import './index.less'

const SelfLayout = () => {

    const MENU_LIST = [
        {key: '1', label: '首页', icon: null, path: '/'},
        {key: '0', label: '我们', icon: null, path: 'we'},
        {key: '2', label: '面试题', icon: null, path: 'interview'},
        {key: '3', label: '作品', icon: null, path: 'works'},
        {key: '4', label: '关于', icon: null, path: 'about'}
    ]
    const [hideHeader, setHideHeader] = useState(false)
    const scroll = useScroll()
    const {run} = useDebounceFn(() => {
        setHideHeader(scroll?.top > 100)
    }, {wait: 10})
    run()
    console.log('layout render', scroll)

    return (
        <Layout>
            <Header style={{padding: 0, background: 'transparent', borderBottom: '1px solid'}}>
                <Affix offsetTop={0.000000001}>
                    <div style={{display: 'flex', transform: hideHeader ? 'translate3d(0px, -100%, 0px)' : '', transition: '.3s'}}>
                        <div>
                            <Image height={40} src={WebDevPng} preview={false}/>
                            <span>拓荒者</span>
                        </div>
                        <Menu mode='horizontal' items={MENU_LIST}/>
                        <div>
                            <span>后台</span>
                            <span>Github</span>
                            <span>全屏</span>
                            <span>登录</span>
                        </div>
                    </div>
                </Affix>
                <div className='mobile-nav-btn' style={{transform: hideHeader ? 'translateY(-100%)' : ''}}>
                    <MenuOutlined/>
                </div>
            </Header>
            <Content style={{minHeight: 'calc(100vh - 156px)'}}>
                <Outlet/>
            </Content> <Content style={{minHeight: 'calc(100vh - 156px)'}}>
            <Outlet/>
        </Content>
            <Footer style={{textAlign: 'center'}}>
                <div>Copyright © 2018 - 2023 web. All Rights Reserved. 拓荒者 版权所有</div>
                <div><a href='./web-knowledge' target='_blank'>web knowledge</a> <span>当前版本1.0.0</span></div>
            </Footer>
        </Layout>
    )
}

export default SelfLayout
