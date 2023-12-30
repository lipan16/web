import React, {useEffect, useCallback, useMemo} from 'react'
import {useSetState, useUpdateEffect} from 'ahooks'
import {SolarMonth, HolidayUtil} from 'lunar-javascript'
import dayjs from 'dayjs'
import {DatePicker} from 'antd'

import {WEEK_HEADER} from '@/constants'
import './index.less'

const Calendar = () => {

    const [calendar, setCalendar] = useSetState({
        year: null,
        month: null,
        weekStart: 1, // 星期几作为一周的开始，1234560分别代表星期一至星期天
        weeks: [] // 日期按周数据
    })

    const weekHeads = useMemo(() => {
        return WEEK_HEADER
    }, [calendar.weekStart])

    // 将 day 转换成阴历并判断是否节日，节气，假期等
    const parseDay = useCallback(day => {
        const showDay = {}
        showDay.day = day.getDay()

        const lunar = day.getLunar() // 阴历
        // 当天是否阴历每月第一天
        let text = lunar.getDayInChinese()
        if(1 === lunar.getDay()){
            text = lunar.getMonthInChinese() + '月'
        }
        // 当天阳历节日 其他纪念日的数组 如：元旦节
        let otherFestivals = day.getOtherFestivals()
        if(otherFestivals.length > 0){
            text = otherFestivals[0]
            showDay.isFestival = true
        }
        // 当天阴历节日 其他纪念日的数组 如：寒衣节
        otherFestivals = lunar.getOtherFestivals()
        if(otherFestivals.length > 0){
            text = otherFestivals[0]
            showDay.isFestival = true
        }
        // 当天阳历节日 如：纪念日
        let festivals = day.getFestivals()
        if(festivals.length > 0){
            text = festivals[0]
            showDay.isFestival = true
        }
        // 当天阴历节日 如：春节
        festivals = lunar.getFestivals()
        if(festivals.length > 0){
            text = festivals[0]
            showDay.isFestival = true
        }
        // 当天阴历节气
        const jq = lunar.getJieQi()
        if(jq){
            text = jq
            day.isFestival = true
        }
        showDay.text = text

        if(dayjs(day.toYmd()).isToday()){ // 传入的 day 是今天
            showDay.isToday = true
        }
        if(day.getMonth() !== calendar.month){ // 传入的 day 非本月
            showDay.isOther = true
        }

        // 当天是否法定节假日
        const holiday = HolidayUtil.getHoliday(day.getYear(), day.getMonth(), day.getDay())
        if(holiday){
            showDay.isHoliday = true
            showDay.isRest = !holiday.isWork()
        }
        return showDay
    }, [calendar.month])

    useEffect(() => {
        setCalendar({
            year: dayjs().year(),
            month: dayjs().month() + 1
        })
    }, [])

    const onDatePickerChange = useCallback((date, dateString) => {
        setCalendar({year: date.year(), month: date.month() + 1})
    }, [])

    useUpdateEffect(() => {
        const solar = SolarMonth.fromYm(calendar.year, calendar.month)
        const weeks = []
        solar.getWeeks(calendar.weekStart).forEach(w => {
            const days = []
            w.getDays().forEach(day => {
                days.push(parseDay(day))
            })
            weeks.push({days, index: w.getIndexInYear()})
        })
        setCalendar({weeks})
    }, [calendar.year, calendar.month, calendar.weekStart])

    return (
        <section className='calendar-content'>
            <header>
                <DatePicker onChange={onDatePickerChange} picker='month' defaultValue={dayjs()} suffixIcon={null}/>
            </header>
            <div className='calendar' data-month={calendar?.month}>
                <ul className='calendar-week'>
                    {weekHeads.map(m => <li key={m} className={['六', '日'].includes(m) ? 'weekend' : ''}>星期{m}</li>)}
                </ul>
                <ul className='calendar-body'>
                    {calendar.weeks.map(week =>
                        week?.days.map(day =>
                            <li key={day.day}
                                className={`${day.isFestival ? 'festival' : ''} ${day.isToday ? 'today' : ''} ${day.isOther ? 'other' : ''} ${day.isRest ? 'rest' : ''}`}>
                                {day.day}
                                <i>{day.text}</i>
                                {day.isHoliday && <span>{day.isRest ? '休' : '班'}</span>}
                            </li>
                        )
                    )}
                </ul>
            </div>
        </section>
    )

}

export default Calendar
