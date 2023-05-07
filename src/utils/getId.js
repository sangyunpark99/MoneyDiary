export const getId = (type,value) => {
    let id = value;
    const lists = JSON.parse(localStorage.getItem('lists'))
    .filter((list)=> list.type===type)

    if(lists.length!==0){
        id = ++lists[lists.length-1].id;
    }
    return id;
} 