# Trigger macro from Sandbox character sheet
If you dont mind some minor modification of sandbox core files, this can be done quite easily.

This modification uses Flags to carry arguments to the selected macro.(It is also possible to use the module Furnace for this but in this mod, flags works well enough)


## As always
* Make a backup of any Sandbox file you edit __**before**__ any editing
* Any changes you have made to Sandbox core files will be overwritten when updating Sandbox to a newer version so save your edits somewhere to re-apply them again 

## Version Compability
This modification has been tested with the following versions
Sandbox  | FoundryVTT
-------  | ----------
0.8.8    | 0.9.26



# Modification process
## Step 1
MAKING A BACKUP OF THE ORIGINAL FILE a-entity.js
## Step 2
Then(**AFTER MAKING A BACKUP OF THE ORIGINAL FILE**), edit the file a-entity.js like this:

In a-entity.js , find the function starting with 
``` javascript 
async rollSheetDice(rollexp,rollname,rollid,actorattributes,citemattributes,number=1,target=null)
```
## Step 3
In a-entity.js , inside the function rollSheetDice, find these lines of code
``` javascript
    async rollSheetDice(rollexp,rollname,rollid,actorattributes,citemattributes,number=1,target=null,rollcitemID = null){

        //console.log(rollexp);
        //console.log(rollid);
        //console.log(citemattributes);
        //console.log("rolling");
        //console.log(rollcitemID);

        let initiative=false;
        let gmmode=false;
        let blindmode=false;

        if(rollexp.includes("~blind~"))
            blindmode = true;
```

And, before 
```javascript
if(rollexp.includes("~blind~"))
 ```
add
```javascript
        // ----------------------------------------------------------------
        // macro modification
        if(rollexp.includes("~macro~")){
          // uses the rollname for macro name
          let macro = game.macros.getName(rollname);  
          if (macro!=null){                  
            // reset arguments(unset flag)
            await game.user.unsetFlag('world','myFuncArgs');
            // set  arguments
            await game.user.setFlag('world','myFuncArgs',{actorId: this._id, actorLink: this.data.token.actorLink})
            macro.execute(this);
          }
          else{
            ui.notifications.warn('Macro ' + macroname +' not found');
          }
          return;
        }
        // end macro hack
        // ----------------------------------------------------------------
 ```
 It will then look like this
 
 ``` javascript
async rollSheetDice(rollexp,rollname,rollid,actorattributes,citemattributes,number=1,target=null,rollcitemID = null){

        //console.log(rollexp);
        //console.log(rollid);
        //console.log(citemattributes);
        //console.log("rolling");
        //console.log(rollcitemID);

        let initiative=false;
        let gmmode=false;
        let blindmode=false;
        // ----------------------------------------------------------------
        // macro modification
        if(rollexp.includes("~macro~")){
          // uses the rollname for macro name
          let macro = game.macros.getName(rollname);  
          if (macro!=null){                  
            // reset arguments(unset flag)
            await game.user.unsetFlag('world','myFuncArgs');
            // set  arguments
            await game.user.setFlag('world','myFuncArgs',{actorId: this._id, actorLink: this.data.token.actorLink})
            macro.execute(this);
          }
          else{
            ui.notifications.warn('Macro ' + macroname +' not found');
          }
          return;
        }
        // end macro hack
        // ----------------------------------------------------------------
        if(rollexp.includes("~blind~"))
            blindmode = true;
```
 Save file and in Foundry press F5 to refresh(reload the scripts)
 
 # Example macro
  ``` javascript
 function ShowImg(actorId,actorLink){
let objactor;
let objtoken; 
let simg;
let sname;
if(actorLink==true){
  objactor = game.actors.get(actorId);
  if(objactor!=null){
    simg=objactor.data.img;
    sname=objactor.name;         
  }
}
else{        
  // unlinked token, try to find it from controlled tokens on the current scene       
  objtoken = canvas.tokens.controlled.find(y=>y.data.actorId==actorId);
  if(objtoken!=null){
    simg=objtoken.data.img;
    sname=objtoken.data.name;
  }           
}
ChatMessage.create({
    content : '<p>' +sname +'</p> <img src="' + simg + '" />'
  });
}
// get arguments
let args=game.user.getFlag('world','myFuncArgs');
console.log('Args are:');
console.log(args.actorId);
ShowImg(args.actorId,args.actorLink);
```
 
 
