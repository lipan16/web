import React, {useCallback, useEffect} from 'react'
import {useSearchParams} from 'react-router-dom'
import {useTitle} from 'ahooks'
import {useSelector, useDispatch} from 'react-redux'
import {Image, Flex} from 'antd'

import {useThemeToken} from '@/hooks'
import {setToolSite} from '@/store/action'
import {FINE_TOOLS} from '@/constants'
import './index.less'

const Tools = () => {
    useTitle('共享资源 | 工具集')
    const token = useThemeToken()
    const dispatch = useDispatch()
    const [searchParams] = useSearchParams()

    useEffect(() => {
        const link = searchParams.get('link')
        link && dispatch(setToolSite({link}))

        return () => {
            link && dispatch(setToolSite({}))
        }
    }, [])

    const toolSite = useSelector(state => state.action.toolSite)

    const onClickSite = useCallback(site => {
        dispatch(setToolSite(site))
    }, [])

    return (
        <section className='resource tools'>
            <h1>工具集</h1>
            <Flex wrap='wrap' gap='middle'>
                {FINE_TOOLS.map(site =>
                    <div key={site.link} className='item' style={{background: token.colorBgContainer}} onClick={() => onClickSite(site)}>
                        <Image className='site-img' src={site.logo} preview={false} height={48} width={48}/>
                        <div className='title'>
                            <p>{site.title}</p>
                            <div>{site.desc || site.title}</div>
                        </div>
                    </div>
                )}
            </Flex>
            <iframe id='tools-iframe' src={toolSite?.link} className='tools-site' style={{borderColor: token.colorPrimary}}/>
        </section>
    )
}

export default Tools
