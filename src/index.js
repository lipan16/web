import React from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter, useRoutes} from 'react-router-dom'
import {Provider} from 'react-redux'

import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn' // 导入本地化语言
import * as duration from 'dayjs/plugin/duration' // 导入插件
import dayOfYear from 'dayjs/plugin/dayOfYear'
import isToday from 'dayjs/plugin/isToday'

dayjs.locale('zh-cn') // 使用本地化语言
dayjs.extend(duration) // 使用插件
dayjs.extend(dayOfYear)
dayjs.extend(isToday)

import store from '@/store'
import routes from '@/router'

const Routes = () => useRoutes(routes)

const app = createRoot(document.getElementById('root'))

app.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Routes/>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
)
