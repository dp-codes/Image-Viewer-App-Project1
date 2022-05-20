export default async function getImages(){
    const response= await fetch('../images.json');
    
    //console.log(response);
    if(response.statusText!='OK'){
        throw new Error("Data not fetched!");
    }
    const data=await response.json();
    //console.log(data);
    return data;
};