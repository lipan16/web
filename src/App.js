import {StyleProvider, px2remTransformer} from '@ant-design/cssinjs'
import {ConfigProvider} from 'antd'
import React from 'react'
import {Outlet} from 'react-router-dom'
import './global.less'

const px2rem = px2remTransformer({
    // rootValue: 32 // 32px = 1rem; @default 16
})

const App = () => {

    return (
        <StyleProvider transformers={[px2rem]} hashPriority="high">
            <ConfigProvider theme={{
                token: {
                    colorPrimary: '#e10c77' // https://ant-design.antgroup.com/docs/react/customize-theme-cn#seedtoken
                }
            }}>
                <Outlet/>
                <a href="http://8.133.162.30/web-knowledge" target="_blank">web knowledge</a>
            </ConfigProvider>
        </StyleProvider>
    )
}
export default App
