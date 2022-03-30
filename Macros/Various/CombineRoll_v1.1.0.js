// **************************************************************** 
// Macro:               CombineRoll 
// Description:         Displays a dialog for actors
//                      allowing them to combine(average) simplenumeric 
//                      properties and roll against them
// Version Compability: Tested with
//                      Sandbox 0.12.4 | Foundry 9.255                      
// ================================================================ 
// Date       Version  Author               Description             
// ---------- -------- -------------------- -----------------------
// 2022-03-04 1.0.0    Ramses800            Macro created
// 2022-03-08 1.0.1    Ramses800            Use actor character name/img
// 2022-03-29 1.0.2    Ramses800            Minor fixes
// 2022-03-30 1.1.0    Ramses800            Refactoring
//                                          Use selected tokens actors when GM
//                                          Reset/set options
//                                          Clickable portraits  
// ****************************************************************   
//                                                                  
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
//                                                                  
//                     Settings for this macro                      
//                                                                  
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
// 
function Setting_UseSelectedTokensActor(){
  if(game.user.isGM){
    return true;
  } else {
    return false;
  }
}
function Setting_FormWidth(){return 0;} // set to 0 to autosize 
function Setting_FormHeight(){return 1080;} // set to 0 to autosize                                                                                                                                             
function Setting_DataHeight() {return 750;}
function Setting_DiceToRoll(){return "1d100";
}

