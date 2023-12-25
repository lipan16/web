import {createSlice} from '@reduxjs/toolkit'

export const user = createSlice({
    name: 'user',
    initialState: {
        ip: '',
        verse: {}, // 诗词
        plat: '', // 设备型号
        geolocation: {}, // 地理位置
        weather: {}, // 天气
    },
    reducers: {
        setIp: (state, action) => {
            state.ip = action.payload
        },
        setVerse: (state, action) => {
            state.verse = action.payload
        },
        setPlat: (state, action) => {
            state.plat = action.payload
        },
        setGeolocation: (state, action) => {
            state.geolocation = action.payload
        },
        setWeather: (state, action) => {
            state.weather = action.payload
        }
    }
})
export const {setIp, setVerse, setPlat, setGeolocation, setWeather} = user.actions

export default user.reducer
