// get sheetactor
let sheetactor= GetSheetActor(event); 

if (sheetactor!= null) {
  const propertyKey='LST_ROLE'; 
  const newValue='All'; 
  // set new value 
  SetActorPropertyValue(sheetactor, propertyKey, newValue);
  }
  else {
  ui.notifications.warn('The macro was not triggered from an actor');
}


//                                                                  
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
//                                                                  
//                            Functions                             
//                                                                  
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
//                                                                  

// **************************************************************** 
// Function:            GetSheetActor
// Version Compability: Tested with
//                      Sandbox 0.10.9 | Foundry 0.8.9
//                      Sandbox 0.10.11 | Foundry 0.8.9
//                      Sandbox 0.12.0 | Foundry 9.242
//                      Sandbox 0.12.2 | Foundry 9.249
// Parameters:          event            
// Return:              Returns the actor that called this macro
//                      If no actor found, it returns null. 
//                      This means generally that the macro have 
//                      been run from the hot bar
// ================================================================ 
// Date       Version  Author               Description             
// ---------- -------- -------------------- -----------------------
// 2021-11-30 1.0.0    Ramses800            Macro created                          
// ****************************************************************  
function GetSheetActor(event) {
  let returnactor;
  let actorid = '';
  let cp = event.composedPath();
  for (let key in cp) {
    if (cp.hasOwnProperty(key)) {
      if ((typeof (cp[key]) !== "undefined" && cp[key] !== null)) {
        if ((typeof (cp[key].classList) !== "undefined" && cp[key].classList !== null)) {
          if (cp[key].classList.contains('sandbox') && cp[key].classList.contains('sheet') && cp[key].classList.contains('actor')) {
            //console.log(cp[key].id);  //actor-MMwTr94GekOCihrC   or actor-MMwTr94GekOCihrC-6bX8wMQkdZ9OyOQa
            // get the id from the div
            actorid = cp[key].id.substring(6);  // length of 'actor-'            
            // if the actorid is double(ie MwTr94GekOCihrC-6bX8wMQkdZ9OyOQa), then it is a unlinked token, 
            // need to get the actor from the canvas so use the secondary id            
            if (actorid.length > 16) {
              // get secondary actor id
              actorid = actorid.substring(17);
              //console.log('Token Actor ' + actorid);
              //token = canvas.tokens.get(actorid);
              let token = canvas.tokens.placeables.find(y=>y.id==actorid);
              if (token != null) {
                returnactor = token.actor;
              }
            } else {
              //console.log('Actor ' + actorid);   // MwTr94GekOCihrC
              returnactor = game.actors.get(actorid);
            }
            // exit for loop
            break;
          }
        }
      }
    }
  }
  return returnactor;
}


// **************************************************************** 
// Function:            GetActorPropertyValue
// Version Compability: Tested with
//                      Sandbox 0.10.9 | Foundry 0.8.9
//                      Sandbox 0.10.11 | Foundry 0.8.9
//                      Sandbox 0.12.0 | Foundry 9.242
//                      Sandbox 0.12.2 | Foundry 9.249
// Parameters:          actor,propertykey            
// Return:              Returns the value of an actor property 
//                      If no value is found, it returns null. 
// ================================================================ 
// Date       Version  Author               Description             
// ---------- -------- -------------------- -----------------------
// 2021-11-30 1.0.0    Ramses800            Macro created                          
// **************************************************************** 
function GetActorPropertyValue(actor, propertykey) {
  let returnvalue;
  if (actor !== null && propertykey!=='' ) {
    if (actor.data.data.attributes.hasOwnProperty(propertykey)) {
      returnvalue=actor.data.data.attributes[propertykey].value;
    }
  }
  return returnvalue;
}

// **************************************************************** 
// Function:            SetActorPropertyValue
// Version Compability: Tested with
//                      Sandbox 0.10.9 | Foundry 0.8.9
//                      Sandbox 0.10.11 | Foundry 0.8.9
//                      Sandbox 0.12.0 | Foundry 9.242
//                      Sandbox 0.12.2 | Foundry 9.249
// Parameters:          actor,propertykey,newvalue,newmax            
// Return:              Sets the value/max of an actor property  
// ================================================================ 
// Date       Version  Author               Description             
// ---------- -------- -------------------- -----------------------
// 2021-11-30 1.0.0    Ramses800            Macro created                          
// **************************************************************** 
async function SetActorPropertyValue(actor, propertykey, newvalue='',newmax='') {
  if (actor !== null && propertykey!=='' ) {
    // check that this actor has the attribute
    if (actor.data.data.attributes.hasOwnProperty(propertykey)) {
      // update this actors property
      // when updating a value, always set 'modified:=true'
      // when updating a max  , always set 'modmax:=true'
      if(newvalue!=='' && newmax!==''){
        await actor.update({[`data.attributes.${propertykey}.modmax`]: true,[`data.attributes.${propertykey}.max`]: newmax,[`data.attributes.${propertykey}.value`]: newvalue,[`data.attributes.${propertykey}.modified`]: true});
        
      } else if(newvalue!=='' && newmax==='' ){
        await actor.update({[`data.attributes.${propertykey}.value`]: newvalue, [`data.attributes.${propertykey}.modified`]: true});
        
      } else if(newvalue==='' && newmax!=='' ){
        await actor.update({[`data.attributes.${propertykey}.max`]: newmax, [`data.attributes.${propertykey}.modmax`]: true});
      }            
    } else {
      ui.notifications.warn('SetActorPropertyValue | The actor(' + actor.data.name + ') does not have the property ' + propertykey);
    }
  } else {
    ui.notifications.warn('SetActorPropertyValue | Invalid parameter : actor');
  }
}