function Setting_ActorProperties(){
  // only simplenumeric properties are supported
  // to use a cItem in  propertykey, use "<cItem name>|<cItem property>"
  let objActorPropertiesToDisplay = {
    "columns":[
      {
        "columntag":"First column",
        "propertygroups": [
          {
            "propertygrouptag": "Primary Mental Attributes",
            "properties": [
              {"propertykey":"int_key"},
              {"propertykey":"perception_key"}
            ]
          },
          {
            "propertygrouptag": "Primary Physical Attributes",
            "properties": [             
              {"propertykey":"dex_key"},
              {"propertykey":"str_key"}
            ]
          },
          {
            "propertygrouptag": "Primary Soul Attributes",
            "properties": [
              {"propertykey":"cha_key"},
              {"propertykey":"psi_key"},              
              {"propertykey":"luc_key"}
            ]
          },
          {
            "propertygrouptag": "Primary Health Attributes",
            "properties": [
              {"propertykey":"end_key"}
            ]
          }
          ]
        },
        {
         "columntag":"Second column",
         "propertygroups": [
          {
            "propertygrouptag": "Charisma Skill Group(cItems)",
            "properties": [
              {"propertykey":"Bribery (C)|skill_value_key"},   
              {"propertykey":"Carousing (C)|skill_value_key"}, 
              {"propertykey":"Forgery (C)|skill_value_key"},
              {"propertykey":"Instruction (C)|skill_value_key"},  
              {"propertykey":"Interrogation (C)|skill_value_key"},   
              {"propertykey":"Leadership (C)|skill_value_key"}, 
              {"propertykey":"Negotiation/Diplomacy (C)|skill_value_key"}, 
              {"propertykey":"Streetwise (C)|skill_value_key"},
              {"propertykey":"Trade and Commerce (C)|skill_value_key"}  
            ]
          },
          {
            "propertygrouptag": "Luck Skill Group(cItems)",
            "properties": [
              {"propertykey":"Gaming: Poker|skill_value_key"},   
              {"propertykey":"Gaming: Snooker|skill_value_key"},
              {"propertykey":"Gaming: Universe|skill_value_key"}  
            ]
          },
          {
            "propertygrouptag": "Dexterity Skill Group(cItems)",
            "properties": [
              {"propertykey":"Agriculture Technology (D)|skill_value_key"},  
              {"propertykey":"Artistic Expression (D): Cooking|skill_value_key"}, 
              {"propertykey":"Artistic Expression (D): Dancing, Ballroom|skill_value_key"},
              {"propertykey":"Artistic Expression (D): Light Sculpting|skill_value_key"},  
              {"propertykey":"Artistic Expression (D): Percussion|skill_value_key"}, 
              {"propertykey":"Artistic Expression (D): Photography|skill_value_key"},
              {"propertykey":"Artistic Expression (D): Tappet Design|skill_value_key"},  
              {"propertykey":"Artistic Expression (D): Writing|skill_value_key"}, 
              {"propertykey":"Communications Systems Technology (D)|skill_value_key"},
              {"propertykey":"Computer Technology (D)|skill_value_key"},   
              {"propertykey":"Construction Technology (D)|skill_value_key"}, 
              {"propertykey":"Damage Control Procedures (D)|skill_value_key"},
              {"propertykey":"Deflector Shield Technology (D)|skill_value_key"},   
              {"propertykey":"Demolitions (D)|skill_value_key"}, 
              {"propertykey":"Electronics Technology (D)|skill_value_key"},
              {"propertykey":"Life Support Systems Technology (D)|skill_value_key"},   
              {"propertykey":"Mechanical Engineering (D)|skill_value_key"}, 
              {"propertykey":"Personal Weapons Technology (D)|skill_value_key"},
              {"propertykey":"Shuttlecraft Pilot (D)|skill_value_key"},  
              {"propertykey":"Shuttlecraft Systems Technology (D)|skill_value_key"}, 
              {"propertykey":"Small Equipment Systems Technology (D)|skill_value_key"},
              {"propertykey":"Small Vessel Engineering (D)|skill_value_key"},  
              {"propertykey":"Small Vessel Pilot (D)|skill_value_key"}, 
              {"propertykey":"Space Science: Astrogation (D)|skill_value_key"},
              {"propertykey":"Space Science: Astronautics (D)|skill_value_key"},   
              {"propertykey":"Sport: Darts (D)|skill_value_key"},  
              {"propertykey":"Sport: Dust Boarding (D)|skill_value_key"}, 
              {"propertykey":"Sport: Gymnastics (D)|skill_value_key"},
              {"propertykey":"Sport: Hunting (D)|skill_value_key"},  
              {"propertykey":"Sport: Parquor (D)|skill_value_key"}, 
              {"propertykey":"Sport: Squirrel Suit (D)|skill_value_key"},
              {"propertykey":"Sport: Swimming and Diving (D)|skill_value_key"},  
              {"propertykey":"Sport: Wrestling (D)|skill_value_key"}, 
              {"propertykey":"Starfighter Engineering (D)|skill_value_key"},
              {"propertykey":"Starfighter Piloting (D)|skill_value_key"},  
              {"propertykey":"Starship Weaponry Technology (D)|skill_value_key"}, 
              {"propertykey":"Stealth (D)|skill_value_key"},
              {"propertykey":"Transporter Systems Technology (D)|skill_value_key"},  
              {"propertykey":"Vehicle Operation: Aquatic (D)|skill_value_key"}, 
              {"propertykey":"Vehicle Operation: Atmospheric (D)|skill_value_key"},
              {"propertykey":"Vehicle Operation: Gravitic (D)|skill_value_key"},   
              {"propertykey":"Vehicle Operation: Ground (D)|skill_value_key"}, 
              {"propertykey":"Vehicle Weaponry Technology (D)|skill_value_key"}, 
              {"propertykey":"Warp Drive Technology (D)|skill_value_key"},
              {"propertykey":"Zero-G Operations (D)|skill_value_key"}
              ]
          },
          {
            "propertygrouptag": "Intelligence Skill Group(cItems)",
            "properties": [
              {"propertykey":"Administration (I)|skill_value_key"},  
              {"propertykey":"Artistic Expression (I): Acting|skill_value_key"}, 
              {"propertykey":"Artistic Expression (I): Speech|skill_value_key"},
              {"propertykey":"Artistic Expression (I): Surveying|skill_value_key"},  
              {"propertykey":"Assassination (I)|skill_value_key"}, 
              {"propertykey":"Clandestine Operations (I)|skill_value_key"},
              {"propertykey":"Communications Systems Operations (I)|skill_value_key"},   
              {"propertykey":"Computer Operations (I)|skill_value_key"}, 
              {"propertykey":"Cryptology (I)|skill_value_key"},
              {"propertykey":"Deflector Shield Operations (I)|skill_value_key"},   
              {"propertykey":"Disguise (I)|skill_value_key"}, 
              {"propertykey":"Distillation (I)|skill_value_key"},
              {"propertykey":"Environmental Suit Operations (I)|skill_value_key"},   
              {"propertykey":"Intelligence Procedures (I)|skill_value_key"}, 
              {"propertykey":"Language: Ancient Imperial Kolari (I)|skill_value_key"},
              {"propertykey":"Language: Andorian (I)|skill_value_key"},  
              {"propertykey":"Language: Caitian (I)|skill_value_key"}, 
              {"propertykey":"Language: Cygnan (I)|skill_value_key"},
              {"propertykey":"Language: Efros (I)|skill_value_key"},   
              {"propertykey":"Language: Galacta (I)|skill_value_key"}, 
              {"propertykey":"Language: Gornouf (I)|skill_value_key"},
              {"propertykey":"Language: Klingon tlhngan hol (I)|skill_value_key"},   
              {"propertykey":"Language: Kzin (I)|skill_value_key"}, 
              {"propertykey":"Language: Trill (I)|skill_value_key"},
              {"propertykey":"Language: Vulcan (I)|skill_value_key"},  
              {"propertykey":"Language: Yrevish (I) Trade Language|skill_value_key"},  
              {"propertykey":"Life Sciences: Biology (I)|skill_value_key"}, 
              {"propertykey":"Life Sciences: Bionetics (I)|skill_value_key"},
              {"propertykey":"Life Sciences: Bionics (I)|skill_value_key"},  
              {"propertykey":"Life Sciences: Botany (I)|skill_value_key"}, 
              {"propertykey":"Life Sciences: Ecology (I)|skill_value_key"},
              {"propertykey":"Life Sciences: Exobiology (I)|skill_value_key"},   
              {"propertykey":"Life Sciences: Genetics (I)|skill_value_key"}, 
              {"propertykey":"Life Sciences: Zoology (I)|skill_value_key"},
              {"propertykey":"Medical Sciences: Dental (I)|skill_value_key"},  
              {"propertykey":"Medical Sciences: Dental, Native (I)|skill_value_key"}, 
              {"propertykey":"Medical Sciences: General Medicine, Caitian (I)|skill_value_key"},
              {"propertykey":"Medical Sciences: General Medicine, Efrosian (I)|skill_value_key"},
              {"propertykey":"Medical Sciences: General Medicine, Gorn (I)|skill_value_key"}, 
              {"propertykey":"Medical Sciences: General Medicine, Human (I)|skill_value_key"},
              {"propertykey":"Medical Sciences: General Medicine, Native (I)|skill_value_key"},  
              {"propertykey":"Medical Sciences: General Medicine, Saurian (I)|skill_value_key"}, 
              {"propertykey":"Medical Sciences: General Medicine, Trill (I)|skill_value_key"},
              {"propertykey":"Medical Sciences: General Medicine, Xindi (I)|skill_value_key"},   
              {"propertykey":"Medical Sciences: Pathology (I)|skill_value_key"}, 
              {"propertykey":"Medical Sciences: Pharmacology (I)|skill_value_key"},
              {"propertykey":"Medical Sciences: Psychology (I)|skill_value_key"},  
              {"propertykey":"Medical Sciences: Psychology Alpha Centauran (I)|skill_value_key"}, 
              {"propertykey":"Medical Sciences: Psychology Caitian (I)|skill_value_key"},
              {"propertykey":"Medical Sciences: Surgery (I)|skill_value_key"},   
              {"propertykey":"Medical Sciences: Surgery, Dental (I)|skill_value_key"}, 
              {"propertykey":"Mining (I)|skill_value_key"},
              {"propertykey":"Physical Sciences: Alternate Time Probabilities (I)|skill_value_key"},   
              {"propertykey":"Physical Sciences: Biochemistry (I)|skill_value_key"}, 
              {"propertykey":"Physical Sciences: Chemistry (I)|skill_value_key"},
              {"propertykey":"Physical Sciences: Computer Cybernetics (I)|skill_value_key"},   
              {"propertykey":"Physical Sciences: Computer Science (I)|skill_value_key"}, 
              {"propertykey":"Physical Sciences: Dimensional Math (I)|skill_value_key"},
              {"propertykey":"Physical Sciences: Drafting (I)|skill_value_key"},   
              {"propertykey":"Physical Sciences: Electrochemical Physics (I)|skill_value_key"}, 
              {"propertykey":"Physical Sciences: Gravitics (I)|skill_value_key"},
              {"propertykey":"Physical Sciences: Hyperspacial Mathmatics (I)|skill_value_key"},  
              {"propertykey":"Physical Sciences: Mathematics (I)|skill_value_key"}, 
              {"propertykey":"Physical Sciences: Metallurgy (I)|skill_value_key"},
              {"propertykey":"Physical Sciences: Physics (I)|skill_value_key"},  
              {"propertykey":"Physical Sciences: Plasma Physics (I)|skill_value_key"}, 
              {"propertykey":"Planetary Sciences: Geology (I)|skill_value_key"},
              {"propertykey":"Planetary Sciences: Hydrology (I)|skill_value_key"},   
              {"propertykey":"Planetary Sciences: Meteorology (I)|skill_value_key"},
              {"propertykey":"Planetary Survival: Arctic (I)|skill_value_key"},  
              {"propertykey":"Planetary Survival: Desert (I)|skill_value_key"}, 
              {"propertykey":"Planetary Survival: Oceanic (I)|skill_value_key"},
              {"propertykey":"Planetary Survival: Temperate Cool (I)|skill_value_key"},  
              {"propertykey":"Planetary Survival: Temperate Warm (I)|skill_value_key"}, 
              {"propertykey":"Planetary Survival: Tropical (I)|skill_value_key"},
              {"propertykey":"Security Procedures (I)|skill_value_key"},   
              {"propertykey":"Small Equipment Systems Operations (I)|skill_value_key"}, 
              {"propertykey":"Small Unit Tactics (I)|skill_value_key"},
              {"propertykey":"Social Sciences: Andorian Culture and History (I)|skill_value_key"},   
              {"propertykey":"Social Sciences: Archaeology(I)|skill_value_key"}, 
              {"propertykey":"Social Sciences: Caitian Culture and History (I)|skill_value_key"},
              {"propertykey":"Social Sciences: Caitian Law (I)|skill_value_key"},  
              {"propertykey":"Social Sciences: Criminal Culture and History (I)|skill_value_key"},
              {"propertykey":"Social Sciences: Cygnan Culture and History (I)|skill_value_key"},   
              {"propertykey":"Social Sciences: Cygnan Law (I)|skill_value_key"}, 
              {"propertykey":"Social Sciences: Economics (I)|skill_value_key"},
              {"propertykey":"Social Sciences: Efrosian Culture and History (I)|skill_value_key"},   
              {"propertykey":"Social Sciences: Efrosian Law (I)|skill_value_key"}, 
              {"propertykey":"Social Sciences: Federation Culture and History (I)|skill_value_key"},
              {"propertykey":"Social Sciences: Federation Law (I)|skill_value_key"},   
              {"propertykey":"Social Sciences: Gorn Culture and History (I)|skill_value_key"}, 
              {"propertykey":"Social Sciences: Gorn Law (I)|skill_value_key"},
              {"propertykey":"Social Sciences: Klingon Culture and History (I)|skill_value_key"},  
              {"propertykey":"Social Sciences: Klingon Law (I)|skill_value_key"}, 
              {"propertykey":"Social Sciences: Orion Culture and History (I)|skill_value_key"},
              {"propertykey":"Social Sciences: Political Science (I)|skill_value_key"},  
              {"propertykey":"Social Sciences: Religious Doctrine (I)|skill_value_key"},
              {"propertykey":"Social Sciences: Star Fleet Regulations (I)|skill_value_key"},   
              {"propertykey":"Space Sciences: Astronomy (I)|skill_value_key"}, 
              {"propertykey":"Space Sciences: Astrophysics (I)|skill_value_key"},
              {"propertykey":"Starship Combat Strategies and Tactics(I)|skill_value_key"},   
              {"propertykey":"Starship Helm Operations (I)|skill_value_key"}, 
              {"propertykey":"Starship Sensors (I)|skill_value_key"},
              {"propertykey":"Starship Weaponry Operations (I)|skill_value_key"},  
              {"propertykey":"Surveillance (I)|skill_value_key"}, 
              {"propertykey":"Transporter Operation Procedures (I)|skill_value_key"},
              {"propertykey":"Trivia: Ancient Orion Technology (I)|skill_value_key"},  
              {"propertykey":"Trivia: Art of Seduction (I)|skill_value_key"}, 
              {"propertykey":"Trivia: Cloaking Device (I)|skill_value_key"},
              {"propertykey":"Trivia: Public Transportation Systems (I)|skill_value_key"},   
              {"propertykey":"Trivia: Way of the Fathers (I)|skill_value_key"}, 
              {"propertykey":"Value Estimation (I)|skill_value_key"},
              {"propertykey":"Vehicle Weaponry Operation (I)|skill_value_key"}    
              ]         
            }
        ]
      }
    ] 
  };
  return JSON.stringify(objActorPropertiesToDisplay);
}
   
