import getImages from "./fetchImages.js";
import updateUI,{compressTitle} from "./updateUI.js";

const itemLists=document.querySelector(".list-items");
const selectedImage=document.querySelector(".image-wrapper img");
const EditImageTitle=document.querySelector(".image-wrapper input");
const body=document.body;

let selected=0;                      //image number of current image                     
let ImageData;                       //fetched json data is stored here
let compressedData;                  //fresh combined data(currentPageNumber+data) sent to localStorage

//If localStorage has compressedData reload the previous state using it
if(localStorage.getItem("imageData_selected")){

    const localstore=localStorage.getItem("imageData_selected");
    compressedData=JSON.parse(localstore);
    const {itemNumber,data}=compressedData;
    
    selected=itemNumber;
    ImageData=data;
   
    getImages()
    .then((data)=>{
        if(data.length!=ImageData.length){
            ImageData=data;
        }

        updateUI(ImageData);
        removePreviousSelectedClassAndAddClassOnSelected(selected);
        updateImageUI(selected);
        updateEditTitleUI(selected);
    })
    .catch(err=>console.log(err));
}
else{
//for the first time when site loads
    getImages()
    .then((data)=>{
        ImageData=data;
        compressedData={itemNumber:0,data};

        updateUI(data);
        removePreviousSelectedClassAndAddClassOnSelected(0);
        updateImageUI(0);
        updateEditTitleUI(0);
    })
    .catch(err=>console.log(err));
}





//gives image number of the selected item 
const getItemNumber=(item)=>{

    while(item.parentNode!=itemLists)
      item=item.parentNode;

    //class="list-item rounded-corners item-3 selected"
    return {itemNumber:item.classList[2].split('-')[1],item};
 };



// -----------------------------------------------eventListeners-----------------------------------------------------

//we have added a single click eventListener on listItem container
//and have managed click event on all listItem 
//using the concept of Event-Bubling
itemLists.addEventListener('click',(e)=>{
    if(e.target===itemLists)return;
    const targetItem=getItemNumber(e.target);
    //console.log(targetItem);
    removePreviousSelectedClassAndAddClassOnSelected(targetItem.itemNumber);
    updateImageUI(targetItem.itemNumber);
    updateEditTitleUI(targetItem.itemNumber);
});


//inorder to change the image by Arrowup and down key
//we need to just increase/decrease image number by 1
body.addEventListener("keydown",(e)=>{
    let itemNumber;
    let n=ImageData.length;
    if(e.key==="ArrowUp"){
        itemNumber=(selected-1+n)%n;
    }
    else if(e.key==="ArrowDown"){
        itemNumber=(selected+1)%n;
    }
    else return;

    removePreviousSelectedClassAndAddClassOnSelected(itemNumber);
    updateImageUI(itemNumber);
    updateEditTitleUI(itemNumber);
})

//as the user edit the image title in input bar
//it gets live updated wherever needed to be
EditImageTitle.addEventListener("input",(e)=>{
    let title=e.target.value;
    ImageData[selected].title=title;

    if(title.length>25){
        title=compressTitle(title);
    }
    document.querySelector(".selected .image-title")
    .innerText=title;

    compressedData.data.title=title;
    localStorage.setItem("imageData_selected",JSON.stringify(compressedData));
})




//    --------------------------------------some used function above-----------------------------------------------




// remove "selected" class from the previous selected 
// and add same to the current selected image
function removePreviousSelectedClassAndAddClassOnSelected(itemNumber)
{
    let prevSelectedClassName=`.item-${selected}`;                    //we have added class to all image item-${0-n}
    let currentSelectedClassName=`.item-${itemNumber}`;               //eg:-item-0

    document.querySelector(prevSelectedClassName)
    .classList.remove("selected");

    selected=itemNumber;

    document.querySelector(currentSelectedClassName)
    .classList.add("selected");

    //updating localstorage with fresh data
    compressedData.itemNumber=selected;
    localStorage.setItem("imageData_selected",JSON.stringify(compressedData));
}



//used to update display image by obtain data from array using current image number
function updateImageUI(itemNumber)
{
    selectedImage.setAttribute('src',ImageData[itemNumber].previewImage);
    selectedImage.setAttribute('alt',ImageData[itemNumber].title);
}

//updates input field with the title of current image
function updateEditTitleUI(itemNumber)
{
    EditImageTitle.value=ImageData[itemNumber].title;
}


