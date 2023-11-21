import {StyleProvider, px2remTransformer} from '@ant-design/cssinjs'
import {ConfigProvider} from 'antd'
import React from 'react'

import SelfLayout from '@/components/layout'
import theme from '@/theme'
import './global.less'
import '@/theme/antd.less'

const px2rem = px2remTransformer({
    rootValue: 16 // 根元素字体大小 rootValue px = 1rem
})

const App = () => {
    return (
        <ConfigProvider theme={theme}>
            <StyleProvider transformers={[px2rem]}>
                <SelfLayout/>
            </StyleProvider>
        </ConfigProvider>
    )
}

export default App
