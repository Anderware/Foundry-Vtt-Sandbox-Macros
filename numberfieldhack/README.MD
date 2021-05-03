# Modify simplenumerics input fields to increase/decrease value easily
With this hack, you can use the scroll wheel or upp/down spinners on your mouse to increase the value of a simplenumeric field
![spinner](https://user-images.githubusercontent.com/81265884/116862386-f24e5a80-ac04-11eb-93b1-b7f88a99d867.gif)

Difference between using the scroll wheel and the spinners.
* When using the scroll wheel, the number will change in the input box but the actor will not be updated for each increment/decrement change meaning only the final number will be processed.
* When using the up/down spinners, each change will update the actor separately.

Every time an actor is updated all calculations and communications with all clients is triggered.
So, when adding/subtracting a lot of steps, use the scroll wheel.

If you dont mind some minor modification of sandbox core files, this can be done quite easily.

As always
* Make a backup of any Sandbox file you edit __**before**__ any editing
* Any changes you have made to Sandbox core files will be overwritten when updating Sandbox to a newer version so save your edits somewhere to re-apply them again 

This have been tested with Sandbox 0.8.6

## Step 1

**AFTER MAKING A BACKUP OF THE ORIGINAL FILE**, edit the file \Data\systems\sandbox\module\gactorsheet.js like this:

In gactorsheet.js , find the function starting with 
``` javascript 
async addNewPanel(tabpanel,tabKey,tabname,firstmrow, multiID=null,multiName=null,_paneldata=null){
```
## Step 2 - For actor properties
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
## Step 3 - For cItems
In gactorsheet.js , find the function starting with 
``` javascript 
async refreshCItems(basehtml){
```
In gactorsheet.js , inside the function refreshCItems, find these lines of code
``` javascript

   else if(propdata.datatype==="simplenumeric"){
	cellvalue = document.createElement("INPUT");
	cellvalue.setAttribute("type", "text"); 
	cellvalue.className = "table-input centertext";
	cellvalue.className += " " + propTable.data.data.inputgroup;


	if(propdata.inputsize=="M"){
	    cellvalue.className += " input-med";
	}

	else{
	    cellvalue.className += " table-small";
	}

    }
```
And change the line
```
cellvalue.setAttribute("type", "text"); 
```
to
```
cellvalue.setAttribute("type", "number");   // changed from text to number
```
It will then look like this
``` javascript

   else if(propdata.datatype==="simplenumeric"){
	cellvalue = document.createElement("INPUT");
	cellvalue.setAttribute("type", "number");   // changed from text to number
	cellvalue.className = "table-input centertext";
	cellvalue.className += " " + propTable.data.data.inputgroup;


	if(propdata.inputsize=="M"){
	    cellvalue.className += " input-med";
	}

	else{
	    cellvalue.className += " table-small";
	}

    }
```
Save the file

## Step 4
Add some CSS for the styling(you can use a custom css file or the module https://foundryvtt.com/packages/custom-css)

```
.sandbox.sheet input[type=number]:not(.input-disabled):not([readonly="true"]):hover::-webkit-inner-spin-button,
.sandbox.sheet input[type=number]:not(.input-disabled):not([readonly="true"]):hover::-webkit-outer-spin-button {
   opacity: 0.5 ;
	margin:-4px;
	height:28px;	
	cursor:pointer;
	-webkit-appearance: textfield ;	
}
```
Save the css
## Step 5 
In Foundry press F5 to refresh(reload the scripts) and rebuild the template and reload the actor.
