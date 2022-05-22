const listItems=document.querySelector(".list-items");
import compressTitle from "./textCompressorToFit.js"

//traverse the array and render all listItem within leftPanel
export default function updateUI(data){
    let str="";
    data.forEach(({previewImage,title},index)=>{
            
        title=compressTitle(title);
         str+=`
        <div class="list-item rounded-corners item-${index}">
            <div class="icon">
               <img src="${previewImage}" alt="${title}" class="rounded-corners">
            </div>
            <p class="image-title sm">${title}</p>
        </div>`;
    });
    listItems.innerHTML=str;
    //console.log(str);
}

