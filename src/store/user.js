import {createSlice} from '@reduxjs/toolkit'

export const user = createSlice({
    name: 'user',
    initialState: {
        ip: '',
        verse: {}
    },
    reducers: {
        setIp: (state, action) => {
            state.ip = action.payload
        },
        setVerse: (state, action) => {
            state.verse = action.payload
        }
    }
})
export const {setIp, setVerse} = user.actions

export default user.reducer
