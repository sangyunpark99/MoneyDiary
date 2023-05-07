import { createSlice } from "@reduxjs/toolkit";

const showListReducer = createSlice({
    name : 'showListReducer',
    initialState :{
        type:'incomeExpediture',
        month:new Date().getMonth(),
        year:new Date().getFullYear(),
        blueBtn:false,
        redBtn:false,
        moneyType:''
    },
    reducers :{
        Type(state,action){
            const {kind} = action.payload
            return{
                ...state,
                type : kind
            }
        },

        DateSet(state,action){
            const {month, year} = action.payload
            return {
                ...state,
                month : month,
                year : year
            }
        },
        Btn(state,action){
            const {blueBtn,redBtn} = action.payload
            return{
                ...state,
                blueBtn : blueBtn,
                redBtn : redBtn
            }
        }
    }
})

export const {Type,DateSet,Btn,MoneyType} = showListReducer.actions
export default showListReducer.reducer