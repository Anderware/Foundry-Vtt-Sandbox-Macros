// **************************************************************** 
// Macro:        ActivatecItemForSelectedToken                                                    
// Description:  Activates a cItem for selected token                
// ================================================================ 
// Date       Version  Author               Description             
// ---------- -------- -------------------- ----------------------- 
// 2021-08-29 1.0.0    Ramses800            Sandbox 0.9.27
// 2022-03-20 1.1.0    Ramses800            Sandbox 0.12.4         
// **************************************************************** 

ActivatecItemForSelectedToken('Book of Lies');

async function ActivatecItemForSelectedToken(scItemName) {
	// get selected token
	let selected = canvas.tokens.controlled;
	if (selected != null) {
		if (selected.length > 0) {
			if (selected.length == 1) {
				let token = selected[0];
				// check if token has citem   
				let actor = token.actor;
				let citem = actor.data.data.citems.find(y => y.name == scItemName);
				if (citem != null) {
          let gitem = game.items.find(y=>y.name == scItemName);
          if (gitem!=null){
            let cItemData = {};
            cItemData.id = citem.id;
            cItemData.value = citem.isactive;                      
            // check if consumable
            if (citem.usetype=="CON"){
              cItemData.iscon=true;  
            }                     
            // check if it has a ciRoll
            // get the roll
            let rollexp=gitem.data.data.roll;             
            if(!rollexp){ 
              // no ciroll, just activate it
              let roll=null;                                
              actor._sheet.activateCI(cItemData.id, cItemData.value, cItemData.iscon, roll);              
            }
            else{
              // has ciroll              
              let attrID=''; // only used when not  ciroll in onRollCheck, set this to empty
              let attKey=null;
              let ciRoll=true;                                 
              let isFree=false; //  roll from free tables, 
              let tableKey=null; // used by free tables, not needed now               
              let citemKey=citem.ciKey;  
              // v 0.12.4  _onRollCheck(attrID, attKey, citemID, citemKey = null, ciRoll = false, isFree = false, tableKey = null, useData = null)
              actor._sheet._onRollCheck(attrID,attKey, cItemData.id,citemKey, ciRoll, isFree, tableKey , cItemData);
                            
            }          
          } else{
            // citem not found in items
            ui.notifications.warn('The cItem ' + scItemName + ' can not be found in the database');
          } 
				} else {
					// 
					ui.notifications.warn('The selected token(' + token.data.name + ') does not have the cItem ' + scItemName);
				}
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

