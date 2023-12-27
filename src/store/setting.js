import {createSlice} from '@reduxjs/toolkit'
import {set} from 'lodash'

export const setting = createSlice({
    name: 'setting',
    initialState: {
        theme: {
            dark: false,
            token: {
                fontSize: 16,
                fontFamily: 'pretty',
                colorPrimary: '#f00056',
            }
        },
        pinnedPlayer: true,
    },
    reducers: {
        setThemeToken: (state, action) => {
            set(state.theme.token, action.payload.key, action.payload.value)
        },
        setDarkTheme: (state, action) => {
            state.theme.dark = action.payload
        },
        setPinnedPlayer: (state, action) => {
            state.pinnedPlayer = action.payload
        }
    }
})

export const {setThemeToken, setDarkTheme, setPinnedPlayer} = setting.actions

export default setting.reducer
