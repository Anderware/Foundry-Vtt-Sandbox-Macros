// **************************************************************** 
// Macro:        AdjustAllTokensNumericProperty                                                    
// Description:  Display dialog. For all the tokens, 
//               adjust their property by dialog input.  
//               
// Compability:  Tested with 
//               Foundry 0.8.9 - Sandbox 0.10.9                  
// ================================================================ 
// Date       Version  Author               Description             
// ---------- -------- -------------------- ----------------------- 
// 2021-11-29 1.0.0    Ramses800            Macro created.         
// **************************************************************** 

// Set which properties to list settings in function Setting_PropertiesToAdjust 
function Setting_PropertiesToAdjust() {
  let objProperties = [
    {'propertyname': 'Strength Value', 'propertykey': 'Strength', 'defaultvalue': '0'},
    {'propertyname': 'Perception Value', 'propertykey': 'Perception', 'defaultvalue': '0'},
    {'propertyname': 'Dexterity Value', 'propertykey': 'Dexterity', 'defaultvalue': '0'}
  ];
  return JSON.stringify(objProperties);
}

AdjustAllTokensNumericProperty();

//                                                                  
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
//                                                                  
//                        Macro code                        
//                                                                  
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
// 
function BuildPropertiesHTML() {
  let sHTML = `<table>
       <thead> 
        <tr>
        <th class="adjuster">Property Name</th>
        <th class="adjuster">Adjustement Value</th>
        <th class="adjuster">Set <i title="Set actors current property value to Adjustment Value " class="far fa-question-circle"></i></th>
        <th class="adjuster">Modify <i title="Modify actors current property value with Adjustment Value" class="far fa-question-circle"></i></th>
        <th class="adjuster">None <i title="Do not adjust actors current property value" class="far fa-question-circle"></i></th>
        </tr>
       </thead>
       <tbody>`;
  ;
  const arrProperties = JSON.parse(Setting_PropertiesToAdjust());
  let propertyname = '';
  let propertykey = '';
  let defaultvalue = '';
  let modeset='checked';
  let modeadd='';
  let modenone='';
  // get any saved settings
  let savedadjustments=game.user.getFlag('world','AdjustAllTokensNumericProperty-settings');
  arrProperties.forEach(function (property) {
    defaultvalue=property.defaultvalue;
    if(savedadjustments!=null){
      // try to find this property in saved
      let obj = savedadjustments.find(o => o.propertykey === property.propertykey);
      if(obj){
        defaultvalue=obj.propertyset;
        switch (obj.adjustmentmode){
          case 'set':
            modeset='checked';
            modeadd='';
            modenone='';
            break;
          case 'add':
            modeset='';
            modeadd='checked';
            modenone='';
            break;
          case 'none':
            modeset='';
            modeadd='';
            modenone='checked';
            break;
        }
      }
    }
    sHTML += `<tr>
      <td style="white-space:nowrap;">${property.propertyname}</td>
      <td style="text-align:center;"><input style="width:64px;" class="spinner" id="${property.propertykey}" name="${property.propertykey}" type="number" step="1" value="${defaultvalue}" placeholder="0"/></td>
      <td style="text-align:center;"><input id="property-set-mode-set-${property.propertykey}" name="property-set-mode-${property.propertykey}" type="radio" value="set" ${modeset}/></td>                      
      <td style="text-align:center;"><input id="property-set-mode-add-${property.propertykey}" name="property-set-mode-${property.propertykey}" type="radio" value="add" ${modeadd}/></td>
      <td style="text-align:center;"><input id="property-set-mode-none-${property.propertykey}" name="property-set-mode-${property.propertykey}" type="radio" value="none" ${modenone}/></td>
      </tr>
       `;
  });
  sHTML += `</tbody></table>`
  return sHTML;
}

/*
 *  SetAllTokensProperty
 *  Parameters:
 *    sPropertyName        : displayed property name, can be anything
 *    sPropertyKey         : the key pf the property
 *    defaultValue         : default value to diaply in the input box
 *    
 */
