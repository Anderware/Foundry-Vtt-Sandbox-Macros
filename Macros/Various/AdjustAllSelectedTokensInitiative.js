// **************************************************************** 
// Macro:        AdjustAllSelectedTokensInitiative                                                    
// Description:  Display dialog. For all the selected tokens, 
//               adjust their initiative by dialog input.  
//               Use with selective-select to modify all enemies, friendlies 
// Compability:  Tested with 
//               Foundry 0.8.8 - Sandbox 0.10.1                  
// ================================================================ 
// Date       Version  Author               Description             
// ---------- -------- -------------------- ----------------------- 
// 2021-10-27 1.0.0    Ramses800            Macro created.         
// **************************************************************** 

// example usage
AdjustAllSelectedTokensInitiative();



function AdjustAllSelectedTokensInitiative(){
  let applyChanges = false;
    // get selected token
  let selected = canvas.tokens.controlled; 
  if (selected!=null){
    if(selected.length>0){  
      new Dialog({
        title: `Enter initiative`,
        content: `
            <form>
              <div class="form-group">
                <label>Initiative:</label>
                <input id="init-adjust" name="init-adjust" type="number" step="1" placeholder="0"/>
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
            for (const token of canvas.tokens.controlled) {
              const combatant = game.combat.combatants.find(c => c.data.tokenId === token.data._id); 
              if(combatant!=null){
                game.combat.setInitiative(combatant.data._id, initAdjust);
              }  
              else{
                ui.notifications.warn('Selected token '+ token.name + ' is not in combat');
              }
            }
          }
        }
      }).render(true);
    }
    else{
      ui.notifications.warn('No token selected');
    }  
  }    
  else{
    ui.notifications.error('Error getting selected tokens');
  }
}