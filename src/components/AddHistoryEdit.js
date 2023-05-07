import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useRef, useState} from 'react';
import { editlist } from '../redux/reducers/incomeExpeditureReducer';
import {useHistory} from 'react-router-dom';
import styled,{keyframes,css} from 'styled-components';
import store from '../redux/store';

const retranslate = keyframes`
    0% {
        height:750px;
    }

    100% {
        height:0px;
        opacity:0px;
    }
`

const translate = keyframes`
    0% {
        height:0px;
        opacity:0;
    }
    100% {
        height:750px;
    }
`

const Wrapper = styled.div`
    border-bottom:0px;
    position:absolute;
    bottom:0px;
    width:600px;
    height:750px;
    background-color:white;
    z-index:0;
    border-radius:25px 25px 0px 0px;
    display:flex;
    flex-direction:column;
    align-items:center;
    box-shadow:0px 0px 20px grey;
    animation:${props=>props.active?css`${retranslate} 0.5s ease-in-out`:css`${translate} 0.5s ease-in-out`}
`;

const BtnWrapper = styled.div`  
    width:100%;
    height:6vh;
    display:flex;
    justify-content:center;
    margin-top:100px;
`;

const IncomeBtn = styled.button`
    width:210px;
    height:50px;
    margin-right:30px;
    text-align:center;
    font-size:25px;
    font-weight:bold;
    border-radius:10px;
    border:none;
    background:${props => props.active===true?'#424242':''};
    color:${props => props.active===true?'white':''};
`;

const ExpeditureBtn = styled.button`
    width:210px;
    height:50px;
    text-align:center;
    font-size:25px;
    font-weight:bold;
    border-radius:10px;
    border:none;
    background:${props => props.active===false?'#424242':''};
    color:${props => props.active===false?'white':''};
`;

const InputDayWrapper = styled.div`
    margin:50px 0 30px 0;
    display:flex;
    justify-content:center;
`;

const InputYear = styled.input`
    border:none;
    text-align:center;
    width:70px;
    outline:none;
    font-size:25px;
    font-weight:650;
    &:focus{
        color:#78909c;
    }
    padding:0;
`;

const InputDay = styled.input`
    border:none;
    text-align:center;
    width:40px;
    outline:none;
    font-size:25px;
    font-weight:650;
    &:focus{
        color:#78909c;
    }
    padding:0;
`;

const InputLabel = styled.input`
    width:450px;
    height:65px;
    border-radius:12px;
    outline:none;
    border:none;
    background-color:#f5f5f5;
    margin-bottom:25px;
    font-size:25px;
    padding-left:25px;
`
const InputAmount = styled.input`
    width:450px;
    height:65px;
    border-radius:12px;
    outline:none;
    border:none;
    background-color:#f5f5f5;
    margin-bottom:20px;
    font-size:25px;
    padding-left:25px;
`;

const InputLabelAmountWrapper = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:flex-end;
    margin-top:30px;
`;

const DoneButton = styled.button`
    width:500px;
    height:65px;
    border-radius:10px;
    margin-top:100px;
    outline:none;
    border:none;
    background-color:${props=>props.active?'#166ff3':'#f8123b'};
    color:white;
    font-size:30px;
    font-weight:700;
    &:hover{
        cursor:pointer;
    }
`;

const Xbutton = styled.button`
  position:absolute;
  top:2%;
  right:3%;
  z-index:1;
  width:30px;
  height:30px;
  text-align:center;
  border-radius:50%;
  font-size:15px;
  background-color:#424242;
  outline:none;
  border:none;
  color:white;
  font-weight:700;
  &:hover{
    cursor:pointer;
  }
`
const InputMoneyTypeWrapper = styled.div`
    width:250px;
    height:50px;
    display:flex;
    justify-content:space-between;
    margin:0 auto;
`;

const InputCashTypeBtn = styled.div`
    height:40px;
    width:100px;
    display:flex;
    justify-content:center;
    align-items:center;
    background:${props=>props.active==='현금'||props.active==='월급'?'#424242':'#f5f5f5'};
    color:${props=>props.active==='현금'||props.active==='월급'?'white':'black'};
    border-radius:10px;
    font-weight:700;
    &:hover{
        cursor:pointer;
    }
`;

const InputCardTypeBtn = styled.div`
    height:40px;
    width:100px;
    display:flex;
    justify-content:center;
    align-items:center;
    background:${props=>props.active==='카드'||props.active==='용돈'?'#424242':'#f5f5f5'};
    color:${props=>props.active==='카드'||props.active==='용돈'?'white':'black'};
    border-radius:10px;
    font-weight:700;
    &:hover{
        cursor:pointer;
    }
`;

const InputMoneyTypeText = styled.div`
    font-size:20px;
    height:20px;