function AdjustAllTokensNumericProperty() {
  
  let d=new Dialog({
    title: `Adjust actor property values for all tokens`,
    content: `
            <style>
            th.adjuster{
              padding:3px 3px 3px 3px;
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
            <form>
              <fieldset style="text-align:left;">
                <legend style="text-align:left;">Enter adjustments for actor property values</legend>                              
                ${BuildPropertiesHTML()}
              </fieldset>
              
              <fieldset style="text-align:left;">
                <legend style="text-align:left;">Options</legend>              
                <div class="form-group">
                  <label for="property-set-option-only-selected">Only set actor property values for selected tokens</label>
                  <input id="property-set-option-only-selected" name="property-set-option-only-selected" type="checkbox" value="true"/>
                </div>  
                <div class="form-group">
                  <label for="property-set-option-save-settings">Save adjustments values</label>
                  <input id="property-set-option-save-settings" name="property-set-option-save-settings" type="checkbox" value="true" checked/>
                </div>
              </fieldset>
            </form>
            `,
    buttons: {
      yes: {
        icon: "<i class='fas fa-check'></i>",
        label: `Apply`,
        callback: async (html) => {
          let propertyset;
          let adjustmentmode;
          let arrProperties = JSON.parse(Setting_PropertiesToAdjust());
          let bSaveSettings=html.find("#property-set-option-save-settings")[0].checked || false;
          arrProperties.forEach(function (adjustproperty) {
            // add input s
            propertyset = parseInt(html.find('#' + adjustproperty.propertykey).val() || "0");
            adjustmentmode = document.querySelector('input[name="property-set-mode-' + adjustproperty.propertykey + '"]:checked').value || 'set';
            // append inputs to array
            adjustproperty.propertyset=propertyset;
            adjustproperty.adjustmentmode=adjustmentmode;
            
          });
          if(bSaveSettings){
            await game.user.setFlag('world','AdjustAllTokensNumericProperty-settings',arrProperties);              
          }
          else{
            await game.user.unsetFlag('world','AdjustAllTokensNumericProperty-settings');
          }
          
          const propertySetOnlySelected = (html.find("#property-set-option-only-selected")[0].checked || false);

          let tokens;
          if (propertySetOnlySelected) {
            tokens = canvas.tokens.controlled;
          } else {
            tokens = canvas.tokens.placeables;
          }
          for (const token of tokens) {
            // token.data._id
            // check if token has attribute 
            let actor = token.actor;
            let actorattributes = actor.data.data.attributes;
            if (actorattributes != null) {
              
              
              let iPropertyCount = 0;
              let finalupdatedata = null;
              let updatedata;
              let stringvalue = '';
              arrProperties.forEach(async function (adjustproperty) {
                iPropertyCount += 1;
                // check if it has the property  
                let property = game.items.find(y => y.type == "property" && y.data.data.attKey == adjustproperty.propertykey);
                if (property != null) {
                  // check property datatype
                  if (property.data.data.datatype == 'simplenumeric') {
                    // check that token has this property(attribute)
                    if (actor.data.data.attributes.hasOwnProperty(adjustproperty.propertykey)) {
                      
                      

                      if (adjustproperty.adjustmentmode == 'set') {
                        stringvalue = adjustproperty.propertyset;
                      } else {
                        stringvalue = adjustproperty.propertyset + actor.data.data.attributes[adjustproperty.propertykey].value;
                      }
                      if (adjustproperty.adjustmentmode != 'none') {
                        if (iPropertyCount == 1) {
                          finalupdatedata = {[`data.attributes.${adjustproperty.propertykey}.value`]: stringvalue};
                        } else {
                          updatedata = {[`data.attributes.${adjustproperty.propertykey}.value`]: stringvalue};
                          finalupdatedata = Object.assign(finalupdatedata, updatedata);
                        }
                      }

                    } else {
                      ui.notifications.warn('The token(' + token.data.name + ') does not have the property ' + adjustproperty.propertykey);
                    }
                  } else {
                    ui.notifications.warn('The property with key ' + adjustproperty.propertykey + ' is not a simplenumeric property');
                  }
                } else {
                  ui.notifications.warn('The property with key ' + adjustproperty.propertykey + ' does not exist');
                }
              });
              if (finalupdatedata != null) {
                await actor.update(finalupdatedata);
              }

            } else {
              ui.notifications.error('The selected token(' + token.data.name + ') does not have any attributes');
            }
          }
        }

      },
      no: {
        icon: "<i class='fas fa-times'></i>",
        label: `Cancel`
      }
    },
    default: "yes",
    close: (html) => {

    }
  });
  d.options.width = 0;
  d.position.width = 0;
  //d.options.resizable=true;
  d.render(true);

}