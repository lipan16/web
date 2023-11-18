import {Button} from 'antd'
import React from 'react'

import SvgIcon from '@/components/SvgIcon'

const Index = () => {
    const click = () => {
    }

    return (
        <div style={{textAlign: 'center'}}>
            <Button type="primary" onClick={click}>Button</Button>
            <SvgIcon name="back" fill="red"/>
            <h1>Hello World!</h1>
            <a href="http://8.133.162.30/web-knowledge" target="_blank">web knowledge</a>
        </div>
    )
}
export default Index
