ExecutecItemRollForSelectedToken('Armed Combat','SkillRoll');

async function ExecutecItemRollForSelectedToken(scItemName,sPropertyKey){
  // get selected token
  let selected = canvas.tokens.controlled; 
  if (selected!=null){
    if(selected.length>0){
      if(selected.length==1){
        let token = selected[0];  
        // check if token has citem   
        let actor=token.actor;
        let citem = actor.data.data.citems.find(y=>y.name == scItemName);
        if (citem!=null){ 
          // check if it has the property
          let property = game.items.find(y=>y.type=="property" && y.data.data.attKey==sPropertyKey);
          if (property!=null){
            // check if the property has a roll
            let rollexp = property.data.data.rollexp;
            if (rollexp!=null){
              if (rollexp.length>0){
                // execute it 
                let citemattributes = citem.attributes;              
                let rollname = property.data.data.rollname;         
                actor.rollSheetDice(rollexp,rollname,null,actor.data.data.attributes,citemattributes); 
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
            ui.notifications.warn('The cItem '+ scItemName + ' does not have the property ' + sPropertyKey);
          }
        }
        else{
          // 
          ui.notifications.warn('The selected token(' + token.data.name + ') does not have the cItem ' + scItemName );
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


