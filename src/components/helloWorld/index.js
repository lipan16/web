import React, {useLayoutEffect} from 'react'
import gsap from 'gsap'

import './index.less'

const HelloWorld = () => {
    useLayoutEffect(() => {
        const helloAboutEl = document.querySelector('.hello-world')
        helloAboutEl.addEventListener('mousemove', evt => {
            const mouseX = evt.offsetX
            const mouseY = evt.offsetY
            gsap.set('.cursor', {
                x: mouseX,
                y: mouseY
            })

            gsap.to('.shape', {
                x: mouseX,
                y: mouseY,
                stagger: -0.1
            })
        })
    }, [])
    return (
        <div className='hello-world'>
            <div className='cursor'/>
            <div className='shapes' style={{translate: 'none', rotate: 'none', scale: 'none'}}>
                <div className='shape shape-1' style={{translate: 'none', rotate: 'none', scale: 'none'}}/>
                <div className='shape shape-2' style={{translate: 'none', rotate: 'none', scale: 'none'}}/>
                <div className='shape shape-3' style={{translate: 'none', rotate: 'none', scale: 'none'}}/>
            </div>
            <div className='content'>
                <h1>Hello World!</h1>
            </div>
        </div>
    )
}

export default HelloWorld
