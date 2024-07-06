import React, {useEffect, useState, lazy} from 'react'
import {Routes, Route} from 'react-router-dom'
import {cloneDeep} from 'lodash'

const Aieditor = lazy(() => import('@/views/aieditor'))
const Music = lazy(() => import('@/views/music'))
const About = lazy(() => import('@/views/about'))

import routes from '@/router/index'

export default function AppRouter(){
    const [route, setRoute] = useState(routes)

    useEffect(() => {
        setTimeout(() => {
            return Promise.resolve([
                {path: 'about', element: <About/>},
                {path: 'aieditor', element: <Aieditor/>},
                {path: 'music', element: <Music/>}
            ]).then(res => {
                const tmp = cloneDeep(routes)
                tmp[0].children.push(...res)
                setRoute(tmp)
            })
        }, 2000)

    }, [])

    // if(!userInfo) return <Login/>

    return (
        <Routes>
            {route?.map(router =>
                <Route key={router.path} path={router.path} element={router.element}>
                    {router.children?.map(child => <Route key={child.path} path={child.path} element={child.element}>
                        {child.children?.map(m => <Route key={m.path} path={m.path} element={m.element}/>)}
                    </Route> )}
                </Route>
            )}
        </Routes>
    )
}

