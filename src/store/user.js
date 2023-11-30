import {createSlice} from '@reduxjs/toolkit'

export const user = createSlice({
    name: 'user',
    initialState: {
        ip: ''
    },
    reducers: {
        setIp: (state, action) => {
            state.ip = action.payload
        }
    }
})
export const {setIp} = user.actions

export default user.reducer
