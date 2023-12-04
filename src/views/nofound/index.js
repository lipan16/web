import React from 'react'
import {useTitle} from 'ahooks'

const NoFound = () => {
    useTitle('404')

    return (
        <section className='resources'>
            <h2>404</h2>
        </section>
    )
}

export default NoFound
