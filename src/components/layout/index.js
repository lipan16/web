import React, {useState, useEffect, Suspense, useRef, useCallback, useMemo} from 'react'
import {Outlet, useNavigate, useLocation} from 'react-router-dom'
import {useScroll, useDebounceFn, useFullscreen, useInterval} from 'ahooks'
import dayjs from 'dayjs'
import {Layout, Menu, Affix, Input, Drawer, FloatButton, Spin} from 'antd'
import {
    MenuOutlined, HomeOutlined, UserOutlined, HeartOutlined, ShareAltOutlined, DesktopOutlined, GithubOutlined,
    FullscreenExitOutlined, FullscreenOutlined
} from '@ant-design/icons'

const {Search} = Input
const {Header, Content, Footer} = Layout

import {WEBSITE_TIME} from '@/constants'
import {useThemeToken} from '@/hooks'
import {showTime} from '@/utils'
import IconFont from '@/components/aliIcon'
import WebDevPng from '@/assets/imgs/webdev.png'
import pkg from '@/../package.json'
import './index.less'

const MENU_LIST = [
    {key: '/', label: '首页', icon: <HomeOutlined/>},
    {key: '/we', label: '我们', icon: <HeartOutlined/>},
    {key: '/interview', label: '面试题', icon: <IconFont type='icon--interview'/>},
    {key: '/works', label: '作品', icon: <IconFont type='icon-wodezuopin'/>},
    {
        key: '', label: '共享资源', icon: <ShareAltOutlined/>, children: [
            {key: '/site', label: '精品网站', icon: null},
            {key: '/tools', label: '工具集', icon: null}
        ]
    },
    {key: '/about', label: '关于', icon: <UserOutlined/>}
]

const SelfFooter = () => {
    const [websiteTime, setWebsiteTime] = useState('')

    useInterval(() => {
        setWebsiteTime(showTime(WEBSITE_TIME))
    }, 1000, {immediate: true})

    return (
        <Footer className='footer'>
            <div>本站点已运行：<a>{websiteTime}</a></div>
            <div className='design'>
                Powered by&nbsp;
                <a href='https://zh-hans.react.dev' target='_blank'>React</a>+
                <a href='https://nodejs.org' target='_blank'>Node</a>+
                <a href='https://ant-design.antgroup.com/index-cn' target='_blank'>Antd</a>
                &nbsp;当前版本{pkg.version}
            </div>
            <div className='copyright'>
                Copyright © {dayjs().format('2018-YYYY')} {pkg.name}.
                All Rights Reserved. <a href='./about'>{pkg.nickname}</a> 版权所有
            </div>
        </Footer>
    )
}

const SelfLayout = () => {
    const navigate = useNavigate()
    const scroll = useScroll()
    const location = useLocation()
    const token = useThemeToken()

    const fullscreenRef = useRef(null)
    const [isFullscreen, {toggleFullscreen}] = useFullscreen(fullscreenRef)

    const [hideHeader, setHideHeader] = useState(false)
    const [selectedKey, setSelectedKey] = useState('/')

    useEffect(() => {
        setSelectedKey(location.pathname)
    }, [location])

    // 滚动时隐藏header
    const {run} = useDebounceFn(() => {
        setHideHeader(scroll?.top > 100)
    }, {wait: 20})
    run()

    const onClickMenu = useCallback(({key}) => {
        navigate(key, {replace: true})
    }, [])

    const onSearch = useCallback((value, _e, info) => {
        console.log('onSearch', value, _e, info)
    }, [])

    const [openDrawer, setOpenDrawer] = useState(false)

    const onClickDrawer = useCallback(() => {
        setOpenDrawer(!openDrawer)
    }, [openDrawer])

    const drawerMenuOpenKeys = useMemo(() => {
        return MENU_LIST.filter(f => f.children).map(m => m.key)
    }, [MENU_LIST])

    const onClickDrawerMenu = useCallback(({key}) => {
        setOpenDrawer(false)
        navigate(key, {replace: true})
    }, [])

    const onClickLogo = useCallback(() => {
        setOpenDrawer(false)
        navigate('/', {replace: true})
    }, [])

    // console.log('layout render', scroll)

    return (
        <Layout ref={fullscreenRef}>
            <Header style={{padding: 0, background: 'transparent'}}>
                <Affix offsetTop={0.000000001}>
                    <div className='header-content' style={{transform: hideHeader ? 'translate3d(0, -100%, 0)' : ''}}>
                        <div className='logo' onClick={onClickLogo}>
                            <img src={WebDevPng} alt=''/>
                            <span>{pkg.nickname}</span>
                        </div>
                        <Search placeholder='搜索' allowClear onSearch={onSearch} style={{maxWidth: '16rem', margin: '0 .5rem'}}/>
                        <div className='header-menu'>
                            <Menu mode='horizontal' items={MENU_LIST} selectedKeys={selectedKey} onClick={onClickMenu}/>
                        </div>
                        <div className='right'>
                            <div><a href='./admin' target='_blank'><DesktopOutlined/></a></div>
                            <div><a href='https://github.com/lipan16/web' target='_blank'><GithubOutlined/></a></div>
                            <div className='fullscreen' onClick={toggleFullscreen}>
                                <a>{isFullscreen ? <FullscreenExitOutlined/> : <FullscreenOutlined/>}</a>
                            </div>
                            <div className='login'><a>登录</a></div>
                        </div>
                    </div>
                </Affix>
                <div onClick={onClickDrawer} className='mobile-nav-btn' style={{transform: hideHeader ? 'translateY(-100%)' : ''}}>
                    <MenuOutlined/>
                </div>
                <Drawer getContainer={false} width='16rem' closable={false} open={openDrawer} placement='left'
                        onClose={() => setOpenDrawer(false)}>
                    <div className='logo' onClick={onClickLogo}>
                        <img src={WebDevPng} alt=''/>
                        <span>{pkg.nickname}</span>
                    </div>
                    <Menu mode='inline' defaultOpenKeys={drawerMenuOpenKeys} items={MENU_LIST} inlineCollapsed={false} inlineIndent='16'
                          onClick={onClickDrawerMenu}/>
                </Drawer>
            </Header>
            <Content style={{minHeight: 'calc(100vh - 10rem)', color: token.colorText}}>
                <Suspense fallback={<Spin size='large' fullscreen/>}><Outlet/></Suspense>
            </Content>
            <SelfFooter/>
            <FloatButton.BackTop visibilityHeight={300}/>
        </Layout>
    )
}

export default SelfLayout
