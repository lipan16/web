import {configureStore} from '@reduxjs/toolkit'

import user from './user'
import setting from './setting'
import action from './action'
import router from './router'

export default configureStore({
    reducer: {
        user,
        setting,
        action,
        router
    }
})
