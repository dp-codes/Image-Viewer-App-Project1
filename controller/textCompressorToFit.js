const ruler=document.querySelector(".ruler");
const listItems=document.querySelector(".list-items");

export default function compressTitle(title){
    
    //"     dhiraj loves    javascript   very   much  "     ==>"dhiraj loves javascript very much"
    title=title.split(' ').filter(word => word).join(' ');

    let maxPixelLength=listItems.offsetWidth*0.77;          

    let len=maxLengthWhichFits(title,maxPixelLength); 
    let half=Math.floor(len/2);

    return (title.length==len) ? title : `${title.slice(0,half)}...${title.slice(-half)}`;
}

//this func reduces length of text untill it fit into required space
// by calculating currentPixelLength and maxPixelLength
function maxLengthWhichFits(title,maxPixelLength){

    if (lengthOfTextInPixel(title) > maxPixelLength)
    {   
        let l=0,h=title.length,mid;

        while(h-l>1){
            mid=l+(h-l)/2;

            if(lengthOfTextInPixel(title,mid) > maxPixelLength){
                h=mid;
            }
            else l=mid;
        }
        return l;
    }
    else return title.length;
}

//calculate length in pixel of text
function lengthOfTextInPixel(title,len){

    const half=Math.floor(len/2);
    title=`${title.slice(0,half)}...${title.slice(-half)}`;
    ruler.textContent=title;
    return ruler.offsetWidth;
}
