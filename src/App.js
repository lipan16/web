import AMapLoader from '@amap/amap-jsapi-loader'
import React, {useMemo, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {ConfigProvider, theme} from 'antd'
import {StyleProvider, px2remTransformer} from '@ant-design/cssinjs'

window._AMapSecurityConfig = {
    securityJsCode: '18e4297a6b5ad414c0e09e78ee2985d2'
}
// window.forceWebGL = true
const jinrishici = require('jinrishici')

import SelfLayout from '@/components/layout'
import {useThemeToken} from '@/hooks'
import {setIp, setVerse, setPlat, setLocation} from '@/store/user'
import '@/utils/event'
import '@/global.less'
import '@/antd.less'

const px2rem = px2remTransformer({
    rootValue: 16 // 根元素字体大小 rootValue px = 1rem
})

const App = () => {
    const tokenTheme = useThemeToken()
    const dispatch = useDispatch()
    let map

    const themeStore = useSelector(state => state.setting.theme)

    const themeProvider = useMemo(() => {
        return {
            token: {
                ...themeStore.token,
                colorLinkHover: `${themeStore.token.colorPrimary} !important`
            },
            algorithm: themeStore.dark ? theme.darkAlgorithm : theme.defaultAlgorithm,
            components: {
                Menu: {
                    itemBg: 'transparent',
                    itemHoverColor: themeStore.token.colorPrimary,
                    itemSelectedColor: themeStore.token.colorPrimary,
                    activeBarBorderWidth: 0,
                    activeBarHeight: 0,
                    itemPaddingInline: 12,
                    iconMarginInlineEnd: 8
                },
                FloatButton: {
                    colorBgElevated: themeStore.token.colorPrimary,
                    colorText: tokenTheme.colorWhite
                }
            }
        }
    }, [themeStore])

    useEffect(() => {
        jinrishici.load(result => {
            dispatch(setVerse(result))
            dispatch(setIp(result.ipAddress))
        }, err => {
            console.error('jinrishici ERROR: ', err.message)
        })

        AMapLoader.load({
            'key': '642ff9aa4d944c6e0ecd42b85b5ef1ff', // 申请好的Web端开发者Key，首次调用 load 时必填
            'version': '2.0'
        }).then(AMap => {
            let plat = '';
            ['iPad', 'iPhone', 'android', 'mac', 'windows'].map(key => {
                if(AMap.Browser[key]){
                    plat = key || AMap.Browser.plat
                    return
                }
            })
            dispatch(setPlat(plat))
            map = new AMap.Map('amap', {zoom: 22})
            map.getCity(function(info){ // province city district citycode
                const {lng, lat} = map.getCenter() // 经纬度
                dispatch(setLocation({...info, lng, lat}))
            })
        }).catch(e => {
            console.error('AMAP ERROR: ', e)
        })
        return () => {
            map?.destroy()
        }
    }, [])

    return (
        <ConfigProvider theme={themeProvider}>
            <StyleProvider transformers={[px2rem]} hashPriority='high'>
                <SelfLayout/>
                <div id='amap' style={{display: 'none', height: '10px', width: '10px'}}/>
            </StyleProvider>
        </ConfigProvider>
    )
}

export default App
