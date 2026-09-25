// const express = require("express");

// const app = express();

// app.use(express.json);

// app.listen(3002, () => {
//     console.log("server running")
// })

import { LiveChat, RateLimitError } from "youtube-chat-next";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process"

const rl = readline.createInterface({ input, output })

let IdType = -1;
let liveChat;

while(IdType === -1)
{
    const answer = await rl.question("handle, channelId, or liveId? ")

    if(answer === "handle")
        IdType = 0;
    else if(answer === "channelId")
        IdType = 1;
    else if(answer === "liveId")
        IdType = 2;
    else
        console.log("please select from one of the given choices (make sure you're spelling it right)");
}

console.log("ID type is: ", IdType);

const otherAnswer = await rl.question("id? ");

if(IdType === 0)
    liveChat = new LiveChat({ handle: otherAnswer}); // other options are channelId, liveId and handle (handles start with @); can also set a polling rate as a second variable if you so desire
else if(IdType === 1)
    liveChat = new LiveChat({ channelId: otherAnswer});
else if(IdType === 2)
    liveChat = new LiveChat({ liveId: otherAnswer});
else
    console.log("how did you get here?")



liveChat.on("start", (liveId) => {
    console.log("Live chat started for: ", liveId);
})

liveChat.on("chat", (chatItem) => {
    console.log(chatItem.author.name, ": ", chatItem.message[0].text);
})

liveChat.on("end", (reason) => {
    console.log("Stream ended: ", reason);
})

liveChat.on("error", (err) => {
    if(err instanceof RateLimitError)
        console.error("Rate limited, turning off")
    // else if (err instanceof ScrapeError)
    //     console.error("Youtube structure changed. Stopping")
    else
        console.error("Error: ", err);
})

const ok = await liveChat.start()
if(!ok) {
    console.log("failed to start")
}

// liveChat.stop("Stream ended by reciever");