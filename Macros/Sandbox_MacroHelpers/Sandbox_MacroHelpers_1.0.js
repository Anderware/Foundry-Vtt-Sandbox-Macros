/* ***************************************************************************** 
/* Module:         Sandbox_MacroHelpers                                             
/* Description:    Collection of useful functions for writing macros in Sandbox 
/* Version 
/* Compability:    Tested with
/*                 - Sandbox 0.12.8 | Foundry 9.269    
/* ============================================================================= 
/* Date       Version  Author               Description                             
/* ---------- -------- -------------------- ------------------------------------ 
/* 2022-06-02 1.0.0    Ramses800            Routine created                         
/* ****************************************************************************/ 
 
// ---------------------------------------------------------------
// Functions for getting an actor
// ---------------------------------------------------------------
// Actor_GetFromPlayerCharacter();  
// Actor_GetFromSelectedToken();
// Actor_GetFromSandboxSheet(event); 
// Actor_GetFromName(actorname)    

// ---------------------------------------------------------------
// Functions for handling actor properties
// ---------------------------------------------------------------
// ActorProperty_HasProperty(actor,propertykey)
// ActorProperty_GetValue(actor,propertykey)
// ActorProperty_SetValue(actor,propertykey,newvalue='',newmax='')
// ActorProperty_ToggleValue(actor,propertykey)

// ---------------------------------------------------------------
// Functions for handling actor cItems
// ---------------------------------------------------------------
// ActorcItem_GetFromName(actor,citemname)
// ActorcItem_IsActive(actor,actorcitem)
// ActorcItem_Activate(actor,actorcitem)
// ActorcItem_Deactivate(actor,actorcitem)
// ActorcItem_ToggleActivation(actor,actorcitem)
// ActorcItem_ChangeActivation(actor,actorcitem,newvalue=true)
// ActorcItem_Consume(actor,actorcitem)
// ActorcItem_Recharge(actor,actorcitem)
// ActorcItem_ChangeUses(actor,actorcitem,newvalue=0)
// ActorcItem_IncreaseUses(actor,actorcitem)
// ActorcItem_DecreaseUses(actor,actorcitem)
// ActorcItem_Add(actor,citem,number=1)
// ActorcItem_Delete(actor,actorcitem)
// ActorcItem_IncreaseNumber(actor,actorcitem,number=1)
// ActorcItem_DecreaseNumber(actor,actorcitem)

// ---------------------------------------------------------------
// Functions for handling cItems
// ---------------------------------------------------------------
// cItem_GetFromName(citemname)

//                                                                               
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<o>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
//                                                                               
//                                 Example macro                                 
//                                                                               
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<o>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
//                                                                                                                                              

let actor=Actor_GetFromSelectedToken();
let propertykey='';
let citemname='';
let currentvalue;
let usecase=7;  // set this to test different usecases
if (actor!=null){
  switch(usecase){
    case 1:
      // Gives the actor a citem if the actor does not have it
      // if the actor has it,, it deletes it
      // check if user has this cItem   
      citemname='Chain Mail';
      let actorcitem = ActorcItem_GetFromName(actor, citemname);
      if (actorcitem==null){
        // actor does not have the citem         
        // get cItem from db
        let citem=cItem_GetFromName(citemname);  
        if (citem!=null){   
          // add the citem to the actor
          actorcitem = await ActorcItem_Add(actor,citem) ;      
        }
      } else {                         
        // Actor has cItem, delete it
        ActorcItem_Delete(actor,actorcitem);
      }  
     break;
    case 2:
      // simple text
      propertykey='TXT_TITLE';
      await ActorProperty_SetValue(actor,propertykey,'The Slow One');
      break;
    case 3:
      // set simplenumeric to 2 if current value is more than 0       
      propertykey='NUM_BODY';
      currentvalue= ActorProperty_GetValue(actor,propertykey);
      if (currentvalue>0){
        await ActorProperty_SetValue(actor,propertykey,2);
      }
      break; 
    case 4:
      // checkbox
      propertykey='CHK_WANTED';
      await ActorProperty_ToggleValue(actor,propertykey);
      break; 
    case 5:
      // textarea
      propertykey='TXA_BACKGROUND'; 
      await ActorProperty_SetValue(actor,propertykey,'Born in the barn');
      break;  
    case 6:
      // list
      propertykey='LST_GENDER'; 
      await ActorProperty_SetValue(actor,propertykey,'Other'); 
      break; 
    case 7:
      // set badge to 1 if current value is more than 0      
      propertykey='BDG_LUCK';
      currentvalue= ActorProperty_GetValue(actor,propertykey);
      if (currentvalue>0){
        await ActorProperty_SetValue(actor,propertykey,1);
      }
      break; 
    case 8:
      // simplenumeric with max
      propertykey='NUM_HIT_POINTS';
      await ActorProperty_SetValue(actor,propertykey,4,6);
      break; 
    case 9:
      // radio 
      propertykey='RDO_WOUNDS';
      await ActorProperty_SetValue(actor,propertykey,3,6);
      break;
  }
}
                                                                

