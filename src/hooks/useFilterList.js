import {useSelector} from 'react-redux';

const useFilterList = (type,month,year) => {
    let {list:lists} = useSelector((state)=>state.incomeExpeditureReducer);

    if(type==='income'||type==='expediture'){
        lists = lists.filter((list)=>list.type===type&&list.month===month&&Number(list.year)===year)

    }else{
        lists = lists.filter((list)=>list.month===month&&Number(list.year)===year)
    }
    lists.sort((a,b)=>{
        return a.date-b.date;
    })
    return lists;
}

export default useFilterList;