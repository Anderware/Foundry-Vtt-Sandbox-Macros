# Modify simplenumerics input fields to increase/decrease value easily

With this hack, you can use the scroll wheel on your mouse to increase the value of a simplenumeric field

If you dont mind some minor modification of sandbox core files, this can be done quite easily.


As always
* Make a backup of any Sandbox file you edit __**before**__ any editing
* Any changes you have made to Sandbox core files will be overwritten when updating Sandbox to a newer version so save your edits somewhere to re-apply them again 

This have been tested with Sandbox 0.8.6

## Step 1

**AFTER MAKING A BACKUP OF THE ORIGINAL FILE**, edit the file gactorsheet.js like this:

In gactorsheet.js , find the function starting with 
``` javascript 
async addNewPanel(tabpanel,tabKey,tabname,firstmrow, multiID=null,multiName=null,_paneldata=null){
```
## Step 2
In gactorsheet.js , inside the function addNewPanel, find these lines of code
``` javascript
                else {

                    sInput = deftemplate.createElement("INPUT");

                    sInput.setAttribute("name", "data.attributes." + property.data.attKey  + ".value");
                    sInput.setAttribute("value", "{{data.attributes." + property.data.attKey + ".value}}");

                    if(property.data.datatype==="simplenumeric"){

                        sInput.setAttribute("type", "text");  
                        sInput.className = "input-min";

                        if(property.data.inputsize=="M"){
                            sInput.className = "input-med";
                        }

                        if(!hasProperty(property.data,"maxvisible")){
                            property.data.maxvisible=true;
                        }

                        if(property.data.automax!="" && property.data.maxvisible){
                            sInputMax = deftemplate.createElement("INPUT");
                            sInputMax.setAttribute("type", "text");
                            sInput.className = "input-ahalf ";
                            sInputMax.className = "input-bhalf input-disabled inputGM " + property.data.attKey + ".max";
                            sInputMax.setAttribute("name", "data.attributes." + property.data.attKey  + ".max");
                            sInputMax.setAttribute("value", "{{data.attributes." + property.data.attKey + ".max}}");
                        }


                    }
```

And change the line
```
sInput.setAttribute("type", "text");
```
to
```
sInput.setAttribute("type", "number");   // changed this from text to number
```
It will then look like this

```
                else {

                    sInput = deftemplate.createElement("INPUT");

                    sInput.setAttribute("name", "data.attributes." + property.data.attKey  + ".value");
                    sInput.setAttribute("value", "{{data.attributes." + property.data.attKey + ".value}}");

                    if(property.data.datatype==="simplenumeric"){

                        sInput.setAttribute("type", "number");   // changed this from text to number
                        sInput.className = "input-min";

                        if(property.data.inputsize=="M"){
                            sInput.className = "input-med";
                        }

                        if(!hasProperty(property.data,"maxvisible")){
                            property.data.maxvisible=true;
                        }

                        if(property.data.automax!="" && property.data.maxvisible){
                            sInputMax = deftemplate.createElement("INPUT");
                            sInputMax.setAttribute("type", "text");
                            sInput.className = "input-ahalf ";
                            sInputMax.className = "input-bhalf input-disabled inputGM " + property.data.attKey + ".max";
                            sInputMax.setAttribute("name", "data.attributes." + property.data.attKey  + ".max");
                            sInputMax.setAttribute("value", "{{data.attributes." + property.data.attKey + ".max}}");
                        }


                    }
```
Save the file

## Step 3
Add some CSS for the styling(you can use a custom css file or the module https://foundryvtt.com/packages/custom-css)

```
.sandbox.sheet input[type=number]:not(.input-disabled):hover::-webkit-inner-spin-button,
.sandbox.sheet input[type=number]:not(.input-disabled):hover::-webkit-outer-spin-button {
   opacity: 0.5 ;
	margin:-4px;
	height:28px;	
	cursor:pointer;
	-webkit-appearance: textfield ;	
}
```
## Step 5 
 Save file and in Foundry press F5 to refresh(reload the scripts) and rebuild the template and reload the actor.