//                                                                               
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<o>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
//                                                                               
//                          Functions for getting Actor                          
//                                                                               
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<o>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
//                                                                               

// ***************************************************************************** 
// Function:       Actor_GetFromName                                       
// Description:    Get actor with name 
// Version 
// Compability:    Tested with
//                 - Sandbox 0.12.8 | Foundry 9.269    
// Parameters:     name as string                
// Returns:        actor, returns null if not found                              
// ============================================================================= 
// Date       Version  Author               Description                          
// ---------- -------- -------------------- ------------------------------------ 
// 2022-04-30 1.0.0    Ramses800            Function created                      
// ***************************************************************************** 
function Actor_GetFromName(actorname){
  let actor;
  actor=game.actors.getName(actorname); 
  if(actor==null){
    ui.notifications.warn('Actor_GetFromName | No Actor found with name [' + actorname + ']');
  }
  return actor;
}

// ***************************************************************************** 
// Function:       Actor_GetFromPlayerCharacter                                       
// Description:    Get current player assigned character actor 
// Version 
// Compability:    Tested with
//                 - Sandbox 0.12.8 | Foundry 9.269                     
// Returns:        actor, returns null if not found                              
// ============================================================================= 
// Date       Version  Author               Description                          
// ---------- -------- -------------------- ------------------------------------ 
// 2022-04-30 1.0.0    Ramses800            Function created                      
// ***************************************************************************** 
function Actor_GetFromPlayerCharacter(){
  let actor;
  actor=game.actors.get(game.user.data.character); 
  if(actor==null){
    ui.notifications.warn('Actor_GetFromPlayerCharacter | Player [' + game.user.name + '] has no character assigned');
  }
  return actor;
}

// ***************************************************************************** 
// Function:       Actor_GetFromSelectedToken                                         
// Description:    Get selected tokens actor        
// Version 
// Compability:    Tested with
//                 - Sandbox 0.12.8 | Foundry 9.269                                 
// Returns:        actor, returns null if not found                              
// ============================================================================= 
// Date       Version  Author               Description                          
// ---------- -------- -------------------- ------------------------------------ 
// 2022-04-30 1.0.0    Ramses800            Function created                      
// ***************************************************************************** 
function Actor_GetFromSelectedToken(){
  let actor; // default null
  // get selected token
  let selected = canvas.tokens.controlled; 
  if (selected!=null){
    if(selected.length>0){
      if(selected.length==1){
        let token = selected[0];          
        actor=token.actor;          
      } else{
        ui.notifications.warn('Actor_GetFromSelectedToken | More than one token is selected');
      }
    } else{
      ui.notifications.warn('Actor_GetFromSelectedToken | No token selected');
    }     
  } else{
    ui.notifications.error('Actor_GetFromSelectedToken | Error getting selected tokens');
  }
  return actor;
}


