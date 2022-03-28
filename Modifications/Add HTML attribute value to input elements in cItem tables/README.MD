# Add HTML attribute value to input elements in cItem tables
With this modification, input elements in cItem tables will have the HTML atribute "value".
This is quite useful for using as CSS selectors based on the value if a citem property

If you dont mind some minor modification of sandbox core files, this can be done quite easily.
## Special notice
This functionality already exist for actor properties input elements and a merge request for this modification have been submitted to Sandbox core,
hopefully render this modification needless in future Sandbbox versions

##  Warnings, notes and disclaimers
* :pushpin: Make a backup of your Sandbox world __**before**__ any editing! This modification, **if** implemented incorrectly or in a untested version(of Foundry/Sandbox) can corrupt your data. You have been warned.
* :pushpin: Make a backup of any Sandbox core file you edit __**before**__ any editing
* :warning: Any changes you have made to Sandbox core files will be overwritten when updating Sandbox to a newer version so save your edits somewhere to re-apply them again 


## Version Compability
This modification has been tested with the following versions  

Sandbox  | FoundryVTT
-------  | ----------
0.12.4   | 9.255

# Modification process

## Step 1

**AFTER MAKING A BACKUP OF THE ORIGINAL FILE**, edit the file \Data\systems\sandbox\module\gactorsheet.js like this:

In gactorsheet.js , find the method starting with 
``` javascript 
async refreshCItems(basehtml) {
```

## Step 2 
In gactorsheet.js , inside the method refreshCItems , find these lines of code
``` javascript
else if (propdata.datatype === "simplenumeric") {
                                                cellvalue = document.createElement("INPUT");
                                                cellvalue.setAttribute("type", "text");
                                                cellvalue.className = "table-input centertext";
                                                cellvalue.className += " " + propTable.data.data.inputgroup;


                                                if (propdata.inputsize == "M") {
                                                    cellvalue.className += " input-med";
                                                }

                                                else if (propdata.inputsize == "T") {
                                                    cellvalue.className += " table-tiny";
                                                }

                                                else {
                                                    cellvalue.className += " table-small";
                                                }

                                            }

                                            if (!propdata.editable && !game.user.isGM)
                                                cellvalue.setAttribute("readonly", true);

                                            if (propdata.datatype != "checkbox") {
                                                cellvalue.value = ciObject.attributes[propKey].value;

                                                if (ciObject.attributes[propKey].value == "") {
                                                    cellvalue.value = constantvalue;
                                                }

                                                if (propdata.auto != "") {

                                                    cellvalue.setAttribute("readonly", true);
                                                }

                                            }
```
And  after the lines
``` javascript
if (propdata.datatype != "checkbox") {
                                                cellvalue.value = ciObject.attributes[propKey].value;
                                                
                                                
                                                if (ciObject.attributes[propKey].value == "") {
                                                    cellvalue.value = constantvalue;
                                                }
```
Add the following
```javascript
// Set attribute value to the actual value for css selector functionality
                                                cellvalue.setAttribute("value", cellvalue.value);
```


Now it will look like 
```javascript
else if (propdata.datatype === "simplenumeric") {
                                                cellvalue = document.createElement("INPUT");
                                                cellvalue.setAttribute("type", "text");
                                                cellvalue.className = "table-input centertext";
                                                cellvalue.className += " " + propTable.data.data.inputgroup;


                                                if (propdata.inputsize == "M") {
                                                    cellvalue.className += " input-med";
                                                }

                                                else if (propdata.inputsize == "T") {
                                                    cellvalue.className += " table-tiny";
                                                }

                                                else {
                                                    cellvalue.className += " table-small";
                                                }

                                            }

                                            if (!propdata.editable && !game.user.isGM)
                                                cellvalue.setAttribute("readonly", true);

                                            if (propdata.datatype != "checkbox") {
                                                cellvalue.value = ciObject.attributes[propKey].value;
                                                
                                                
                                                if (ciObject.attributes[propKey].value == "") {
                                                    cellvalue.value = constantvalue;
                                                }
                                                  
                                                // Set attribute value to the actual value for css selector functionality
                                                cellvalue.setAttribute("value", cellvalue.value);
                                                
                                                
                                                if (propdata.auto != "") {

                                                    cellvalue.setAttribute("readonly", true);
                                                }

                                            }
```



Save the file
## Step 5 
In Foundry press F5 to refresh(reload the scripts)

Rebuild template and reload actors.
