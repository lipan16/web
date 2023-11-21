import {useScroll, useDebounceFn, useFullscreen} from 'ahooks'
import React, {useState, useEffect, Suspense, useRef, useCallback, useMemo} from 'react'
import {Outlet, useNavigate, useLocation} from 'react-router-dom'
import {
    createFromIconfontCN,
    MenuOutlined,
    HomeOutlined,
    UserOutlined,
    HeartOutlined,
    ShareAltOutlined,
    DesktopOutlined,
    GithubOutlined, FullscreenExitOutlined, FullscreenOutlined
} from '@ant-design/icons'
import {Layout, Menu, Affix, Input, Drawer} from 'antd'

const {Search} = Input
const {Header, Content, Footer} = Layout

import WebDevPng from '@/assets/imgs/webdev.png'
import './index.less'

const SelfLayout = () => {
    const navigate = useNavigate()
    const scroll = useScroll()
    const location = useLocation()
    const ref = useRef(null)

    const IconFont = createFromIconfontCN({
        scriptUrl: ['//at.alicdn.com/t/c/font_4338783_bwy2flb4gug.js']
    })

    const MENU_LIST = [
        {key: '/', label: '首页', icon: <HomeOutlined/>},
        {
            key: '/we', label: '我们', icon: <HeartOutlined/>, children: [
                {key: '/lipan', label: 'lipan', icon: null},
                {key: '/xiaobing', label: 'xiaobing', icon: null}
            ]
        },
        {key: '/interview', label: '面试题', icon: <IconFont type='icon--interview'/>},
        {key: '/works', label: '作品', icon: <IconFont type='icon-wodezuopin'/>},
        {key: '/resources', label: '共享资源', icon: <ShareAltOutlined/>},
        {key: '/about', label: '关于', icon: <UserOutlined/>}
    ]
    const [isFullscreen, {toggleFullscreen}] = useFullscreen(ref)

    const [hideHeader, setHideHeader] = useState(false)
    const [selectedKey, setSelectedKey] = useState('/')

    // 滚动时隐藏header
    const {run} = useDebounceFn(() => {
        setHideHeader(scroll?.top > 100)
    }, {wait: 10})
    run()

    const onClickMenu = useCallback(({key}) => {
        navigate(key)
    }, [])

    useEffect(() => {
        setSelectedKey(location.pathname)
    }, [location])

    const onSearch = useCallback((value, _e, info) => {
        console.log(value, _e, info)
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
        navigate(key)
    }, [])

    // console.log('layout render', scroll)

    return (
        <Layout ref={ref}>
            <Header style={{padding: 0, background: 'transparent'}}>
                <Affix offsetTop={0.000000001}>
                    <div className='header-content' style={{transform: hideHeader ? 'translate3d(0px, -100%, 0px)' : ''}}>
                        <div className='logo' onClick={() => navigate('/', {replace: true})}>
                            <img src={WebDevPng} alt=''/>
                            <span>拓荒者</span>
                        </div>
                        <Search placeholder='搜索' allowClear onSearch={onSearch} style={{maxWidth: 200}}/>
                        <div className='header-menu'><Menu mode='horizontal' items={MENU_LIST} selectedKeys={selectedKey} onClick={onClickMenu}/></div>
                        <div className='right'>
                            <div>
                                <a href='./admin' target='_blank'><DesktopOutlined/></a>
                            </div>
                            <div>
                                <a href='https://github.com/lipan16/web' target='_blank'><GithubOutlined/></a>
                            </div>
                            <div className='fullscreen' onClick={toggleFullscreen}>
                                {isFullscreen ? <FullscreenExitOutlined/> : <FullscreenOutlined/>}
                            </div>
                            <div className='login'>登录</div>
                        </div>
                    </div>
                </Affix>
                <div onClick={onClickDrawer} className='mobile-nav-btn' style={{transform: hideHeader ? 'translateY(-100%)' : ''}}>
                    <MenuOutlined/>
                </div>
                <Drawer width={170} closable={false} onClose={() => setOpenDrawer(false)} open={openDrawer} placement='left'>
                    <div className='logo' onClick={() => navigate('/', {replace: true})}>
                        <img src={WebDevPng} alt=''/>
                        <span>拓荒者</span>
                    </div>
                    <Menu mode='inline' defaultOpenKeys={drawerMenuOpenKeys} items={MENU_LIST} inlineCollapsed={false} inlineIndent='16'
                          onClick={onClickDrawerMenu}/>
                </Drawer>
            </Header>
            <Content style={{minHeight: 'calc(100vh - 156px)'}}>
                <Suspense><Outlet/></Suspense>
            </Content>
            <Content style={{minHeight: 'calc(100vh - 156px)'}}>
                <Suspense><Outlet/></Suspense>
            </Content>
            <Footer style={{textAlign: 'center'}}>
                <div>Copyright © 2018 - 2023 web. All Rights Reserved. 拓荒者 版权所有</div>
                <div><a href='./web-knowledge' target='_blank'>web knowledge</a> <span>当前版本1.0.0</span></div>
            </Footer>
        </Layout>
    )
}

export default SelfLayout
