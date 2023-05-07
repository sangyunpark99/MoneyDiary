import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import useGiveSum from '../hooks/useGiveSum';
import { DateSet,Btn,Type } from '../redux/reducers/showListReducer';
import styled, { keyframes } from 'styled-components';

const Wrapper = styled.div`
    width:100%;
    height:100px;
    margin-top:40px;
    display:flex;
    justify-content:center;
`;

const MWrapper = styled.header`
    width:80%;
    height:100%;
    font-weight:600;
    display:flex;
    align-items:center;
    margin:72px 0px 0px 0;
`;

const MonthWrapper = styled.div`
    display:flex;
    font-size:60px;
    padding-bottom:2px;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    width:33.3333%;
`;

const Years = styled.div`
    font-size:18px;
    color:#979797;
    font-weight:500;
`;

const Months = styled.div`
    text-align:center;
`;

const Button = styled.button`
    padding:0px;
    outline:none;
    font-size:55px;
    border:none;
    background-color:white;
    color:#979797;
    transition : all .3s;
    &:hover{
        cursor:pointer;
        color:black;
    }
    &:hover{
        transform : translateY(-10%);
    }
`
const WhiteToBlue = keyframes`
    0%{
        background : white;
        color : #166ff3;
    }
    100%{
        background : #166ff3;
        color : white;
    }
`
const WhiteToRed = keyframes`
    0%{
        background : white;
        color : #f8123b;
    }
    100%{
        background : #f8123b;
        color : white;
    }
`
const BlueButton = styled.button`
    border:2px solid #166ff3;
    font-size:25px;
    font-weight:800;
    border-radius:15px;
    width:280px;
    height:55px;
    margin-right:15px;
    background:${props=>props.active==='income'?"#166ff3":"white"};
    color:${props=>props.active==='income'?"white":"#166ff3"};
    transition : all .3s;
    &:hover{
        cursor:pointer;
        animation : ${WhiteToBlue}
    }
`
const RedButton = styled.button`
    border:2px solid red;
    font-size:25px;
    font-weight:800;
    border-radius:15px;
    width:280px;
    height:55px;
    background:${props=>props.active==='expediture'?"#f8123b":"white"};
    color:${props=>props.active==='expediture'?"white":"#f8123b"};
    transition : all 0.3s;
    &:hover{
        cursor:pointer;
        animation : ${WhiteToRed}
    }
`;

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

const SelectBar = () => {
    const {blueBtn,redBtn} = useSelector((state)=>state.showListReducer);
    let {type,month,year} = useSelector((state)=>state.showListReducer);
    const dispatch = useDispatch();

    let incomeSum=0;
    let expeditureSum=0;
    let newMonth = month;
    let newRightMonth = newMonth+1===12?0:newMonth+1;
    let newLeftMonth = newMonth-1===-1?11:newMonth-1;
    let newType = type;
    let newYear = year;
    let newBlueBtn = blueBtn;
    let newRedBtn = redBtn;

    const showMonth = (e) => {
        const direction = e.target.parentNode.value;
        if(direction==='right'){
            newMonth+=1
            if(newMonth===12){
                newMonth=0;
                newYear+=1;
            }
        }else{
            newMonth-=1;
            if(newMonth===-1){
                newMonth=11;
                newYear-=1;
            }
        }
        dispatch(DateSet({year:newYear,
            month:newMonth}));
    }

    incomeSum = useGiveSum('income',month,year);
    expeditureSum = useGiveSum('expediture',month,year);

    const clickBtn = (e) => {
        const value = e.target.value;
        if(value==='income'&&newBlueBtn===false){
            newType = 'income';
            newBlueBtn = true;
            newRedBtn = false;
        }else if(value==='expediture'&&newRedBtn===false){
           newType = 'expediture';
           newRedBtn = true;
           newBlueBtn = false;
        }else if(value==='income'&&newBlueBtn===true){
            newType = 'incomeExpediture';
            newBlueBtn = false;
        }else if(value ==='expediture'&&newRedBtn===true){
            newType = 'incomeExpediture';
            newRedBtn = false;
        }
        
        dispatch(Btn({
            redBtn:newRedBtn,
            blueBtn:newBlueBtn}));
        dispatch(Type({kind:newType}));
    }

    return (
        <>
            <MWrapper>
                <MonthWrapper>
                    <Button onClick={showMonth} value='left'>
                        <Years>{newMonth===0?year-1:year}</Years>
                        <Months>{MONTHS[newLeftMonth]}</Months>
                    </Button>
                </MonthWrapper>
                <MonthWrapper>
                    <Years>{year}</Years>
                    <Months>{MONTHS[newMonth]}</Months>
                </MonthWrapper>    
                <MonthWrapper>
                    <Button onClick={showMonth} value='right'>
                        <Years>{newMonth===11?year+1:year}</Years>
                        <Months>{MONTHS[newRightMonth]}</Months>
                    </Button>
                </MonthWrapper>   
            </MWrapper>
            <Wrapper>
                <BlueButton active={type} value={'income'} onClick={(e)=>clickBtn(e)}>+{incomeSum}</BlueButton>
                <RedButton active={type} value={'expediture'} onClick={(e)=>clickBtn(e)}>-{expeditureSum}</RedButton>
            </Wrapper>
        </>
    )
}

export default SelectBar;