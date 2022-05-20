const listItems=document.querySelector(".list-items");

const compressTitle=(title)=>{
    let str=title.slice(0,14);
    str+="....";
    str+=title.slice(title.length-12,title.length-1);
    console.log(str);
    return str;
}

export default function updateUI(data){
    let str="";
    data.forEach(({previewImage,title},index)=>{
        if(title.length>25){
            title=compressTitle(title);
        }
         str+=`
        <div class="list-item item-${index}">
            <div class="icon">
               <img src="${previewImage}" alt="${title}">
            </div>
            <p class="image-title sm">
             ${title}
            </p>
        </div>`;
    });
    listItems.innerHTML=str;
    console.log(str);
}
