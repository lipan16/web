import React from 'react'

import App from '@/App'
import About from '@/views/about'
import Index from '@/views'

const routes = [
    {
        path: '/',
        element: <App/>,
        children: [
            {path: '', element: <Index />},
            {path: 'about', element: <About/>}
        ]
    }
]
export default routes
