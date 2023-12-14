import {useBoolean} from 'ahooks'
import PropTypes from 'prop-types'
import React, {useEffect, useState, useCallback} from 'react'
import {PlayCircleOutlined, PauseCircleOutlined, UpSquareFilled} from '@ant-design/icons'

import './index.less'

const PinnedPlayer = ({audioSrc, picImg}) => {
    const [playAudio, setPlayAudio] = useState(null)
    const [isPlay, {toggle}] = useBoolean(false)

    useEffect(() => {
        setPlayAudio(new Audio(audioSrc))
    }, [])

    const onPlay = useCallback(() => {
        if(isPlay){
            playAudio.pause()
        }else{
            playAudio.play()
        }
        toggle()
    }, [isPlay, playAudio])

    const onExpand = useCallback(() => {

    }, [])

    return (
        <div className='pinned-player'>
            <div className='player-expand' onClick={onExpand}>
                <UpSquareFilled/>
            </div>
            <div className='player-pic'
                 style={{backgroundImage: `url(${picImg})`}}
                 onClick={onPlay}
            >
                <div className='play'>
                    {isPlay ? <PauseCircleOutlined/> : <PlayCircleOutlined/>}
                </div>
            </div>
        </div>
    )
}

PinnedPlayer.defaultProps = {
    audioSrc: '/static/music/bing.mp3',
    picImg: '/static/bing.jpg'
}

PinnedPlayer.propTypes = {
    audioSrc: PropTypes.string,
    picImg: PropTypes.string
}

export default PinnedPlayer
