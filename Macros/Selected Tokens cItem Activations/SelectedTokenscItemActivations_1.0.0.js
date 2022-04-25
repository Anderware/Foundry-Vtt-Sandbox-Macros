// **************************************************************** 
// Macro:               SelectedTokenscItemActivations
// Description:         Displays a dialog for the selected tokens
//                      with configured cItems active state
// Version Compability: Tested with
//                      Sandbox 0.12.7 | Foundry 9.255
// ================================================================ 
// Date       Version  Author               Description             
// ---------- -------- -------------------- -----------------------
// 2022-04-25 1.0.0    Ramses800            Macro created
// ****************************************************************   

//                                                                  
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
//                                                                  
//                     Settings for this macro                      
//                                                                  
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
// 

function Setting_cItemsToList() {
  let objcItems;
  // Note on configuring this macro
  // Attribute field:
  //   citemname - the name of the citem, required. If the token/actor does not have the citem, it will be marked 
  //   category - any string, optional   
  objcItems = [
      {"citemname": "Blinded","category":"State"},
      {"citemname": "Deaf","category":"State"},
      {"citemname": "Frozen","category":"State"},
      {"citemname": "Paralyzed","category":"State"},
      {"citemname": "Prone","category":"State"},  
      {"citemname": "Dark Vision","category":"Trait"},
      {"citemname": "Rage","category":"Trait"},
      {"citemname": "Wings","category":"Trait"}
 ]; 
  return JSON.stringify(objcItems);
}


