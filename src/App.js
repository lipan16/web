import React, {useMemo, useEffect, useCallback} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {ConfigProvider, theme, App as AppProvider} from 'antd'
import {StyleProvider, px2remTransformer} from '@ant-design/cssinjs'
import zhLocale from 'antd/locale/zh_CN'
import AMapLoader from '@amap/amap-jsapi-loader'

const jinrishici = require('jinrishici')

window._AMapSecurityConfig = {
    securityJsCode: '18e4297a6b5ad414c0e09e78ee2985d2'
}
// window.forceWebGL = true

import AppRouter from '@/router/appRouter'
import fetchRequestRetry from '@/utils/request'
import {useThemeToken} from '@/hooks'
import {setIp, setVerse, setPlat, setGeolocation, setWeather} from '@/store/user'
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
                colorLinkHover: `${themeStore.token.colorPrimary} !important`,
                lineHeight: 1
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

    const getWeather = useCallback((lng, lat) => {
        fetchRequestRetry({
            url: 'https://devapi.qweather.com/v7/weather/now',
            method: 'get',
            data: {
                location: `${lng},${lat}`,
                key: 'bf787a5ca09a41cb801b2adcb48f40f8'
            }
        }).then(res => {
            if(res.code === '200'){
                dispatch(setWeather({
                    text: res.now.text, // 状况描述
                    temp: res.now.temp, // 温度
                    feelsLike: res.now.feelsLike, // 体感温度
                    link: res.fxLink, // 和风天气响应式页面
                    obsTime: res.now.obsTime // 数据观测时间
                }))
            }
        }).catch(err => {
            console.error('和风天气 ERROR: ', err.message, err)
        })
    }, [])

    const getLocationByIp = useCallback(() => {
        fetchRequestRetry({
            url: 'https://restapi.amap.com/v3/ip',
            method: 'get',
            data: {key: 'f64867f7e0586f3487ee25cd5cff55cf'}
        }).then(res => {
            if(res.status === '1'){
                fetchRequestRetry({
                    url: 'https://restapi.amap.com/v3/weather/weatherInfo',
                    method: 'get',
                    data: {key: 'f64867f7e0586f3487ee25cd5cff55cf', city: res.adcode, extensions: 'base'}
                }).then(weather => {
                    if(weather.status === '1'){
                        dispatch(setWeather({
                            text: weather.lives[0].weather, // 状况描述
                            temp: weather.lives[0].temperature, // 温度
                            windPower: weather.lives[0].windpower, //风力级别，单位：级
                            windDirection: weather.lives[0].winddirection // 风向描述
                        }))
                    }
                })
                const province = res.province.endsWith('市') ? '' : res.province
                dispatch(setGeolocation({province, city: res.city}))

                // dispatch(setWeather({
                //     text: res.now.text, // 状况描述
                //     temp: res.now.temp, // 温度
                //     feelsLike: res.now.feelsLike, // 体感温度
                //     link: res.fxLink, // 和风天气响应式页面
                //     obsTime: res.now.obsTime // 数据观测时间
                // }))
            }
        }).catch(err => {
            console.error('高德天气 ERROR: ', err.message, err)
        })
    }, [])

    useEffect(() => {
        getLocationByIp()
        try{
            navigator.geolocation.getCurrentPosition(position => {
                console.log('位置信息: ', position.coords.latitude, position.coords.longitude)
            }, err => {
                console.error('navigator.geolocation.getCurrentPosition, code: [' + err.code + ']: ' + err.message)
            }, {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            })
        }catch(e){
            console.error('navigator.geolocation.getCurrentPosition ERROR: ', e.message)
        }

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
            // map = new AMap.Map('amap', {zoom: 22})
            // map.getCity(function(info){ // province city district citycode
            //     console.log(info)
            // const {lng, lat} = map.getCenter() // 经纬度
            // getWeather(lng?.toFixed(2), lat?.toFixed(2))
            // dispatch(setGeolocation({...info, lng, lat}))
            // })
        }).catch(e => {
            console.error('AMAP ERROR: ', e)
        })

        return () => {
            map?.destroy()
        }
    }, [])

    return (
        <ConfigProvider theme={themeProvider} locale={zhLocale}>
            <StyleProvider transformers={[px2rem]} hashPriority='high'>
                <AppProvider>
                    <AppRouter/>
                    {/*<div id='amap' style={{display: 'none', height: '10px', width: '10px'}}/>*/}
                </AppProvider>
            </StyleProvider>
        </ConfigProvider>
    )
}

export default App
