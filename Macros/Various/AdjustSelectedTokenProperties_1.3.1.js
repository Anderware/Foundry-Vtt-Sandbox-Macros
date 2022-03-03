// **************************************************************** 
// Macro:               AdjustSelectedTokenProperties.js
// Description:         Displays a dialog for the selected token
//                      with configured properties
// Version Compability: Tested with
//                      Sandbox 0.10.9 | Foundry 0.8.9
//                      Sandbox 0.12.2 | Foundry 9.249
// ================================================================ 
// Date       Version  Author               Description             
// ---------- -------- -------------------- -----------------------
// 2021-09-01 1.0.0    Ramses800            Macro created
// 2021-09-01 1.1.0    Ramses800            Fixes                  
// 2021-12-01 1.2.0    Ramses800            Added dice rolls
// 2022-02-25 1.3.0    Ramses800            hide dice rolls if none
//                                          Option to echo changes to chat
// 2022-03-03 1.3.0    Ramses800            Compatibility fixes for 9.251
// ****************************************************************   

//                                                                  
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
//                                                                  
//                     Settings for this macro                      
//                                                                  
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
// 

function Setting_PropertiesToAdjust() {
  let objProperties;
  // Note on configuring this macro
  // Property field:
  //   propertykey - the key of the property, required. If the token/actor does not have the property, it will not be shown
  //   dieroll     - any normal die roll expression, not required. If no properties has dicerolls(or empty string), the dice roll column will not be shown
  //   maxvalue    - limits the input, not required
  //   minvalue    - limits the input, not required
  
  //Example 1 - dice rolls configured - Dnd Attributes
  //objProperties = [
  //  {'propertykey': 'Strength', 'dieroll': '4d6kh3', 'maxvalue': '18', 'minvalue': '3'},
  //  {'propertykey': 'Dexterity', 'dieroll': '4d6kh3', 'maxvalue': '18', 'minvalue': '3'},
  //  {'propertykey': 'Constitution', 'dieroll': '4d6kh3', 'maxvalue': '18', 'minvalue': '3'},
  //  {'propertykey': 'Intelligence', 'dieroll': '4d6kh3', 'maxvalue': '18', 'minvalue': '3'}, 
  //  {'propertykey': 'Wisdom', 'dieroll': '4d6kh3', 'maxvalue': '18', 'minvalue': '3'},
  //  {'propertykey': 'Charisma', 'dieroll': '4d6kh3', 'maxvalue': '18', 'minvalue': '3'}    
  //];         
  //Example 2 - no dice rolls configured
  //objProperties = [    
  //  {'propertykey': 'Initiative', 'maxvalue': '18', 'minvalue': '3'},
  //  {'propertykey': 'HIT_DICE','dieroll': '1'},
  //  {'propertykey': 'NUM_DEFENSE'}
  //];
  //Example 3 - mix dice rolls configured
  //objProperties = [    
  //  {'propertykey': 'Initiative', 'maxvalue': '18', 'minvalue': '3'},
  //  {'propertykey': 'HIT_DICE','dieroll': '1d8'},
  //  {'propertykey': 'NUM_DEFENSE'}
  //]; 
  
  objProperties = [
      {'propertykey': 'STY', 'dieroll': '4d6kh3', 'maxvalue': '18', 'minvalue': '3'},
      {'propertykey': 'DRV', 'dieroll': '4d6kh3', 'maxvalue': '18', 'minvalue': '3'},
      {'propertykey': 'INT', 'dieroll': '4d6kh3', 'maxvalue': '18', 'minvalue': '3'},
      {'propertykey': 'MOT', 'dieroll': '4d6kh3', 'maxvalue': '18', 'minvalue': '3'}, 
      {'propertykey': 'KRB', 'dieroll': '4d6kh3', 'maxvalue': '18', 'minvalue': '3'},
      {'propertykey': 'TUR', 'dieroll': '4d6kh3', 'maxvalue': '18', 'minvalue': '3'}
 ]; 
  return JSON.stringify(objProperties);
}

function Setting_EchoChangesToChatMessage(){
  // set to true to post any changes made into the chat
  return true;
}

// This runs the main macro code
AdjustSelectedTokenProperties();


//                                                                  
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
//                                                                  
//                   Macro code - no changes needed here                       
//                                                                  
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
// 


