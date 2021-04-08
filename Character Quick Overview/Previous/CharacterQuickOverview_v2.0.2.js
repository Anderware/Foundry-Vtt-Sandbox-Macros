//                                                                  
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
//                                                                  
//                     Settings for this macro                      
//                                                                  
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
// 
function Setting_FormWidth(){return 0;} // set to 0 to autosize                                                                                                                                              
function Setting_Foldername() {
  let foldername;
  foldername='';  // set folder to empty string to use selected(controlled) tokens instead  
  foldername='Goblins'; 
  return foldername; 
 }    
 
function Setting_PropertiesTitle(){
  return 'General';  // use this if you have several instances of this macro running, this will add this text to the title of the displayed form, makes it easier to tell them apart
  }
  
function Setting_PropertiesRequested() {
let objPropertiesToDisplay = [
{"display":"Body","roll":"Body","columnheader":"%fas fa-child","columnheadertooltip":"Body property"},  
{"display":"Mind","roll":"Mind","columnheader":"%fas fa-graduation-cap","columnheadertooltip":"Mind property"},
{"display":"Stamina","roll":"","columnheader":"%fas fa-heart","columnheadertooltip":"Stamina property"},
{"display":"HairColor","roll":"","columnheader":"Hair Color"},
{"display":"HairColor","roll":"","columnheader":"%fas fa-user-ninja"},
{"display":"Gender","roll":"","columnheader":"Gender"},
{"display":"HasMagic","roll":"","columnheader":"Has Magic"},
{"display":"%fas fa-code","roll":"?Hello","columnheader":"Macro","columnheadertooltip":"Execute macro"},
{"display":"Rating","roll":"","columnheader":"Rating"},
{"display":"FatePoints","roll":"","columnheader":"Fate Pts"},
{"display":"","roll":"HealthCheck","columnheader":"Health check"},
{"display":"Armed Combat|SkillRank","roll":"Armed Combat|SkillRoll","columnheader":"Armed Combat Rank(cItem)"},
{"display":"Armed Combat|SkillRoll","roll":"Armed Combat|SkillRoll","columnheader":"Armed Combat Roll(cItem)"},
{"display":"Ranged Combat|SkillRank","roll":"Ranged Combat|SkillRoll","columnheader":"Ranged Combat(cItem)"}
];
  return JSON.stringify(objPropertiesToDisplay); 
  
// Format for each properties
//  {"display":"<Property to use as display label>","roll":"<Property to get the rollexpression from>","columnheader":"<Any text string>","columnheadertooltip":"<Any text string>"}
// the field "columnheadertooltip" is optional but useful when using icons in the header
// 
// empty display field - a Die
// empty roll field - no clickable roll link
// to use a cItem in  display or roll field, use "<cItem name>|<cItem property>"
// To use a FontAwesome glyph(https://fontawesome.com/icons?d=gallery&p=2&m=free) in column header, use "%fas fa-<icon name>.
// to call a macro from roll field use "?<macroname>"- The macro with execute with two arguments, actor/tokenid and if it is a token on a scene
// If you have the module The Furnace installed you can use the arguments in your function like this

//Example macro to call
//function ShowImg(actorId,useCanvastokens){
//let actor;
//let token; 
//let simg;
//let sname;
//if(useCanvastokens==0){
//  actor = game.actors.get(actorId);
//  if(actor!=null){
//    simg=actor.data.img;
//    sname=actor.name;         
//  }
//}
//else{                
//  token = canvas.tokens.get(actorId);
//  if(token!=null){
//    simg=token.data.img;
//    sname=token.data.name;
//  }           
//}
//ChatMessage.create({
//    content : '<p>' +sname +'</p> <img src="' + simg + '" />'
//  });
//}
//ShowImg(args[0],args[1]);

// Example for properties
//let objPropertiesToDisplay = [
//{"display":"Body","roll":"Body","columnheader":"BOD (Property)","columnheadertooltip":"Body property"},
//{"display":"BodyRoll","roll":"BodyRoll","columnheader":"BodyRoll (Property)"},
//{"display":"%fas fa-rainbow","roll":"MindRoll","columnheader":"MindRoll (Property)"},  
//{"display":"Mind","roll":"Mind","columnheader":"MND (Property)"},
//{"display":"Stamina","roll":"","columnheader":"%fas fa-heart","columnheadertooltip":"Stamina"},
//{"display":"","roll":"HealthCheck","columnheader":"Health check (Property)"},
//{"display":"","roll":"?Hello","columnheader":"Macro"},
//{"display":"Armed Combat|SkillRank","roll":"Armed Combat|SkillRoll","columnheader":"Armed Combat Rank(cItem)"},
//{"display":"Armed Combat|SkillRoll","roll":"Armed Combat|SkillRoll","columnheader":"Armed Combat Roll(cItem)"},
//{"display":"Unarmed Combat|SkillRank","roll":"Unarmed Combat|SkillRoll","columnheader":"Unarmed Combat(cItem)"}
//];

 
}  
 



 
//                                                                  
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
//                                                                  
//                        Macro generic code                        
//                                                                  
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
//         
// **************************************************************** 
// Macro:         Quick Character Overview                         
// ================================================================ 
// Date       Version  Author               Description             
// ---------- -------- -------------------- -----------------------
// 2021-03-22 1.0.0    Ramses800            Macro created. 
// 2021-03-23 1.1.0    Ramses800            Updates.
// 2021-03-23 1.2.0    Ramses800            Updates.
// 2021-03-23 1.3.0    Ramses800            Updates.
// 2021-04-01 2.0.0    Ramses800            Complete rewrite. 
// 2021-04-02 2.0.1    Ramses800            Added simpletext,list,checkbox,radio & macros   
// 2021-04-02 2.0.2    Ramses800            Fixes     
// ****************************************************************                                                                                                                                         
function macroTitle() {
  let thismacroname=`Character Quick Overview`;
  if (Setting_PropertiesTitle()!=''){
    thismacroname=thismacroname + `(`+ Setting_PropertiesTitle() +`)` ;
  }
  if(Setting_Foldername()==''){ 
    return thismacroname + ` - Selected token(s)`;
  }
  else{   
    return thismacroname + ` - ${Setting_Foldername()}`;
  }
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
    .${thisMacroName()}_hbox:hover {box-shadow:0 0 0 2px darkred;cursor: pointer;}
    table.${thisMacroName()}_table:{  table-layout: fixed;}
    th.${thisMacroName()}_refresh_th{text-align:left;padding:0px 0px 0px 6px;width:48px;min-width:48px;max-width:48px;min-height:24px;height: 24px;} 
    th.${thisMacroName()}_property_th{padding:0px 3px 0px 3px;}  
    td.${thisMacroName()}_actorname_td{padding-left:4px;}
    img.${thisMacroName()}_portrait_img{height:48px;width:48px;min-width:48px;object-fit:cover;object-position:50% 0;margin: 0 8px 0 2px;border: none;}  
    td.${thisMacroName()}_portrait_td{text-align:left;width:48px;min-width:48px;max-width:48px;display: block;padding:2px 0px 0px 2px;vertical-align:middle;}
  </style> 
  
  <!--macro dialog content-->  
  
  <table id="${thisMacroName()}_CharactersProperties" class="${thisMacroName()}_table">
    <thead>
    <tr id="${thisMacroName()}_CharactersPropertiesHeaderRow"><th class="${thisMacroName()}_refresh_th"><i id="${thisMacroName()}_btnRefresh" title="Refresh" class="fas fa-redo-alt ${thisMacroName()}_hbo" onclick="${thisMacroName()}_Main()"></i></th><th></th></tr>
    </thead>
    <tbody id="${thisMacroName()}_CharactersPropertiesBody" >
    </tbody>
  </table>     
    
  <!--macro dialog scripts-->     
  <script>
   // support functions
    function ${thisMacroName()}_singleQuote()  {return '&quot;';} 
    function ${thisMacroName()}_singleQuoted(text)  {return '&quot;' + text + '&quot;';}  
    

      
    function ${thisMacroName()}_splitString(sInput,sSeparator,iFieldNr){
      let arr=sInput.split(sSeparator);
      if(arr.length>0 && arr.length>iFieldNr )      {
        return arr[iFieldNr];
      }
      else{
        return sInput;
      }
    }
    
    function ${thisMacroName()}_executeMacro(actorId,macroname,useCanvastokens=0 ){  
       
      let macro = game.macros.getName(macroname);  
      if (macro!=null){   

        macro.execute(actorId,useCanvastokens);
      }
      else{
        ui.notifications.warn('Macro ' + macroname +' not found');
      }
    }
    
    function ${thisMacroName()}_rollActorProperty(actorId,sPropertyId,useCanvastokens=0 ){
      let actor;
      let token;  
      if(useCanvastokens==0){
        actor = game.actors.get(actorId);         
      }
      else{                
        token = canvas.tokens.get(actorId);
        if(token!=null){
            actor=token.actor;
          }           
      }                        
      if(actor!=null){             
        let actorattributes = actor.data.data.attributes;
        let rollexp;
        let rollname;
        let rollid = [];
        let property = game.items.get(sPropertyId );
        rollexp = property.data.data.rollexp;
        rollname = property.data.data.rollname;
        rollid.push(property.data.data.rollid);   
        
        actor.rollSheetDice(rollexp,rollname,rollid,actorattributes,null); 
       }
    }      
      
    function ${thisMacroName()}_rollActorcItemProperty(actorId,citemname,sPropertyId,useCanvastokens=0){ 
      let actor;  
      let token; 
      if(useCanvastokens==0){
        actor = game.actors.get(actorId);
      }
      else{
        // try to get it from scene
        token = canvas.tokens.get(actorId); 
        if(token!=null){
          actor=token.actor;
        }    
      }
      //console.log(actor);
      if(actor!=null){          
        let citem = actor.data.data.citems.find(y=>y.name == citemname);
        let property = game.items.get(sPropertyId);  
        let citemattributes = citem.attributes;
        rollexp = property.data.data.rollexp;
        rollname = property.data.data.rollname;         
        actor.rollSheetDice(rollexp,rollname,null,actor.data.data.attributes,citemattributes); 
      }
    }

    function ${thisMacroName()}_showSheet(actorId,useCanvastokens=0){
      let actor;
      let token;           
      if(useCanvastokens==0){
        actor = game.actors.get(actorId);   
      } 
      else{  
        token = canvas.tokens.get(actorId); 
        if(token!=null){   
          actor=token.actor;
        }    
      }    

      if(actor!=null){
        actor.sheet.render(true);
      }
    }
    
    function ${thisMacroName()}_showTokenConfiguration(actorId,useCanvastokens=0){
      let actor;
      let token;   
           
      if(useCanvastokens==0){
        actor = game.actors.get(actorId);
        if(actor!=null){
          token=actor.data.token; 
          // this token wont work
        }    
      } 
      else{  
        token = canvas.tokens.get(actorId); 
        if(token!=null){   
          actor=token.actor;
        }    
      }
      if(token!=null){
        token.sheet.render(true);
      }
    }        
    
    function ${thisMacroName()}_AddPropertiesHeaders(){
      let headerrow=document.getElementById("${thisMacroName()}_CharactersPropertiesHeaderRow");
      let arrProperties = JSON.parse('${Setting_PropertiesRequested()}');
      let columnheader='';
      let title='';
      arrProperties.forEach(function(item){   
        title='';
        if (item.hasOwnProperty('columnheadertooltip')){
          title='title="' + item.columnheadertooltip  + '"';
        }    
        else{
          title='title="' + item.display  + '"';
        }
         
        if(item.columnheader.startsWith("%")){
          // replace it with fas glyph  //<i class="fas fa-dice-d20"></i>'
          columnheader =  '<i class="' + item.columnheader.substr(1)  + '"></i>';      
        }
        else
        {       
           columnheader= item.columnheader;
        }
        headerrow.insertCell(-1).outerHTML = '<th class="${thisMacroName()}_property_th" '+title+' >' + columnheader +  '</th>';
      });

    }
       
    ${thisMacroName()}_AddPropertiesHeaders();
    
    function ${thisMacroName()}_DisplayCellContent(cell,actorId,display,roll,useCanvastokens=0){      
      let slabel='';
      let sonclick='';
      let sclassname='';
      let stitle='';
      let iscitem=false; 
      let citemname;   
      let citempropKey;
      let property;   
      let actor;
      let token;
      let citem;      
      try{ 
        if(useCanvastokens==0){
          actor = game.actors.get(actorId);    
        } 
        else{  
          token = canvas.tokens.get(actorId); 
          if(token!=null){   
            actor=token.actor;
          }    
        }      
        // determine attribute or citem
        if (display.indexOf('|')>-1){          
          iscitem=true; 
          citemname=${thisMacroName()}_splitString(display,'|',0);
          citempropKey=${thisMacroName()}_splitString(display,'|',1);
          citem = actor.data.data.citems.find(y=>y.name == citemname);                    
        }                                    
        // display label         
        if (display=='' || display.startsWith("%")){            
          //check that this actor has this at all
          let hasthis=false; 
          // it could  be a macro
          if (roll!=''){
            if (roll.startsWith("?")){ 
              hasthis=true;
            }
          }
          else if(!citem){ 
            // actor property
            property = game.items.find(y=>y.type=="property" && y.data.data.attKey==roll); 
            if(property!=null) {  
              if (['simplenumeric', 'simpletext', 'list', 'checkbox','radio','badge'].indexOf(property.data.data.datatype) >= 0){   
                 if(actor.data.data.attributes.hasOwnProperty(roll)){
                  hasthis=true;
                }                       
              }
              else if(property.data.data.datatype=='label'){              
               hasthis=true;
              }
            }                         
          }             
          else{
            // citem
            if (citem!=null){
              // has the citem
              if(citem.attributes.hasOwnProperty(citempropKey)){
                hasthis=true;
              } 
            }
          }  
          
          
          
          if(hasthis){
            if(display.startsWith("%")){                  
              // replace it with fas glyph  //<i class="fas fa-dice-d20"></i>'
              slabel =  '<i class="' + display.substr(1)  + '"></i>';    
            }
            else{
              // single die icon
              slabel='<i class="fas fa-dice-d20"></i>';
            }
          }
        }
        else{                            
          if(!iscitem){
            property = game.items.find(y=>y.type=="property" && y.data.data.attKey==display);
            if (property!=null) {
              //                 
              // check if this is a value attribute  
              if (['simplenumeric', 'simpletext', 'list', 'checkbox','radio','badge'].indexOf(property.data.data.datatype) >= 0) {
                // check that actor has this attribute
                 if(actor.data.data.attributes.hasOwnProperty(display)){ 
                    if(property.data.data.datatype=='badge'){ 
                      slabel= actor.data.data.attributes[display].value + '(' + actor.data.data.attributes[display].max + ')';
                    }                                           
                    else if(property.data.data.datatype=='checkbox'){ 
                      if(actor.data.data.attributes[display].value==true){
                        slabel='<i class="far fa-check-square"></i>';
                      }
                      else{
                        slabel='<i class="far fa-square"></i>';
                      }
                    } 
                    else if(property.data.data.datatype=='radio'){
                      // add radio glyphs  
                      for(let i=1;i<=actor.data.data.attributes[display].max;i++){ 
                        if(actor.data.data.attributes[display].value>=i){  
                          if (property.data.data.radiotype=='C'){
                            slabel+='<i class="fas fa-circle"></i>';
                          }
                          else{  
                            slabel+='<i class="fas fa-square"></i>';
                          }
                        }
                        else{  
                          if (property.data.data.radiotype=='C'){
                            slabel+= '<i class="far fa-circle"></i>';  
                          }
                          else{
                            slabel+='<i class="far fa-square"></i>';
                          }
                        }
                      }
                    }
                    else{   
                    // use the value from targetattributes as label
                      slabel=actor.data.data.attributes[display].value; 
                    }                  
                 } 
                 else{
                    // it should have been here unless this is a diffrent template
                    slabel='';
                 }
              } 
                                                            
              else if(property.data.data.datatype=='label'){  
                if(property.data.data.labelformat='D'){                  
                  // show die glyph   
                  slabel='<i class="fas fa-dice-d20"></i>';
                }
                else{            
                  slabel=property.data.data.tag;
                }                 
              } 
              
              else{ 
                // unsupported datatype
                ui.notifications.warn('Unsupported data type for property '+display + ':' + property.data.data.datatype );
                slabel=property.data.data.datatype;
              }                               
              //
            }
          }
          else{  
            //citem     
            
            if (citem!=null){
              // actor has this citem                                                                            
              property = game.items.find(y=>y.type=="property" && y.data.data.attKey==citempropKey);
              if (property!=null){     
                // check if this is a value attribute   
                if (['simplenumeric', 'simpletext', 'list', 'checkbox','radio','badge'].indexOf(property.data.data.datatype) >= 0) { 
                  if(citem.attributes.hasOwnProperty(citempropKey)){
                    if(property.data.data.datatype=='badge'){ 
                      slabel= citem.attributes[citempropKey].value + '(' + citem.attributes[citempropKey].max + ')';
                    }                                           
                    else if(property.data.data.datatype=='checkbox'){ 
                      if(citem.attributes[citempropKey].value==true){
                        slabel='<i class="far fa-check-square"></i>';
                      }
                      else{
                        slabel='<i class="far fa-square"></i>';
                      }
                    } 
                    else if(property.data.data.datatype=='radio'){
                      // add radio glyphs  
                      for(let i=1;i<=citem.attributes[citempropKey].max;i++){ 
                        if(citem.attributes[citempropKey].value>=i){  
                          if (property.data.data.radiotype=='C'){
                            slabel+='<i class="fas fa-circle"></i>';
                          }
                          else{  
                            slabel+='<i class="fas fa-square"></i>';
                          }
                        }
                        else{  
                          if (property.data.data.radiotype=='C'){
                            slabel+= '<i class="far fa-circle"></i>';  
                          }
                          else{
                            slabel+='<i class="far fa-square"></i>';
                          }
                        }
                      }
                    }
                    else{                                                      
                      // use the value from citem as label                    
                      slabel=citem.attributes[citempropKey].value;  
                    }                                        
                  } 
                  else{
                    // this citem dont have this attribute
                    slabel='';
                  }
                } 
                else if(property.data.data.datatype=='label'){   
                   if(property.data.data.labelformat='D'){
                     // show die glyph   
                     slabel='<i class="fas fa-dice-d20"></i>';
                   }
                   else{
                     slabel=property.data.data.tag;
                   }
                }                              
                else
                { 
                  // unsupported datatype
                  ui.notifications.warn('Unsupported data type for property '+display + ':' + property.data.data.datatype );
                  slabel=property.data.data.datatype;                  
                }  
              }                         
            }                                    
          }
        }
        // ---------------
        // roll onclick
        // ---------------  
        if(roll==''|| slabel=='' ){
          // no roll
        }
        else{    
          //debugger;   
          sclassname='${thisMacroName()}_hbo'; 
          if(roll.startsWith("?")){
            // macro  
            stitle='Run macro '+ roll.substr(1);
            sonclick='onclick="${thisMacroName()}_executeMacro(' + ${thisMacroName()}_singleQuoted(actorId) +','+ ${thisMacroName()}_singleQuoted(roll.substr(1)) +',' + useCanvastokens +');"'
          }
          else{ 
            stitle='Roll!';           
            if(!iscitem){   
              // actor property
              property = game.items.find(y=>y.type=="property" && y.data.data.attKey==roll); 
              if (property!=null){    
                let rollexp = property.data.data.rollexp;
                if (rollexp!=null){
                  if (rollexp.length>0){                                                                                          
                    sonclick='onclick="${thisMacroName()}_rollActorProperty(' + ${thisMacroName()}_singleQuoted(actorId) +','+ ${thisMacroName()}_singleQuoted(property.id) +',' + useCanvastokens +');"'                  
                  }                                                                    
                }
              }            
            }        
            else{
              // citem 
              citemname=${thisMacroName()}_splitString(roll,'|',0);
              citempropKey=${thisMacroName()}_splitString(roll,'|',1); 
              property = game.items.find(y=>y.type=="property" && y.data.data.attKey==citempropKey);            
              if (property!=null){    
                let rollexp = property.data.data.rollexp;
                if (rollexp!=null){
                  if (rollexp.length>0){                                                     
                    sonclick='onclick="${thisMacroName()}_rollActorcItemProperty(' + ${thisMacroName()}_singleQuoted(actorId) +','+ ${thisMacroName()}_singleQuoted(citemname) + ',' + ${thisMacroName()}_singleQuoted(property.id)+','+useCanvastokens +');"';                  
                  }                                                                    
                }
              }                                                        
            }        
          } 
        }
      }      
      catch(err){    
        console.error(err);
        ui.notifications.error(err);       
      }           
      cell.innerHTML='<label title="' + stitle +'" class="'+sclassname+'" ' + sonclick +'>' + slabel+ ' </label>';
    }
    
    function ${thisMacroName()}_ListActorsProperties(){
      let table = document.getElementById("${thisMacroName()}_CharactersProperties");  
      let useCanvastokens=0;
      // empty table
      if (table.rows.length>0)
      {
        for(let i=table.rows.length;i>1;i--){
          table.deleteRow(-1);	
        }
      }
      // build table
      let actors;  
      let tokens;  
      let foldername='${Setting_Foldername()}';
      
      if (foldername!=''){
        let folder = game.folders.getName(foldername);
        actors=folder.content;         
      }                                               
      else{
        // use controlled tokens instead  
        useCanvastokens=1;
        tokens = canvas.tokens.controlled; 
      }                   
      let arrProperties = JSON.parse('${Setting_PropertiesRequested()}');      
      let tbody = document.getElementById("${thisMacroName()}_CharactersPropertiesBody"); 
      let actorid;
      
      if(useCanvastokens==0){  
        // use game actors                                       
        for(let actor of actors){
          //console.log(actor);         
          let row = tbody.insertRow(-1);
          row.style.lineHeight="12px";
          row.insertCell(-1).outerHTML = '<td class="${thisMacroName()}_portrait_td"><img class="${thisMacroName()}_portrait_img"  src="' + actor.data.img +'"</img></td>';
          row.insertCell(-1).outerHTML = '<td class="${thisMacroName()}_actorname_td"><label title="Show actor"  class="${thisMacroName()}_hbo" onclick="${thisMacroName()}_showSheet(' + ${thisMacroName()}_singleQuoted(actor._id) +',' + useCanvastokens +  ');">' + actor.name +'</label></td>';
          arrProperties.forEach(function(item){
            sPropertyName=item.display;            
            let cell=row.insertCell(-1);
            cell.style.textAlign = "center";                                           
                   
            ${thisMacroName()}_DisplayCellContent(cell,actor._id,item.display,item.roll,useCanvastokens);          
          });
        } 
      }
      else{
        // use tokens
        for(let token of tokens){            
          let row = tbody.insertRow(-1);
          row.style.lineHeight="12px";
          row.insertCell(-1).outerHTML = '<td class="${thisMacroName()}_portrait_td"><img title="Show token configuration" class="${thisMacroName()}_portrait_img ${thisMacroName()}_hbox" onclick="${thisMacroName()}_showTokenConfiguration(' + ${thisMacroName()}_singleQuoted(token.data._id) +',' + useCanvastokens +  ');" src="' + token.data.img +'"</img></td>';
          row.insertCell(-1).outerHTML = '<td class="${thisMacroName()}_actorname_td"><label title="Show actor" class="${thisMacroName()}_hbo" onclick="${thisMacroName()}_showSheet(' + ${thisMacroName()}_singleQuoted(token.data._id) +',' + useCanvastokens +  ');">' + token.data.name +'</label></td>';
          arrProperties.forEach(function(item){
            sPropertyName=item.display;            
            let cell=row.insertCell(-1);
            cell.style.textAlign = "center";             
            ${thisMacroName()}_DisplayCellContent(cell,token.data._id,item.display,item.roll,useCanvastokens);          
          });
        }
      }
    } 
    // Main function
    function ${thisMacroName()}_Main(){ 
      //console.log("${thisMacroName()}_Main()");
      ${thisMacroName()}_ListActorsProperties();
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
