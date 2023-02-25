const fetch = require("node-fetch");
const fs = require("fs");
const config = require("./config.json");

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

    console.log("動画情報を取得しました");

    const json = {
        "id": data.videoDetails.videoId,
        "title": data.videoDetails.title,
        "description": data.videoDetails.shortDescription,
        "length": data.videoDetails.lengthSeconds,
        "keywords": data.videoDetails.keywords,
        "thumbnails": data.videoDetails.thumbnail.thumbnails,
        "video": data.streamingData.formats.map(format=>({
            "url": format.url,
            "type": format.mimeType,
            "width": format.width,
            "height": format.height,
            "fps": format.fps,
            "quality": format.qualityLabel
        }))
    }

    fs.writeFileSync("./video.json",JSON.stringify(json,null,"    "),"utf8");
    return json;
}

const getData = async()=>{
    const data = await getURL(config.ID);
    console.log("保存中 これには時間がかかります")
    const res = await fetch(data.video[1].url);
    res.body.pipe(fs.createWriteStream("./video.mp4"))
}

getData();