import React, {useEffect, useRef} from 'react'
import {AiEditor} from 'aieditor'

import 'aieditor/dist/style.css'
import './index.less'

const Aieditor = () => {
    const divRef = useRef(null)
    useEffect(() => {
        if(divRef.current){
            const aiEditor = new AiEditor({
                element: divRef.current,
                placeholder: '点击输入内容...',
                content: 'AiEditor 是一个面向 AI 的开源富文本编辑器。 ',
                contentRetention: true, // 自动缓存到localStorage
                contentRetentionKey: 'ai-editor-content',
                ai: {
                    model: {
                        xinghuo: {
                            appId: 'dfb0976f',
                            apiKey: '1fff46d2532427a8c3b42411334b0600',
                            apiSecret: 'YmMwYTM0ODM2MGRkN2ZlMTJlMmI5ZTVl'
                        }
                    },
                    menus: []
                }
            })
            return () => {
                aiEditor.destroy()
            }
        }
    }, [])
    return (
        <div className='aieditor' ref={divRef} style={{height: '70vh'}}/>
    )
}

export default Aieditor
