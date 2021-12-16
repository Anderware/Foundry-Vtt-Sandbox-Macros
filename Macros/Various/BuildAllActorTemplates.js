// **************************************************************** 
// Macro:        BuildAllActorTemplates                                                    
// Description:  Build all actor templates.
//               Useful if the template does not show normally
// Compability:  Tested with 
//               Foundry 0.8.9 - Sandbox 0.10.12                  
// ================================================================ 
// Date       Version  Author               Description             
// ---------- -------- -------------------- ----------------------- 
// 2021-12-16 1.0.0    Ramses800            Macro created.         
// **************************************************************** 

BuildAllActorTemplates();

// Example for building only the template named _PlayerCharacter
// 
// BuildAllActorTemplates('_PlayerCharacter');

// Parameters
// actortemplatename - optional, if set only this template will rebuild
function BuildAllActorTemplates(actortemplatename=''){
  let actortemplates;
  if(actortemplatename==''){
    // get all actor templates
    actortemplates=game.actors.filter(y => y.type=="character" && y.data.data.istemplate==true);
  }
  else{
    // get specific actor
    actortemplates=game.actors.filter(y => y.type=="character" && y.data.data.istemplate==true && y.name==actortemplatename);
  }    
  if(actortemplates.length>0){ 
    // loop all actors
    actortemplates.forEach(function(actortemplate)  { 
      if(actortemplate!=null){
        
        ui.notifications.info('Building actor template '+ actortemplate.name )
        console.log('Building actor template '+ actortemplate.name )
        try{
          actortemplate.sheet.buildSheet();
        }
        catch(err){
          ui.notifications.error('Error building actor template ' + actortemplate.name);
          console.err('Error building actor template' + actortemplate.name);
          console.err(err);
        }
      }
    });    
  }
  else{
    ui.notifications.warn('No actor template found');
  }
    
}    