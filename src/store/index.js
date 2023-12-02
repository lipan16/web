import {configureStore} from '@reduxjs/toolkit'

import user from './user'
import setting from './setting'

export default configureStore({
    reducer: {
        user,
        setting
    }
})
