export const checkLocal  = () => {
    if(localStorage.getItem('lists')){
        return true;
    }else {
        return false;
    }
}