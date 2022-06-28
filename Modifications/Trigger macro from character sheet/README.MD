# Trigger macro from Sandbox character sheet roll expression
If you dont mind some minor modification of sandbox core files, this can be done quite easily.

This modification uses User Flags to carry arguments to the selected macro.(It is also possible to use the module Furnace for this but in this mod, flags works well enough)

The GIF below showcases a macro([RollMyDice](https://github.com/Anderware/Foundry-Vtt-Sandbox-Macros/tree/main/Macros/Roll%20My%20Dice)) that uses Foundry Tables to roll dice.

![MacroFromSheet_2 3_ffm](https://user-images.githubusercontent.com/81265884/130851674-ce0be728-d217-4164-894e-c8f890202fe6.gif)

##  Warnings, notes and disclaimers
* :pushpin: Make a backup of your Sandbox world __**before**__ any editing! This modification, **if** implemented incorrectly or in a untested version(of Foundry/Sandbox) can corrupt your data. You have been warned.
* :pushpin: Make a backup of any Sandbox core file you edit __**before**__ any editing
* :warning: Any changes you have made to Sandbox core files will be overwritten when updating Sandbox to a newer version so save your edits somewhere to re-apply them again 

## Version Compability
This modification has been tested with the following versions

Sandbox  | Foundry
-------  | -------
0.9.26   | 0.8.8   
0.9.27   | 0.8.8   
0.9.28   | 0.8.8   
0.10.0   | 0.8.8   
0.12.4   | 9.255 
0.13.4   | 9.269



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
            // reset saved macro arguments(unset flag) in user flags
            await game.user.unsetFlag('world',rollname); 
            // get arguments from rollid and parse them with Sandbox parser 
            console.log(rollid);                     
            let args;
            let objargs;       
            // get actor information
            //let objActorData={actorId: this._id, actorLink: this.data.token.actorLink};   // for Sandbox pre 0.12     
            let objActorData={actorId: this.id, actorLink: !this.isToken};                  // for Sandbox 0.12+
            // check if any arguments were supplied
            if (rollid[0].length>0){
              args=await auxMeth.autoParser(rollid[0],actorattributes,citemattributes,true,false,number);
              objargs=JSON.parse(args);               
            }                                                  
            // merge macro arguments with actor data
            let objMerged=Object.assign(objActorData,objargs);              
            // set  macro arguments
            await game.user.setFlag('world',rollname,objMerged)
            // run macro
            macro.execute();
          }
          else{
            ui.notifications.warn('Macro ' + rollname +' not found');
          }    
          // simpy return from this function to exit the roll
          return;
        }
        // end macro modification
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
            // reset saved macro arguments(unset flag) in user flags
            await game.user.unsetFlag('world',rollname); 
            // get arguments from rollid and parse them with Sandbox parser 
            console.log(rollid);                     
            let args;
            let objargs;       
            // get actor information
            let objActorData={actorId: this._id, actorLink: this.data.token.actorLink};         
            // check if any arguments were supplied
            if (rollid[0].length>0){
              args=await auxMeth.autoParser(rollid[0],actorattributes,citemattributes,true,false,number);
              objargs=JSON.parse(args);               
            }                                                  
            // merge macro arguments with actor data
            let objMerged=Object.assign(objActorData,objargs);              
            // set  macro arguments
            await game.user.setFlag('world',rollname,objMerged)
            // run macro
            macro.execute();
          }
          else{
            ui.notifications.warn('Macro ' + rollname +' not found');
          }    
          // simpy return from this function to exit the roll
          return;
        }
        // end macro modification
        // ----------------------------------------------------------------
        if(rollexp.includes("~blind~"))
            blindmode = true;
```
 Save file and in Foundry press F5 to refresh(reload the scripts)
 
 # How to and Example 
 Create a Rollable property , set the Roll Formula to ```~macro~``` and the Roll Name to the macros name(in this example it is simply "Hello")
 To add any arguments to the macro, use the Roll ID with a valid JSON expression(in this example it is ```{"HITS":"@{HITS}","TM1_EDGES":"@{TM1_EDGES}"}```).
 The arguments can use the normal Sandbox expression, i e @{propertyname} etc
 Another JSON triggering a macro from a cItem roll could be ```{"rollname":"#{name}","D4":"#{D4}","D6":"#{D6}","D8":"#{D8}"}```
 
 The following arguments are always added by the Trigger Macro modification
 * actorID
 * actorLink - if false, then the it is an unlinked token(on the canvas)
 
 ![TriggerMacroFromSheet](https://user-images.githubusercontent.com/81265884/130613735-ce154a1f-106c-43de-8f89-1a12d6fd5cb9.jpg)

 ## Example Macro
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
let macroname=this.data.name;
let args=game.user.getFlag('world',macroname);
console.log('Args are:');
console.log(args);
ShowImg(args.actorId,args.actorLink,args.HITS);
```
 
 
