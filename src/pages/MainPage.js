import React from 'react';
import AccountBook from './AccountBook';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AddHistory from '../components/AddHistory';
import Calendar from './Calendar';
import SelectBar from '../components/SelectBar';
import AddHistoryEdit from '../components/AddHistoryEdit';

const Wrapper = styled.div`
    width:100%;
    display:flex;
    height:60px;
    align-items:center;
    justify-content:center;
`;

const BtnWrapper = styled.nav`
    width:150px;
    margin-top:25px;
    display:flex;
    justify-content:space-between;
`;

const Btn = styled.button`
    width:30px;
    padding:0px;
    font-size:30px;
    border:none;
    outline:none;
    background:none;
    &:hover{
        cursor:pointer;
        transform:scale(1.3);
        transition:transform 0.5s linear;
    }
`;

const Stick = styled.div`
    width:2px;
    height:32px;
    background:black;
`;

const MainPage = () => {

    return(
        <>
            <Wrapper>
                <BtnWrapper>
                    <Link to={'/accountbook'}>
                        <Btn value='account'>
                            <i className="fas fa-coins"></i>
                        </Btn>
                    </Link>
                    <Stick></Stick>
                    <Link to={'/calendar'}>
                        <Btn value='calendar'>
                            <i className="fas fa-calendar-alt"></i>
                        </Btn>
                    </Link>
                </BtnWrapper>
            </Wrapper>
            <SelectBar/>
            
            <Route exact path='/' component={AccountBook}/>
            <Route exact path='/calendar' component={Calendar}/>
            <Route path='/accountbook'component={AccountBook}/>
            <Route exact path='/accountbook/addHistory' component={AddHistory}/>
            <Route path='/accountbook/addHistory/edit' component={AddHistoryEdit}/>
        </>
    );
}

export default MainPage;