import React,{useEffect, useRef, useState} from 'react'
import styled from 'styled-components'
import {useSelector} from 'react-redux'
import transformation from '../utils/transformation'
const Wrap = styled.div`
    display : grid;
    grid-template-columns: repeat(7,6fr);
    grid-column-gap: 6px;
    grid-row-gap: 6px;
    height : 85%;
`
const Day = styled.div`
    background : ${day => day.show ? '#f5f5f7':'#FCFCFD'};
    color : ${day => day.show ? 'black': 'gray'};
    display : flex;
    justify-content : space-between;
    flex-direction : column;
    border-radius : 4px;
    min-width: 100%;
    height : 8.5vw;
    max-height : 90px;
    line-height: 10px;
    font-weight: 600;
`   
const Dates = styled.div`
    margin : 4px;
    font-size : min(1.8vw, 16px);
`
const Money = styled.div`
    margin : 4px;
    display : flex;
    flex-direction : column;
`
const Income = styled.div`
    display : ${day => day.day.IN_total > 0 ? 'block' : 'None'};
    color : blue;
    text-align : right;
    height : min(1.8vw, 16px);
    font-size : min(1.5vw, 16px);
`
const Expediture = styled.div`
    display : ${day => day.day.EX_total < 0 ? 'block' : 'None'};
    color : red;
    text-align : right;
    height : min(1.8vw, 16px);
    font-size : min(1.5vw, 16px);
`
const useMonthArray = (today, lists) => {
    let thisMonth = new Date(today.getFullYear(), today.getMonth(),1)
    let dayOfFirstDate = thisMonth.getDay()
    let startDate = new Date(thisMonth)
    let startDateTime = startDate.getTime()
    startDate.setMonth(startDate.getMonth()+1)
    let endDateTime = startDate.getTime()
    if(dayOfFirstDate !== 0){
        thisMonth.setDate(-dayOfFirstDate)
    }else{
        thisMonth.setDate(thisMonth.getDate()-1)
    }
    const weekArray = Array.from({length : 42}, ()=> {
        thisMonth.setDate(thisMonth.getDate()+1)
        return (thisMonth.getTime() >= startDateTime && thisMonth.getTime() < endDateTime)?
        {
            date : thisMonth.getDate(),
            IN_total : lists.filter(account => 
                    account.type === 'income' && 
                    account.date === thisMonth.getDate())
                    .map(account => account.amount)
                    .reduce((a,b)=>a+b,0),
            EX_total : lists.filter(account => 
                account.type === 'expediture' &&
                account.date === thisMonth.getDate())
                .map(account => account.amount)
                .reduce((a,b)=>a+b,0),
            show : true,
        }:
        {
            date : thisMonth.getDate(),
            IN_total : 0,
            EX_total : 0,
            show : false
        }
    })
    return weekArray
}

function MainCalendar(){
    const list = useSelector((state)=> (state.incomeExpeditureReducer).list)
    const {blueBtn, redBtn, year, month} = useSelector((state) => state.showListReducer)
    const [size, setWidth] = useState(500)
    const target = useRef()
    const setWindowSize = () => {
        if(target.current){
            setWidth(target.current.offsetWidth)
        }
    }
    useEffect(() => {
        window.addEventListener('resize',setWindowSize)
    },[])
    let today = new Date(year,month)
    let accountList = []
    if(blueBtn && !redBtn){
        accountList = list.filter(account => account.type === 'income' &&
            account.year === today.getFullYear() &&
            account.month === today.getMonth())
    }else if (!blueBtn && redBtn){
        accountList = list.filter(account => account.type === 'expediture' &&
            account.year === today.getFullYear() &&
            account.month === today.getMonth())
    }else{
        accountList = list.filter(account => account.year === today.getFullYear() &&
            account.month === today.getMonth())
    }
    const weekArray = useMonthArray(today, accountList)
    return (
        <Wrap>
            {weekArray.map((day,index) =>
                <Day show = {day.show} key={index} ref={target}>
                    <Dates>
                        {day.date}
                    </Dates>
                    <Money>
                        <Income day = {day}>{ String(day.IN_total).length*10 <= size? '+' + transformation(day.IN_total):'$'}</Income>
                        <Expediture day = {day}>{String(day.EX_total).length*10 <= size? transformation(day.EX_total) : '$'}</Expediture>
                    </Money>
                </Day>)}
        </Wrap>
    )
}

export default MainCalendar