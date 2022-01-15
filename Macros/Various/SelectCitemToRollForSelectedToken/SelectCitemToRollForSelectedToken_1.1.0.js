// **************************************************************** //
// Macro:        SelectCitemToRollForSelectedToken                  //
// Description:  Displays dialog with list of citems of a specific  //
//               group, clickable for rolling specified property    //
// Compability:  Tested with                                        //
//               ========================                           //
//               Version Foundry Sandbox                            //
//               ------- ------- --------                           //
//               1.0.0   0.7.9   0.8.6-7                            //
//               1.1.0   9.242   0.12.0                             //
//               ========================                           //
// ================================================================ //
// Date       Version  Author               Description             //
// ---------- -------- -------------------- ----------------------- //
// 2021-04-25 1.0.0    Ramses800            Macro created.          //
// 2022.01-15 1.1.0    Ramses800            target/rolldialog       //
// **************************************************************** //

//                                                                
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
//                                                                  
//                     Settings for this macro                      
//                                                                  
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
//
function Setting_WeaponGroupKey()          {return 'GROUP_WEAPONS';  }// this must be specified according to your groups key
function Setting_WeaponAttackRoll()          {return 'LBL_WEAPON_ATTACK_ROLL';  }// this must be specified according to your property key
function Setting_FormWidth(){return 0;} // set to 0 to autosize

//                                                                  
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
//                                                                  
//                        Macro generic code                        
//                                                                  
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
// 
function macroTitle() {
  let thismacroname=`Attack with weapon`;  
  return thismacroname;  
}

// This is used to convert texts into javascript/programmable acceptable definitions
function slugify(text,separator) {
  return text
    .toString()
    .normalize('NFD')                   // split an accented letter in the base letter and the acent
    .replace(/[\u0300-\u036f]/g, '')   // remove all previously split accents
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 ]/g, '')   // remove all chars not letters, numbers and spaces (to be replaced)
    .replace(/\s+/g, separator);
}
// This is used to make sure that function styles id etc are unique in the total namespace
// if not unique, then macros/other functinalities could be intermixed and produce unpredictable results
function thisMacroName(){return `${slugify(macroTitle(),'_')}`;  } 

