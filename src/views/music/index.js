import SvgIcon from '@/components/svgIcon'
import React, {useRef, useEffect, useCallback, useMemo} from 'react'
import {useSetState, useHover, useEventListener, useSafeState} from 'ahooks'
import {debounce} from 'lodash'
import dayjs from 'dayjs'
import {App} from 'antd'
import {BackwardOutlined, ForwardOutlined, PauseCircleOutlined, PlayCircleOutlined, RetweetOutlined} from '@ant-design/icons'

import {BASE_URL} from '@/constants'
import AliIcon from '@/components/aliIcon'
import {useThemeToken} from '@/hooks'
import './index.less'

let audioEle
const AUDIO_PLAY_MODE = {
    order: <AliIcon type='icon-shunxubofang'/>, // 顺序播放 最后一首暂停
    random: <AliIcon type='icon-suijibofang'/>, // 随机
    loop: <RetweetOutlined/>, // 列表循环
    one: <AliIcon type='icon-danquxunhuan'/> // 单曲循环
}

const Music = () => {
    const AUDIO_PLAY_LIST = [
        {src: `${BASE_URL}/static/music/bing.mp3`, title: '星月神话', author: '冰', lrc: ''},
        {
            src: `${BASE_URL}/static/music/44656c61636579202d20447265616d20497420506f737369626c65.mp3`,
            title: 'Dream It Possible',
            author: 'Delacey',
            lrc: `${BASE_URL}/static/music/44656c61636579202d20447265616d20497420506f737369626c65.lrc`
        },
        {
            src: `${BASE_URL}/static/music/e4bda0e982a3e4b988e788b1e5a5b9202d20e69d8ee59ca3e69db0.mp3`,
            title: '你那么爱她',
            author: '李圣杰',
            lrc: `${BASE_URL}/static/music/e4bda0e982a3e4b988e788b1e5a5b9202d20e69d8ee59ca3e69db0.lrc`
        },
        {
            src: `${BASE_URL}/static/music/e696ade6a1a5e6ae8be99baa202d20e8aeb8e5b5a9.mp3`,
            title: '断桥残雪',
            author: '许嵩',
            lrc: `${BASE_URL}/static/music/e696ade6a1a5e6ae8be99baa202d20e8aeb8e5b5a9.lrc`
        },
        {
            src: `${BASE_URL}/static/music/e69da8e5b982202d20e788b1e79a84e4be9be585bb.mp3`,
            title: '爱的供养',
            author: '杨幂',
            lrc: `${BASE_URL}/static/music/e69da8e5b982202d20e788b1e79a84e4be9be585bb.lrc`
        },
        {
            src: `${BASE_URL}/static/music/e7a88be5938d202d20e696b0e5a898e4b88de698afe68891.mp3`,
            title: '新娘不是我',
            author: '程响',
            lrc: `${BASE_URL}/static/music/e7a88be5938d202d20e696b0e5a898e4b88de698afe68891.lrc`
        },
        {
            src: `${BASE_URL}/static/music/e894a1e58d93e5a68de38081e69e97e4bf8ae69db0202d20e5b08fe98592e7aa9d.mp3`,
            title: '小酒窝',
            author: '蔡卓妍、林俊杰',
            lrc: `${BASE_URL}/static/music/e894a1e58d93e5a68de38081e69e97e4bf8ae69db0202d20e5b08fe98592e7aa9d.lrc`
        },
        {
            src: `${BASE_URL}/static/music/e99988e5a89fe584bfe38081e585ade593b2202d20e99499e99499e99499.mp3`,
            title: '错错错',
            author: '陈娟儿、六哲',
            lrc: `${BASE_URL}/static/music/e99988e5a89fe584bfe38081e585ade593b2202d20e99499e99499e99499.lrc`
        }
    ]
    const {message} = App.useApp()
    const token = useThemeToken()

    const canvasRef = useRef(null)
    const volumeRef = useRef(null)
    const musicBarRef = useRef(null)
    const isHoverVolume = useHover(volumeRef)

    const [audioObj, setAudioObj] = useSetState({
        music: {}, // 音乐
        duration: '',
        currentTime: '00:00',
        progress: 0, // 播放进度

        muted: false, // 是否静音
        volume: '1', // 音量
        mode: 'order',
        isPlay: false,
        showLrc: true
    })
    const [hoverProgress, setHoverProgress] = useSafeState(0)

    const formatTime = useCallback(time => {
        return dayjs.duration(time, 's').format(time > 3600 ? 'HH:mm:ss' : 'mm:ss')
    }, [])

    useEffect(() => {
        setAudioObj({music: AUDIO_PLAY_LIST[0]})
    }, [])

    useEffect(() => {
        audioEle?.pause()
        musicController()
    }, [audioObj.music])

    const musicController = useCallback(() => {
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
        // 播放完
        audioEle.onended = () => {
            console.log('play end')
            onChangePlay()
            playMusic(1)
        }

        // 把分析出的波形画到canvas中
        function draw(){
            setAudioObj({
                currentTime: formatTime(audioEle.currentTime),
                progress: audioEle.currentTime / audioEle.duration || 0
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

    // 点击静音
    const onMuted = useCallback(() => {
        const muted = audioObj.muted
        const volume = muted ? `${audioEle.volume}` : '0'
        setAudioObj({muted: !muted, volume})
        audioEle.muted = !muted
    }, [audioObj.muted, audioEle])

    // 设置音量
    const onChangeVolume = useCallback(event => {
        const volume = event.target.value
        setAudioObj({volume, muted: false})
        audioEle.volume = volume
    }, [audioEle])

    // 音量图标
    const volumeIcon = useMemo(() => {
        if(audioObj.volume === '0' || audioObj.muted){
            return 'icon-24gl-volumeCross'
        }else if(audioObj.volume >= 0.8){
            return 'icon-24gl-volumeHigh'
        }else if(audioObj.volume >= 0.5){
            return 'icon-24gl-volumeMiddle'
        }else{
            return 'icon-24gl-volumeLow'
        }
    }, [audioObj.volume, audioObj.muted])


    useEventListener('keyup', (event) => {
        if(event.key === ' '){ // 监听空格
            onChangePlay()
        }
    })

    // 播放
    const onChangePlay = useCallback(() => {
        setAudioObj({isPlay: !audioObj.isPlay})
    }, [audioObj.isPlay])

    useEffect(() => {
        if(audioObj.isPlay){
            audioEle.play()
        }else{
            audioEle.pause()
        }
    }, [audioObj.isPlay, audioEle])

    // 播放上一首（-1），下一首（1）
    const playMusic = useCallback(debounce((index) => {
        console.error('playMusicImpl')
        onChangePlay()
        const currIndex = AUDIO_PLAY_LIST.findIndex(f => f.src === audioObj.music?.src) // 当前音乐索引
        const len = AUDIO_PLAY_LIST.length
        let playIndex = currIndex + index
        if(audioObj.mode === 'loop'){ // 循环
            playIndex = (playIndex + len) % len
        }else if(audioObj.mode === 'random'){ // 随机
            playIndex = (playIndex + len + Math.floor(Math.random() * len)) % len
        }else{
            if(playIndex < 0){
                return message.info('已经是第一首了')
            }
            if(playIndex >= len){
                return message.info('已经是最后一首了')
            }
        }

        console.log('playMusic', audioObj.mode, index, playIndex, AUDIO_PLAY_LIST[playIndex])
        setAudioObj({music: AUDIO_PLAY_LIST[playIndex], isPlay: true, duration: '', progress: 0, currentTime: '00:00'})
    }, 300), [audioObj.mode, audioObj.music])

    const onNextMode = useCallback(() => {
        const keys = Object.keys(AUDIO_PLAY_MODE)
        const curIndex = keys.findIndex(f => f === audioObj.mode) // 当前模式索引
        const modeIndex = (curIndex + 1) % keys.length
        setAudioObj({mode: keys[modeIndex]})
    }, [audioObj.mode])

    useEffect(() => {
        audioEle.loop = audioObj.mode === 'one'
    }, [audioObj.mode, audioEle])

    const onShowLrc = useCallback(() => {
        setAudioObj({showLrc: !audioObj.showLrc})
    }, [audioObj.showLrc])

    // 鼠标在进度条上移动
    useEventListener('mousemove', (event) => {
        setHoverProgress(event.layerX / musicBarRef.current.offsetWidth)
    }, {target: musicBarRef, passive: true})

    // 点击进度条
    useEventListener('click', (event) => {
        const progress = event.layerX / musicBarRef.current.offsetWidth || 0
        const curTime = progress * audioEle.duration
        setAudioObj({currentTime: formatTime(curTime), progress})
        audioEle.currentTime = curTime
    }, {target: musicBarRef, passive: true})

    const showHoverTime = useMemo(() => {
        return formatTime(hoverProgress * audioEle?.duration || 0)
    }, [hoverProgress, audioEle])

    return (
        <section className='music'>
            <div className='music-controller'>
                <canvas ref={canvasRef} style={{border: '1px solid'}}/>
                <div className='music-controller-bar'>
                    <div className='music-bar-time'>{audioObj.currentTime}</div>

                    <div ref={musicBarRef} className='music-bar-content'>
                        <div className='music-bar-hover-time' style={{left: `calc(${100 * hoverProgress}% - 20px)`}}>{showHoverTime}</div>
                        <div className='music-bar'>
                            <div className='music-loaded'/>
                            <div className='music-played' style={{width: `${100 * audioObj.progress}%`}}>
                                <span className='music-thumb'>
                                    <SvgIcon filename='thumb' color={token.colorPrimary}/>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className='music-bar-time'>{audioObj.duration}</div>
                    <div className='music-volume' ref={volumeRef}>
                        <AliIcon type={volumeIcon} onClick={onMuted}/>
                        <input style={{height: isHoverVolume ? '0.375rem' : '0'}} type='range' className='music-bar-volume' value={audioObj.volume} min={0}
                               max={1} step={0.01} onChange={onChangeVolume}/>
                    </div>
                </div>
                <div className='music-play' style={{fontSize: '4rem'}}>
                    <div onClick={onNextMode} style={{fontSize: '2rem'}}><a>{AUDIO_PLAY_MODE[audioObj.mode]}</a></div>
                    <div onClick={() => playMusic(-1)}><a><BackwardOutlined/></a></div>
                    <div onClick={onChangePlay} style={{fontSize: '5rem'}}><a>{audioObj.isPlay ? <PauseCircleOutlined/> : <PlayCircleOutlined/>}</a></div>
                    <div onClick={() => playMusic(1)}><a><ForwardOutlined/></a></div>
                    <div onClick={onShowLrc} style={{fontSize: '2rem'}}><a><AliIcon type='icon-a'/></a></div>
                </div>
            </div>
            <div className='music-info' style={{display: audioObj.showLrc ? 'block' : 'none'}}>
                <div className='music-header'>
                    <span className='music-title'>{audioObj.music?.title}</span>
                    <span className='music-author'>-{audioObj.music?.author}</span>
                </div>
                <div className='music-lrc'>
                    歌词
                </div>
            </div>
        </section>
    )
}

export default Music
