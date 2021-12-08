// ---------------------------------------
// Example macro for using GetSheetActor
// This example assumes that the actor
// has simple numeric property with the
// key 'HIT_POINTS' and 'HIT_DICE'
// ---------------------------------------

// get sheetactor
let sheetactor= GetSheetActor(event); 

if (sheetactor!= null) {  
  // get hit dice from actor
  let hd=GetActorPropertyValue(sheetactor, 'HIT_DICE');
  // assemble die roll
  let dieroll=hd + 'd8';
  // roll new value
  let roll_result = new Roll(dieroll).evaluate({async: false}).total.toString();
  // set new value and also its max
  SetActorPropertyValue(sheetactor, 'HIT_POINTS', roll_result, roll_result);
  }
  else {
  ui.notifications.warn('The macro was not triggered from an actor');
}

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

function GetActorPropertyValue(actor, propertykey) {
  let returnvalue;
  if (actor !== null && propertykey!=='' ) {
    if (actor.data.data.attributes.hasOwnProperty(propertykey)) {
      returnvalue=actor.data.data.attributes[propertykey].value;
    }
  }
  return returnvalue;
}

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