
import React from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter, useRoutes} from 'react-router-dom'
import {Provider} from 'react-redux'

import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn' // 导入本地化语言
import * as isLeapYear from 'dayjs/plugin/isLeapYear' // 导入插件
import * as duration from 'dayjs/plugin/duration'

dayjs.extend(isLeapYear) // 使用插件
dayjs.extend(duration)
dayjs.locale('zh-cn') // 使用本地化语言

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
