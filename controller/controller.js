import compressTitle from "./textCompressorToFit.js"
import imageListView,{imageView,titleView,assignSelectedClassView} from "../view/views.js";
import model from "../model/model.js";

const controller={
    // ----------------------------------when site load/refreshes-------------------------
    onload(){
        let selectedImageId;
        let data;
        if(this.getLocalStorage()){
            //If localStorage has compressedData reload the previous state using it
            selectedImageId=this.getLocalStorage().selectedImageId;
            data=this.getLocalStorage().data;
            this.handleChangeInData(data);
            this.handleChangeInCurrentImageId(selectedImageId);
        }
        else{
            data=this.getData();
            selectedImageId=this.getCurrentImageId();
        }

        this.updateListHandler(data);
        this.updateImageHandler(data[selectedImageId]);
        this.updateTitleHandler(data[selectedImageId]);               
        this.assignSelectedClassHandler(selectedImageId,selectedImageId);
    }      
    ,

    // ----------------------------------------MODEL Controller----------------------------------------------
    handleChangeInCurrentImageId(selectedImageId){
        model.setCurrentImageId(selectedImageId);
    }
    ,
    handleChangeInData(data){
      model.setData(data);
    }
    ,
    handleChangeInLocalStorage(selectedImageId,data){
      model.setLocalStorage(selectedImageId,data);
    }
    ,
    getCurrentImageId(){
      return model.getCurrentImageId();
    }
    ,
    getData(){
      return model.getData();
    }
    ,
    getLocalStorage(){
      return model.getLocalStorage();
    }
    ,

    // -----------------------------------------------VIEW Controller--------------------------------------------
    updateListHandler(data){
      const eventHandlers={
        clickEventHandler:this.clickEventHandler.bind(this),
        keyUpDownEventHandler:this.keyUpDownEventHandler.bind(this),
        inputEventHandler:this.inputEventHandler.bind(this),
        resizeWindowEventHandler:this.resizeWindowEventHandler.bind(this)
      }
      imageListView.imageList(data,this.compressTitleHandler,eventHandlers);
    }
    ,
    updateImageHandler(currentImageData){
        imageView.updateImage(currentImageData); 
    }
    ,
    updateTitleHandler(imageTitle){
      titleView.updateTitle(imageTitle);
    }
    ,
    assignSelectedClassHandler(oldImageId,currentImageId){
      assignSelectedClassView.updateSelectedClass(oldImageId,currentImageId);
    }
    ,
    compressTitleHandler(title){
      return compressTitle(title);
    }
    ,

    // ----------------------------------------EVENT Handler--------------------------------
    clickEventHandler(event,currentImageId){
        //we have added a single click eventListener on listItem container
        //and have managed click event on all listItem (Event-Bubling)
        currentImageId=Number(currentImageId);
        let oldImageId=this.getCurrentImageId();
    
        this.assignSelectedClassHandler(oldImageId,currentImageId);
        this.updateImageHandler(this.getData()[currentImageId]);
        this.updateTitleHandler(this.getData()[currentImageId]);

        this.handleChangeInCurrentImageId(currentImageId);
        this.handleChangeInLocalStorage(currentImageId,this.getData());  

    }
    ,
    keyUpDownEventHandler(event){
      const data=this.getData();
      const n=data.length;
      const oldSelected=this.getCurrentImageId();
      if(event.key==="ArrowUp"){
          this.handleChangeInCurrentImageId((oldSelected-1+n)%n);
      }
      else if(event.key==="ArrowDown"){
          this.handleChangeInCurrentImageId((oldSelected+1)%n);
      }
      else return;

      const newSelected=this.getCurrentImageId();
      this.assignSelectedClassHandler(oldSelected,newSelected);
      this.updateImageHandler(data[newSelected]);
      this.updateTitleHandler(data[newSelected]);

      this.handleChangeInLocalStorage(newSelected,data);
    }
    ,
    inputEventHandler(event){
        let title=event.target.value;
        let data=this.getData();
        data[this.getCurrentImageId()].title=title;
        this.handleChangeInData(data);

        title=this.compressTitleHandler(title);
        document.querySelector(".selected .image-title")
        .innerText=title;
        
        this.handleChangeInLocalStorage(this.getCurrentImageId(),this.getData());
    }
    ,
    resizeWindowEventHandler(event){
        this.getData().forEach(({previewImage,title},index)=>{
            document.querySelector(`.item-${index} .image-title`).innerText=this.compressTitleHandler(title);
        })
    }
}

export default controller;