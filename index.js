// const express = require("express");

// const app = express();

// app.use(express.json);

// app.listen(3002, () => {
//     console.log("server running")
// })

import { LiveChat, RateLimitError } from "youtube-chat-next";

const liveChat = new LiveChat({ handle: ""}); // other options are channelId, liveId and handle (handles start with @); can also set a polling rate as a second variable if you so desire

liveChat.on("start", (liveId) => {
    console.log("Live chat started for: ", liveId);
})

liveChat.on("chat", (chatItem) => {
    console.log(chatItem.author.name, ": ", chatItem.message);
})

liveChat.on("end", (reason) => {
    console.log("Stream ended: ", reason);
})

liveChat.on("error", (err) => {
    if(err instanceof RateLimitError)
        console.error("Rate limited, turning down")
    // else if (err instanceof ScrapeError)
    //     console.error("Youtube structure changed. Stopping")
    else
        console.error("Error: ", err);
})

const ok = await liveChat.start()
if(!ok) {
    console.log("failled to start")
}

// liveChat.stop("Stream ended by reciever");