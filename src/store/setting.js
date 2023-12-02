import {createSlice} from '@reduxjs/toolkit'
import {set} from 'lodash'

export const setting = createSlice({
    name: 'setting',
    initialState: {
        theme: {
            dark: false,
            token: {
                fontSize: 16,
                colorPrimary: '#fa3899',
                // colorBgLayout: '#f7f8fa'
            }
        }
    },
    reducers: {
        setThemeToken: (state, action) => {
            set(state.theme.token, action.payload.key, action.payload.value)
        },
        setDarkTheme: (state, action) => {
            state.theme.dark = action.payload
        }
    }
})
export const {setThemeToken, setDarkTheme} = setting.actions

export default setting.reducer
