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
Make a backup of the original file \Data\systems\sandbox\module\a-entity.js
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
 
 # How to and Example 
 Create a Rollable property , set the Roll Formula to ```~macro~``` and the Roll Name to the macros name(in this example it is simply "Hello")
 To add any parameters to the macro, use the Roll ID with a valid JSON expression(in this example it is ```{"HITS":@{HITS},"TM1_EDGES":"@{TM1_EDGES}"}```).
 The parameters can use the normal Sandbox expression, i e @{propertyname} etc
 
 ![TriggerMacroFromSheet](https://user-images.githubusercontent.com/81265884/130613735-ce154a1f-106c-43de-8f89-1a12d6fd5cb9.jpg)

 ## Macro
  ``` javascript
function ShowImg(actorId,actorLink,hits){
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
  // unlinked token, try to find it on the canvas        
  objtoken = canvas.tokens.controlled.find(y=>y.data.actorId==actorId);
  if(objtoken!=null){
    simg=objtoken.data.img;
    sname=objtoken.data.name;
  }           
}
ChatMessage.create({
    content : '<p>' +sname +'</p> <img src="' + simg + '" />Hits ' + hits
  });
}
// get arguments
let args=game.user.getFlag('world','myFuncArgs');
console.log('Args are:');
console.log(args);
ShowImg(args.actorId,args.actorLink,args.HITS);
```
 
 
