import {createSlice} from '@reduxjs/toolkit'

export const user = createSlice({
    name: 'user',
    initialState: {
        ip: '',
        verse: {}, // 诗词
        plat: '', // 设备型号
        location: {}, // 地理位置
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
        setLocation: (state, action) => {
            state.location = action.payload
        },
        setWeather: (state, action) => {
            state.weather = action.payload
        }
    }
})
export const {setIp, setVerse, setPlat, setLocation, setWeather} = user.actions

export default user.reducer
