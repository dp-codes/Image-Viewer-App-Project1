const listItems=document.querySelector(".list-items");
const selectedImage=document.querySelector(".image-wrapper img");
const EditImageTitle=document.querySelector(".image-wrapper input");
const body=document.body;

 const view={
    //update ui of left panel of list item
    updateUI(data,compressTitle){
        data.map(({previewImage,title},index)=>{
                
            title=compressTitle(title);
    
            let div=document.createElement('div');
            div.setAttribute('class',`list-item rounded-corners item-${index}`);
            div.innerHTML=`
                <div class="icon">
                    <img src="${previewImage}" alt="${title}" class="rounded-corners">
                </div>
                <p class="image-title sm">${title}</p>
            `;
            listItems.appendChild(div);
        });
    }
    ,

    //used to update display image by obtain data from array using current image number
    updateImageUI({previewImage,title})
    {
        selectedImage.setAttribute('src',previewImage);
        selectedImage.setAttribute('alt',title);
    }
    ,

    //updates input field with the title of current image
    updateEditTitleUI({title})
    {
        EditImageTitle.value=title;
    }
    ,

    //gives item number of clicked item
    getItemNumber(item){
        while(item.parentNode!=listItems)
          item=item.parentNode;
        //class="list-item rounded-corners item-3 selected"
        return item.classList[2].split('-')[1];
     }
     ,

     // remove "selected" class from the previous selected 
    // and add same to the current selected image
    removePreviousSelectedClassAndAddClassOnSelected(oldItemNumber,itemNumber)
    { 
        let prevSelectedClassName=`.item-${oldItemNumber}`;                //we have added class to all image item-${0-n}
        let currentSelectedClassName=`.item-${itemNumber}`;               //eg:-item-0

        document.querySelector(prevSelectedClassName)
        .classList.remove("selected");

        document.querySelector(currentSelectedClassName)
        .classList.add("selected");
    }
    ,

    // --------------------------EventListeners-----------------------------------------------------

     //we have added a single click eventListener on listItem container
     //and have managed click event on all listItem 
     //using the concept of Event-Bubling
     addClickEvent(getSelected,setSelected,getData,setLocalStorage){
        listItems.addEventListener('click',(e)=>{
            if(e.target===listItems)return;
            let itemNumber=this.getItemNumber(e.target);
            itemNumber=Number(itemNumber);
            const oldItemNumber=getSelected();
 
           this.removePreviousSelectedClassAndAddClassOnSelected(oldItemNumber,itemNumber);
            this.updateImageUI(getData()[itemNumber]);
            this.updateEditTitleUI(getData()[itemNumber]);
            setSelected(itemNumber);
            setLocalStorage(itemNumber,getData());
        });
    }
    ,

    //inorder to change the image by Arrowup and down key
    //we need to just increase/decrease image number by 1
    addKeyUpDownEvent(getData,getSelected,setSelected,setLocalStorage){

        body.addEventListener("keydown",(e)=>{

            const data=getData();
            const n=data.length;
            const oldSelected=getSelected();
            if(e.key==="ArrowUp"){
                setSelected((oldSelected-1+n)%n);
            }
            else if(e.key==="ArrowDown"){
                setSelected((oldSelected+1)%n);
            }
            else return;
            const newSelected=getSelected();
            this.removePreviousSelectedClassAndAddClassOnSelected(oldSelected,newSelected);
            this.updateImageUI(data[newSelected]);
            this.updateEditTitleUI(data[newSelected]);

            setLocalStorage(newSelected,data);
        })
    }
    ,

    //as the user edit the image title in input bar
    //it gets live updated wherever needed to be
    addInputEvent(compressTitle,getData,setData,getSelected,setLocalStorage){

        EditImageTitle.addEventListener("input",(e)=>{
            let title=e.target.value;
            let data=getData();
            data[getSelected()].title=title;
            setData(data);

            title=compressTitle(title);
            document.querySelector(".selected .image-title")
            .innerText=title;
            
            setLocalStorage(getSelected(),getData());
        })
    }
}
export default view;


