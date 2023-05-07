import { useSelector } from 'react-redux';
import transformation from '../utils/transformation';

const useGiveSum = (type,month,year) => {
    const {list:lists} = useSelector((state)=>(state.incomeExpeditureReducer));
    let sum = lists.filter((list)=>list.type===type&&list.month===month&&Number(list.year)===year)
    .map((list)=>{
        return Number(list.amount);
    })
    .reduce((acc,cur)=>{
        return acc+cur;
    },0);
    if(sum<0){
        sum=-sum;
    }
    return transformation(sum);
}

export default useGiveSum;