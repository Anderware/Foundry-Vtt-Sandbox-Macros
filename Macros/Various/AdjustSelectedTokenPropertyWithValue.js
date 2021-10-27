// **************************************************************** 
// Macro:        AdjustSelectedTokenPropertyWithValue                                                    
// Description:  Adds a value to an actor property based on its name(key) 
// Compability:  Tested with 
//               Foundry 0.8.8 - Sandbox 0.10.1                  
// ================================================================ 
// Date       Version  Author               Description             
// ---------- -------- -------------------- ----------------------- 
// 2021-10-27 1.0.0    Ramses800            Macro created.         
// **************************************************************** 

// example usage
AdjustSelectedTokenPropertyWithValue('ATTACK',1);


//  Arguments
//  sPropertyKey - the key of the actor property. Must be a simplenumeric property
//  valueToAdd   - numeric value to add. Can be set to negative(example: -1) to decrease the value
async function AdjustSelectedTokenPropertyWithValue(sPropertyKey,valueToAdd){
  // get selected token
  let selected = canvas.tokens.controlled; 
  if (selected!=null){
    if(selected.length>0){
      if(selected.length==1){
        let token = selected[0];  
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
                let propertyvalue=actor.data.data.attributes[sPropertyKey].value;                   
                propertyvalue=propertyvalue + valueToAdd;
                stringvalue=propertyvalue;
                finalupdatedata= { [`data.attributes.${sPropertyKey}.value`]: stringvalue };
                await actor.update(finalupdatedata);  
              }
              else{
                ui.notifications.warn('The selected token(' + token.data.name + ') does not have the property ' + sPropertyKey );
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
      else{
        ui.notifications.warn('More than one token is selected');
      }
    }
    else{
      ui.notifications.warn('No token selected');
    }     
  }
  else{
    ui.notifications.error('Error getting selected tokens');
  }


}