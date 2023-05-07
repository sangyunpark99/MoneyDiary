import React from 'react'
import styled from 'styled-components'
const Header = styled.div`
    display : grid;
    grid-template-columns: repeat(7,1fr);
    grid-row-gap: 6px;
    height : 15%;
`
const DayOfWeek = styled.div`
    display : flex;
    justify-content : center;
    align-items : center;
    font-weight : 600;
    font-size : 16px;
    line-height : 20px;
    text-align : center;
`
function CalendarHeader(){
    const dayArray = ['SUN','MON','TUE','WED','THU','FRI','SAT']
    return (
        <Header>
            {dayArray.map((day,index) => <DayOfWeek key={index}>{day}</DayOfWeek>)}
        </Header>
    )
}
export default CalendarHeader