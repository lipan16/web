import dayjs from 'dayjs'
import React from 'react'
import {Progress} from 'antd'
import {FieldTimeOutlined} from '@ant-design/icons'

import './index.less'

const TimeCapsule = () => {
    const countdown = dayjs.duration(dayjs().endOf('year').diff(dayjs()))

    return (
        <div className='time-capsule'>
            <div style={{fontSize: 24}}>
                <FieldTimeOutlined/>
                <span style={{marginLeft: 8}}>时光胶囊</span>
            </div>
            <span>今日已经度过了 {dayjs().hour()} 小时</span>
            <Progress size={['100%', 10]} percent={Number((dayjs().get('hour') / 24 * 100).toFixed(2))}/>
            <span>本周已经度过了 {dayjs().day() === 0 ? '7' : dayjs().day()} 天 </span>
            <Progress size={['100%', 12]} strokeColor='#f47983' percent={Number((dayjs().get('day') === 0 ? 1 : (dayjs().get('day') / 7 * 100)).toFixed(2))}/>
            <span>本月已经度过了 {dayjs().date()} 天</span>
            <Progress size={['100%', 16]} strokeColor='#f20c00a7' percent={Number((dayjs().get('date') / dayjs().endOf('month').date() * 100).toFixed(2))}/>
            <span>今年已经度过了 {dayjs().dayOfYear()} 天</span>
            <Progress size={['100%', 20]} strokeColor='#f00056' percent={Number((dayjs().dayOfYear() / dayjs().endOf('year').dayOfYear() * 100).toFixed(2))}/>
            <span>{`距离新年还有${Math.floor(countdown.asDays())}天${countdown.format('H时m分s秒')}`}</span>
        </div>
    )
}

export default TimeCapsule
