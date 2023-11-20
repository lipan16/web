import React, {lazy} from 'react'

import App from '@/App'
import Index from '@/views'
import NoFound from '@/views/nofound'

const About = lazy(() => import('@/views/about'))
const Lipan = lazy(() => import('@/views/we/lipan'))
const Xiaobing = lazy(() => import('@/views/we/xiaobing'))
const Interview = lazy(() => import('@/views/interview'))
const Works = lazy(() => import('@/views/works'))
const Resources = lazy(() => import('@/views/resources'))

const routes = [
    {
        path: '/',
        element: <App/>,
        children: [
            {path: '', element: <Index />},
            {path: '', children: [
                    {path: 'lipan', element: <Lipan/>},
                    {path: 'xiaobing', element: <Xiaobing/>},
                ]
            },
            {path: 'interview', element: <Interview/>},
            {path: 'works', element: <Works/>},
            {path: 'resources', element: <Resources/>},
            {path: 'about', element: <About/>},
            {path: '*', element: <NoFound></NoFound>}
        ]
    }
]
export default routes
