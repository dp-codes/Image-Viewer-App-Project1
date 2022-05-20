import getImages from "./fetchImages.js";
import updateUI from "./updateUI.js";
const itemLists=document.querySelector(".list-items");
const selectedImage=document.querySelector(".image-wrapper img");
const body=document.body;
let selected=0;

let ImageData;
getImages()
.then((data)=>{
    updateUI(data);
    ImageData=data;
    document.querySelector('.item-0').classList.add("selected");
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

itemLists.addEventListener('click',(e)=>{
    const targetItem=getItemNumber(e.target);
    console.log(targetItem);
    removePreviousSelectedClassAndAddClassOnSelected(targetItem.itemNumber);
    updateImageUI(targetItem.itemNumber);
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
})


