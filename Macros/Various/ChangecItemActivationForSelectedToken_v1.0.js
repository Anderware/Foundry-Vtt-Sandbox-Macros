// **************************************************************** 
// Macro:        ChangecItemActivationForSelectedToken                                                    
// Description:  Changes activation a cItem for selected token   
// Compability:  Sandbox 0.12.4             
// ================================================================ 
// Date       Version  Author               Description             
// ---------- -------- -------------------- ----------------------- 
// 2022-04-24 1.0.0    Ramses800            Macro created         
// **************************************************************** 

SetcItemActiveForSelectedToken('Book of Lies');        // To set citem ACTIVE
//ResetcItemActiveForSelectedToken('Book of Lies');    // To set citem INACTIVE
//TogglecItemActiveForSelectedToken('Book of Lies');   // To toggle activation

//                                                                  
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
//                                                                  
//                     Macro generic functions                      
//                                                                  
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
//                                                                  

function SetcItemActiveForSelectedToken(scItemName){
  ChangecItemActivationForSelectedToken(scItemName);
}

function ResetcItemActiveForSelectedToken(scItemName){
  ChangecItemActivationForSelectedToken(scItemName,false);
}

function TogglecItemActiveForSelectedToken(scItemName){
  ChangecItemActivationForSelectedToken(scItemName,null,true);
}

async function ChangecItemActivationForSelectedToken(scItemName,value=true,toggle=false) {
	// get selected token
	let selected = canvas.tokens.controlled;
	if (selected != null) {
		if (selected.length > 0) {
			if (selected.length == 1) {
				let token = selected[0];
				// check if token has citem   
				let actor = token.actor;
				let actor_citem = actor.data.data.citems.find(y => y.name == scItemName);
				if (actor_citem != null) {
          // actor has citem
          // get citemdata from items db
          let citem = game.items.find(y=>y.name == scItemName);
          if (citem!=null){            
            let citem_id = citem.id;
            let citem_ciKey=citem.ciKey;              
            if(toggle){
              if(actor_citem.isactive ){
                // deactivate
                actor._sheet.useCIIcon(citem_id, citem_ciKey, false, false, true);
              } else {
                // activate                                              
                actor._sheet.useCIIcon(citem_id, citem_ciKey, true, false, true);
              }              
            } else {
              if(value==true){
                // activate only if not active 
                if(!actor_citem.isactive){
                  actor._sheet.useCIIcon(citem_id, citem_ciKey, true, false, true);
                } else {
                  ui.notifications.info('The cItem ' + scItemName + ' is already active for selected token(' + token.data.name + ')');
                }                                                                  
                
              } else {
                // deactivate only if active
                if(actor_citem.isactive){
                  actor._sheet.useCIIcon(citem_id, citem_ciKey, false, false, true);
                } else {
                  ui.notifications.info('The cItem ' + scItemName + ' is already inactive for selected token(' + token.data.name + ')');
                }
              }
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

