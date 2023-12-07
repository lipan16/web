import React, {useMemo, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {ConfigProvider, theme} from 'antd'
import {StyleProvider, px2remTransformer} from '@ant-design/cssinjs'

window._AMapSecurityConfig = {
    securityJsCode: '18e4297a6b5ad414c0e09e78ee2985d2'
}
const jinrishici = require('jinrishici')

import SelfLayout from '@/components/layout'
import {useThemeToken} from '@/hooks'
import {setIp, setVerse} from '@/store/user'
import '@/utils/event'
import '@/global.less'
import '@/antd.less'

const px2rem = px2remTransformer({
    rootValue: 16 // 根元素字体大小 rootValue px = 1rem
})

const App = () => {
    const tokenTheme = useThemeToken()
    const dispatch = useDispatch()

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
    }, [])

    return (
        <ConfigProvider theme={themeProvider}>
            <StyleProvider transformers={[px2rem]} hashPriority='high'>
                <SelfLayout/>
            </StyleProvider>
        </ConfigProvider>
    )
}

export default App
