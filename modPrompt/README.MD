# Adding a modifier prompt for all Sandbox rolls
If you dont mind some minor modification of sandbox core files, this can be done quite easily.

* This will apply for any roll(labels, simplenumerics, citems etc) made from the actor(meaning character sheet or equivalent). 
* It will not be applied on a Initiative roll triggered from the Combat Tracker(if you are using the Sandbox builtin Initiative Attribute Key -functionality)

As always
* Make a backup of any Sandbox file you edit __**before**__ any editing
* Any changes you have made to Sandbox core files will be overwritten when updating Sandbox to a newer version so save your edits somewhere to re-apply them again 

This have been tested with Sandbox 0.8.6

Example.
Create a new file called modprompt.js in \Data\systems\sandbox\module\ with the following code
``` javascript
  export async function modPrompt(rollname){
    let dialog=new Promise((resolve,reject)=>{
      new Dialog({
        title: 'Roll modifier',
        content: '<label style="padding-right:12px;" for="modPromptValue" >' + rollname + '</label><input style="width:64px" id="modPromptValue" name="modPromptValue" value="0" type="number"><hr>',
        buttons: {
          ok: {
            label: "Ok",            
            callback: (html) => { let value = html.find('input[name=modPromptValue]').val();
              resolve(value);            }          }        },
        default: "ok",
        close:  html => {                            resolve(0);              }   
      }).render(true);             
    });
    let modpromptvalue=await dialog;
    return modpromptvalue;
  }
```
Then(**AFTER MAKING A BACKUP OF THE ORIGINAL FILE**), edit the file a-entity.js like this:
At the top, add 
``` javascript
import { modPrompt } from "./modprompt.js";
```
Find the function starting with 
``` javascript 
async rollSheetDice(rollexp,rollname,rollid,actorattributes,citemattributes,number=1,target=null)
```

Inside the function rollSheetDice, find these lines of code
``` javascript
        //Parse roll difficulty in name, and general atts
        rollname = rollname.replace(/\#{diff}/g,diff);
        rollname = await auxMeth.autoParser(rollname,actorattributes,citemattributes,true,false,number);      
        
        //Parse roll difficulty
        rollexp = rollexp.replace(/\#{diff}/g,diff);
        if(citemattributes!=null){
            rollexp = await rollexp.replace(/\#{name}/g,citemattributes.name);
        }
```
And add in between them 
```javascript
let modpromptvalue=await modPrompt(rollname);
   if (modpromptvalue!=null){
 rollformula= rollformula + '+'+ modpromptvalue;
 rollexp= rollexp + '+'+ modpromptvalue;
 }
 ```
 It will then look like this
 
 ``` javascript
        //Parse roll difficulty in name, and general atts
        rollname = rollname.replace(/\#{diff}/g,diff);
        rollname = await auxMeth.autoParser(rollname,actorattributes,citemattributes,true,false,number);      
        
        let modpromptvalue=await modPrompt(rollname);
        if (modpromptvalue!=null){
          rollformula= rollformula + '+'+ modpromptvalue;
          rollexp= rollexp + '+'+ modpromptvalue;
        }
        //Parse roll difficulty
        rollexp = rollexp.replace(/\#{diff}/g,diff);
        if(citemattributes!=null){
            rollexp = await rollexp.replace(/\#{name}/g,citemattributes.name);
        }
```
 
 Save file and in Foundry press F5 to refresh(reload the scripts)
 
 
 
 ![modprompt](https://user-images.githubusercontent.com/81265884/114140425-85e78080-9910-11eb-94e3-205782c12dfe.gif)
