const imageListView={
    listItems: document.querySelector(".list-items"),
    editImageTitle: document.querySelector(".image-wrapper .editable-title")
    ,

    imageList(data,compressTitleHandler,eventHandlers){   
  
        this.listItems.addEventListener('click',(e)=>{
            if(e.target===this.listItems)return;
            let currentImageId=this.getImageId(e.target);
            
            eventHandlers.clickEventHandler(e,currentImageId);
        });
        this.editImageTitle.addEventListener("input",(e)=>{
            eventHandlers.inputEventHandler(e);   
        });
        document.addEventListener("keydown",(e)=>{
            eventHandlers.keyUpDownEventHandler(e);
        });
        window.addEventListener("resize",(e)=>{
            eventHandlers.resizeWindowEventHandler(e);
        });

        const allListItem=data.map(({previewImage,title},index)=>{
                                
                            title=compressTitleHandler(title);
                    
                            let li=document.createElement('li');
                            li.setAttribute('class',`list-item rounded-corners item-${index}`);
                            li.innerHTML=`
                                <div class="icon">
                                    <div class="image">
                                    <img src="${previewImage}" alt="${title}" class="rounded-corners">
                                    </div>    
                                </div>
                                <p class="image-title sm">${title}</p>
                            `;
                            return li;
                         });
        
        this.listItems.append(...allListItem);  
    }
    ,
    getImageId(clickedImaged){
        while(clickedImaged.parentNode!=this.listItems)
            clickedImaged=clickedImaged.parentNode;
        //class="list-item rounded-corners item-3 selected"
        return clickedImaged.classList[2].split('-')[1];
    }
};
export default imageListView;


export const imageView={
    selectedImage: document.querySelector(".image-wrapper img")
    ,
    updateImage({previewImage,title})
    {
        this.selectedImage.setAttribute('src',previewImage);
        this.selectedImage.setAttribute('alt',title);
    }
};

export const titleView={
    editImageTitle: document.querySelector(".image-wrapper .editable-title")
    ,
    updateTitle({title})
    {
        this.editImageTitle.value=title;
    }
};

export const assignSelectedClassView={
     // remove "selected" class from the previous selected 
    // and add same to the current selected image
    updateSelectedClass(oldImageId,currentImageId)
    { 
        let prevSelectedClassName=`.item-${oldImageId}`;                //we have added class to all image item-${0-n}
        let currentSelectedClassName=`.item-${currentImageId}`;         //eg:-item-0

        document.querySelector(prevSelectedClassName)
        .classList.remove("selected");

        document.querySelector(currentSelectedClassName)
        .classList.add("selected");
    }
};