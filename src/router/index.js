import React, {lazy} from 'react'

import App from '@/App'
import Index from '@/views'
import NoFound from '@/views/nofound'

const We = lazy(() => import('@/views/we'))
const Lipan = lazy(() => import('@/views/we/lipan'))
const Xiaobing = lazy(() => import('@/views/we/xiaobing'))
const Interview = lazy(() => import('@/views/interview'))
const Works = lazy(() => import('@/views/works'))
const Site = lazy(() => import('@/views/resources/site'))
const Tools = lazy(() => import('@/views/resources/tools'))
const About = lazy(() => import('@/views/about'))

const routes = [
    {
        path: '/',
        element: <App/>,
        children: [
            {path: '', element: <Index/>},
            {
                path: 'we', element: <We/>, children: [
                    {path: 'lipan', element: <Lipan/>},
                    {path: 'xiaobing', element: <Xiaobing/>}
                ]
            },
            {path: 'interview', element: <Interview/>},
            {path: 'works', element: <Works/>},
            {
                path: '', children: [
                    {path: 'site', element: <Site/>},
                    {path: 'tools', element: <Tools/>}
                ]
            },
            {path: 'about', element: <About/>},
            {path: '*', element: <NoFound></NoFound>}
        ]
    }
]
export default routes
