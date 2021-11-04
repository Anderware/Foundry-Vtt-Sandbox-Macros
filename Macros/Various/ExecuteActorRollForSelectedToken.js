// **************************************************************** 
// Macro:        ExecuteActorRollForSelectedToken                                                    
// Description:  Rolls a rollable property based on its name(key) 
// Compability:  Tested with 
//               Foundry 0.8.8 - Sandbox 0.10.1                  
// ================================================================ 
// Date       Version  Author               Description             
// ---------- -------- -------------------- ----------------------- 
// 2021-05-05 1.0.0    Ramses800            Macro created.
// 2021-10-26 1.1.0    Ramses800            Added target
// 2021-11-04 1.2.0    Ramses800            Added roll dialogs support          
// **************************************************************** 

// example
ExecuteActorRollForSelectedToken('DODGE');

async function  ExecuteActorRollForSelectedToken(sPropertyKey){
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
            // check that token has this property(attribute) or it is a label(neat trick, the label does not actually be in the actor, its roll expression(as long as it is valid with the actor in question) can be rolled against an actor anyways)
            if(actor.data.data.attributes.hasOwnProperty(sPropertyKey)|| property.data.data.datatype=='label'){ 
              // check if the property has a roll
              let rollexp = property.data.data.rollexp;
              if (rollexp!=null){
                if (rollexp.length>0){
                  // execute it                    
                  let rollid = [];             
                  let rollname = property.data.data.rollname;
                  let hasDialog = property.data.data.hasdialog;
                  let dialogID = property.data.data.dialogID;
                  let useData = null;         
                  rollid.push(property.data.data.rollid);  
                  let citemattributes=null;
                  let number=1;
                  let targets = game.user.targets.ids; // get list of currently selected targets by the current user
                  let target = canvas.tokens.placeables.find(y=>y.id==targets[0]); // this will selected the first targeted token
                  let rollcitemID = null;  
                  if (hasDialog) {
                    actor._sheet.generateRollDialog(dialogID, rollexp, rollname, rollid, actorattributes, citemattributes, number, rollcitemID, targets, useData);
                  }
                  else{     
                    actor.rollSheetDice(rollexp,rollname,rollid,actorattributes,citemattributes,number,target,rollcitemID);
                  } 
                }
                else{
                  ui.notifications.warn('The roll expression for property ' + sPropertyKey + ' is empty');
                }      
              }
              else{
                ui.notifications.warn('The property ' + sPropertyKey + ' does not have a rollexpression');
              }
            }
            else{
              ui.notifications.warn('The selected token(' + token.data.name + ') does not have the property ' + sPropertyKey );
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
