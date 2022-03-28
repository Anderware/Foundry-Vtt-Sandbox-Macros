// **************************************************************** 
// Macro:               RechargeCitemsFromActorSheet 
// Description:         Recharge cItems from macro button examples
// Version Compability: Tested with
//                      Sandbox 0.12.4 | Foundry 9.255                      
// ================================================================ 
// Date       Version  Author               Description             
// ---------- -------- -------------------- -----------------------
// 2022-03-23 1.0.0    Ramses800            Macro created
// 2022-03-28 1.0.0    Ramses800            Refactoring, add changeuses
// ****************************************************************  
// get sheetactor
let sheetactor= GetSheetActor(event); 

if (sheetactor!= null) { 

  // -------------------------------------------------
  // Un-comment whatever function you want to test out
  // -------------------------------------------------

  // Example recharge
  // await RechargeActorCitem(sheetactor,'Book of Lies');
  
  // Example change uses
  await ChangeUsesActorCitem(sheetactor,'Book of Illusions',4);
  
  // Example increase uses by 1
  // await IncreaseUsesActorCitem(sheetactor,'Magic Wand');
                               
  // Example decrease uses by 1
  // await DecreaseUsesActorCitem(sheetactor,'Book of Illusions');
  
  // Example function with different ways of filtering what citems to recharge
  // await LoopAllActorcItemsAndRechargeExample(sheetactor);
  
} else {
  ui.notifications.warn('The macro was not triggered from an actor');
}

//                                                                  
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
//                                                                  
//                           Macro Functions                             
//                                                                  
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
//
async function LoopAllActorcItemsAndRechargeExample(actor){
  // Loop all actors cItems
  for(let i=0; i<sheetactor.data.data.citems.length;i++){
    let citem=sheetactor.data.data.citems[i]; 
    let brechargethis=false;
    // check if citem is rechargable 
    if(citem.rechargable==true){ 
      // check if to recharge this
      // -------   
      // by name
      // ------- 
      let citemnames=['Book of Lies','Magic Wand'];
      if (citemnames.includes(citem.name)){
        console.log(citem.name + ' Matches name'); 
        brechargethis=true;
      } 
      // by citem group(key)
      let groupkey='GROUP_ITEMSX'
      if (citem.groups.length>0){                         
        // loop all the groups of this citem                 
        for(let iGroup=0;iGroup<citem.groups.length;iGroup++){ 
          // check if this is the desired group 
          if(citem.groups[iGroup].ikey==groupkey){ 
            console.log(citem.name + ' Matches group');
            brechargethis=true;
          }
        }
      }
      // --------------------------------
      // by citem property(key) and value
      // --------------------------------
      let citempropertykey='ItemGroup';
      let citempropertyvalue='Miscellaneous'; 
      // check if citem has property
      if (citem.attributes.hasOwnProperty(citempropertykey)){ 
        // check if property value is a match
        if(citem.attributes[citempropertykey].value==citempropertyvalue){ 
          console.log(citem.name +' Matches citem property');
          brechargethis=true;
        }
      }
      // --------------------
      // perform the recharge
      // --------------------
      if (brechargethis){
        await sheetactor.sheet.rechargeCI(citem.id,citem.ciKey);         
      }
    }
  }
}

//                                                                  
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
//                                                                  
//                         Generic Functions                             
//                                                                  
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
//                                                                  

async function RechargeActorCitem(actor,citemname){
  // check that actor has citem
  let citem = actor.data.data.citems.find(y=>y.name == citemname);
  if (citem!=null){ 
    if(citem.rechargable==true){           
      await sheetactor.sheet.rechargeCI(citem.id,citem.ciKey);
    } else{
      ui.notifications.warn('The cItem ' + citemname + ' is not rechargeable' );
    }
  } else{
     ui.notifications.warn('The actor(' + actor.name + ') does not have the cItem ' + citemname );
  }
}

async function ChangeUsesActorCitem(actor,citemname,newvalue){
  // check that actor has citem
  let citem = actor.data.data.citems.find(y=>y.name == citemname);
  if (citem!=null){      
    if(newvalue<=citem.maxuses && newvalue>=0){           
      await sheetactor.sheet.changeCIUses(citem.id, newvalue);
    } else{
      ui.notifications.warn('Invalid new value('+newvalue+') for cItem ' + citemname + 'Min:0 Max:' + citem.maxuses );
    }
  } else{
     ui.notifications.warn('The actor(' + actor.name + ') does not have the cItem ' + citemname );
  } 
}

async function IncreaseUsesActorCitem(actor,citemname){
  // check that actor has citem
  let citem = actor.data.data.citems.find(y=>y.name == citemname);
  if (citem!=null){      
    if(citem.uses<citem.maxuses){           
      await sheetactor.sheet.changeCIUses(citem.id, parseInt(citem.uses)+1);
    } 
  } else{
     ui.notifications.warn('The actor(' + actor.name + ') does not have the cItem ' + citemname );
  } 
}
async function DecreaseUsesActorCitem(actor,citemname){
  // check that actor has citem
  let citem = actor.data.data.citems.find(y=>y.name == citemname);
  if (citem!=null){      
    if(citem.uses>0){           
      await sheetactor.sheet.changeCIUses(citem.id, parseInt(citem.uses)-1);
    } 
  } else{
     ui.notifications.warn('The actor(' + actor.name + ') does not have the cItem ' + citemname );
  } 
}

//                                                                  
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
//                                                                  
//                      Sheet Actor Functions                             
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
//                      Sandbox 0.12.4 | Foundry 9.255
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