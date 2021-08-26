// **************************************************************** 
// Macro:         RollMyDice     
//   Macro for generating a dialog with UI for rolling on Foundry Tables
//   Can be used without the trigger macro modification
//   Can use arguments for trigger macro from Sandbox character sheet
// 
//   Please use a custom css for the class roll-result to make the resulting caht window big enough
//    /* Custom CSS */
//  .roll-result{height:10%;}
//                   
// ================================================================ 
// Date       Version  Author               Description             
// ---------- -------- -------------------- -----------------------
// 2021-08-23 1.0.0    Ramses800            Macro created
// 2021-08-25 2.0.0    Ramses800
// 2021-08-25 2.1.0    Ramses800            
// 2021-08-25 2.2.0    Ramses800            
// 2021-08-25 2.3.0    Ramses800            Changed to simple configuring
// 2021-08-25 2.3.1    Ramses800            Minor fix
// 2021-08-25 2.3.2    Ramses800            Chat modes                     
// ****************************************************************   

//                                                                  
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
//                                                                  
//                     Settings for this macro                      
//                                                                  
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
// 
// Configure tables to use.
let objRollTables = [
{"tablename":"D4","defaultnrofdice":0},
{"tablename":"D6","defaultnrofdice":0},
{"tablename":"D8","defaultnrofdice":0}
];

// To pass arguments with the Trigger Macro modification
// In a rollable property set the fields
// Roll Name: <the name of the macro> Example RollMyDice
// Roll Formula: ~macro~
// Roll ID: <JSON string with parameters to pass
// Example JSON
// {"rollname":"#{name}","D4":"#{D4}","D6":"#{D6}","D8":"#{D8}"}

//                                                                  
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
//                                                                  
//                        Macro code                        
//                                                                  
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
// 

let thismacro_macroname=this.data.name;
let thismacro_arg_rollname='';
let thismacro_arg_actorid='';
let thismacro_arg_actorlink='';
let thismacro_arg_speaker_name='';
let thismacro_arg_speaker_img='';

function GetArguments(objArguments,sArgumentName,defaultvalue){
  if (objArguments.hasOwnProperty(sArgumentName)){
    return objArguments[sArgumentName];
  }                              
  else{ 
    return defaultvalue; 
  }
}

// get arguments from user flag with this macro´s name
let thismacro_args=await game.user.getFlag('world',thismacro_macroname);  
if (thismacro_args!=null){
  thismacro_arg_rollname=GetArguments(thismacro_args,'rollname','');
  let actorId=GetArguments(thismacro_args,'actorId','');
  let actorLink=GetArguments(thismacro_args,'actorLink',false);
  if (actorLink==true){
    // use actor
    let objactor = game.actors.get(actorId);
    if(objactor!=null){
      thismacro_arg_speaker_img=objactor.data.img;
      thismacro_arg_speaker_name=objactor.name;         
    }
  }
  else{               
    // unlinked token, try to find it from controlled tokens on the current scene       
    let objtoken = canvas.tokens.controlled.find(y=>y.data.actorId==actorId);
    if(objtoken!=null){
      thismacro_arg_speaker_img=objtoken.data.img;
      thismacro_arg_speaker_name=objtoken.data.name;
    }
  }      
}

async function BuildTableUIs(){
  let sTablesUI='';        
  // for each configured table  
  objRollTables.forEach(function(table){  
    // check for any supplied arguments 
    if (thismacro_args!=null){  
      table.defaultnrofdice = GetArguments(thismacro_args,table.tablename,0);
    } 
    sTablesUI += BuildFieldSet(table.tablename,table.defaultnrofdice)       
  });         
  // reset arguments(unset flag)
  await game.user.unsetFlag('world',thismacro_macroname);       
  return sTablesUI;
}

function BuildFieldSet(sTableName,defaultvalue=0){
  let sFieldset=`
    <fieldset style="text-align:left;"><legend style="text-align:left;">` + game.tables.getName(sTableName).data.name + `</legend>
      <img src="` + game.tables.getName(sTableName).data.img + `" style="height:26px;vertical-align: bottom;border:0px;" title="` + game.tables.getName(sTableName).data.description + `"> <input class="spinner" style="width:48px;" type="number" min="0" name="` + sTableName + `" value="`+ defaultvalue +`">
    </fieldset>
  `;
  return sFieldset;
}

