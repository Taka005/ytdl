const fetch = require("node-fetch");

const ID = "FMEl7qM0Gd4";

const getURL = async(ID)=>{
    const data = await fetch("https://www.youtube.com/youtubei/v1/player",{
        "method": "POST",
        "headers":{
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(
            {  
                "context":{
                    "client":{
                        "hl": "ja",
                        "clientName": "WEB",
                        "clientVersion": "2.20210721.00.00",
                        "clientFormFactor": "UNKNOWN_FORM_FACTOR",
                        "clientScreen": "WATCH",
                        "mainAppWebInfo":{
                            "graftUrl": `/watch?v=${ID}`,
                        }
                    },
                    "user":{
                        "lockedSafetyMode": false
                    },
                    "request":{
                        "useSsl": true,
                        "internalExperimentFlags": [],
                        "consistencyTokenJars": []
                    }
                },
                "videoId": ID,  
                "playbackContext":{
                    "contentPlaybackContext":{
                        "vis": 0,
                        "splay": false,
                        "autoCaptionsDefaultOn": false,
                        "autonavState": "STATE_NONE",
                        "html5Preference": "HTML5_PREF_WANTS",
                        "lactMilliseconds": "-1"
                    }
                },
                "racyCheckOk": false,
                "contentCheckOk": false
            }    
        )
    })
    .then(res=>res.json())
    .catch(err=>console.log(err))

    console.log(data.streamingData.formats[0].url);
} 

getURL(ID);