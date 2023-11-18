import {createSlice} from '@reduxjs/toolkit'

export const user = createSlice({
    name: 'user',
    initialState: {
        timeType: true,
    },
    reducers: {
        changeTimeType: (state, action) => {
            state.timeType = action.payload
        }
    }
})
export const {changeTimeType} = user.actions

export default user.reducer
