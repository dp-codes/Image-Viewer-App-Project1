import data from "./jsonData.js";
// let selected=0;
// let localStorageData= JSON.parse(localStorage.getItem("imageData_selected"));
const model={
    //image number of current image
    selected:0,

    data:data,
    //fresh combined data(currentPageNumber+data) sent to localStorage
    localStorageData: JSON.parse(localStorage.getItem("locally_stored")),
    
    getSelected(){
        return this.selected;
    }
    ,
    setSelected(itemNumber){
        this.selected=itemNumber;
    }
    ,
    getData(){
       return this.data;
    },
    setData(data){
       this.data=data; 
    },
    getLocalStorage(){
        return this.localStorageData;
    }
    ,
    setLocalStorage(itemNumber,storedata){
        this.localStorageData={itemNumber,storedata};
        localStorage.setItem("locally_stored",JSON.stringify(this.localStorageData));
    }

}
export default model;