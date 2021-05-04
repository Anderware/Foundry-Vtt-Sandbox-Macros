


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
Add this
```
// ------------------------------------------------------------
            // modification for single activation groups
            let sSingleActivationGroupSuffix='_SingleActivation';
            let matchingroups=[];
            // check this citem if it belongs to a targeted group
            if (citem.groups.length>0){
              for(let iGroup=0;iGroup<citem.groups.length;iGroup++){
                if(citem.groups[iGroup].name.endsWith(sSingleActivationGroupSuffix)){
                  // found matching group, add it to array
                  matchingroups.push(citem.groups[iGroup].name);
                }
              }
              // check all this actors citems for matching groups
              for(let l=0;l<citems.length;l++){    
                // check that this is not the target citem
                if(citems[l].name!=citem.name){
                  // check this citems for groups
                  if (citems[l].groups.length>0) {
                    // has groups, check all groups until one is found or not
                    for(let iGroup=0;iGroup<citems[l].groups.length;iGroup++){ 
                      // check if this citem has a matching group
                      if((matchingroups.indexOf(citems[l].groups[iGroup].name) > -1)   ){
                        // found it, check if this is activated 
                        if (citems[l].isactive){
                          // found another citem in with the same group and it is active, set it to inactive                      
                          citems[l].isactive=false;
                        }
                        // exit for, no need to query the rest of this citems groups
                        break;
                      }
                    }
                  }
                }
              }                                                                                    
            }
            // ----------------------------------------------------------
```
It will then look like this
``` javascript
        if(value){
            citem.isactive = false;
        }

        else{
            citem.isactive = true;
            citem.isreset = false;
            // ------------------------------------------------------------
            // modification for single activation groups
            let sSingleActivationGroupSuffix='_SingleActivation';
            let matchingroups=[];
            // check this citem if it belongs to a targeted group
            if (citem.groups.length>0){
              for(let iGroup=0;iGroup<citem.groups.length;iGroup++){
                if(citem.groups[iGroup].name.endsWith(sSingleActivationGroupSuffix)){
                  // found matching group, add it to array
                  matchingroups.push(citem.groups[iGroup].name);
                }
              }
              // check all this actors citems for matching groups
              for(let l=0;l<citems.length;l++){    
                // check that this is not the target citem
                if(citems[l].name!=citem.name){
                  // check this citems for groups
                  if (citems[l].groups.length>0) {
                    // has groups, check all groups until one is found or not
                    for(let iGroup=0;iGroup<citems[l].groups.length;iGroup++){ 
                      // check if this citem has a matching group
                      if((matchingroups.indexOf(citems[l].groups[iGroup].name) > -1)   ){
                        // found it, check if this is activated 
                        if (citems[l].isactive){
                          // found another citem in with the same group and it is active, set it to inactive                      
                          citems[l].isactive=false;
                        }
                        // exit for, no need to query the rest of this citems groups
                        break;
                      }
                    }
                  }
                }
              }                                                                                    
            }
            // ----------------------------------------------------------
        }
```
Save the file

## Step 6
In Foundry press F5 to refresh(reload the scripts) and rebuild the template and reload the actor.
