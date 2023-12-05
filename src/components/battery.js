import React from 'react'
import {useSetState, useInterval} from 'ahooks'
import {Progress} from 'antd'

import {useThemeToken} from '@/hooks'
import {getBattery} from '@/utils'

const Battery = () => {
    const token = useThemeToken()
    const [battery, setBattery] = useSetState({})

    useInterval(() => {
        getBattery(setBattery)
    }, 10000, {immediate: true})

    return (
        <Progress percent={battery?.level}
                  strokeColor={battery?.charging ? {'0%': token.colorWarningActive, '100%': token.colorPrimary} : token.colorPrimaryHover}
                  status={battery?.charging ? 'active' : 'normal'}
        />
    )
}
export default Battery
