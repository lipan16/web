import React, {useMemo} from 'react'
import {useSelector} from 'react-redux'
import {ConfigProvider, theme} from 'antd'
import {StyleProvider, px2remTransformer} from '@ant-design/cssinjs'

import SelfLayout from '@/components/layout'
// import theme from '@/theme'
import '@/utils/event'
import './global.less'
import '@/theme/antd.less'

const px2rem = px2remTransformer({
    rootValue: 16 // 根元素字体大小 rootValue px = 1rem
})

const App = () => {
    const themeStore = useSelector(state => state.setting.theme)

    const themeProvider = useMemo(() => {
        return {token: themeStore.token, algorithm: themeStore.dark ? theme.darkAlgorithm : theme.defaultAlgorithm}
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
