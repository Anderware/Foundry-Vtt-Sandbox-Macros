// **************************************************************** 
// Macro:        AdjustSelectedTokenInitiative                                                    
// Description:  Display dialog with first selected tokens current 
//               initiative and allows to adjust it 
// Compability:  Tested with 
//               Foundry 0.8.8 - Sandbox 0.10.1                  
// ================================================================ 
// Date       Version  Author               Description             
// ---------- -------- -------------------- ----------------------- 
// 2021-10-27 1.0.0    Ramses800            Macro created.         
// **************************************************************** 

// example usage
AdjustSelectedTokenInitiative();
 
function AdjustSelectedTokenInitiative(){
  let applyChanges = false;
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
          //debugger;
          new Dialog({
              title: `Enter initiative`,
              content: `
                  <form>
                    <div class="form-group">
                      <label>Initiative:</label>
                      <input id="init-adjust" name="init-adjust" type="number" step="1" placeholder="` + selectedtokencurrentinitiative + `"/>
                    </div>
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
                  },
              },
              default: "yes",
              close: html => {
                  if (applyChanges) {
                      const initAdjust = parseInt(html.find("#init-adjust").val() || "0");                                                                   
                      game.combat.setInitiative(combatant.data._id, initAdjust);                      
                  }
              }
          }).render(true);
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