WAPI.waitNewMessages(false, (data) => {
    console.log(data)
    data.forEach((message) => {
        console.log(`Message from ${message.from.user} checking..`);
        if (intents.blocked.indexOf(message.from.user) >= 0) {
            console.log("number is blocked by BOT. no reply");
            return;
        }
        if (message.type == "chat") {
            //message.isGroupMsg to check if this is a group
            if (message.isGroupMsg == true && intents.appconfig.isGroupReply == false) {
                console.log("Message received in group and group reply is off. so will not take any actions.");
                return;
            }
            var exactMatch = intents.bot.find(obj => obj.exact.find(ex => ex == message.body.toLowerCase()));
            if (exactMatch != undefined) {
                WAPI.sendSeen(message.from._serialized);
                WAPI.sendMessage2(message.from._serialized, exactMatch.response);
                console.log(`Replying with ${exactMatch.response}`);
            } else {
                console.log("No exact match found");
            }
            var PartialMatch = intents.bot.find(obj => obj.contains.find(ex => message.body.toLowerCase().search(ex) > -1));
            if (PartialMatch != undefined) {
                WAPI.sendSeen(message.from._serialized);
                WAPI.sendMessage2(message.from._serialized, PartialMatch.response);
                console.log(`Replying with ${PartialMatch.response}`);
            } else {
                console.log("No partial match found");
            }
        }
    });
});
WAPI.addOptions = function () {
    var suggestions = "";
    intents.smartreply.suggestions.reverse().map((item) => {
        suggestions += `<button 
                                        style="background-color: #eeeeee;
                                        margin: 5px;
                                        padding: 5px 10px;
                                        font-size: inherit;
                                        border-radius: 50px;">${item}</button>`;
    });
    var div = document.createElement("DIV");
    div.style.height = "40px";
    div.style.textAlign = "center";
    div.innerHTML = suggestions;
    div.classList.add("grGJn");
    var mainDiv = document.querySelector("#main");
    mainDiv.insertBefore(div, mainDiv.children[mainDiv.children.length - 3]);
    window.sendMessage().then(text => consolve.log(text));
}