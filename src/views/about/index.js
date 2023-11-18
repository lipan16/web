import {useTitle} from 'ahooks'
import React from 'react'
import {useNavigate} from 'react-router-dom'

import SvgIcon from '@/components/SvgIcon'
import './index.less'

const About = () => {
    const navigate = useNavigate()
    useTitle('关于')

    return (
        <section className='about'>
            <div><SvgIcon filename='back' color='red' onClick={() => navigate(-1)}/></div>
            <h2>About</h2>
        </section>
    )
}

export default About