function BuildTableRow(sPropertyTag, sPropertyKey, currentvalue = 0, sDieRoll, maxvalue = '', minvalue = '',dicerollsconfigured=false) {
  let sNameToShow = '';
  if (sPropertyTag == "") {
    sNameToShow = sPropertyKey;
  } else {
    sNameToShow = sPropertyTag;
  }    
  let sDiceRollOption='';
  if (dicerollsconfigured){ 
    if(sDieRoll!=''){
     sDiceRollOption=`<td style="text-align:center;"><div class="form-group"><input class="diceexpression"  type="text" id="` + sPropertyKey + `-die-roll" name="` + sPropertyKey + `-die-roll" value="` + sDieRoll + `">
          <i onclick="RollNewValue('property-` + sPropertyKey + `','` + sPropertyKey + `-die-roll')" title="Roll new value" class="rolldie fas fa-dice-d20"></i></div></td>`;
    } else{
      sDiceRollOption=`<td></td>`;
    }
    
  }
  let sBuildTableRow = `                                        
       <tr>
       <td style="text-align:left;">` + sNameToShow + `</td>
       <td style="text-align:center;"><input class="currentvalue" style="width:48px;" type="number" id="property-current-value` + sPropertyKey + `" name="property-current-value` + sPropertyKey + `" value="` + currentvalue + `" disabled></td>
       <td style="text-align:center;"><input class="spinner" style="width:48px;" type="number" id="property-` + sPropertyKey + `" name="` + sPropertyKey + `" value="` + currentvalue + `" max="` + maxvalue + `" min="` + minvalue + `"></td>`+ sDiceRollOption +`
       </tr>`;
  return sBuildTableRow;
}

function BuildHTML(token) {
  let actorid = token.actor.id;
  let actorlink = token.data.actorLink;
  let dicerollsconfigured=false;

  if (actorlink == false) {
    actorid = token.data._id;
  }

  let shtml = ` 
    <input type="hidden" name="actorid" value="` + actorid + `">
    <input type="hidden" name="actorlink" value="` + actorlink + `">    
    <fieldset style="text-align:left;"><legend style="text-align:left;">` + token.name + `</legend>  
  `;
  const attributes = token.actor.data.data.attributes;
  let arrPropertys = JSON.parse(Setting_PropertiesToAdjust());
  // check if any dice rolls are configured
  arrPropertys.forEach(function (property) {
     if(property.dieroll!=null && property.dieroll!=''){
       dicerollsconfigured=true;
     }
  });
  
  let propertytag;
  

  if (arrPropertys.length > 0) { 
    let sDiceRollOption='';
    if (dicerollsconfigured){
       sDiceRollOption=`<th class="adjuster" style="text-align:left;">Die roll</th>`;
    }
    shtml += `<table>
       <thead> 
        <tr>
        <th class="adjuster" style="text-align:left;">Property</th>
        <th class="adjuster" style="text-align:center;">Current Value</th>
        <th class="adjuster" style="text-align:center;">New Value</th>` + sDiceRollOption + `
        
        </tr>
       </thead>
       <tbody>`;
    arrPropertys.forEach(function (property) {
      let dieroll = '';
      let minvalue = '';
      let maxvalue = '';
      propertykey = property.propertykey;
      // check if actor has property    
      if (attributes.hasOwnProperty(propertykey)) {
        // get the value from the actor
        let currentvalue = attributes[propertykey].value;
        attribute = game.items.get(attributes[propertykey].id);
        // get the tag
        propertytag = attribute.data.name;
        if (property.hasOwnProperty('dieroll')) {
          dieroll = property.dieroll;
        }
        if(property.hasOwnProperty('maxvalue')){
          maxvalue = property.maxvalue;
        }
        if(property.hasOwnProperty('minvalue')){
          minvalue = property.minvalue;
        }
        shtml += BuildTableRow(propertytag, propertykey, currentvalue, dieroll, maxvalue, minvalue,dicerollsconfigured);
      }
    });
    shtml += `</tbody>
       </table>`;
  } else {
  } 
  if (dicerollsconfigured){
    shtml += '<button type="button" id="btnRollAll" style="width:100%;cursor:pointer;"  onclick="RollAllNewValues()" title="Roll all values"><i class ="fas fa-dice-d20"></i>Roll All</button></fieldset>';
  }  
  
  return shtml;
}

