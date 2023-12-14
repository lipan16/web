import React, {useRef, useEffect, useCallback} from 'react'
import {useSetState} from 'ahooks'
import dayjs from 'dayjs'
import {App} from 'antd'
import {BackwardOutlined, ForwardOutlined, PauseCircleOutlined, PlayCircleOutlined, RetweetOutlined} from '@ant-design/icons'

import IconFont from '@/components/aliIcon'
import {useThemeToken} from '@/hooks'
import './index.less'

let audioEle
const AUDIO_PLAY_MODE = {
    order: <IconFont type='icon-shunxubofang'/>, // 顺序播放 最后一首暂停
    random: <IconFont type='icon-suijibofang'/>, // 随机
    loop: <RetweetOutlined/>, // 列表循环
    one: <IconFont type='icon-danquxunhuan'/> // 单曲循环
}

const Music = () => {
    const AUDIO_PLAY_LIST = [ // todo 列表丰富
        {src: '/static/music/bing.mp3', title: '星月神话', author: '冰'}
    ]
    const {message} = App.useApp()
    const token = useThemeToken()

    const canvasRef = useRef(null)
    const [audioObj, setAudioObj] = useSetState({
        music: {}, // 音乐
        duration: '',
        currentTime: '00:00',
        progress: 0, // 播放进度

        mode: 'order', // 播放模式 todo 优化
        isPlay: false,
        showLrc: true
    })

    const formatTime = useCallback(time => {
        return dayjs.duration(time, 's').format(time > 3600 ? 'HH:mm:ss' : 'mm:ss')
    }, [])

    useEffect(() => {
        setAudioObj({music: AUDIO_PLAY_LIST[0]})
    }, [])

    useEffect(() => {
        console.log('audioObj.music')
        musicController()
    }, [audioObj.music])

    const musicController = useCallback(()  => {
        console.log('musicController')
        let canvasEle = canvasRef.current
        audioEle = new Audio(audioObj.music?.src)
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

        audioEle.onended = () => {
            console.log('play end')
            setAudioObj({isPlay: false})
        }

        // 把分析出的波形画到canvas中
        function draw(){
            setAudioObj({
                currentTime: formatTime(audioEle.currentTime),
                progress: +((audioEle.currentTime / audioEle.duration) || 0).toFixed(2)
            }) // 获取当前播放时长

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
    }, [audioObj])

    // 拖拽进度条
    const onChangeBar = useCallback(event => {
        console.log('onChangeBar')
        const curTime = event.target.value * audioEle.duration
        setAudioObj({currentTime: formatTime(curTime), progress: event.target.value})
        audioEle.currentTime = curTime
    }, [audioEle])

    // 播放
    const onPlay = useCallback(() => {
        console.log('onPlay')

        setAudioObj({isPlay: !audioObj.isPlay})
    }, [audioObj.isPlay])

    useEffect(() => {
        console.log('useEffect audioEle.play')
        if(audioObj.isPlay){
            audioEle.play()
        }else{
            audioEle.pause()
        }
    }, [audioObj.isPlay, audioEle])

    // 播放上一首（-1），下一首（1）
    const playMusic = useCallback((index) => {
        const currIndex = AUDIO_PLAY_LIST.findIndex(f => f.src === audioObj.music?.src) // 当前音乐索引
        const len = AUDIO_PLAY_LIST.length
        let playIndex = currIndex + index
        console.log('playMusic', audioObj.mode, playIndex)
        if(audioObj.mode === 'loop'){
            playIndex = (playIndex + len) % len
        }else{
            if(playIndex < 0){
                return message.info('已经是第一首了')
            }
            if(playIndex >= len){
                return message.info('已经是最后一首了')
            }
        }

        console.log('playMusic', index, AUDIO_PLAY_LIST[playIndex])
        setAudioObj({music: AUDIO_PLAY_LIST[playIndex], isPlay: true, duration: '', progress: 0, currentTime: '00:00'})
    }, [audioObj])

    const onNextMode = useCallback(() => {
        const keys = Object.keys(AUDIO_PLAY_MODE)
        const curIndex = keys.findIndex(f => f === audioObj.mode) // 当前模式索引
        const modeIndex = (curIndex + 1) % keys.length
        setAudioObj({mode: keys[modeIndex]})
    }, [audioObj.mode])

    useEffect(() => {
        console.log('useEffect audioObj.mode')
        if(audioObj.mode === 'one'){
            audioEle.loop = true
        }else if(audioObj.mode === 'random'){
            // 打乱 AUDIO_PLAY_LIST
        }
    }, [audioObj.mode, audioEle])

    const onShowLrc = useCallback(() => {
        setAudioObj({showLrc: !audioObj.showLrc})
    }, [audioObj.showLrc])

    return (
        <section className='music'>
            <div className='music-controller'>
                <canvas ref={canvasRef} style={{border: '1px solid'}}/>
                <div className='music-bar'>
                    <div className='music-bar-time'>{audioObj.currentTime}</div>
                    <input type='range' value={audioObj.progress} min={0} max={1} step={0.01} onChange={onChangeBar}/>
                    <div className='music-bar-time'>{audioObj.duration}</div>
                </div>
                <div className='music-play' style={{fontSize: '4rem'}}>
                    <div onClick={onNextMode} style={{fontSize: '2rem'}}>{AUDIO_PLAY_MODE[audioObj.mode]}</div>
                    <div onClick={() => playMusic(-1)}><BackwardOutlined/></div>
                    <div onClick={onPlay} style={{fontSize: '5rem'}}>{audioObj.isPlay ? <PauseCircleOutlined/> : <PlayCircleOutlined/>}</div>
                    <div onClick={() => playMusic(1)}><ForwardOutlined/></div>
                    <div onClick={onShowLrc} style={{fontSize: '2rem'}}><IconFont type='icon-a'/></div>
                </div>
                <div>音量，倍速</div>
            </div>
            {
                audioObj.showLrc && <div className='music-info'>
                    <div className='music-header'>
                        <span className='music-title'>{audioObj.music?.title}</span>
                        <span className='music-author'>-{audioObj.music?.author}</span>
                    </div>
                    <div className='music-lrc'>
                        歌词
                    </div>
                </div>
            }
        </section>
    )
}

export default Music
