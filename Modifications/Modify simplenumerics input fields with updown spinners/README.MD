# Modify simplenumerics input fields to increase/decrease value easily
With this modification, you can use the scroll wheel or up/down spinners on your mouse to increase the value of a simplenumeric field
![spinner](https://user-images.githubusercontent.com/81265884/116862386-f24e5a80-ac04-11eb-93b1-b7f88a99d867.gif)

If you dont mind some minor modification of sandbox core files, this can be done quite easily.

Difference between using the scroll wheel and the spinners.
* When using the scroll wheel, the number will change in the input box but the actor will not be updated for each increment/decrement change meaning only the final number will be processed.
* When using the up/down spinners, each change will update the actor separately.

Every time an actor is updated all calculations and communications with all clients is triggered.
So, when adding/subtracting a lot of steps, use the scroll wheel.

### What does this modification actually do?
Sandbox uses the html input element as TEXT type for all input fields. This modification modifies the sheet generation so for all simplenumerics field the html input type is NUMBER.
Fields with NUMBER type have builtin spinners that can be styled with CSS.

##  Warnings, notes and disclaimers
* :pushpin: Make a backup of your Sandbox world __**before**__ any editing! This modification, **if** implemented incorrectly or in a untested version(of Foundry/Sandbox) can corrupt your data. You have been warned.
* :pushpin: Make a backup of any Sandbox core file you edit __**before**__ any editing
* :warning: Any changes you have made to Sandbox core files will be overwritten when updating Sandbox to a newer version so save your edits somewhere to re-apply them again 


## Version Compability
This modification has been tested with the following versions  

Sandbox  | FoundryVTT
-------  | ----------
0.8.7    | 0.7.9
0.10.1   | 0.8.8

# Modification process

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
``` javascript
sInput.setAttribute("type", "text");
```
to
``` javascript
sInput.setAttribute("type", "number");   // changed this from text to number
```

And change the line
``` javascript
sInputMax.setAttribute("type", "text");
```
to
``` javascript
sInputMax.setAttribute("type", "number");   // changed this from text to number
```

It will then look like this

``` javascript
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
		    sInputMax.setAttribute("type", "number");   // changed this from text to number
		    sInput.className = "input-ahalf ";
		    sInputMax.className = "input-bhalf input-disabled inputGM " + property.data.attKey + ".max";
		    sInputMax.setAttribute("name", "data.attributes." + property.data.attKey  + ".max");
		    sInputMax.setAttribute("value", "{{data.attributes." + property.data.attKey + ".max}}");
		}


	    }
```
## Step 3 - For cItems 
### For simplenumeric properties field in cItem table
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
``` javascript
cellvalue.setAttribute("type", "text"); 
```
to
``` javascript
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
### For the NUM field in cItem table
In gactorsheet.js , inside the function refreshCItems, find these lines of code  
``` javascript
	if(propTable.data.data.hasunits){   
		let numcell = document.createElement("TD");
		numcell.className = "input-min centertext";                   
		numcell.className += " " + inputgroup;                  
		new_row.appendChild(numcell);

		let numinput = document.createElement("INPUT");
		numinput.className = "table-input table-free centertext";
		numinput.className += " " + inputgroup;

		let ciNumber = ciObject.number;

		numinput.value = ciObject.number;
		numinput.addEventListener("change", (event) => this.changeCINum(ciObject.id,event.target.value));

		numcell.appendChild(numinput);
	    }
```
**MODIFICATION NOTE FOR SANDBOX 0.10.1** The first line will read ``` if (propTable.data.data.hasunits && !isFree) { ``` 

And in between 
``` javascript
let numinput = document.createElement("INPUT");
```
and
``` javascript
numinput.className = "table-input table-free centertext";
```
Add this line
``` javascript
numinput.setAttribute("type", "number");   // added input type number
```
It will then look like this
``` javascript
	    if(propTable.data.data.hasunits){    
		let numcell = document.createElement("TD");
		numcell.className = "input-min centertext";                   
		numcell.className += " " + inputgroup;                  
		new_row.appendChild(numcell);

		let numinput = document.createElement("INPUT"); 

		numinput.setAttribute("type", "number");   // added input type number

		numinput.className = "table-input table-free centertext";
		numinput.className += " " + inputgroup;

		let ciNumber = ciObject.number;

		numinput.value = ciObject.number;
		numinput.addEventListener("change", (event) => this.changeCINum(ciObject.id,event.target.value));

		numcell.appendChild(numinput);
	    }
```
### For the USES field in cItem table
In gactorsheet.js , inside the function refreshCItems, find these lines of code  
``` javascript
	    if(propTable.data.data.hasuses && propTable.data.data.hasactivation){   
		let usescell = document.createElement("TD");
		usescell.className = "tabblock-center";                   
		usescell.className += " " + inputgroup;                  
		new_row.appendChild(usescell);

		let usevalue = document.createElement("INPUT");
		usevalue.className = "table-input table-small centertext";
		usevalue.className += " " + inputgroup;  

		usescell.appendChild(usevalue);
```
**MODIFICATION NOTE FOR SANDBOX 0.10.1** This first line will read  ```if (propTable.data.data.hasuses && propTable.data.data.hasactivation && !isFree) {```

And in between 
``` javascript
let usevalue = document.createElement("INPUT");
```
and
``` javascript
usevalue.className = "table-input table-small centertext";
```
Add this line
``` javascript
usevalue.setAttribute("type", "number");   // added input type number
```
It will then look like this
``` javascript
	if(propTable.data.data.hasuses && propTable.data.data.hasactivation){ 
		let usescell = document.createElement("TD");
		usescell.className = "tabblock-center";                   
		usescell.className += " " + inputgroup;                  
		new_row.appendChild(usescell);

		let usevalue = document.createElement("INPUT");
		
		usevalue.setAttribute("type", "number");   // added input type number
		
		usevalue.className = "table-input table-small centertext";
		usevalue.className += " " + inputgroup;  

		usescell.appendChild(usevalue);
```



Save the file

## Step 4
Add some CSS for the styling(you can use a custom css file or the module https://foundryvtt.com/packages/custom-css)

Note.The styling is needed to make sure to not display the spinners for readonly fields

``` css
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
