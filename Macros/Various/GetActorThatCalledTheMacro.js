// ---------------------------------------
// Example macro for using GetCallingActor
// This example assumes that the actor
// has a simple numeric property with the
// key 'hp'
// ---------------------------------------


let dieroll='3d6';
let propertykey='hp';
// get calling actor
let callingactor = GetCallingActor(event); // event is what triggered the macro, usually it is a MouseClick

if (callingactor != null) {  
  // roll new value
  let roll_result = new Roll(dieroll).evaluate({async: false}).total.toString();
  console.log('Updating actor ['+ callingactor.data.name + '] property ['+ propertykey +'] New value ['+ roll_result +']');
  UpdateActorProperty(callingactor, propertykey, roll_result);
} else {
  ui.notifications.warn('The macro was not triggered from an actor');
}

async function UpdateActorProperty(actor, propertykey, newvalue) {
  // check that this actor has the hp attribute
  if (actor.data.data.attributes.hasOwnProperty(propertykey)) {
    // update this actors property
    // when updating a value, always set 'modified:=true'
    // when updating a max  , always set 'modmax:=true'
    await actor.update({[`data.attributes.${propertykey}.value`]: newvalue, [`data.attributes.${propertykey}.modified`]: true});
  } else {
    ui.notifications.warn('The actor(' + actor.data.name + ') does not have the property ' + propertykey);
  }

}

// **************************************************************** 
// Function:            GetCallingActor
// Version Compability: Tested with
//                      Sandbox 0.10.9 | Foundry 0.8.9
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
function GetCallingActor(event) {
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
              token = canvas.tokens.placeables.find(y=>y.id==actorid);
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