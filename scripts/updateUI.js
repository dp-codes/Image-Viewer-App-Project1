const listItems=document.querySelector(".list-items");

//convert large sentences into small so that it can fit into 
export function compressTitle(title){
    let str=title.slice(0,14);
    str+="....";
    str+=title.slice(title.length-12,title.length);
    //console.log(str);
    return str;
}

//traverse the array and render all listItem within leftPanel
export default function updateUI(data){
    let str="";
    data.forEach(({previewImage,title},index)=>{
        if(title.length>25){
            title=compressTitle(title);
        }
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

