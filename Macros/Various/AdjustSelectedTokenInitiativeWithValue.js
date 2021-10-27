// **************************************************************** 
// Macro:        AdjustSelectedTokenInitiativeWithValue.js                                                    
// Description:  Adjust first selected tokens current 
//               initiative, adding a value to it 
// Compability:  Tested with 
//               Foundry 0.8.8 - Sandbox 0.10.1                  
// ================================================================ 
// Date       Version  Author               Description             
// ---------- -------- -------------------- ----------------------- 
// 2021-10-27 1.0.0    Ramses800            Macro created.         
// **************************************************************** 

// example usage
AdjustSelectedTokenInitiativeWithValue(1);


//  valueToAdd   - numeric value to add. Can be set to negative(example: -1) to decrease the value
function AdjustSelectedTokenInitiativeWithValue(valueToAdd){
  let selectedtokencurrentinitiative=0;
  // get selected token
  let selected = canvas.tokens.controlled; 
  if (selected!=null){
    if(selected.length>0){
      if(selected.length==1){
        let token = selected[0]; 
        const combatant = game.combat.combatants.find(c => c.data.tokenId === token.data._id); 
        if(combatant!=null){ 
          if (typeof combatant.data.initiative !== 'undefined'){
            selectedtokencurrentinitiative=combatant.data.initiative
          } 
          let initAdjust=selectedtokencurrentinitiative + valueToAdd;
          game.combat.setInitiative(combatant.data._id, initAdjust);        
        }
        else{
          ui.notifications.warn('Selected token '+ token.name + ' is not in combat');
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