//                                                                  
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
//                                                                  
//                        Macro generic code                        
//                                                                  
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
//         
                                                                                                                                      
function macroTitle() {
  let thismacroname=`Roll against combined average of actors values `;  
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

    table.table-properties{
      margin-top:0px;
      margin-bottom: 0px;
      border-bottom: 0px;
      border-top:0px;
      padding:0px;
    }   
    th,td,tr{
      margin-top:0px;
      margin-bottom: 0px;
      border-bottom: 0px;
      border-top:0px;
      height: 25px;
      max-height:25px;
      overflow: hidden;
    }
    th.th-property{
      text-align:left;
      padding-left:10px; 
      padding-right:5px; 
      
    }     
    td.td-property{
      text-align:left;      
    }   
     
    th.th-value{
      text-align:right;
      padding-right: 5px;
      width:60px;    
      max-width:60px;
    }               
    td.td-value{
      text-align:center;
      padding-right: 5px;
      width:60px;
      max-width:60px;
    }
    
    th.th-use{
      text-align:left;
      width:30px;    
      max-width:30px;
    }    
    td.td-use-property{ 
      text-align:center;
      width:30px;
      max-width:30px;
    }
    
    input[type="checkbox"].use-property{     
      width: 14px;
      height: 14px;
      cursor: pointer;
      margin: 0px ;
    }   
    
    td.bad-property,p.bad-property{
      color:red;
      font-weight:bold;
    }
    label.label-clickable{
      cursor:pointer;
    } 
    .property-column {
      float: left;      
      padding-left: 5px;
      padding-right: 5px;
    }   
    .actorinfo,.result-item{
      display: flex;
      align-items: center;
      float: left;
      margin-right: 10px;
      justify-content: flex-start;
      flex-wrap: nowrap;
      flex-direction: row;
      align-content: center;
    }  
    .actorinfo{
      width:200px;
      padding-bottom:3px;
      text-align: left; 
      white-space: nowrap;
    }                                                        
    fieldset.fieldset-combine{
      height:60px;
    }
    p.actorname{
      font-weight:bold;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin:0px;
      max-width: 160px;
    }
    p.actordetails{
      margin:0px;
      
    }
    span.actortype{
      font-style:italic;
    }
    #data-area{       
      height:${Setting_DataHeight()}px;
      overflow:overlay;
    }
    .actorlinkstatus{
      font-size:12px;
    }  
    button.btn-selection-actors{
      width:100px;
      margin-top: 8px;
    }
  </style> 
  
  <!--macro dialog content-->  
  <i style="display:none" id="${thisMacroName()}_btnRefresh" title="Refresh" class="fas fa-redo-alt ${thisMacroName()}_hbo" onclick="${thisMacroName()}_Main()"></i>
  <form>
  <fieldset>
    <legend>Select actors to determine the groups values from</legend>
    <div id="${thisMacroName()}_ActorList" ></div> 
    <script>
      function ${thisMacroName()}_singleQuoted(text)  {return '&quot;' + text + '&quot;';} 
      
      function ${thisMacroName()}_ActorSelection(checked=1){
        // get available actors
        const actorsavailable = document.getElementsByClassName("${thisMacroName()}_actoravailable");        
        if(actorsavailable.length>0){
          // get them
          for (let i = 0; i < actorsavailable.length; i++){
            actorsavailable[i].checked=checked;             
          }  
          ${thisMacroName()}_ActorsChange();
        }
      } 
       
      function ${thisMacroName()}_ResetStatSelection(){
        const selectedproperties = document.getElementsByClassName("use-property");
        if(selectedproperties.length>0){       
          for (let i = 0; i < selectedproperties.length; i++){ 
            selectedproperties[i].checked=0;
          } 
          ${thisMacroName()}_CalculateAverage();
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
          actor.sheet.render(true,{focus:true});
        }
      }
        
      function ${thisMacroName()}_CreateActorList(){  
        let checkOptions = ""
        let actor;
        let users; 
        
        let actorimg="icons/svg/mystery-man.svg";
        if(${Setting_UseSelectedTokensActor()}){                                 
          // build list of selected tokens
          let tokens = canvas.tokens.controlled;
          let actorlinked; 
          let actortype;
          let actorinfo;
          let actorfoldername; 
          let useCanvastokens;
          for (const token of tokens) {                         
            actorlinked='<i class="fas fa-unlink actorlinkstatus" title="Un-linked token actor"></i> ';
            actortype='<span class="actortype">GM</span>';    
            actorfoldername = token.actor.folder.data.name;
            useCanvastokens=1;
            if(token.data.actorLink){
              actorlinked='<i class="fas fa-link actorlinkstatus" title="Linked token actor"></i> ';
              useCanvastokens=1;              
            }           
            // check if actor is used by player
            users = game.users.filter(user => user.active);                        
            users.forEach(user => {           
              if (!user.isGM && user.data.character!=null){                 
                if(token.data.actorId==user.data.character){             
                  actortype='<span class="actortype">'+user.name+'</span>';
                }                
              }
            });
            actorinfo=actorfoldername +'<br>' + actortype;         
            actorimg=token.data.img;
            checkOptions+='<div class="actorinfo"><input type="checkbox" class="${thisMacroName()}_actoravailable" name="' + token.data._id +'" value="' + token.data._id +'" onclick="${thisMacroName()}_ActorsChange()" checked><img class="${thisMacroName()}_portrait_img"  src="' + actorimg +'"</img><div><p class="actorname ${thisMacroName()}_hbo" onclick="${thisMacroName()}_showSheet(' + ${thisMacroName()}_singleQuoted(token.data._id) +',' + useCanvastokens +  ');" title="'+token.name+'">'+ actorlinked + token.name +'</p><p class="actordetails">' + actorinfo  +'' + '</p></div></div>';            
          }
          
        } else {
          // create list from available players
          users = game.users.filter(user => user.active);
          // Build checkbox list for all active players
          users.forEach(user => {           
            if (!user.isGM && user.data.character!=null){             
              actor=game.actors.get(user.data.character);
              if(actor!=null){
                actorimg=actor.data.img;
              }       
              actorinfo= '<span class="actortype">'+user.name+'</span>';
              checkOptions+='<div class="actorinfo"><input type="checkbox" class="${thisMacroName()}_actoravailable" name="' + user.data.character +'" value="' + user.data.character +'" onclick="${thisMacroName()}_ActorsChange()" checked><img class="${thisMacroName()}_portrait_img"  src="' + actorimg +'"</img><div><p class="actorname" title="'+user.charname+'">' + user.charname+'</p><p class="actordetails">' + actorinfo  +'' + '</p></div></div>';
            }
          });
        } 
        // reset button
        checkOptions+=' <button type="button" class="btn-selection-actors" onclick="${thisMacroName()}_ActorSelection(1)">Select all</button>';
        checkOptions+=' <button type="button" class="btn-selection-actors" onclick="${thisMacroName()}_ActorSelection(0)">Unselect all</button>';               
        return checkOptions;        
      } 
      document.getElementById("${thisMacroName()}_ActorList").innerHTML = ${thisMacroName()}_CreateActorList();
    </script>
  </fieldset> 
  
  <fieldset>
    <legend>Combined value</legend>
    <div id="data_combined">
      <div class="result-item">
        <fieldset class="fieldset-combine">  
          <legend>Value selection mode</legend>
          <input type="radio" id="use-actors-highest" name="selected-value-mode" value="HIGHEST" onclick="${thisMacroName()}_ActorsChange()"  checked>
          <label for="use-actors-highest">Highest</label>
          <input type="radio" id="use-actors-lowest" name="selected-value-mode" value="LOWEST" onclick="${thisMacroName()}_ActorsChange()">
          <label for="use-actors-lowest">Lowest</label>
        </fieldset>
      </div> 
      
      <div class="result-item">
        <fieldset class="fieldset-combine">  
          <legend>Success evaluation mode</legend>
          <input type="radio" id="success-on-lower" name="success-evaluation-mode" value="LOWER" >
          <label for="success-on-lower">&#60;</label>
          <input type="radio" id="success-on-lower-and-equal" name="success-evaluation-mode" value="LOWERANDEQUAL"  checked>
          <label for="success-on-lower-and-equal">&#60;=</label>
           
          <input type="radio" id="success-on-higher-and-equal" name="success-evaluation-mode" value="HIGHERANDEQUAL">
          <label for="success-on-higher-and-equal">&#62;=</label>  
          <input type="radio" id="success-on-higher" name="success-evaluation-mode" value="HIGHER" >
          <label for="success-on-higher">&#62;</label>
        </fieldset>
      </div>
           
      <div class="result-item">         
        <fieldset class="fieldset-combine">  
          <legend>Calculated average</legend>
          <input type="number" style="max-width:65px;" id="calculated-average" name="calculated-average" disabled> 
        </fieldset>
      </div>
      <div class="result-item">     
        <fieldset class="fieldset-combine">  
          <legend>Dice expression</legend>
          <input type="text" style="max-width:80px;" id="dice-expression" name="dice-expression" value="" > <i class="fas fa-dice-d20" title="Roll against calculated average" onclick="${thisMacroName()}_Roll()" ></i>
        </fieldset>
      </div> 
       
                     
      <script>
        document.getElementById('dice-expression').value='${Setting_DiceToRoll()}';
      </script>              
    </div> 
  </fieldset>
  <fieldset id="data-area">
    <legend class="${thisMacroName()}_hbo" onclick="${thisMacroName()}_ResetStatSelection();">Select stat/skills to calculate average from(Click this to reset selection)</legend>
    <div id="data-content"></div> 
  </fieldset>
  
  
  </form> 
    
  <!--macro dialog scripts-->     
  <script>
   // support functions    
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
    //
    
    async function ${thisMacroName()}_Roll() {
      // get dice  
      let dieroll=document.getElementById('dice-expression').value;
      let targetnumber=parseInt(document.getElementById('calculated-average').value);
      const roll = await new Roll(dieroll).evaluate({async: true});                  
      let rollresult= roll.total;
      let succeslevel;
      let iscrit=false;
      let isfumble=false;
      let bSuccess=false;
      // get success evaluation mode
      let sEvaluationMode=$('input[name="success-evaluation-mode"]:checked').val(); 
      let sEvaluationSign='';
      switch(sEvaluationMode){
        case 'HIGHER': 
          sEvaluationSign='>';
          if(rollresult>targetnumber){
            bSuccess=true;
          }
          break;
        case 'HIGHERANDEQUAL':
          sEvaluationSign='>=';
          if(rollresult>=targetnumber){
            bSuccess=true;
          }
          break;
        case 'LOWER':
          sEvaluationSign='<';
          if(rollresult<targetnumber){
            bSuccess=true;
          }
          break;
        default: 
          //LOWERANDEQUAL   
          sEvaluationSign='<=';
          if(rollresult<=targetnumber){
            bSuccess=true;
          } 
          break;
      }
                   
      if(bSuccess){
        // success
        succeslevel='SUCCESS';
        iscrit=true;
      } else{
        // fail
        succeslevel='FAILURE'; 
        isfumble=true;
      }
      
      let displayname;
      let displayimage;
      
      
      displayname = game.user.charname; //  use for player character name, 
      if(displayname==null || displayname==''){
        displayname = game.user.name;     //  use for player name,
      }
               
      let actor=game.actors.get(game.user.data.character);
      if(actor!=null) {
        displayimage=actor.data.img;
      } else {
        displayimage=game.user.avatar
      }
      
      let rollData = {
          token: {
              img: displayimage,
              name: "Combined Roll"
          },          
          actor: displayname, 
          flavor: "Combined roll vs " + sEvaluationSign +" target " + targetnumber,
          formula: roll.formula,
          mod: 0,
          result: roll.total,
          dice: roll.dice,
          user: game.user.name,
          iscrit: iscrit,
          isfumble: isfumble, 
          conditional:   succeslevel
      };

      let blindmode=false;    
      let rolltype = document.getElementsByClassName("roll-type-select");
      let rtypevalue = rolltype[0].value; 
      let rvalue = CONST.CHAT_MESSAGE_TYPES.OTHER;
      switch(rtypevalue){      //roll, gmroll,blindroll,selfroll
        case CONST.DICE_ROLL_MODES.PUBLIC:
          break;
        case CONST.DICE_ROLL_MODES.PRIVATE:
          rvalue = 1;
          break;
        case CONST.DICE_ROLL_MODES.BLIND:
          rvalue = 1;
          blindmode=true; 
          break;
        case CONST.DICE_ROLL_MODES.SELF:    
          break;
        default:    
      } 
      
      renderTemplate("systems/sandbox/templates/dice.html", rollData).then(html => {
        let messageData ={
          content: html,
          type:rvalue,
          blind:blindmode
        };
        if(rtypevalue==CONST.DICE_ROLL_MODES.PRIVATE || rtypevalue==CONST.DICE_ROLL_MODES.BLIND ){
          messageData.whisper = ChatMessage.getWhisperRecipients('GM');
        } 
        else if(rtypevalue==CONST.DICE_ROLL_MODES.SELF){
          // whisper to self  
          messageData.whisper = ChatMessage.getWhisperRecipients(game.user.name);
        }           
        let newmessage = ChatMessage.create(messageData);
      });
    }
    
    function ${thisMacroName()}_buildTable(){
      let sHtml='';        
      let arrProperties = JSON.parse('${Setting_ActorProperties()}');
      let propertyitem; 
      let selectedvalue='';
      let propertykey='';
      let iscitem=false; 
      let citem;
      let citemname='';
      let citemproperty='';
      let tag='';
      let itemok=false;
      try{                                                                    
        for (let icol = 0; icol < arrProperties.columns.length; icol++){
          sHtml += '<div class="property-column" style="width:'+ (1/arrProperties.columns.length)*100 +'%;" id="' + arrProperties.columns[icol].columntag +'">'
          // get this column propertygroups
          for (let igroup = 0; igroup < arrProperties.columns[icol].propertygroups.length; igroup++){
            //sHtml += '<p>' + arrProperties.columns[icol].propertygroups[igroup].propertygrouptag +'</p>'
            // this groups properties
            sHtml+='<table class="table-properties"><thead><tr class="tr-header"><th colspan=2 class="th-property">'+ arrProperties.columns[icol].propertygroups[igroup].propertygrouptag + '</th><th class="th-value">Value</th></tr></thead>';
            for (let iproperty = 0; iproperty < arrProperties.columns[icol].propertygroups[igroup].properties.length; iproperty++){
              //sHtml += '<p>' + arrProperties.columns[icol].propertygroups[igroup].properties[iproperty].propertykey +'</p>'
              propertykey=arrProperties.columns[icol].propertygroups[igroup].properties[iproperty].propertykey; 
              itemok=false;
              // check if citem(look for |)
              iscitem=false;              
              if (propertykey.indexOf('|')>-1){          
                iscitem=true;                                                 
              }
                                          
              if (!iscitem) {
                // property
                propertyitem=game.items.find(y=>y.type=="property" && y.data.data.attKey==propertykey);                 
                if(propertyitem!=null){ 
                  // check datatype
                  if(propertyitem.data.data.datatype=='simplenumeric'){                             
                    tag=propertyitem.data.data.tag;
                    itemok=true; 
                  }                
                }
              } else  {
                // citem                  
                citemname=${thisMacroName()}_splitString(propertykey,'|',0);
                citemproperty=${thisMacroName()}_splitString(propertykey,'|',1);
                // find the citem     
                citem=game.items.find(y=>y.data.type=="cItem" && y.data.name==citemname);
                if(citem!=null){
                  // citem exists                
                  // get the tag from the property
                  propertyitem = game.items.find(y=>y.type=="property" && y.data.data.attKey==citemproperty);
                  if(propertyitem!=null){ 
                    if(propertyitem.data.data.datatype=='simplenumeric'){ 
                      tag=citemname ;//+ '-' + propertyitem.data.data.tag;
                      itemok=true;
                    }
                  } 
                }                
              }
               
              if(itemok){
                sHtml+='<tr>';
                sHtml+='<td class="td-use-property"><input class="use-property" type="checkbox" id="use-property-'+ propertykey +'" value="'+ propertykey +'" onclick="${thisMacroName()}_CalculateAverage()"></td>';
                sHtml+='<td class="td-property"><label class="label-clickable" for="use-property-'+ propertykey +'">' + tag +'</label></td>';          
                // close tag
                sHtml+='<td class="td-value" id="selected-value-'+ propertykey +'" data-propertykey="'+ propertykey +'">' + selectedvalue +'</td></tr>'
              } else{
                // property/citem does not exists
                sHtml+='<tr><td class="bad-property">BAD</td><td class="td-property bad-property">'+ propertykey +'</td><td class="bad-property">BAD</td></tr>';              
              } 
            } 
            sHtml+='</table>';
          } 
          sHtml+='</div>';
        }
        document.getElementById('data-content').innerHTML=sHtml;
      }
      catch(err){     
        console.error("Error in macro function ${thisMacroName()}_buildTable()");   
        console.error(err) ;
        document.getElementById('data-content').innerHTML='<p class="bad-property">ERROR!</p>';
      }      
    }    
        
    // Main function
    function ${thisMacroName()}_Main(){ 
     //console.log("${thisMacroName()}_Main()");
     ${thisMacroName()}_buildTable(); 
     ${thisMacroName()}_GetValuesFromActors();
    }
            
    function  ${thisMacroName()}_ActorsChange(){
      ${thisMacroName()}_GetValuesFromActors();
      ${thisMacroName()}_CalculateAverage();
    }
    
    function ${thisMacroName()}_GetValuesFromActors(){ 
      // get option
      let bUseHighest=true;
      let iscitem=false;
      let citemname='';
      let citemproperty='';
      let citem;  
      let sSelectionMode=$('input[name="selected-value-mode"]:checked').val();
      if (sSelectionMode=='HIGHEST'){
        bUseHighest=true;
      } else {
        bUseHighest=false;
      }
      // get available actors
      const actorsavailable = document.getElementsByClassName("${thisMacroName()}_actoravailable");
      // create a array of actors       
      let selectedactors=[]; 
      let actor; 
      let token; 
      if(actorsavailable.length>0){
        // get them
        for (let i = 0; i < actorsavailable.length; i++){
          if(actorsavailable[i].checked){ 
            if(${Setting_UseSelectedTokensActor()}){
              token = canvas.tokens.placeables.find(y=>y.id==actorsavailable[i].value);
              if(token!=null){                                          
                actor=token.actor;
              } else {
                ui.notifications.warn('Token not found');
              } 
            } else {                       
              actor=game.actors.get(actorsavailable[i].value);
            }
            if(actor!=null){
              //  
              selectedactors.push(actor);
            } else {
              ui.notifications.warn('Actor not found');
            }
            
          }
        }
        // get all selected value elements                
        let eAllSelected=document.getElementsByClassName("td-value");
        if(eAllSelected.length>0){      
          let propertykey=''; 
          let selectedvalue=''; 
          
          for (let i = 0; i < eAllSelected.length; i++){
            selectedvalue='';
            // get the key(stored in data-propertykey)
            propertykey=eAllSelected[i].dataset.propertykey; 
            iscitem=false;              
            if (propertykey.indexOf('|')>-1){          
              iscitem=true;
                                                               
            }            
            // now get the value from the actors
            for (let i = 0; i < selectedactors.length; i++){ 
            
              if(!iscitem){                       
                // make sure that the actor has the property
                if (selectedactors[i].data.data.attributes.hasOwnProperty(propertykey)) {
                  if(selectedvalue==''){
                    selectedvalue=selectedactors[i].data.data.attributes[propertykey].value;
                  } else{                     
                    if(bUseHighest){
                      // use higher         
                      if (parseInt(selectedvalue)<selectedactors[i].data.data.attributes[propertykey].value){
                       selectedvalue=selectedactors[i].data.data.attributes[propertykey].value;
                      }   
                    } else{             
                      // use lower
                      if (!parseInt(selectedvalue)<selectedactors[i].data.data.attributes[propertykey].value){
                       selectedvalue=selectedactors[i].data.data.attributes[propertykey].value;
                      }
                    }  
                  }
                }
              } else{   
                
                // citem , get the parts
                citemname=${thisMacroName()}_splitString(propertykey,'|',0);                 
                citemproperty=${thisMacroName()}_splitString(propertykey,'|',1);
                // check that actor has this citem
                citem = selectedactors[i].data.data.citems.find(y=>y.name == citemname);
                if(citem!=null){   
                  // actor has this citem
                  //console.log(selectedactors[i].data.name + ' have ' + citemname );
                  if(citem.attributes.hasOwnProperty(citemproperty)) {
                    // citem.attributes[citempropKey].value;
                    if(selectedvalue==''){
                       selectedvalue=citem.attributes[citemproperty].value;
                    } else{
                      if(bUseHighest){
                        // use higher         
                        if (parseInt(selectedvalue)<citem.attributes[citemproperty].value){
                         selectedvalue=citem.attributes[citemproperty].value;
                        }   
                      } else{             
                        // use lower
                        if (!parseInt(selectedvalue)<citem.attributes[citemproperty].value){
                         selectedvalue=citem.attributes[citemproperty].value;
                        }
                      }
                    }
                  }
                }                  
                
                
              }
            }
            eAllSelected[i].innerText=selectedvalue;
          }
        }
      }
    }
    
    function ${thisMacroName()}_CalculateAverage(){       
      const selectedproperties = document.getElementsByClassName("use-property");
       if(selectedproperties.length>0){
        // get them
        
        let eSelectedValue;
        let combinedsum=0;
        let combinedcount=0;
        let combinedaverage=0; 
       
        for (let i = 0; i < selectedproperties.length; i++){
          if(selectedproperties[i].checked){                          
            // get the value
            eSelectedValue=document.getElementById("selected-value-"+ selectedproperties[i].value);
            if (eSelectedValue!=null){ 
              if(eSelectedValue.innerText!=''){
                combinedcount+=1;
                combinedsum += parseInt(eSelectedValue.innerText) || 0;
              }
            }
          }
        }  
        if(combinedcount>0){           
          combinedaverage= Math.round(combinedsum / combinedcount);
        }
        document.getElementById('calculated-average').value=combinedaverage;
      } 
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
            //elem.onclick.apply(elem);
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
    d.options.height=Setting_FormHeight();
    d.position.height=Setting_FormHeight();
    d.options.resizable=true;
    d.render(true);        
  }
