import {useUpdateEffect} from 'ahooks'
import {Image} from 'antd'
import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

const jinrishici = require('jinrishici')

const Index = () => {
    const navigate = useNavigate()


    const imgs = [
        '1597551212238.jpg', '20230512202554.png', '20230512202618.png',
        '1597551240750.jpg', '20230512202601.png', '20230512202638.png',
        '1597551250418.jpg', '20230512202606.png', '20230512202645.png',
        '1597551257997.jpg', '20230512202610.png', '20230512202700.png',
        '20230512202530.png', '20230512202615.png', 'asi.png'
    ]
    const [imgSrc, setImgSrc] = useState('')
    useEffect(() => {
        setImgSrc(`http://8.133.162.30/static/${imgs[Math.floor(Math.random() * imgs.length)]}`)
    }, [])
    useUpdateEffect(() => {
        jinrishici.load(result => {
            console.log(result)
        })
    }, [])


    return (
        <div className='index'>
            <Image src={imgSrc} preview={false}/>
        </div>
    )
}
export default Index
