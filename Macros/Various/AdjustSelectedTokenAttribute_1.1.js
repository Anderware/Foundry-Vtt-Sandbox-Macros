// **************************************************************** 
// Macro:               AdjustSelectedTokenAttribute.js
// Version Compability: Tested with
//                      Sandbox 0.1.0 | Foundry 0.8.8
// ================================================================ 
// Date       Version  Author               Description             
// ---------- -------- -------------------- -----------------------
// 2021-09-01 1.0.0    Ramses800            Macro created
// 2021-09-01 1.1.0    Ramses800                              
// ****************************************************************   

//                                                                  
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
//                                                                  
//                     Settings for this macro                      
//                                                                  
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
// 
function Setting_AttributesToAdjust(){
  let objAttributes=[
    {"attributekey":"HITS"},
    {"attributekey":"MANA"}
  ];
  return JSON.stringify(objAttributes); 
  }

//                                                                  
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
//                                                                  
//                        Macro code                        
//                                                                  
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
// 

function BuildTableRow(sAttributeTag,sAttributeKey, defaultvalue=0){  
  let sNameToShow='';
  if (sAttributeTag==""){
    sNameToShow= sAttributeKey;
  }
  else{
    sNameToShow=sAttributeTag;
  }    
  let sBuildTableRow=`                                        
       <tr>
       <td>`+sNameToShow+`</td>
       <td style="text-align:center;">`+ defaultvalue +`</td>
       <td><input class="spinner" style="width:48px;" type="number" name="` + sAttributeKey + `" value="`+ defaultvalue +`"></td>
       </tr>`;
  return sBuildTableRow;
}

function BuildHTML(token){
  let actorid  =token.actor.id;
  let actorlink=token.data.actorLink;
  let attributename=''
  
  if(actorlink==false){
    actorid=token.data._id; 
  } 
       
  let shtml=` 
    <input type="hidden" name="actorid" value="`  + actorid + `">
    <input type="hidden" name="actorlink" value="`  + actorlink + `">    
    <fieldset style="text-align:left;"><legend style="text-align:left;">` + token.name + `</legend>  
  `;
  const attributes = token.actor.data.data.attributes;
  let arrAttributes = JSON.parse(Setting_AttributesToAdjust()); 
  let attributetag; 
  let attribute;
  if (arrAttributes.length>0){ 
    shtml +=`<table>
       <thead> 
        <tr>
        <th style="padding:0px 4px 0px 4px">Attribute</th>
        <th style="padding:0px 4px 0px 4px">Current Value</th>
        <th style="padding:0px 4px 0px 4px">New Value</th>
        </tr>
       </thead>
       <tbody>`;
    arrAttributes.forEach(function(attribute){     
      attributekey= attribute.attributekey;  
      // check if actor has attribute    
      if(attributes.hasOwnProperty(attributekey)){
         // get the value from the actor
        let currentvalue=attributes[attributekey].value; 
        attribute=game.items.get(attributes[attributekey].id); 
        // get the tag
        attributetag = attribute.data.name;
        
        shtml += BuildTableRow(attributetag,attributekey,currentvalue);
      }      
    });
    shtml +=`</tbody>
       </table>`;  
  }
  else{
  }
  shtml += '</fieldset>'; 
  return shtml;
}

async function AdjustSelectedAttribute(){
	// get selected token
	let selected = canvas.tokens.controlled;
	if (selected != null) {
		if (selected.length > 0) {
			if (selected.length == 1) {
				let token = selected[0];				   				                        
        let html_content=`
          <style>
            .spinner{
              margin-left:10px !important;      
            }
            .spinner:hover {box-shadow: 0 0 5px red;cursor: pointer;}    
            .spinner::-webkit-inner-spin-button, 
            .spinner::-webkit-outer-spin-button {  
              opacity: 1; 
              margin:-2px;
              height:26px;
              -webkit-appearance: textfield ;
            }     
            .spinner:hover::-webkit-inner-spin-button,
            .spinner:hover::-webkit-outer-spin-button,
            .spinner:focus::-webkit-inner-spin-button,
            .spinner:focus::-webkit-outer-spin-button  {
              opacity: 1 !important;
              cursor:pointer;
              -webkit-appearance: textfield ;
            }
          </style>
          <form> 
          ` + await BuildHTML(token) + `
          </form>`;

        let d = new Dialog( {
          title: 'Adjust Attribute ',
          content: html_content,
          buttons: {
            no: {
              label: 'Cancel'
            },
            yes: {
              label: 'Adjust',
              callback: async (html) => { 
                async function AdjustAttribute(){                                                                       
                  actorid= html.find('[name="actorid"]').val();
                  actorlink= html.find('[name="actorlink"]').val();   
                  let actor;                          
                  if (actorlink=="true"){
                    actor = game.actors.get(actorid);                      
                  }                                      
                  else{
                    // grab it from the canvas                       
                    actor = canvas.tokens.get(actorid).actor                                              
                  }          
                  // get all input boxes of class spinner 
                  let baseInput = html.find('.spinner');
                               
                  let stringvalue="";    
                  let attributename="";  
                  let updatedata;    
                  let finalupdatedata;          
                  // loop inputs found                
                  for (let i = 0, l = baseInput.length; i < l; i++){                                                                                            
                    stringvalue=baseInput[i].value;
                    attributekey=baseInput[i].name;
                    //console.log( attributekey + " = " + stringvalue );                       
                    //await actor.update({ [`data.attributes.${attributekey}.value`]: stringvalue });  
                    if (i==0){
                      finalupdatedata= { [`data.attributes.${attributekey}.value`]: stringvalue };
                    }
                    else{ 
                      updatedata= { [`data.attributes.${attributekey}.value`]: stringvalue };
                      finalupdatedata=Object.assign(finalupdatedata,updatedata); 
                    }                      
                  }                                                                                                             
                  if (actor!=null){
                    console.log(finalupdatedata);
                    await actor.update(finalupdatedata); 
                  }
                  else{
                      ui.notifications.warn('Unable to find actor');	
                  }                  
                                                                        
                } 
                await AdjustAttribute();                     
              }
            }
          },
          default: 'yes',
          close: () => {},          
        });
        d.options.width = 0;
        d.position.width = 0;
        //d.options.resizable=true;
        d.render(true);          
      }  
      else{
		    ui.notifications.warn('More than one token is selected');			
		  }
    } 
    else {
		  ui.notifications.warn('No token selected');
		}      
	}
  else {
	  ui.notifications.error('Error getting selected tokens');
  }
}  

AdjustSelectedAttribute();