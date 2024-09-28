import {setRouterList} from '@/store/router'
import {importAll} from '@/utils'
import React, {useEffect, useState, lazy} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Routes, Route, useRoutes} from 'react-router-dom'
import {cloneDeep} from 'lodash'

const Aieditor = lazy(() => import(/* webpackChunkName: 'aieditor' */'@/views/aieditor'))
const Music = lazy(() => import(/* webpackChunkName: 'music' */'@/views/music'))
const About = lazy(() => import(/* webpackChunkName: 'about' */'@/views/about'))

import routes from '@/router/index'

function AppRouter(){
    const [route, setRoute] = useState(routes)
    const routerList = useSelector(state => state.router.routerList)
    const dispatch = useDispatch()

    useEffect(() => {
        importAll(require.context('@/views/', false, /\.js$/))

        setTimeout(() => {
            return Promise.resolve([
                {path: 'about', element: 'about'},
                {path: 'aieditor', element: 'aieditor'},
                {path: 'music', element: 'music'}
            ]).then(res => {
                const tmp = cloneDeep(routes)
                const a = dealRouter(res)
                console.log('a', a)
                // tmp[0].children.push(...res)
                // setRoute(tmp)
                // dispatch(setRouterList(tmp))
            })
        }, 2000)

    }, [])

    /**
     * [
     *     {path: '/', label: '首页', element: ''@/views/about'', icon: ''， children: []}
     * ]
     * @param router
     */
    const dealRouter = (router) => {
        return  router.map(m => {
            const path = m.path.slice(0, 1)
            const element = lazy(() => import(/* webpackChunkName: '${m.element}' */`@/views/${m.element}`))
            const children = m.children && dealRouter(m.children)

            return {path, element, children}
        })
    }

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

const RouterOrigin = () => {
    const Router = useRoutes(routes)

    return Router
}

export default RouterOrigin
