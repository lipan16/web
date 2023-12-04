import {useMemo, useEffect} from 'react'
import {theme} from 'antd'

const {useToken} = theme

export const useClientInfo = () => {
    return useMemo(() => {
        const ua = window.navigator.userAgent.toLowerCase()
        let b, clientName, clientVersion

        if((b = ua.match(/chrome\/([\d.]+)/))){
            clientName = 'chrome'
            clientVersion = b[1]
        }else if((b = ua.match(/edge\/([\d.]+)/))){
            clientName = 'edge'
            clientVersion = b[1]
        }else if((b = ua.match(/firefox\/([\d.]+)/))){
            clientName = 'firefox'
            clientVersion = b[1]
        }else if((b = ua.match(/opera.([\d.]+)/))){
            clientName = 'opera'
            clientVersion = b[1]
        }else if((b = ua.match(/version\/([\d.]+).*safari/))){
            clientName = 'safari'
            clientVersion = b[1]
        }else{
            clientName = 'Unknown'
        }
        clientVersion = clientVersion ? parseFloat(clientVersion) : ''

        return {clientName, clientVersion}
    }, [])
}

export const useThemeToken = () => {
    const {token} = useToken()
    return token
}

export const useVisitTime = () => {
    return useMemo(() => {
        return localStorage.getItem('USER_VISIT_TIME')
    }, [])
}
