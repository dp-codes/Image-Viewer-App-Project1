const ruler=document.querySelector(".ruler");


//convert large sentences into small 
//so that it can fit into desired place
export default function compressTitle(title){
    
    //"     dhiraj loves    javascript   very   much  "     ==>"dhiraj loves javascript very much"
    title=title.split(' ').filter(iswordisnotempty => iswordisnotempty).join(' ');
    
    //reducing length of very large sentence 
    //so that reduceTitleLength runs with low complexity
    if(title.length>=40){
        title=`${title.slice(0,18)}${title.slice(-18)}`;
    }

    return reduceTitleLength(title,245);   
}



//this func reduces length of text untill it fit into required space
// by calculating currentPixelLength and maxPixelLength
export function reduceTitleLength(title,maxPixelLength){

    if (lengthOfTextInPixel(title) > maxPixelLength)
    {   
        let len=Math.floor(title.length/2);
        while (lengthOfTextInPixel(title) > maxPixelLength)
        {
            title = `${title.slice(0,len)}...${title.slice(-len)}`;
            len--;
        }
    }

    return title;
}



//calculate length in pixel of text
export function lengthOfTextInPixel(title){
    ruler.textContent=title;
    return ruler.offsetWidth;
}