`;


const date = new Date();
const nowyear = date.getFullYear();
const nowmonth = date.getMonth()<10?`0${date.getMonth()+1}`:`${date.getMonth()}`;
const nowdate = date.getDate()<10?`0${date.getDate()}`:`${date.getDate()}`;
const WEEK = ['SUN','MON','TUE','WEN','THU','FRI','SAT'];
const MONTH = [31,29,31,30,31,30,31,31,30,31,30,31];

const AddHistoryEdit = (props) => {

    let {inputType,label,amount,moneytype,id}=props.location.state;

    const type = inputType==='income'?true:false;
    const [closeBtn,setCloseBtn] = useState(false);
    const [moneyType,setMoneyType] = useState(moneytype);
    const yearRef = useRef(null);
    const monthRef = useRef(null);
    const dateRef = useRef(null);
    const amountRef = useRef(null);
    const labelRef = useRef(null);

    const history = useHistory();
    const dispatch = useDispatch();
    const {list:lists} = useSelector((state)=>state.incomeExpeditureReducer);

    const checkYearType = () => {
        const value = Number(yearRef.current.value);
        if(isNaN(value)||value<2000){
            yearRef.current.value = nowyear;
        }else {
            yearRef.current.value = value;
        }
    }//연도가 올바르게 입력되었는지 체크해주는 함수

    const checkMonthType = () => {
        let value = Number(monthRef.current.value);
        if(isNaN(value)||value>12||value<=0){
            monthRef.current.value = nowmonth;
        }else {
            value = value<10?`0${value}`:value;
            monthRef.current.value = value;
        }
    }//month가 올바르게 입력되었는지 체크해주는 함수

    const checkDateType = () => {
        let value = Number(dateRef.current.value);
        if(isNaN(value)||value>MONTH[Number(monthRef.current.value)-1]||value<=0){
            dateRef.current.value = nowdate;
        }else{
            value = value<10?`0${value}`:value;
            dateRef.current.value = value;
        }
    }//date가 올바르게 입력되었는지 체크하는 함수

    const checkAmountType = () => {
        const value = amountRef.current.value;
        if(isNaN(Number(value))){
            amountRef.current.value = '';
        }
    }

    const onClickMoneyType = (e) => {
        setMoneyType(e.target.innerText);
    }

    const onClickCloseBtn = () => {
        setCloseBtn(true);
        setTimeout(()=>{
            history.push('/accountbook');
        },490);
    }

    const onSubmit = (e) =>{
        e.preventDefault();
        if(moneyType===''){
            alert('유형체크를 해주세요');
            return;
        }
        onClickCloseBtn();
        const monthIndex = Number(monthRef.current.value)-1;
        const dayOfWeek = WEEK[new Date(`${yearRef.current.value}-${monthRef.current.value}-${dateRef.current.value}`).getDay()];
        const newlist = {
            type:inputType,
            amount:inputType==='income'?Number(amountRef.current.value):-1*Number(amountRef.current.value),
            label:labelRef.current.value,
            year:Number(yearRef.current.value),
            month:monthIndex,
            date:Number(dateRef.current.value),
            day:dayOfWeek,
            id:id,
            moneyType
        }

        const renewlist = lists.map((list)=>{
            if(list.id===id){
                return newlist;
            }else {
                return list;
            }
        })

        
        dispatch(editlist({
            list:renewlist
        }));
        localStorage.setItem('lists',JSON.stringify(store.getState().incomeExpeditureReducer.list));
    }

    return(
        <>   
            <Wrapper active={closeBtn}>
                    <BtnWrapper>
                        <IncomeBtn active={type}>Income</IncomeBtn>
                        <ExpeditureBtn active={type}>Expediture</ExpeditureBtn>
                    </BtnWrapper>
                        <Xbutton onClick={onClickCloseBtn}>X</Xbutton>
                    <form onSubmit={onSubmit}>
                        <InputDayWrapper>
                            <InputYear ref={yearRef} defaultValue={nowyear} maxLength="4" onBlur={checkYearType}></InputYear>
                            <InputDay ref={monthRef} defaultValue={nowmonth} maxLength="2" onBlur={checkMonthType}></InputDay>
                            <InputDay ref={dateRef} defaultValue={nowdate} maxLength="2" onBlur={checkDateType}></InputDay>
                        </InputDayWrapper>
                        <InputMoneyTypeWrapper>
                            <InputCashTypeBtn active={moneyType} onClick={onClickMoneyType}>
                                <InputMoneyTypeText>{type?'월급':'현금'}</InputMoneyTypeText>
                            </InputCashTypeBtn>
                            <InputCardTypeBtn active={moneyType} onClick={onClickMoneyType}>
                                <InputMoneyTypeText>{type?'용돈':'카드'}</InputMoneyTypeText>
                            </InputCardTypeBtn>
                        </InputMoneyTypeWrapper>
                        <InputLabelAmountWrapper>
                            <InputLabel ref={labelRef} maxLength="10" defaultValue={label} placeholder="Label" required></InputLabel>
                            <InputAmount ref={amountRef} maxLength="10" defaultValue={amount>0?amount:-1*amount} onBlur={checkAmountType} placeholder="Amount" required></InputAmount>
                            <DoneButton active={type} value='submit' type="submit">Done</DoneButton>
                        </InputLabelAmountWrapper>
                    </form>
            </Wrapper>
        </>
    );
}

export default AddHistoryEdit;