import {useThemeToken} from '@/hooks'
import React, {useRef, useEffect, useCallback} from 'react'
import {useSetState} from 'ahooks'
import dayjs from 'dayjs'
import {BackwardOutlined, ForwardOutlined, PauseCircleOutlined, PlayCircleOutlined} from '@ant-design/icons'

import './index.less'

let audioEle
const Music = () => {
    const token = useThemeToken()

    const canvasRef = useRef(null)
    const [audioObj, setAudioObj] = useSetState({
        isPlay: false,
        duration: '',
        currentTime: '00:00'
    })

    const formatTime = useCallback(time => {
        return dayjs.duration(time, 's').format(time > 3600 ? 'HH:mm:ss' : 'mm:ss')
    }, [])

    useEffect(() => {
        let canvasEle = canvasRef.current
        audioEle = new Audio('http://8.133.162.30/static/music/bing.mp3')
        audioEle.oncanplay = () => {
            if(!audioObj.duration){
                setAudioObj({duration: formatTime(audioEle.duration)}) // 获取音频时长
            }
        }

        console.log('audioEle', audioEle)

        let audioCtx, analyser, source, dataArray, frameId // 音频上下文， 音频分析器，音频源节点，音频分析数据组，动画帧id

        let canvasCtx = canvasEle.getContext('2d')

        // 开始播放
        audioEle.onplay = () => {
            // 音频源 ---> 分析器 ---> 输出设备
            //             |
            //          canvas画布
            if(!audioCtx){
                audioCtx = new AudioContext() // 创建音频上下文
            }
            if(!source){
                source = audioCtx.createMediaElementSource(audioEle) // 创建音频源节点
            }

            analyser = audioCtx.createAnalyser() // 创建分析器节点
            analyser.fftSize = 1024

            dataArray = new Uint8Array(analyser.frequencyBinCount) // 创建数组，用于接受分析器节点的分析数据
            source.connect(analyser) // 音频连接到分析器节点
            source.connect(audioCtx.destination) // 音频连接到输出设备
            draw()
        }
        // 暂停
        audioEle.onpause = () => {
            cancelAnimationFrame(frameId)
        }

        // 把分析出的波形画到canvas中
        function draw(){
            setAudioObj({currentTime: formatTime(audioEle.currentTime)}) // 获取当前播放时长

            const {width, height} = canvasEle
            canvasCtx.clearRect(0, 0, width, height) // 清空canvas
            analyser.getByteFrequencyData(dataArray)
            const len = dataArray.length / 2 // 过滤高频
            const barWidth = width / len / 2
            canvasCtx.fillStyle = token.colorPrimary
            for(let i = 0; i < len; i++){
                const data = dataArray[i]
                const barHeight = (data / 255) * height
                const x1 = i * barWidth + width / 2
                const x2 = width / 2 - (i + 1) * barWidth
                const y = height - barHeight
                canvasCtx.fillRect(x1, y, barWidth - 2, barHeight)
                canvasCtx.fillRect(x2, y, barWidth - 2, barHeight)
            }
            frameId = requestAnimationFrame(draw)
        }
    }, [])

    const onPlay = useCallback(() => {
        if(audioObj.isPlay){
            audioEle.pause()
        }else{
            audioEle.play()
        }
        setAudioObj({isPlay: !audioObj.isPlay})
    }, [audioObj, audioEle])

    return (
        <section className='music'>
            <div className='music-controller'>
                <canvas ref={canvasRef} style={{border: '1px solid'}}/>
                <div className='music-bar'>
                    {audioObj.currentTime} / {audioObj.duration}
                </div>
                <div className='music-play'>
                    <div><BackwardOutlined /></div>
                    <div onClick={onPlay}>{audioObj.isPlay ? <PauseCircleOutlined/> : <PlayCircleOutlined/>}</div>
                    <div><ForwardOutlined /></div>
                </div>
            </div>
            <div className='music-info'>
                <div className='music-header'>
                    <span className='music-title'>星月神话</span>
                    <span className='music-author'>-冰</span>
                </div>
                <div className='music-lrc'>
                    歌词
                </div>
            </div>
        </section>
    )
}

export default Music
