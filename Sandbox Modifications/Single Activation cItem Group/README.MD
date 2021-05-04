


# NOT COMPLETED!!!!



# Single Activation for cItem Group
With this modification, any cItem Group that ends with _/_SingleActivation_ will automatically make sure that only one cItem can be Activated at a time.

If you dont mind some minor modification of sandbox core files, this can be done quite easily.

## As always
* Make a backup of any Sandbox file you edit __**before**__ any editing
* Any changes you have made to Sandbox core files will be overwritten when updating Sandbox to a newer version so save your edits somewhere to re-apply them again 

## Version Compability
This modification has been tested with the following versions
Sandbox  | FoundryVTT
-------  | ----------
0.8.7    | 0.7.9

# Modification process
## Step 1
**AFTER MAKING A BACKUP OF THE ORIGINAL FILE**, edit the file \Data\systems\sandbox\module\gactorsheet.js like this:
In gactorsheet.js , find the function starting with 
``` javascript 
async activateCI(itemId,value,iscon=false){
```
In gactorsheet.js , inside the function activateCI, find these lines of code
``` javascript
    async activateCI(itemId,value,iscon=false){
        const citems = this.actor.data.data.citems;
        const citem = citems.find(y=>y.id==itemId);
        const attributes = this.actor.data.data.attributes;
        const citemObj = game.items.get(itemId).data.data;

        if(value){
            citem.isactive = false;
        }

        else{
            citem.isactive = true;
            citem.isreset = false;
        }
```
And after the line
```
citem.isreset = false;
```
Add this this
```
numinput.setAttribute("type", "number");   // added input type number
```