async function AdjustSelectedTokenProperties() {
  // get selected token
  let selected = canvas.tokens.controlled;
  if (selected != null) {
    if (selected.length > 0) {
      if (selected.length == 1) {
        let token = selected[0];
        let html_content = `
          <style>
            td{
              padding:0px;
            }             
            
            th.adjuster{                
              padding:3px 3px 3px 3px;
            }
            i.rolldie{
              padding:0px 3px 0px 3px;
            }
            i.rolldie:hover{
              cursor:pointer;
              text-shadow: 0 0 8px red;
            } 
            input[type="text"].diceexpression{
              text-align:center;
              width:85px;
            }
            .spinner{
              margin-left:10px !important;
              text-align:center !important;      
            }
            .spinner:hover {box-shadow: 0 0 5px red;cursor: pointer;}
                
            .spinner::-webkit-inner-spin-button, 
            .spinner::-webkit-outer-spin-button {  
              opacity: 1 !important; 
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
          <script>
          async function RollNewValue(newvalueelementid,dierollelementid){
            let dierollinput=document.querySelector('#' + dierollelementid ); 
            if (dierollinput!=null){ 
              let dieroll=dierollinput.value;
              if (dieroll!=''){
                let newvalue=document.getElementById(newvalueelementid);
                if (newvalue!=null){ 
                  const roll = await new Roll(dieroll).evaluate({async: true});                  
                  newvalue.value=roll.total;
                }                            
              } 
            }
          }
        
          function RollAllNewValues(){
            let arrProperties = JSON.parse('${Setting_PropertiesToAdjust()}');            
            arrProperties.forEach(function(property){               
              if(property.dieroll!=null && property.dieroll!=''){
                RollNewValue('property-' + property.propertykey,property.propertykey + '-die-roll');
              }
            });
          }
          </script>
          <form> 
          ` + await BuildHTML(token) + `
          </form>
          
          `;

        let d = new Dialog({
          title: 'Adjust properties for selected token ',
          content: html_content,
          buttons: {
            no: {
              icon: "<i class='fas fa-times'></i>",
              label: 'Cancel'
            },
            yes: {
              icon: "<i class='fas fa-check'></i>",
              label: 'Adjust',
              callback: async (html) => {
                async function AdjustProperty() {
                  actorid = html.find('[name="actorid"]').val();
                  actorlink = html.find('[name="actorlink"]').val();
                  let actorname;
                  
                  let actor; 
                  
                  if (actorlink == "true") {
                    actor = game.actors.get(actorid);
                    actorname=actor.name;
                  } else {
                    // grab it from the canvas                       
                    actor = canvas.tokens.get(actorid).actor;
                    actorname=actor.token.name; 
                  }
                     
                  // get all currebt values                                            
                  let baseCurrent = html.find('.currentvalue');
                  // get all input boxes of class spinner 
                  let baseInput = html.find('.spinner');
                  let stringvalue = "";
                  let currentvalue="";
                  let propertyname = "";
                  let changereport="";
                  let updatedata;
                  let finalupdatedata;
                  // loop inputs found and merge the update data               
                  for (let i = 0, l = baseInput.length; i < l; i++) {
                    currentvalue = baseCurrent[i].value;
                    stringvalue = baseInput[i].value;
                    propertykey = baseInput[i].name; 
                    
                    // when updating a value, always set 'modified:=true'
                    // when updating a max  , always set 'modmax:=true'
                    if (i == 0){
                      finalupdatedata = {[`data.attributes.${propertykey}.value`]: stringvalue, [`data.attributes.${propertykey}.modified`]: true};
                    } else {
                      updatedata = {[`data.attributes.${propertykey}.value`]: stringvalue, [`data.attributes.${propertykey}.modified`]: true};
                      finalupdatedata = Object.assign(finalupdatedata, updatedata);
                    }  
                    if(currentvalue!=stringvalue){ 
                      // get property name from db
                      let property = game.items.find(y => y.type == "property" && y.data.data.attKey == propertykey);
                      if (property!=null){ 
                        let operation='';
                        if (parseInt(stringvalue) < parseInt(currentvalue)){
                          operation='decreased';
                        } else{
                          operation='increased';
                        }
                        changereport+=actorname + ' '+ operation + ' ' + property.name + ' from ' + currentvalue + ' to ' + stringvalue +"<br>" ;
                      }
                    }
                  }
                  if (actor != null) {
                     
                      
                    if(changereport.length>0){  
                      //console.log(finalupdatedata);
                      await actor.update(finalupdatedata);
                      if(Setting_EchoChangesToChatMessage()){
                        let messageData={
                          user: game.user.id,
                          speaker: ChatMessage.getSpeaker({token: actor}),
                          content: changereport
                        }                        
                        ChatMessage.create(messageData);
                      }
                    }
                  } else {
                    ui.notifications.warn('Unable to find actor');
                  }
                }
                await AdjustProperty();
              }
            }
          },
          default: 'yes',
          close: () => {
          },
        });
        d.options.width = 0;
        d.position.width = 0;
        d.options.resizable=true;
        d.render(true);
      } else {
        ui.notifications.warn('More than one token is selected');
      }
    } else {
      ui.notifications.warn('No token selected');
    }
  } else {
    ui.notifications.error('Error getting selected tokens');
  }
}

