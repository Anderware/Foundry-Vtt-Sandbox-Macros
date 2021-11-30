// ---------------------------------------
// Example macro for using GetCallingActor
// This example assumes that the actor
// has a simple numeric property with the
// key 'hp'
// ---------------------------------------

RollNewValueForCallingActorProperty('hp','3d6');

async function RollNewValueForCallingActorProperty(propertykey,dieroll) {
  // get calling actor
  let callingactor = GetCallingActor(event); // event is what triggered the macro, usually it is a MouseClick
  
  if (callingactor != null) {
    console.log(callingactor.data.name);
    // check that this actor has the hp attribute
    if(callingactor.data.data.attributes.hasOwnProperty(propertykey)){
      // roll new hp
      let roll_result = (await new Roll(dieroll).evaluate({async: true})).total.toString();
      console.warn('New value:' + roll_result );
      // update this actors property
      await callingactor.update({[`data.attributes.${propertykey}.value`]: roll_result});
      console.warn('actor updated')
    }
    else{
      ui.notifications.warn('The actor(' + callingactor.data.name + ') does not have the property '+ propertykey);
    }
  }
  else{
    ui.notifications.warn('The macro was not triggered from an actor');
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
              console.log('Token Actor ' + actorid);
              //token = canvas.tokens.get(actorid);
              token = canvas.tokens.placeables.find(y=>y.id==actorid);
              if (token != null) {
                returnactor = token.actor;
              }
            } else {
              console.log('Actor ' + actorid);   // MwTr94GekOCihrC
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