//                                                                  
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
//                                                                  
//                   Macro code - no changes needed here                       
//                                                                  
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
// 
let thismacroname=this.name;
function macroTitle() {    
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
    img.${thisMacroName()}_portrait_img{height:48px;width:48px;min-width:48px;object-fit:cover;object-position:50% 0;margin: 0 8px 0 2px;border: none;}
    td.${thisMacroName()}_citem_col{text-align:left;padding-right: 25px;}
    td.${thisMacroName()}_category_col{font-style:italic;}
    th.${thisMacroName()}_actor_head{padding:5px 5px 5px 5px;min-width:80px;}
    td.${thisMacroName()}_addremove_col{width:25px;max-width:25px;}
    td.${thisMacroName()}_active_col{width:30px;max-width:30px;}
      
    .${thisMacroName()}_not_found{color:red;}
    .${thisMacroName()}_icon_error{font-size:24px;color:red;} 
    
    img.${thisMacroName()}_citem-table-icon {
      height: 26px;
      width: 26px;
      min-width: 26px;
      max-height: 26px;
      max-width: 26px;
      object-fit: cover;
      object-position: 50% 0;
      margin: -5px 8px -6px -2px;
      border: 0px;
      padding: 0px;
    }
    
  </style> 
  
  <!--macro dialog content-->  
  <i id="${thisMacroName()}_btnRefresh" style="display:none;" title="Refresh" class="fas fa-redo-alt ${thisMacroName()}_hbo" onclick="${thisMacroName()}_Main()"></i>
  
  <div id="${thisMacroName()}-show-here"></div>  
    
  <!--macro dialog scripts-->     
  <script>
   // support functions    
    function ${thisMacroName()}_singleQuoted(text)  {return '&quot;' + text + '&quot;';} 
    
    async function ${thisMacroName()}_confirmDialog(sTitle,sQuestion){
      let dialog=new Promise((resolve,reject)=>{
        new Dialog({
          title: sTitle,
          content: '<p>' + sQuestion + '</p>' ,
          buttons: {
            ok: {
              icon:'<i class ="fas fa-check"></i>',
              label: "Ok",            
              callback: () => {resolve(true)}
            },
            cancel: { 
              icon:'<i class ="fas fa-times"></i>',
              label: "Cancel",            
              callback: () => {resolve(false)}
            }
          },
          default: "ok",
          close:  () => {resolve(false) }   
        }).render(true);             
      }); 
      let answer=await dialog;
      return answer;    
     }

    function ${thisMacroName()}_ActivationChange(element){       
      if( element.tagName.toLowerCase() === 'input' && element.getAttribute('type') === 'checkbox'){        
        let token_id=element.getAttribute("data-token-id");
        let citem_id=element.getAttribute("data-citem-id");
        let citem_ciKey=element.getAttribute("data-citem-ciKey");
        if(token_id!=null && citem_id!=null & citem_ciKey!=null){
          // get the actor from the canvas
          let actor = canvas.tokens.get(token_id).actor;   
          if (actor!=null){
            actor._sheet.useCIIcon(citem_id, citem_ciKey, element.checked, false, true);
          }                                  
        }  
      }
    }
    
    async function ${thisMacroName()}_AddcItemToActor(element) {
      let token_id=element.getAttribute("data-token-id");
      let citem_id=element.getAttribute("data-citem-id");
      let citem_ciKey=element.getAttribute("data-citem-ciKey");
      if(token_id!=null && citem_id!=null & citem_ciKey!=null){          
        // get the actor from the canvas
        let actor = canvas.tokens.get(token_id).actor;   
        if (actor!=null){
          // get citem from game db
          let citem=await game.items.find(y=>y.data.data.ciKey == citem_ciKey);
          if (citem!=null){       
            // confirm add from user
            let userconfirmation=await ${thisMacroName()}_confirmDialog('Please confirm','Do you want to add the cItem <b>'+citem.name+'</b> to actor <b>'+ actor.name +'</b>?');
            if  (userconfirmation){             
              // prepare citem to be added to actor
              let subitems =await actor.addcItem(citem);
              if (actor.isToken) {
                let myToken = canvas.tokens.get(actor.token.id);
                await myToken.document.update({ "actorData.data.citems": subitems });
              }
              else {
                await actor.update({ "data.citems": subitems });
              }            
            }
          }  
        }                                
      }
    }
    
    async function ${thisMacroName()}_DeletecItemFromActor(element){      
      let token_id=element.getAttribute("data-token-id");
      let citem_id=element.getAttribute("data-citem-id");
      let citem_ciKey=element.getAttribute("data-citem-ciKey");
      if(token_id!=null && citem_id!=null & citem_ciKey!=null){
        // get the actor from the canvas
        let actor = canvas.tokens.get(token_id).actor;   
        if (actor!=null){
          // get citem from game db
          let citem=await game.items.find(y=>y.data.data.ciKey == citem_ciKey);           
          if (citem!=null){    
            let userconfirmation=await ${thisMacroName()}_confirmDialog('Please confirm','Do you want to remove the cItem <b>'+citem.name+'</b> from actor <b>'+ actor.name +'<b>?');
            if  (userconfirmation){  
              let subitems = await actor.deletecItem(citem.id, false);              
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
      }            
    }  
    
    function ${thisMacroName()}_showActorSheet(element) {    
      let actor;
      let token;
      let token_id=element.getAttribute("data-token-id");                  
      token = canvas.tokens.get(token_id); 
      if(token!=null){   
        actor=token.actor;
      }              
      if(actor!=null){
        actor.sheet.render(true,{focus:true});
      }
    } 
    
    function ${thisMacroName()}_showItemSheet(element){    
      let citem_id=element.getAttribute("data-citem-id");                       
      citem = game.items.get(citem_id);                    
      if(citem!=null){
        citem.sheet.render(true,{focus:true});
      }
    }
    
    function ${thisMacroName()}_BuildTable(){
      let sHTMLTable='';
      // for all selected tokens
      let selected = canvas.tokens.controlled;
      if (selected != null) {
        if (selected.length > 0) {
          sHTMLTable='<table><thead><tr><th colspan="3"></th>';  
          // loop tokens to build header
          for (const token of selected) {                             
            sHTMLTable+='<th id="${thisMacroName()}_token_'+token.actor.id+'" colspan="4" class="${thisMacroName()}_actor_head ${thisMacroName()}_hbo" data-token-id="' + token.id + '" onclick="${thisMacroName()}_showActorSheet(this)">' + '<img class="${thisMacroName()}_portrait_img"  src="' + token.data.img +'"</img><br>' + token.name + '</th>';
          } 
          sHTMLTable+='</tr></thead>';     
          // loop configured citems
          sHTMLTable+='<tbody>';
          let arrcItems = JSON.parse('${Setting_cItemsToList()}');                           
          let scItemName='';
          let sCategory='';
          let actor;
          let actor_citem; 
          let citem_id;
          let citem_ciKey;
          arrcItems.forEach(function (citemdata) { 
            scItemName = citemdata.citemname;
            sCategory='';
            if(citemdata.hasOwnProperty('category')){
              sCategory=citemdata.category;
            } 
            // get citem info from item database 
            let citem = game.items.find(y=>y.name == scItemName);
            if (citem!=null){            
              citem_id = citem.id;
              citem_ciKey=citem.data.data.ciKey;                
              // add first column
              sHTMLTable+='<tr><td><img src="'+citem.data.img+'" class="${thisMacroName()}_citem-table-icon"></td><td class="${thisMacroName()}_citem_col ${thisMacroName()}_hbo" data-citem-id="'+citem_id+'" onclick="${thisMacroName()}_showItemSheet(this)" >' + scItemName + '</td><td class="${thisMacroName()}_category_col">'+sCategory+'</td>';
              // now loop tokens again  
              for (const token of selected) { 
                // check if token has citem   
                actor = token.actor;                                                   
                actor_citem = actor.data.data.citems.find(y => y.name == scItemName);
                if (actor_citem != null) {
                  // actor has citem  
                  // check if this is actvateable
                  if(citem.data.data.usetype=='ACT'){                           
                    // get current value
                    let checked='';   
                    if(actor_citem.isactive){
                      checked='checked';
                    }
                    sHTMLTable+='<td></td><td class="${thisMacroName()}_active_col"><input type="checkbox" class="${thisMacroName()}_hbo" data-token-id="' + token.id + '" data-citem-id="'+citem_id+'" data-citem-ciKey="'+citem_ciKey+'" value="'+ actor_citem.isactive +'"' + checked +  ' onclick="${thisMacroName()}_ActivationChange(this)" title="Toggle Activation for this cItem"></td><td class="${thisMacroName()}_addremove_col"> <i data-token-id="' + token.id + '" data-citem-id="'+citem_id+'" data-citem-ciKey="'+citem_ciKey+'" class="fas fa-minus-circle ${thisMacroName()}_hbo" onclick="${thisMacroName()}_DeletecItemFromActor(this)" title="Remove this cItem from this Actor"></i></td><td></td>';
                  } else  {
                    sHTMLTable+='<td></td><td class="${thisMacroName()}_active_col"><input type="checkbox" checked onclick="return false" title="This cItem is always active(PASSIVE)"></td><td class="${thisMacroName()}_addremove_col"><i data-token-id="' + token.id + '" data-citem-id="'+citem_id+'" data-citem-ciKey="'+citem_ciKey+'" class="fas fa-minus-circle ${thisMacroName()}_hbo" onclick="${thisMacroName()}_DeletecItemFromActor(this)" title="Remove this cItem from this Actor"></i></td><td></td>';
                  } 
                } else {
                  // actor does not have citem
                  sHTMLTable+='<td></td><td class="${thisMacroName()}_active_col"></td><td class="${thisMacroName()}_addremove_col"><i data-token-id="' + token.id + '" data-citem-id="'+citem_id+'" data-citem-ciKey="'+citem_ciKey+'" class="fas fa-plus-circle ${thisMacroName()}_hbo" title="Add this cItem to this Actor" onclick="${thisMacroName()}_AddcItemToActor(this)"></i></td><td></td>';
                }                       
              }
              // end row
              sHTMLTable+='</tr>';
            } else {
              // citem not found in item db 
              sHTMLTable+='<tr><td></td><td class="${thisMacroName()}_citem_col ${thisMacroName()}_not_found" > ' + scItemName + '</td><td class="${thisMacroName()}_not_found" colspan="' + (selected.length * 4)  + '"><i class="fas fa-exclamation-triangle ${thisMacroName()}_icon_error"></i> Not found in item database <i class="fas fa-exclamation-triangle ${thisMacroName()}_icon_error"></i></td></tr>';
            }
          });
         
          // end table
          sHTMLTable+='</tbody></table>'
        } else {
          sHTMLTable='<p>No tokens selected</p>';
        }           
        
      } else {
        sHTMLTable='<p>Error getting selected tokens</p>';
      }  
        
      return sHTMLTable;
    }
    
    // Main function
    function ${thisMacroName()}_Main(){      
      // build table
      let sHTMLTable=${thisMacroName()}_BuildTable();           
      // update dialog
      document.getElementById('${thisMacroName()}-show-here').innerHTML=sHTMLTable;
    }
             
    // Run main
    ${thisMacroName()}_Main(); 
        
  </script> 
  <!--Marker element to store hookindex-->
  <input type="hidden" id="${thisMacroName()}_hookIndex" value="-1">
  
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
      render: async(html) =>  {
        document.getElementById(`${thisMacroName()}_appId`).setAttribute('value',d.appId);         
        // set hook
        // add hooks and store the return in an hidden element
        let hookIndex  = Hooks.on("updateActor", async (actor, updateData,options,userId) => {      
          // check if token is displayed
          let checkid=`${thisMacroName()}` + '_token_' + actor.id;          
          let element=document.getElementById(checkid);          
          if(element!=null){
            //trigger refresh
            let elem = document.getElementById(`${thisMacroName()}_btnRefresh`);
            if (elem!=null){
              if (typeof elem.onclick == "function") {
                elem.onclick.apply(elem);
              }               
            }
          }
        }); 
       console.log(`${thisMacroName()}` +' || updateActor hook added, hookindex:' + hookIndex );
       document.getElementById(`${thisMacroName()}_hookIndex`).setAttribute('value',hookIndex); 
      }, 
      close: async(html)=>{
        // unhook        
        let hookIndex;
        let hookIndex_element=document.getElementById(`${thisMacroName()}_hookIndex`);
        if (hookIndex_element!=null){              
          hookIndex=hookIndex_element.getAttribute('value');
          if (hookIndex!=null){ 
            let hookIndexvalue=parseInt(hookIndex);            
            await Hooks.off('updateActor', hookIndexvalue);
            console.log(`${thisMacroName()}` +' || updateActor hook removed, hookindex:' + hookIndex );
          }
        }          
      } 
    });
    d.options.width = 0;
    d.position.width = 0;
    d.options.resizable=true;
    d.render(true);        
  }


