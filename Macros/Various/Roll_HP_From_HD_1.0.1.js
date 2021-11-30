// **************************************************************** 
// Macro:               Roll_HP_From_HD
// Version Compability: Tested with
//                      Sandbox 0.10.9 | Foundry 0.8.9
// ================================================================ 
// Date       Version  Author               Description             
// ---------- -------- -------------------- -----------------------
// 2021-11-29 1.0.0    Ramses800            Macro created                          
// 2021-11-30 1.0.1    Ramses800            Fix     
// ****************************************************************   

Roll_HP_From_HD('d8', 'monster_hd','hp');

async function Roll_HP_From_HD(hd_die_type, hd_property_key,hp_property_key) {
  // get selected token
  let selected = canvas.tokens.controlled;
  if (selected != null) {
    if (selected.length > 0) {
      // for each selected token
      for (const token of selected) {        
        let actor = token.actor;
        let actorattributes = actor.data.data.attributes;
        if (actorattributes != null) {
          // check if it has the property  
          let property_hd = game.items.find(y => y.type == "property" && y.data.data.attKey == hd_property_key);
          let property_hp = game.items.find(y => y.type == "property" && y.data.data.attKey == hp_property_key);
          if (property_hd != null  && property_hp !=null) {
            // check property datatype
            if (property_hd.data.data.datatype == 'simplenumeric' && property_hp.data.data.datatype == 'simplenumeric') {
              // check that token has this property(attribute)
              if (actor.data.data.attributes.hasOwnProperty(hd_property_key) && actor.data.data.attributes.hasOwnProperty(hp_property_key)) {
                // get hd count
                let hd=actor.data.data.attributes[hd_property_key].value;
                let hp_max=actor.data.data.attributes[hp_property_key].max;
                // roll it
                let hd_roll_result= (await new Roll(hd + hd_die_type ).evaluate({async: true})).total;
                // get roll result
                let stringvalue=hd_roll_result.toString();

                // when updating a value, always set 'modified:=true'
                // when updating a max  , always set 'modmax:=true'
                
                let finalupdatedata ={[`data.attributes.${hp_property_key}.modmax`]: true,[`data.attributes.${hp_property_key}.max`]: stringvalue,[`data.attributes.${hp_property_key}.value`]: stringvalue,[`data.attributes.${hp_property_key}.modified`]: true} ;
                await actor.update(finalupdatedata);                                                

              } else {
                ui.notifications.warn('The token(' + token.data.name + ') does not have both properties(' + hd_property_key + ','+hp_property_key+' needed');
              }
            } else {
              ui.notifications.warn('One or more properties is not a simplenumeric property');
            }

          } else {
            ui.notifications.warn('One or more properties does not exist');
          }
        } else {
          ui.notifications.error('The selected token(' + token.data.name + ') does not have any properties');
        }
      }



    } else {
      ui.notifications.warn('No token selected');
    }
  } else {
    ui.notifications.error('Error getting selected tokens');
  }
}

