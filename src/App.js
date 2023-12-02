import React, {useMemo} from 'react'
import {useSelector} from 'react-redux'
import {ConfigProvider, theme} from 'antd'
import {StyleProvider, px2remTransformer} from '@ant-design/cssinjs'

const {useToken} = theme
import '@/utils/event'
import SelfLayout from '@/components/layout'
import '@/global.less'
import '@/antd.less'

const px2rem = px2remTransformer({
    rootValue: 16 // 根元素字体大小 rootValue px = 1rem
})

const App = () => {
    const {token} = useToken()
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
                    colorText: token.colorWhite
                }
            }
        }
    }, [themeStore])

    return (
        <ConfigProvider theme={themeProvider}>
            <StyleProvider transformers={[px2rem]} hashPriority='high'>
                <SelfLayout/>
            </StyleProvider>
        </ConfigProvider>
    )
}

export default App
