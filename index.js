const fetch = require("node-fetch");

const ID = "FMEl7qM0Gd4";

const getURL = async(ID)=>{
    const data = await fetch("https://www.youtube.com/youtubei/v1/player",{
        "method": "POST",
        "headers":{
            "Content-Type": "application/json"
        },
        "body": JSON.stringify({  
            "context":{
                "client":{
                    "clientName": "WEB",
                    "clientVersion": "2.20210721.00.00",
                }
            },
            "videoId": ID
        })
    })
    .then(res=>res.json())
    .catch(err=>console.log(err))

    console.log(data.streamingData.formats[0].url);
} 

getURL(ID);