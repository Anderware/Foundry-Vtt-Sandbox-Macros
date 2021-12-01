// **************************************************************** 
// Macro:               AdjustSelectedTokenProperties.js
// Description:         Displays a dialog for the seleced token
//                      with configured properties
// Version Compability: Tested with
//                      Sandbox 0.10.9 | Foundry 0.8.9
// ================================================================ 
// Date       Version  Author               Description             
// ---------- -------- -------------------- -----------------------
// 2021-09-01 1.0.0    Ramses800            Macro created
// 2021-09-01 1.1.0    Ramses800                              
// 2021-11-30 1.1.2    Ramses800
// ****************************************************************   

//                                                                  
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
//                                                                  
//                     Settings for this macro                      
//                                                                  
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
// 
function Setting_PropertiesToAdjust() {
  // Note on configuring this macro
  // Property field:
  //   propertykey - the key of the property, required
  //   dieroll     - any normal die roll expression, not required
  //   maxvalue    - limits the input, not required
  //   minvalue    - limits the input, not required
  let objProperties = [
    {'propertykey': 'Dexterity', 'dieroll': '3d6', 'maxvalue': '18', 'minvalue': '3'},
    {'propertykey': 'Strength', 'dieroll': '3d6', 'maxvalue': '18', 'minvalue': '3'},
    {'propertykey': 'Perception', 'dieroll': '3d6', 'maxvalue': '18', 'minvalue': '3'},
    {'propertykey': 'hp','dieroll': '4d8'}
  ];
  return JSON.stringify(objProperties);
}

AdjustSelectedTokenProperties();


//                                                                  
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
//                                                                  
//                        Macro code                        
//                                                                  
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
// 


function BuildTableRow(sPropertyTag, sPropertyKey, currentvalue = 0, sDieRoll, maxvalue = '', minvalue = '') {
  let sNameToShow = '';
  if (sPropertyTag == "") {
    sNameToShow = sPropertyKey;
  } else {
    sNameToShow = sPropertyTag;
  }
  let sBuildTableRow = `                                        
       <tr>
       <td>` + sNameToShow + `</td>
       <td style="text-align:center;">` + currentvalue + `</td>
       <td><input class="spinner" style="width:48px;" type="number" id="property-` + sPropertyKey + `" name="` + sPropertyKey + `" value="` + currentvalue + `" max="` + maxvalue + `" min="` + minvalue + `"></td>
       <td><input class="die" style="width:64px;padding-right:5px;" type="text" id="` + sPropertyKey + `-die-roll" name="` + sPropertyKey + `-die-roll" value="` + sDieRoll + `">
          <i onclick="RollNewValue('property-` + sPropertyKey + `','` + sPropertyKey + `-die-roll')" title="Roll new value" class="rolldie fas fa-dice-d20"></i></td>
       </tr>`;
  return sBuildTableRow;
}

function BuildHTML(token) {
  let actorid = token.actor.id;
  let actorlink = token.data.actorLink;


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
  let propertytag;
  

  if (arrPropertys.length > 0) {
    shtml += `<table>
       <thead> 
        <tr>
        <th class="adjuster">Property</th>
        <th class="adjuster">Current Value</th>
        <th class="adjuster">New Value</th>
        <th class="adjuster">Die roll</th>
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
        shtml += BuildTableRow(propertytag, propertykey, currentvalue, dieroll, maxvalue, minvalue);
      }
    });
    shtml += `</tbody>
       </table>`;
  } else {
  }
  shtml += '<button type="button" id="btnRollAll" style="width:100%;cursor:pointer;"  onclick="RollAllNewValues()" title="Roll all values"><i class ="fas fa-dice-d20"></i>Roll All</button></fieldset>';
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
            th.adjuster{
              padding:3px 3px 3px 3px;
            }
            .rolldie{
              padding:0px 3px 0px 3px;
            }
            .rolldie:hover{
              cursor:pointer;
              text-shadow: 0 0 8px red;
            }
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
          <script>
          async function RollNewValue(newvalueelementid,dierollelementid){
            let dieroll=document.querySelector('#' + dierollelementid ).value || '';  
            if (dieroll!=''){
              let newvalue=document.getElementById(newvalueelementid);
              if (newvalue!=null){
                let roll_result= (await new Roll(dieroll).evaluate({async: true})).total;
                newvalue.value=roll_result;
              }                            
            }
          }
        
          function RollAllNewValues(){
            let arrProperties = JSON.parse('${Setting_PropertiesToAdjust()}');
            arrProperties.forEach(function(property){
              RollNewValue('property-' + property.propertykey,property.propertykey + '-die-roll');
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
                  let actor;
                  if (actorlink == "true") {
                    actor = game.actors.get(actorid);
                  } else {
                    // grab it from the canvas                       
                    actor = canvas.tokens.get(actorid).actor
                  }
                  // get all input boxes of class spinner 
                  let baseInput = html.find('.spinner');
                  let stringvalue = "";
                  let propertyname = "";
                  let updatedata;
                  let finalupdatedata;
                  // loop inputs found and merge the update data               
                  for (let i = 0, l = baseInput.length; i < l; i++) {
                    stringvalue = baseInput[i].value;
                    propertykey = baseInput[i].name;
                    // when updating a value, always set 'modified:=true'
                    // when updating a max  , always set 'modmax:=true'
                    if (i == 0) {
                      finalupdatedata = {[`data.attributes.${propertykey}.value`]: stringvalue, [`data.attributes.${propertykey}.modified`]: true};
                    } else {
                      updatedata = {[`data.attributes.${propertykey}.value`]: stringvalue, [`data.attributes.${propertykey}.modified`]: true};
                      finalupdatedata = Object.assign(finalupdatedata, updatedata);
                    }
                  }
                  if (actor != null) {
                    //console.log(finalupdatedata);
                    await actor.update(finalupdatedata);
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
        //d.options.resizable=true;
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