let html_content=`
  <style>
    .spinner{
      margin-left:10px !important;      
    }   
    .spinner::-webkit-inner-spin-button, 
    .spinner::-webkit-outer-spin-button {  
      opacity: 1; 
      margin:-2px;
	    height:26px;
      -webkit-appearance: textfield ;
    }     
    .spinner:hover::-webkit-inner-spin-button,
    .spinner:hover::-webkit-outer-spin-button,
    .spinner:focus::-webkit-inner-spin-button,
    .spinner:focus::-webkit-outer-spin-button  {
      opacity: 1 !important;
      cursor:pointer;
	    -webkit-appearance: textfield ;
  }
  </style>
  <form> 
  <p>` + thismacro_arg_rollname + `</p>  
    `+ await BuildTableUIs() + `
  </form>`;

let d = new Dialog( {
  title: 'Roll My Dice',
  content: html_content,
  buttons: {
    no: {
      label: 'Cancel'
    },
    yes: {
      label: 'Roll',
      callback: async (html) => { 
        async function RollOnTable(sTableName,nrOfRolls){ 
          let baseMessage = '';    
          let roll; 
          let baseTable=game.tables.getName(sTableName);
          // get the input in the text field.  name is the name attribute for the input element above
          let baseInput = html.find('[name="' + sTableName +  '"]').val();          
          // loop the number of dice entered in the input box       
          for (let i = 0; i < baseInput; i++)
          {
            // roll against the rollable table                            
            roll = await baseTable.roll({async:true});                     
            // add to the message the image of the entry and a debug of the text message
            baseMessage +='<span style="position: relative; text-align: center; color: black;font-weight:bold; padding: 1px;"><img src="' + roll.results[0].data.img +'" style="height:48px;margin-top:8px;margin-bottom:4px;" ><div style="font-family: Signika, sans-serif;font-size:14px !important;position: absolute; left: 50%; transform: translate(0%, -50%);">' + roll.results[0].data.text + '</div></span>';
          }
          return baseMessage;
        }    
        let baseMessage = '<div><style>.roll-result{height:10% !important}</style></div><div><script>console.log("ss");</script></div>';                 
        // sbmessage version
        //baseMessage = '<div style="    font-family: Tahoma, sans-serif;    font-weight: bold;    font-style: italic;    font-size: 12px;    text-align: center;    width: 100%;    margin-top: -10px;">' + thismacro_arg_rollname + '</div>';        
        // dice template version
        //baseMessage = '';
        
        // make the rolls for configured tables
        for (let i = 0, l = objRollTables.length; i < l; i++) {                    
          baseMessage +=await RollOnTable(objRollTables[i].tablename);
        }
        
                                                                
        // wrap the final message
        let finalMessage = "<div>" + baseMessage + "</div>"
        // Play a dice sound... optional and will need to download a wav file with the sound and specifiy location.
        //AudioHelper.play({src: "worlds/simpleworld/dice.wav", volume: 0.8, autoplay: true, loop: false}, true);
        // 
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
        let msgimg=thismacro_arg_speaker_img;     
        let msgname=thismacro_arg_speaker_name;
        if (msgname==''){
          // user triggered macro directly with no arguments
          if(game.user.character!=null){          
            msgname= game.user.character.data.name;
          }
          else{                       
            msgname= game.user.name;
          }
        }
        
        if (msgimg==''){
          // user triggered macro directly with no arguments
          if(game.user.character!=null){          
            msgimg = game.user.character.data.img;
          }
          else{                       
            msgimg = game.user.avatar; 
          }
        }   
        
        
        let flavortext=thismacro_arg_rollname;
        let rollData = {
          token:{
            img:msgimg,
            name:msgname
          },
          actor:msgname,
          flavor: flavortext ,
          formula: '',
          mod: '',
          result: finalMessage,
          user: game.user.name,
          conditional:   '',
          iscrit: false,
          isfumble: false,
          blind: blindmode
        };  

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
    }
  },
  default: 'yes',
  close: () => {},
  
});
d.options.width = 0;
d.position.width = 0;
//d.options.resizable=true;
d.render(true); 