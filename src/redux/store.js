import {incomeExpeditureReducer} from './reducers/incomeExpeditureReducer';
import  showListReducer  from './reducers/showListReducer';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer : {
        incomeExpeditureReducer : incomeExpeditureReducer.reducer,
        showListReducer : showListReducer
    }
});


export default store;