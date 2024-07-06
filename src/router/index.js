import React, {lazy} from 'react'

import SelfLayout from '@/components/layout'
import Index from '@/views'
import NoFound from '@/views/nofound'

const We = lazy(() => import('@/views/we'))
const Lipan = lazy(() => import('@/views/we/lipan'))
const Xiaobing = lazy(() => import('@/views/we/xiaobing'))
const Calendar = lazy(() => import('@/views/calendar'))
const Interview = lazy(() => import('@/views/interview'))
const Pvp = lazy(() => import('@/views/pvp'))
const Site = lazy(() => import('@/views/resources/site'))
const Tools = lazy(() => import('@/views/resources/tools'))


const routes = [
    {
        path: '/',
        element: <SelfLayout/>,
        children: [
            {path: '', element: <Index/>},
            {
                path: 'we', element: <We/>, children: [
                    {path: 'lipan', element: <Lipan/>},
                    {path: 'xiaobing', element: <Xiaobing/>}
                ]
            },
            {path: 'calendar', element: <Calendar/>},
            {path: 'interview', element: <Interview/>},
            {path: 'pvp', element: <Pvp/>},
            {
                path: '', children: [
                    {path: 'site', element: <Site/>},
                    {
                        path: 'tools', element: <Tools/>, children: [
                            {path: '*', element: null},
                        ]
                    }
                ]
            },
            {path: '*', element: <NoFound></NoFound>}
        ]
    }
]

export default routes
