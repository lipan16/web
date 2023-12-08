import {createSlice} from '@reduxjs/toolkit'

export const user = createSlice({
    name: 'user',
    initialState: {
        ip: '',
        verse: {}, // 诗词
        plat: '', // 设备型号
        location: {} // 地理位置
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
        }
    }
})
export const {setIp, setVerse, setPlat, setLocation} = user.actions

export default user.reducer