// --------------
// dialog content
// -------------- 
let html_content = `
    <!--macro custom styles-->
  <style>  
    .${thisMacroName()}_hbo:hover {cursor: pointer;color: darkred;    font-weight: bold;}    
    
  </style> 
  
  <!--macro dialog content-->
  <i id="${thisMacroName()}_btnRefresh" title="Refresh" class="fas fa-redo-alt ${thisMacroName()}_hbo" style="display:none" onclick="${thisMacroName()}_Main()"></i>  
  <fieldset>
  <legend>Selected token</legend>
  <label id="${thisMacroName()}_SelectedToken"></label>  
  </fieldset>
  <p id="${thisMacroName()}_Instruction">Click weapon below to roll attack</p>
  <fieldset>
  <legend>Available weapons</legend>
  <ul id="${thisMacroName()}_AvailableWeapons">
  </ul> 
  </fieldset>
  <script>
    function ${thisMacroName()}_singleQuoted(text)  {return '&quot;' + text + '&quot;';} 
    
    function ${thisMacroName()}_rollTokencItem(actorId,citemname){ 
      let actor;  
      let token; 
  
      token = canvas.tokens.get(actorId); 
      if(token!=null){
        actor=token.actor;
      }    
      
      //console.log(actor);
      if(actor!=null){          
        let citem = actor.data.data.citems.find(y=>y.name == citemname);
        
        let property = game.items.find(y=>y.type=="property" && y.data.data.attKey=='${Setting_WeaponAttackRoll()}'); ;
        if (property!=null){  
          let citemattributes = citem.attributes;
          rollexp = property.data.data.rollexp;
          rollname = property.data.data.rollname; 
          if (rollexp.length>0){  
            let hasDialog = property.data.data.hasdialog;
            
            let useData = null;
            let rollid = [];   
            rollid.push(property.data.data.rollid);   
            let actorattributes = actor.data.data.attributes;
            let number=1;
            let targets = game.user.targets.ids; // get list of currently selected targets by the current user
            let target = canvas.tokens.placeables.find(y=>y.id==targets[0]); // this will selected the first targeted token
            let rollcitemID = citem.id;    
            //debugger;  
            if (hasDialog) {
              let dialogID = property.data.data.dialogID;
              let dialogName = property.data.data.dialogName;
              actor._sheet.generateRollDialog(dialogID,dialogName, rollexp, rollname, rollid, actorattributes, citemattributes, number, rollcitemID, targets, useData);
            }
            else {
              actor.rollSheetDice(rollexp,rollname,rollid,actorattributes,citemattributes,number,target,rollcitemID);
            }
          }
          else{
            ui.notifications.warn('The roll expression for property ' + '${Setting_WeaponAttackRoll()}' + ' is empty');
          }   
        }
        else{
          ui.notifications.warn('The cItem '+ citemname + ' does not have the property ' + '${Setting_WeaponAttackRoll()}');
        }
      }
    }
    
    function ${thisMacroName()}_ListWeapons(){
      let selected = canvas.tokens.controlled;
      
      let token; 
      let actorId;  
      let weaponSelectedGroupKey='${Setting_WeaponGroupKey()}';
      let lielement;
      if (selected!=null){
        if(selected.length>0){   
          token=selected[0];          
        }
      }             
      let lblname= document.getElementById("${thisMacroName()}_SelectedToken");
      if(lblname!=null){
        if(token!=null){        
          lblname.innerHTML= token.name;
        }
        else{
          lblname.innerHTML='No token selected';  
          document.getElementById("${thisMacroName()}_Instruction").innerHTML='';
        } 
      }  
               
      let ulelement=document.getElementById("${thisMacroName()}_AvailableWeapons");
      if (ulelement!=null){ 
        // empty list
        ulelement.innerHTML='';
        ulelement.style.listStyleType="none"; 
        if (token!=null){ 
         
          actorId=token.data._id;
          // alla all citems of specified group to the list 
          citems = token.actor.data.data.citems;
          if(citems!=null){
            for(let l=0;l<citems.length;l++){            
              let citem=citems[l];
              // check if this citem has any group                
              if (citem.groups.length>0){                         
                // loop all the groups of this citem                 
                for(let iGroup=0;iGroup<citem.groups.length;iGroup++){  
                  //console.log(citem.groups[iGroup]);
                  if(citem.groups[iGroup].ikey==weaponSelectedGroupKey){ 
                    // found one
                    lielement = document.createElement("li");
                    lielement.style.textAlign="left";
                    lielement.innerHTML='<label class="${thisMacroName()}_hbo" onclick="${thisMacroName()}_rollTokencItem(' + ${thisMacroName()}_singleQuoted(actorId) +','+ ${thisMacroName()}_singleQuoted(citem.name) + ');"><i class="fas fa-dice-d20"></i> ' + citem.name + '</label> ';
                    ulelement.appendChild(lielement);
                  }
                }
              }
            }
          }                                        
          //
        }
         
      }
    }
  
    // Main function
    function ${thisMacroName()}_Main(){ 
     //console.log("${thisMacroName()}_Main()");
     ${thisMacroName()}_ListWeapons();
    }
             
    // Run main
    ${thisMacroName()}_Main();
  </script>
  <!--Marker element to detect if dialog is loaded-->
  <input type="hidden" id="${thisMacroName()}_appId" value="-1"> 
`;
  // HTML content completed
  // check if this already loaded 
  let appId_element=document.getElementById(`${thisMacroName()}_appId`); 
  if (appId_element!=null){
    // already loaded    
    let appId=appId_element.getAttribute('value');
    if (appId!=null){ 
      let app=ui.windows[appId];
      if (app!=null){    
        // attempt to bring to the front
        app.bringToTop(); 
        // and trigger refresh content button
        let elem = document.getElementById(`${thisMacroName()}_btnRefresh`);
        if (elem!=null){
          if (typeof elem.onclick == "function") {
            elem.onclick.apply(elem);
          }               
        }
      }
    }
  }
  else{
    // show it as dialog, after render update hidden id
    let d =new Dialog({
     title: `${macroTitle()}`,
     content: html_content,
     buttons: {},
     render: html => document.getElementById(`${thisMacroName()}_appId`).setAttribute('value',d.appId),
    });
    d.options.width = Setting_FormWidth();
    d.position.width = Setting_FormWidth();
    d.options.resizable=true;
    d.render(true);        
  }