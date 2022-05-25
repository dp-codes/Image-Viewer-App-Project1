import compressTitle from "./textCompressorToFit.js"
import view from "../view/view.js";
import model from "../model/model.js";

const controller={
  //controls when site refresh
  onload(){
      if(model.getLocalStorage()){
          //If localStorage has compressedData reload the previous state using it
          const {itemNumber,storedata}=model.getLocalStorage();
          model.setData(storedata);
          model.setSelected(itemNumber);
          view.updateUI(storedata,compressTitle);
          view.removePreviousSelectedClassAndAddClassOnSelected(itemNumber,itemNumber);
          view.updateImageUI(storedata[itemNumber]);
          view.updateEditTitleUI(storedata[itemNumber]);
      }
      else{
         //for the first time when site loads
          const data=model.getData();
          const itemNumber=model.getSelected();
          view.updateUI(data,compressTitle);
          view.removePreviousSelectedClassAndAddClassOnSelected(itemNumber,itemNumber);
          view.updateImageUI(data[itemNumber]);
          view.updateEditTitleUI(data[itemNumber]);
      }
  }
  ,


  clickEventController(){
      view.addClickEvent(
           model.getSelected.bind(model),model.setSelected.bind(model),
           model.getData.bind(model),model.setLocalStorage.bind(model));
  }
  ,

  keyUpDownEventController(){
    view.addKeyUpDownEvent(
          model.getData.bind(model),model.getSelected.bind(model),
          model.setSelected.bind(model),model.setLocalStorage.bind(model));
  }
  ,

  inputEventController(){
    view.addInputEvent(
          compressTitle,model.getData.bind(model),model.setData.bind(model),
          model.getSelected.bind(model),model.setLocalStorage.bind(model));
  }

}

export default controller;