import React from 'react'
import {useTitle} from 'ahooks'
import {INTERVIEW_LIST} from '@/constants'
import './index.less'

const Interview = () => {
    useTitle('面试')

    return (
        <section className='interview'>
            <h1>面试题</h1>
            {
                INTERVIEW_LIST.map((m, i) =>
                    <div key={i} className='group'>
                        <h3>{m.text}</h3>
                        {
                            m.children?.map(item =>
                                <div key={item.link} className='item'>
                                    <a href={`/web-knowledge${item.link}.html`} target='_blank'>{item.text}</a>
                                </div>
                            )
                        }
                    </div>
                )
            }
        </section>
    )
}

export default Interview
