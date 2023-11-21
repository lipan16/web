import {useTitle} from 'ahooks'
import React from 'react'


const Site = () => {
    useTitle('共享资源')

    return (
        <section className='resources'>
            <h2>site</h2>
        </section>
    )
}

export default Site
