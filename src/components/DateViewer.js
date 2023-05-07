import React from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { DateSet } from '../redux/reducers/showListReducer'
const Controler = styled.div`
    display : flex;
    justify-content : center;
`
const DateSetContainer = styled.div`
    width : 100%;
    background : white;
    text-align : center;
    font-weight : 600;
    font-size : 60px;
`
const Years = styled.div`
    font-size : 12px;
    color : gray;
`
const Monthselector = styled.div`
    width : 33.33333%;
    margin : 72px 0;
    color : gray;
    &:hover{
        color : black;
        cursor : pointer;
    }
`
const Now = styled.div`
    width : 33.33333%;
    margin: 72px 0;
`
const monthList = [
    'Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan'
]

function DateViewer(){//날짜 출력
    const {year,month} = useSelector((state => ({
        year : (state.showListReducer).year,
        month : (state.showListReducer).month
    })))
    let date = new Date(year,month)
    const dispatch = useDispatch()
    const onIncrease = () =>{
        date.setMonth(month+1)
        dispatch(DateSet({year : date.getFullYear(), month : date.getMonth()}))
    }
    const onDecrease = () =>{
        date.setMonth(month-1)
        dispatch(DateSet({year : date.getFullYear(), month : date.getMonth()}))
    }
    return(
        <DateSetContainer>
            <Controler>
                <Monthselector onClick={()=>onDecrease()}>
                    <Years>
                    {new Date(date.getFullYear(),month-1).getFullYear()}
                    </Years>
                    {monthList[new Date(date.getFullYear(),month-1).getMonth()]}
                </Monthselector>
                <Now>
                    <Years>
                        {date.getFullYear()}
                    </Years>
                    {monthList[month]}
                </Now>
                <Monthselector onClick={()=>onIncrease()}>
                    <Years>
                        {new Date(date.getFullYear(),month+1).getFullYear()}
                    </Years>
                    {monthList[month+1]}
                </Monthselector>
            </Controler> 
        </DateSetContainer>
    )
}

export default DateViewer