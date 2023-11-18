import {ConfigProvider} from 'antd'
import React from 'react'
import Index from '@/views'

const App = () => {

    return (
        <ConfigProvider theme={{
            token: {
                colorPrimary: '#e10c77', // https://ant-design.antgroup.com/docs/react/customize-theme-cn#seedtoken
            }
        }}>
            <Index/>
        </ConfigProvider>
    )
}
export default App
