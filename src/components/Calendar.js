import React  from 'react'
import styled from'styled-components'
import MainCalendar from './MainCalendar'
import CalendarHeader from './CalendarHeader'

const CalendarWrap = styled.div`
    padding-bottom: 36px;
    margin-top : 49px;
    padding-left : 12px;
    padding-right : 12px;
    display : flex;
    flex-direction : column;
    width : 90vw;
    height : 60vw;
    max-width : 960px;
    max-height : 640px;
    border-radius: 14px;
    box-shadow : 0 5px 50px rgb(0 0 0 / 10%);
`
function Calendar(){
    return (
        <CalendarWrap>
            <CalendarHeader/>
            <MainCalendar/>
        </CalendarWrap>
    )
}


export default Calendar