import {createSlice} from '@reduxjs/toolkit'

export const router = createSlice({
    name: 'routerList',
    initialState: {
        routerList: []
    },
    reducers: {
        setRouterList: (state, action) => {
            state.routerList = action.payload
        }
    }
})
export const {setRouterList} = router.actions

export default router.reducer
