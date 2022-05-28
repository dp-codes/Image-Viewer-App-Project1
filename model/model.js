import imageData from "./imageData.js";

const model={
    //imageID of currentImage
    currentImageId:0,

    data:imageData,

    //stores latest state of {currentImageId,data} 
    localStorageData: JSON.parse(localStorage.getItem("storedData")),
    
    getCurrentImageId(){
        return this.currentImageId;
    }
    ,
    setCurrentImageId(imageId){
        this.currentImageId=imageId;
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
    setLocalStorage(selectedImageId,data){
        this.localStorageData={selectedImageId,data};
        localStorage.setItem("storedData",JSON.stringify(this.localStorageData));
    }

}
export default model;