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

// example usage
AdjustAllTokensNumericProperty('Strength Value', 'Strength',0);


/*
 *  SetAllTokensProperty
 *  Parameters:
 *    sPropertyName        : displayed property name, can be anything
 *    sPropertyKey         : the key pf the property
 *    defaultValue         : default value to diaply in the input box
 *    
 */
function AdjustAllTokensNumericProperty(sPropertyName, sPropertyKey,defaultValue=0) {
  let applyChanges = false;
  new Dialog({
    title: `Adjust actor property for all tokens` ,
    content: `
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
              <fieldset style="text-align:left;">
                <legend style="text-align:left;">Enter adjustment for actor property value</legend>              
                <div class="form-group">
                  <label for="property-set">${sPropertyName}</label>
                  <input class="spinner" id="property-set" name="property-set" type="number" step="1" value="${defaultValue}" placeholder="0"/>
                </div>
              </fieldset>
              <fieldset style="text-align:left;">
                <legend style="text-align:left;">Adjustment mode</legend>  
                <div class="form-group">
                  <label style="white-space:nowrap;" for="property-set-mode-set">Set value</label>
                  <input id="property-set-mode-set" name="property-set-mode" type="radio" value="set" checked/>
                  <label style="white-space:nowrap;" for="property-set-mode-add">Add to current value</label>
                  <input id="property-set-mode-add" name="property-set-mode" type="radio" value="add" />
                  
                </div>
              </fieldset>
              <fieldset style="text-align:left;">
                <legend style="text-align:left;">Options</legend>              
                <div class="form-group">
                  <label for="property-set-option-only-selected">Only set actor property for selected tokens</label>
                  <input id="property-set-option-only-selected" name="property-set-option-only-selected" type="checkbox" value="true"/>
                </div>                                                                    
              </fieldset>
            </form>
            `,
    buttons: {
      yes: {
        icon: "<i class='fas fa-check'></i>",
        label: `Apply Changes`,
        callback: () => applyChanges = true
      },
      no: {
        icon: "<i class='fas fa-times'></i>",
        label: `Cancel Changes`
      }
    },
    default: "yes",
    close: async (html) => {
      if (applyChanges) {
        const propertySet = parseInt(html.find("#property-set").val() || "0");
        const propertySetOnlySelected = (html.find("#property-set-option-only-selected")[0].checked || false);
        const adjustmentmode = document.querySelector('input[name="property-set-mode"]:checked').value || 'set';        
        let tokens;
        if (propertySetOnlySelected){
          tokens=canvas.tokens.controlled;
        }
        else{
          tokens=canvas.tokens.placeables;
        }        
        for (const token of tokens) {
          // token.data._id
          // check if token has attribute 
        let actor=token.actor;
        let actorattributes = actor.data.data.attributes;        
        if (actorattributes!=null){ 
          // check if it has the property  
          let property = game.items.find(y=>y.type=="property" && y.data.data.attKey==sPropertyKey);          
          if (property!=null) {
            // check property datatype
            if (property.data.data.datatype=='simplenumeric'){            
              // check that token has this property(attribute)
              if(actor.data.data.attributes.hasOwnProperty(sPropertyKey)){                   
                let finalupdatedata;
                let stringvalue=''; 
                if (adjustmentmode=='set'){
                  stringvalue=propertySet;
                }
                else{
                  stringvalue=propertySet + actor.data.data.attributes[sPropertyKey].value;
                }
                finalupdatedata= { [`data.attributes.${sPropertyKey}.value`]: stringvalue };
                await actor.update(finalupdatedata);  
              }
              else{
                ui.notifications.warn('The token(' + token.data.name + ') does not have the property ' + sPropertyKey );
              }
            }
            else{
              ui.notifications.warn('The property with key '+ sPropertyKey + ' is not a simplenumeric property');
            } 
          }
          else{
            ui.notifications.warn('The property with key '+ sPropertyKey + ' does not exist');
          }
        }
        else{          
          ui.notifications.error('The selected token(' + token.data.name + ') does not have any attributes' );
        }
        }
      }
    }
  }).render(true);

}