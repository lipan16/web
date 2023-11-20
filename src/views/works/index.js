import {useTitle} from 'ahooks'
import React from 'react'

const Works = () => {
    useTitle('作品')

    return (
        <section className='works'>
            <h2>作品</h2>
        </section>
    )
}

export default Works
