# Enable standard Foundry chat messages for text messages
With this modification, you whenevrr you write a normal text chat message, it will use the standard Foundry chat message format/template instead of Sandbox customized.
This options is usuable if you and your player use primarly text chat as communication and will operate with normal Foundry functionalities(like if you select a token, the chat messages will be sent as from that token etc).

Sandbox rolls(from actor or as free roll(meaning dice command in the chat window)) will still use the Sandbox format.

If you dont mind some minor modification of sandbox core files, this can be done quite easily.

##  Warnings, notes and disclaimers
* :pushpin: Make a backup of your Sandbox world __**before**__ any editing! This modification, **if** implemented incorrectly or in a untested version(of Foundry/Sandbox) can corrupt your data. You have been warned.
* :pushpin: Make a backup of any Sandbox core file you edit __**before**__ any editing
* :warning: Any changes you have made to Sandbox core files will be overwritten when updating Sandbox to a newer version so save your edits somewhere to re-apply them again 


## Version Compability
This modification has been tested with the following versions  

Sandbox  | FoundryVTT
-------  | ----------
0.12.2   | 9.251

# Modification process

## Step 1

**AFTER MAKING A BACKUP OF THE ORIGINAL FILE**, edit the file \Data\systems\sandbox\module\sandbox.js like this:

In sandbox.js , find the function starting with 
``` javascript 
Hooks.on("renderChatMessage", async (app, html, data) => {
```

## Step 2 - For actor properties
In sandbox.js , inside the hook for renderChatMessage , find these lines of code
``` javascript
Hooks.on("renderChatMessage", async (app, html, data) => {
    //    console.log(app);
    //    console.log(data);
    //    console.log(html);

    let hide = false;
    let messageId = app.id;
    let msg = game.messages.get(messageId);

    let msgIndex = game.messages.contents.indexOf(msg);

    let _html = await html[0].outerHTML; 
```
And add the line
``` javascript
if(_html.includes("dice-roll") || _html.includes("table-draw") || _html.includes("roll-template") ){  
```
Now it will look like 
```javascript
Hooks.on("renderChatMessage", async (app, html, data) => {
    //    console.log(app);
    //    console.log(data);
    //    console.log(html);

    let hide = false;
    let messageId = app.id;
    let msg = game.messages.get(messageId);

    let msgIndex = game.messages.contents.indexOf(msg);

    let _html = await html[0].outerHTML;   
    if(_html.includes("dice-roll") || _html.includes("table-draw") || _html.includes("roll-template") ){  
```

Find the end of the hook function
```javascript 
    if (citemlink) {
        $(html).find(".roll-citemlink").click(ev => {
            let mylinkId = ev.target.getAttribute("id");

            if (mylinkId) {
                const item = game.items.get(mylinkId);
                item.sheet.render(true);
            }

        });
    }
});
```
before the closing 
```javascript
});
``` 
Add a 
```javascript
}
```
Now it will look like
```javascript
    if (citemlink) {
        $(html).find(".roll-citemlink").click(ev => {
            let mylinkId = ev.target.getAttribute("id");

            if (mylinkId) {
                const item = game.items.get(mylinkId);
                item.sheet.render(true);
            }

        });
    }

 }
});
```

Save the file
## Step 5 
In Foundry press F5 to refresh(reload the scripts) 
