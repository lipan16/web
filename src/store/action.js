import {createSlice} from '@reduxjs/toolkit'

export const action = createSlice({
    name: 'action',
    initialState: {
        toolSite: {}
    },
    reducers: {
        setToolSite: (state, action) => {
            state.toolSite = action.payload
        },

    }
})
export const {setToolSite} = action.actions

export default action.reducer