// ***************************************************************************** 
// Function:       Actor_GetFromSandboxSheet
// Version 
// Compability:    Tested with   
//                 - Sandbox 0.12.8 | Foundry 9.269                     
// Parameters:     event            
// Return:         Returns the actor that called this macro from its Sandbox sheet
//                 If no actor found, it returns null. 
//                 This means generally that the macro have 
//                 been run from the hot bar
// ============================================================================= 
// Date       Version  Author               Description             
// ---------- -------- -------------------- ------------------------------------
// 2021-11-30 1.0.0    Ramses800            Function created                          
// *****************************************************************************  
function Actor_GetFromSandboxSheet(event) {
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
              //console.log('Token Actor ' + actorid);  // 6bX8wMQkdZ9OyOQa             
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


//                                                                               
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<o>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
//                                                                               
//                    Functions for handling Actor properties                    
//                                                                               
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<o>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
//                                                                               

// ***************************************************************************** 
// Function:       ActorProperty_ToggleValue                                   
// Description:    Toggles a actor checkbox property 
// Version 
// Compability:    Tested with   
//                 - Sandbox 0.12.8 | Foundry 9.269                             
// Parameters:     actor,propertykey                                             
// ============================================================================= 
// Date       Version  Author               Description                          
// ---------- -------- -------------------- ------------------------------------ 
// 2022-04-30 1.0.0    Ramses800            Routine created                      
// ***************************************************************************** 
function ActorProperty_ToggleValue(actor,propertykey){  
  if (actor !== null && propertykey!=='' ) {    
    let value=ActorProperty_GetValue(actor, propertykey);
    if(value!=null){
      if (value==false){
        ActorProperty_SetValue(actor, propertykey, true);
      } else {
        ActorProperty_SetValue(actor, propertykey, false);
      }
    }
  } else {
    ui.notifications.warn('ActorProperty_ToggleValue | Invalid parameters');
  }   
}

// ***************************************************************************** 
// Function:       ActorProperty_HasProperty                                              
// Description:    Checks if actor has property
// Version 
// Compability:    Tested with   
//                 - Sandbox 0.12.8 | Foundry 9.269                                   
// Parameters:     actor,propertykey                                             
// Returns:        returns true if actor has property, else false                
// ============================================================================= 
// Date       Version  Author               Description                          
// ---------- -------- -------------------- ------------------------------------ 
// 2022-04-30 1.0.0    Ramses800            Routine created                      
// ***************************************************************************** 
function ActorProperty_HasProperty(actor,propertykey){
  let returnvalue=false; // default
  if (actor !== null && propertykey!=='' ) {
    if (actor.data.data.attributes.hasOwnProperty(propertykey)) {
      returnvalue=true;
    } else {
      ui.notifications.warn('ActorProperty_HasProperty | The actor[' + actor.data.name + '] does not have property with key [' + propertykey + ']');
    }   
  } 
  else {
    ui.notifications.warn('ActorProperty_HasProperty | Invalid parameters');
  }
  return returnvalue;
}

// **************************************************************** 
// Function:       ActorProperty_GetValue
// Version 
// Compability:    Tested with   
//                 - Sandbox 0.12.8 | Foundry 9.269 
// Parameters:     actor,propertykey            
// Return:         Returns the value of an actor property 
//                 If no value is found, it returns null. 
// ================================================================ 
// Date       Version  Author               Description             
// ---------- -------- -------------------- -----------------------
// 2021-11-30 1.0.0    Ramses800            Macro created                          
// **************************************************************** 
function ActorProperty_GetValue(actor,propertykey) {
  let returnvalue;  // default null
  if (actor !== null && propertykey!=='' ) {
    if (ActorProperty_HasProperty(actor,propertykey)) {
      returnvalue=actor.data.data.attributes[propertykey].value;
    } 
  } else {
    ui.notifications.warn('ActorProperty_GetValue | Invalid parameters');
  }
  return returnvalue;
}

/* **************************************************************** 
// Function:       ActorProperty_SetValue
// Description:    Sets the value/max of an actor property
// Version 
// Compability:    Tested with   
//                 - Sandbox 0.12.8 | Foundry 9.269 
// Parameters:     actor,propertykey,newvalue,newmax             
// ================================================================ 
// Date       Version  Author               Description             
// ---------- -------- -------------------- -----------------------
// 2021-11-30 1.0.0    Ramses800            Macro created                          
// ****************************************************************/
async function ActorProperty_SetValue(actor,propertykey,newvalue=null,newmax=null) {
  if (actor !== null && propertykey!=='' ) {
    // check that this actor has the attribute
    if (ActorProperty_HasProperty(actor,propertykey)) {       
      // update this actors property      
      // get property from items db
      let propertyid=actor.data.data.attributes[propertykey].id;
      let property=game.items.get(propertyid);
      if(property!=null){
        let value=null; // default
        let max=null; // default
        // get type of property
        let propertytype=property.data.data.datatype;
        switch (propertytype){          
          case 'simpletext':
            value=''+newvalue;  // force to string
            max=null;
            break;
          case 'simplenumeric':
            value=newvalue;
            max=newmax;
            break;
          case 'checkbox':
            if(newvalue==true || newvalue==false){
              value=newvalue;
            } else if(newvalue==1) {
              value=true;
            } else if(newvalue==0){
              value=false;
            } else {
              value=false;
            }
            max=null;
            break;
          case 'textarea':
            value=newvalue;
            max=null;
            break;
          case 'list':
            value=newvalue;
            max=null;
            break;          
          case 'badge':
            value=parseInt(newvalue); // make integer
            max=newmax;
            break; 
          case 'radio':
            value=newvalue;
            max=newmax;
            break;
          case 'label':
          case 'table':
          case 'button':
          default:
            // invalid type, not allowed
            return;
            break;
        }                
        // when updating a value, always set 'modified:=true'
        // when updating a max  , always set 'modmax:=true'
        if(value!==null && max!==null){
          // set value and max
          await actor.update({[`data.attributes.${propertykey}.modmax`]: true,[`data.attributes.${propertykey}.max`]: max,[`data.attributes.${propertykey}.value`]: value,[`data.attributes.${propertykey}.modified`]: true});        
        } else if(value!==null && max==null ){
          // set value only
          await actor.update({[`data.attributes.${propertykey}.value`]: value, [`data.attributes.${propertykey}.modified`]: true});        
        } else if(value==null && max!==null ){
          // only set max
          await actor.update({[`data.attributes.${propertykey}.max`]: max, [`data.attributes.${propertykey}.modmax`]: true});
        }
      } else {
        ui.notifications.warn('ActorProperty_SetValue | Invalid new value for this property['+ propertykey +'] type('+ propertytype +')');
      }      
    } 
  } else {
    ui.notifications.warn('ActorProperty_SetValue | Invalid parameters');
  }    
}


//                                                                               
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<o>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
//                                                                               
//                      Functions for handling actor cItems                      
//                                                                               
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<o>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
//  

// ***************************************************************************** 
// Function:       ActorcItem_GetFromName                                                 
// Description:    Checks if actor has cItem  
// Version 
// Compability:    Tested with   
//                 - Sandbox 0.12.8 | Foundry 9.269                                    
// Parameters:     actor,citemname                                               
// Returns:        returns actorcitem if actor has cItem, else null                   
// ============================================================================= 
// Date       Version  Author               Description                          
// ---------- -------- -------------------- ------------------------------------ 
// 2022-04-30 1.0.0    Ramses800            Routine created                      
// ***************************************************************************** 
function ActorcItem_GetFromName(actor,citemname) {
  let actorcitem;  // default null
  if (actor !== null && citemname !== '') {
    actorcitem = actor.data.data.citems.find(y => y.name == citemname);
  } else {
    ui.notifications.warn('ActorcItem_GetFromName | Invalid parameters');
  }
  return actorcitem;
}


/* --------------------------------------------------------------------------------
//                               Activation Functions                              
// --------------------------------------------------------------------------------*/

/* ********************************************************************************
/* Routine          : ActorcItem_IsActive                                      
/* Description      : Returns the current Active state for actor citem 
/* Version 
/* Compability      : Tested with
/*                    - Sandbox 0.12.8 | Foundry 9.269           
/* Parameters       : actor,actorcitem                                         
/* Returns          : true or false                                            
/* ================================================================================
/* Date       Version  Author                         Description
/* ---------- -------- ------------------------------ -----------------------------
/* 2022-06-02 1.0.0    Ramses800                      Routine created       
/* *********************************************************************************/
function ActorcItem_IsActive(actor,actorcitem){
  let returnvalue=false;  // default false
  if (actor !== null && actorcitem !== null) {
    returnvalue=actorcitem.isactive;
  } else {
    ui.notifications.warn('ActorcItem_IsActive | Invalid parameters');  
  }
  return returnvalue;
}

/* ********************************************************************************
/* Routine          : ActorcItem_Activate                                      
/* Description      : Sets the current Active state for actor citem to ACTIVE
/* Version 
/* Compability      : Tested with
/*                    - Sandbox 0.12.8 | Foundry 9.269        
/* Parameters       : actor,actorcitem                                         
/* ================================================================================
/* Date       Version  Author                         Description
/* ---------- -------- ------------------------------ -----------------------------
/* 2022-06-02 1.0.0    Ramses800                      Routine created       
/* *********************************************************************************/
function ActorcItem_Activate(actor,actorcitem){
  if (actor !== null && actorcitem !== null) {
    ActorcItem_ChangeActivation(actor,actorcitem,true);
  } else {
    ui.notifications.warn('ActorcItem_Activate | Invalid parameters');  
  }
}

/* ********************************************************************************
/* Routine          : ActorcItem_Deactivate                                    
/* Description      : Sets the current Active state for actor citem to INACTIVE
/* Version 
/* Compability      : Tested with
/*                    - Sandbox 0.12.8 | Foundry 9.269      
/* Parameters       : actor,actorcitem                                         
/* ================================================================================
/* Date       Version  Author                         Description
/* ---------- -------- ------------------------------ -----------------------------
/* 2022-06-02 1.0.0    Ramses800                      Routine created       
/* *********************************************************************************/
function ActorcItem_Deactivate(actor,actorcitem){
  if (actor !== null && actorcitem !== null) {
    ActorcItem_ChangeActivation(actor,actorcitem,false);
  } else {
    ui.notifications.warn('ActorcItem_Deactivate | Invalid parameters');  
  }
}

/* ********************************************************************************
/* Routine          : ActorcItem_ToggleActivation                              
/* Description      : Toggles the current Active state for actor citem between 
/*                    ACTIVE/INACTIVE       
/* Version 
/* Compability      : Tested with
/*                    - Sandbox 0.12.8 | Foundry 9.269                                         
/* Parameters       : actor,actorcitem                                         
/* ================================================================================
/* Date       Version  Author                         Description
/* ---------- -------- ------------------------------ -----------------------------
/* 2022-06-02 1.0.0    Ramses800                      Routine created       
/* *********************************************************************************/
function ActorcItem_ToggleActivation(actor,actorcitem){
  if (actor !== null && actorcitem !== null) {
    let status=ActorcItem_IsActive(actor,actorcitem);
    if(status){
      ActorcItem_ChangeActivation(actor,actorcitem,false);
    } else {
      ActorcItem_ChangeActivation(actor,actorcitem,true);
    }
  } else {
    ui.notifications.warn('ActorcItem_ToggleActivation | Invalid parameters');  
  }
}

/* ********************************************************************************
/* Routine          : ActorcItem_ChangeActivation                              
/* Description      : Changes the current Active state for actor citem to param
/*                    eter new value  
/* Version 
/* Compability      : Tested with
/*                    - Sandbox 0.12.8 | Foundry 9.269                                               
/* Parameters       : actor,actorcitem,newvalue=true                           
/* ================================================================================
/* Date       Version  Author                         Description
/* ---------- -------- ------------------------------ -----------------------------
/* 2022-06-02 1.0.0    Ramses800                      Routine created       
/* *********************************************************************************/
async function ActorcItem_ChangeActivation(actor,actorcitem,newvalue=true){
  if (actor !== null && actorcitem !== null) {    
    // check if this is a ACTIVATION citem
    if(actorcitem.usetype=="ACT"){          
      if(newvalue && !actorcitem.isactive){
        // activate   
        await actor.sheet.useCIIcon(actorcitem.id, actorcitem.ciKey, true, false, true);  
      } else if(!newvalue && actorcitem.isactive){
        // deactvate
        await actor.sheet.useCIIcon(actorcitem.id, actorcitem.ciKey, false, false, true);      
      }
    } else {
      ui.notifications.warn('ActorcItem_ChangeActivation | cItem with name [' + actorcitem.name + '] does not have ACTIVATION'); 
    }
  } else {
    ui.notifications.warn('ActorcItem_ChangeActivation | Invalid parameters');  
  } 
}

/* --------------------------------------------------------------------------------
/*                             Uses(Consume) Functions                             
/* --------------------------------------------------------------------------------*/

/* ********************************************************************************
/* Routine          : ActorcItem_Consume                                       
/* Description      : Consumes one use of a CONSUMABLE actor citem 
/* Version 
/* Compability      : Tested with
/*                    - Sandbox 0.12.8 | Foundry 9.269                               
/* Parameters       : actor,actorcitem                                         
/* ================================================================================
/* Date       Version  Author                         Description
/* ---------- -------- ------------------------------ -----------------------------
/* 2022-06-02 1.0.0    Ramses800                      Routine created       
/* *********************************************************************************/
async function ActorcItem_Consume(actor,actorcitem){
  if (actor !== null && actorcitem !== null) {    
    // check if consumable        
    if(actorcitem.usetype=="CON"){
      if(actorcitem.uses>0){
        // consume  
        await actor.sheet.useCIIcon(actorcitem.id, actorcitem.ciKey, true, true, true);               
      } else {
        ui.notifications.warn('ActorcItem_Consume | cItem with name [' + actorcitem.name + '] has no charges left');
      }      
    } else {
      ui.notifications.warn('ActorcItem_Consume | cItem with name [' + actorcitem.name + '] is not CONSUMABLE');
    }    
  } else {
    ui.notifications.warn('ActorcItem_Consume | Invalid parameters');  
  } 
}

/* ********************************************************************************
/* Routine          : ActorcItem_Recharge                                      
/* Description      : Recharges a CONSUMABLE actor citem  
/* Version 
/* Compability      : Tested with
/*                    - Sandbox 0.12.8 | Foundry 9.269                           
/* Parameters       : actor,actorcitem                                         
/* ================================================================================
/* Date       Version  Author                         Description
/* ---------- -------- ------------------------------ -----------------------------
/* 2022-06-02 1.0.0    Ramses800                      Routine created       
/* *********************************************************************************/
async function ActorcItem_Recharge(actor,actorcitem){
  if (actor !== null && actorcitem !== null) {    
    // check if consumable        
    if(actorcitem.usetype=="CON"){      
      if(actorcitem.rechargable==true){
        // recharge 
        await actor.sheet.rechargeCI(actorcitem.id, actorcitem.ciKey);         
      } else {
        ui.notifications.warn('ActorcItem_Recharge | cItem with name [' + actorcitem.name + '] cannot be recharged');
      }      
    } else {
      ui.notifications.warn('ActorcItem_Recharge | cItem with name [' + actorcitem.name + '] is not CONSUMABLE');
    }    
  } else {
    ui.notifications.warn('ActorcItem_Recharge | Invalid parameters');  
  } 
}

/* ********************************************************************************
/* Routine          : ActorcItem_ChangeUses                                    
/* Description      : Change current USES of a CONSUMABLE actor citem 
/* Version 
/* Compability      : Tested with
/*                    - Sandbox 0.12.8 | Foundry 9.269               
/* Parameters       : actor,actorcitem,newvalue=0                              
/* ================================================================================
/* Date       Version  Author                         Description
/* ---------- -------- ------------------------------ -----------------------------
/* 2022-06-02 1.0.0    Ramses800                      Routine created       
/* *********************************************************************************/
async function ActorcItem_ChangeUses(actor,actorcitem,newvalue=0) {
  if (actor !== null && actorcitem !== null) {
    // check if consumable        
    if (actorcitem.usetype == "CON") {
      if (newvalue <= actorcitem.maxuses && newvalue >= 0) {
        await actor.sheet.changeCIUses(actorcitem.id, newvalue);
      } else {
        ui.notifications.warn('ActorcItem_ChangeUses | Invalid new value(' + newvalue + ') for cItem ' + actorcitem.name + 'Min:0 Max:' + actorcitem.maxuses);
      }
    } else {
      ui.notifications.warn('ActorcItem_ChangeUses | cItem with name [' + actorcitem.name + '] is not CONSUMABLE');
    }
  } else {
    ui.notifications.warn('ActorcItem_ChangeUses | Invalid parameters');
  }
}

/* ********************************************************************************
/* Routine          : ActorcItem_IncreaseUses                                  
/* Description      : Increases current USES by 1 of a CONSUMABLE actor citem
/* Version 
/* Compability      : Tested with
/*                    - Sandbox 0.12.8 | Foundry 9.269        
/* Parameters       : actor,actorcitem                                         
/* ================================================================================
/* Date       Version  Author                         Description
/* ---------- -------- ------------------------------ -----------------------------
/* 2022-06-02 1.0.0    Ramses800                      Routine created       
/* *********************************************************************************/
async function ActorcItem_IncreaseUses(actor,actorcitem) {
  if (actor !== null && actorcitem !== null) {
    // check if consumable        
    if (actorcitem.usetype == "CON") {
      if(actorcitem.uses<actorcitem.maxuses){           
        await actor.sheet.changeCIUses(actorcitem.id, parseInt(actorcitem.uses)+1);
      } else {
        ui.notifications.warn('ActorcItem_IncreaseUses | cItem with name [' + actorcitem.name + '] charges can not be increased over ['+ actorcitem.maxuses +']');
      } 
    } else {
      ui.notifications.warn('ActorcItem_IncreaseUses | cItem with name [' + actorcitem.name + '] is not CONSUMABLE');
    }
  } else {
    ui.notifications.warn('ActorcItem_IncreaseUses | Invalid parameters');
  }
}

/* ********************************************************************************
/* Routine          : ActorcItem_DecreaseUses                                  
/* Description      : Decreases current USES by 1 of a CONSUMABLE actor citem 
/* Version 
/* Compability      : Tested with
/*                    - Sandbox 0.12.8 | Foundry 9.269       
/* Parameters       : actor,actorcitem                                         
/* ================================================================================
/* Date       Version  Author                         Description
/* ---------- -------- ------------------------------ -----------------------------
/* 2022-06-02 1.0.0    Ramses800                      Routine created       
/* *********************************************************************************/
async function ActorcItem_DecreaseUses(actor,actorcitem) {
  if (actor !== null && actorcitem !== null) {
    // check if consumable        
    if (actorcitem.usetype == "CON") {
      if(actorcitem.uses>0){           
        await actor.sheet.changeCIUses(actorcitem.id, parseInt(actorcitem.uses)-1);
      } else {
        ui.notifications.warn('ActorcItem_DecreaseUses | cItem with name [' + actorcitem.name + '] charges can not be decreased below [0]');
      } 
    } else {
      ui.notifications.warn('ActorcItem_DecreaseUses | cItem with name [' + actorcitem.name + '] is not CONSUMABLE');
    }
  } else {
    ui.notifications.warn('ActorcItem_DecreaseUses | Invalid parameters');
  }
}

/* --------------------------------------------------------------------------------
/*                               Add/Remove Functions                              
/* --------------------------------------------------------------------------------*/

/* ********************************************************************************
/* Routine          : ActorcItem_Add                                               
/* Description      : Adds a cItem to the actor        
/* Version 
/* Compability      : Tested with
/*                    - Sandbox 0.12.8 | Foundry 9.269                                  
/* Parameters       : actor,citem,number=1                                         
/* Returns          : The actor cItem created(Promise)
/* Special Logic    : Use this with "await" to be able to use the returned citem
/*                    EXAMPLE
/*                    actorcitem = await ActorcItem_Add(actor,citem) ;
/*                    await ActorcItem_IncreaseNumber(actor,actorcitem);        
/*                    await ActorcItem_Activate(actor,actorcitem);                   
/* ================================================================================
/* Date       Version  Author                         Description
/* ---------- -------- ------------------------------ -----------------------------
/* 2022-06-02 1.0.0    Ramses800                Routine created       
/* *********************************************************************************/
async function ActorcItem_Add(actor,citem,number=1){
  // check if actor already has this citem
  let actorcitem = actor.data.data.citems.find(y=>y.ciKey == citem.data.data.ciKey); 
  if(actorcitem==null){
    // prepare citem to be added to actor
    let subitems =await actor.addcItem(citem,null,null,number);
    if (actor.isToken) {
      let myToken = canvas.tokens.get(actor.token.id);
      await myToken.document.update({ "actorData.data.citems": subitems });
    }
    else {
      await actor.update({ "data.citems": subitems });
    }
    // if added quantity is more than 1, adjust uses 
    // (seems to be a small bug in Sandbox addcItem that only adds uses for 1 item regardless of number supplied)    
    if(number>1){
      let actorcitem = actor.data.data.citems.find(y=>y.ciKey == citem.data.data.ciKey);
      let newuses=parseInt(actorcitem.maxuses*number);
      let citemIDs = duplicate(actor.data.data.citems);
      let citemNew = citemIDs.find(y => y.id == actorcitem.id);
      citemNew.uses = parseInt(newuses); 
      await actor.update({ "data.citems": citemIDs });
    }
    // get the new actor citem    
    actorcitem = actor.data.data.citems.find(y=>y.ciKey == citem.data.data.ciKey)       
  } else {
    // actor has this citem, increase number
    ActorcItem_IncreaseNumber(actor,actorcitem,number);
  } 
  // return actorcitem      
  return actorcitem;
}

/* ********************************************************************************
/* Routine          : ActorcItem_Delete                                            
/* Description      : Deletes a cItem from the actor     
/* Version 
/* Compability      : Tested with
/*                    - Sandbox 0.12.8 | Foundry 9.269                                
/* Parameters       : actor,actorcitem                                             
/* ================================================================================
/* Date       Version  Author                         Description
/* ---------- -------- ------------------------------ -----------------------------
/* 2022-06-02 1.0.0    Ramses800                Routine created       
/* *********************************************************************************/
async function ActorcItem_Delete(actor,actorcitem){       
  if (actor!=null){                   
    if (actorcitem!=null){               
      let subitems = await actor.deletecItem(actorcitem.id, false);              
      if (actor.isToken) {
        let myToken = canvas.tokens.get(actor.token.id);
        await myToken.actor.update({ "data": subitems.data });                  
      }
      else {
        await actor.update({ "data": subitems.data });
      }                              
    }
  }                                                
}


/* --------------------------------------------------------------------------------
/*                                 Number Functions                                
/* --------------------------------------------------------------------------------*/

/* ********************************************************************************
/* Routine          : ActorcItem_IncreaseNumber                                
/* Description      : Increases current NUMBER by parameter number(default 1)  
/*                    of an actor citem  
/* Version 
/* Compability      : Tested with
/*                    - Sandbox 0.12.8 | Foundry 9.269                                            
/* Parameters       : actor,actorcitem,number=1                                
/* ================================================================================
/* Date       Version  Author                         Description
/* ---------- -------- ------------------------------ -----------------------------
/* 2022-06-02 1.0.0    Ramses800                      Routine created       
/* *********************************************************************************/
async function ActorcItem_IncreaseNumber(actor,actorcitem,number=1){
  // increase number 
  let newnumber=parseInt(actorcitem.number)+number;              
  // account for uses
  let newuses=parseInt(actorcitem.uses) + (Math.round(actorcitem.maxuses/actorcitem.number)*number);                          
  let citemIDs = duplicate(actor.data.data.citems);
  let citemNew = citemIDs.find(y => y.id == actorcitem.id);
  citemNew.number = newnumber;                                
  citemNew.uses = parseInt(newuses);
  await actor.update({ "data.citems": citemIDs });
}

/* ********************************************************************************
/* Routine          : ActorcItem_DecreaseNumber                                
/* Description      : Decreases current NUMBER by 1 of an actor citem 
/* Version 
/* Compability      : Tested with
/*                    - Sandbox 0.12.8 | Foundry 9.269               
/* Parameters       : actor,actorcitem                                         
/* ================================================================================
/* Date       Version  Author                         Description
/* ---------- -------- ------------------------------ -----------------------------
/* 2022-06-02 1.0.0    Ramses800                      Routine created       
/* *********************************************************************************/
async function ActorcItem_DecreaseNumber(actor,actorcitem){
  // decrease number
  if(parseInt(actorcitem.number)>0){ 
    let newnumber=parseInt(actorcitem.number)-1;              
    // account for uses
    let newuses=parseInt(actorcitem.uses) - (Math.round(actorcitem.maxuses/actorcitem.number)*1);
    let maxuses=actorcitem.maxuses; 
    if (newuses<0){
      newuses=0;
    }                         
    let citemIDs = duplicate(actor.data.data.citems);
    let citemNew = citemIDs.find(y => y.id == actorcitem.id);
    citemNew.number = newnumber;                                
    citemNew.uses = parseInt(newuses); 
    citemNew.maxuses = parseInt(maxuses);
    await actor.update({ "data.citems": citemIDs });
  }
}

//                                                                               
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<o>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
//                                                                               
//                      Functions for handling cItems                      
//                                                                               
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<o>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
//    

/* ********************************************************************************
/* Routine          : cItem_GetFromName    
/* Version 
/* Compability      : Tested with
/*                    - Sandbox 0.12.8 | Foundry 9.269                                          
/* Parameters       : citemname                                                
/* Returns          : Returns cItem from items database                        
/* ================================================================================
/* Date       Version  Author                         Description
/* ---------- -------- ------------------------------ -----------------------------
/* 2022-06-02 1.0.0    Ramses800                      Routine created       
/* *********************************************************************************/
function cItem_GetFromName(citemname){
  let citem=game.items.find(y=>y.name == citemname && y.type=="cItem");
  if(citem==null){
     ui.notifications.warn('cItem_GetFromName | The cItem with name [' + citemname + '] can not be found in the items database');
  }
  return citem;
}