import getImages from "./fetchImages.js";
import updateUI,{compressTitle} from "./updateUI.js";
const itemLists=document.querySelector(".list-items");
const listItemText=document.querySelector(".image-title");
const selectedImage=document.querySelector(".image-wrapper img");
const EditImageTitle=document.querySelector(".image-wrapper input");
const body=document.body;
let selected=0;

let ImageData;
getImages()
.then((data)=>{
    updateUI(data);
    ImageData=data;
    
    removePreviousSelectedClassAndAddClassOnSelected(0);
    updateImageUI(0);
    updateEditTitleUI(0);
})
.catch(err=>console.log(err));


function removePreviousSelectedClassAndAddClassOnSelected(itemNumber){
      let prevSelectedClassName=`.item-${selected}`;
      let currentSelectedClassName=`.item-${itemNumber}`;

  document.querySelector(prevSelectedClassName)
    .classList.remove("selected");

    selected=itemNumber;
  
    document.querySelector(currentSelectedClassName)
    .classList.add("selected");
}

const getItemNumber=(item)=>{

   while(item.parentNode!=itemLists)
     item=item.parentNode;

     return {itemNumber:item.classList[1].split('-')[1],item};
};

function updateImageUI(itemNumber){
    selectedImage.setAttribute('src',ImageData[itemNumber].previewImage);
    selectedImage.setAttribute('alt',ImageData[itemNumber].title);
}

function updateEditTitleUI(itemNumber){
    EditImageTitle.value=ImageData[itemNumber].title;
}

itemLists.addEventListener('click',(e)=>{
    if(e.target===itemLists)return;
    const targetItem=getItemNumber(e.target);
    console.log(targetItem);
    removePreviousSelectedClassAndAddClassOnSelected(targetItem.itemNumber);
    updateImageUI(targetItem.itemNumber);
    updateEditTitleUI(targetItem.itemNumber);
});

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

EditImageTitle.addEventListener("input",(e)=>{
    let title=e.target.value;
    ImageData[selected].title=title;
    // if(title.length>25){
    //     title=compressTitle(title);
    // }
    updateUI(ImageData);
    // console.log(title);
    // listItemText.innerText=title;
})


