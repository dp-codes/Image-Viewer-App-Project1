const listItems=document.querySelector(".list-items");
import getImages from "./fetchImages.js";
import updateUI from "./updateUI.js";


getImages()
.then((data)=>{
    updateUI(data);
})
.catch(err=>console.log(err));


