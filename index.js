const fetch = require("node-fetch");
const fs = require("fs");

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

    console.log("取得しました");

    const json = {
        "id": data.videoDetails.videoId,
        "title": data.videoDetails.title,
        "description": data.videoDetails.shortDescription,
        "length": data.videoDetails.lengthSeconds,
        "keywords": data.videoDetails.keywords,
        "thumbnails": data.videoDetails.thumbnail.thumbnails,
        "data": data.streamingData.formats.map(format=>({
            "url": format.url,
            "type": format.mimeType,
            "width": format.width,
            "height": format.height,
            "fps": format.fps,
            "quality": format.qualityLabel
        }))
    }

    fs.writeFileSync("file.json",JSON.stringify(json,null,"    "),"utf8");
} 

getURL(ID);