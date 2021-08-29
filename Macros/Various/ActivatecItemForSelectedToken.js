ActivatecItemForSelectedToken('Power Ring');

function SystemCompatible(requiredsystem,requiredversion,exactversion=false){
  let runningsystemname=game.system.data.name; // sandbox
  let runningversion=game.system.data.version;
  let returnvalue=false; // assume fail
  if  (runningsystemname==requiredsystem|| requiredsystem==""){ 
  	let result=runningversion.localeCompare(requiredversion, undefined, { numeric: true, sensitivity: 'base' });
    if(exactversion){
      if(result==0){
      	returnvalue=true;
      }
    }
    else{
      if(result==1 || result==0){
      	returnvalue=true;
      }
    }
  }
  return returnvalue;
}

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
            let requiredversion="0.9.27";
            if(!rollexp){ 
              // no ciroll, just activate it
              let roll=null;    
              
              if (SystemCompatible("sandbox",requiredversion)){                         
                // for Sandbox version 0.9.27+
                actor._sheet.activateCI(cItemData.id, cItemData.value, cItemData.iscon, roll);
              }
              else{   
               ui.notifications.warn("The macro " + this.name + " requires Sandbox version " + requiredversion +" or higher to be fully functional");             
               // for Sandbox version 0.9.20
               actor._sheet.activateCI(cItemData.id, cItemData.value, cItemData.iscon);
              }
            }
            else{
              // has ciroll              
              let attrID=''; // only used when not  ciroll in onRollCheck, set this to empty
              let ciRoll=true;                                 
              let isFree=false; //  roll from free tables, 
              let tableKey=null; // used by free tables, not needed now  
              // go!       
              if (SystemCompatible("sandbox",requiredversion)){
                // for Sandbox version 0.9.27+
                actor._sheet._onRollCheck(attrID, cItemData.id, ciRoll, isFree, tableKey , cItemData);
              }
              else{                    
                ui.notifications.warn("The macro " + this.name + " requires Sandbox version " + requiredversion +" or higher to be fully functional");
                // for Sandbox version 0.9.20                                                               
                actor._sheet._onRollCheck(attrID, cItemData.id, ciRoll, isFree, tableKey );
              }              
            }          
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