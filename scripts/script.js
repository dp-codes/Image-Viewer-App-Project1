const listItems=document.querySelector(".list-items");


const getImages=async()=>{
    const response= await fetch('../images.json');
    console.log(response);
    if(response.statusText!='OK'){
        throw new Error("Data not fetched!");
    }
    const data=await response.json();
    return data;
}

const compressTitle=(title)=>{
    let str=title.slice(0,14);
    str+="....";
    str+=title.slice(title.length-12,title.length-1);
    console.log(str);
    return str;
}

const updateUI=(data)=>{
    let str="";
    data.forEach(({previewImage,title})=>{
        if(title.length>25){
            title=compressTitle(title);
        }
         str+=`
        <div class="list-item">
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
getImages()
.then((data)=>{
    updateUI(data);
})
.catch(err=>console.log(err));


