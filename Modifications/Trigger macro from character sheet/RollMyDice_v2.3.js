// **************************************************************** 
// Macro:         RollMyDice     
//   Macro for generating a dialog with UI for rolling on Foundry Tables
//   Can be used without the trigger macro modification
//   Can use arguments for trigger macro from Sandbox character sheet                   
// ================================================================ 
// Date       Version  Author               Description             
// ---------- -------- -------------------- -----------------------
// 2021-08-23 1.0.0    Ramses800            Macro created
// 2021-08-25 2.0.0    Ramses800
// 2021-08-25 2.1.0    Ramses800            
// 2021-08-25 2.2.0    Ramses800            Changed to simple configuring              
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
// {"rollname":"#{name}","D4":#{D4},"D6":#{D6},"D8":#{D8}} 

//                                                                  
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
//                                                                  
//                        Macro code                        
//                                                                  
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
// 
let macroname=this.data.name;
let rollname='';

// get arguments from user flag with this macro´s name
let args=await game.user.getFlag('world',macroname);  
if (args!=null){
  rollname=GetArguments(args,'rollname','string');      
}

async function BuildTableUIs(){
  let sTablesUI='';        
  // for each configured table  
  objRollTables.forEach(function(table){  
    // check for any supplied arguments 
    if (args!=null){  
      table.defaultnrofdice = GetArguments(args,table.tablename);
    } 
    sTablesUI += BuildFieldSet(table.tablename,table.defaultnrofdice)       
  });         
  // reset arguments(unset flag)
  await game.user.unsetFlag('world',macroname);       
  return sTablesUI;
}

function BuildFieldSet(sTableName,defaultvalue=0){
  let sFieldset=`
    <fieldset style="text-align:left;"><legend style="text-align:left;">` + game.tables.getName(sTableName).data.name + `</legend>
      <img src="` + game.tables.getName(sTableName).data.img + `" style="height:26px;vertical-align: bottom;" title="` + game.tables.getName(sTableName).data.description + `"> <input class="spinner" style="width:48px;" type="number" min="0" name="` + sTableName + `" value="`+ defaultvalue +`">
    </fieldset>
  `;
  return sFieldset;
}

function GetArguments(objArguments,sArgumentName,sArgumentType="number"){
  if (objArguments.hasOwnProperty(sArgumentName)){
    return objArguments[sArgumentName];
  }                              
  else{ 
    if (sArgumentType=="number"){
      return 0;
    }
    else{
      return '';
    }
  }
}


let html_content=`
  <style>   
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
  <p>` + rollname + `</p>  
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
            baseMessage +='<span style="position: relative; text-align: center; color: black;font-weight:bold; padding: 1px;"><img src="' + roll.results[0].data.img +'" style="height:48px;margin-top:8px;margin-bottom:4px;" ><div style="position: absolute; left: 50%; transform: translate(0%, -50%);">' + roll.results[0].data.text + '</div></span>';
          }
          return baseMessage;
        }                     
        let baseMessage = '<div style="    font-family: Tahoma, sans-serif;    font-weight: bold;    font-style: italic;    font-size: 12px;    text-align: center;    width: 100%;    margin-top: -10px;">' + rollname + '</div>';        
        // make the rolls for configured tables
        for (let i = 0, l = objRollTables.length; i < l; i++) {                    
          baseMessage +=await RollOnTable(objRollTables[i].tablename);
        }
        
                                                                
        // wrap the final message
        let finalMessage = "<div>" + baseMessage + "</div>"
        // Play a dice sound... optional and will need to download a wav file with the sound and specifiy location.
        //AudioHelper.play({src: "worlds/simpleworld/dice.wav", volume: 0.8, autoplay: true, loop: false}, true);
        // Finally send the output to the chat window.
        ChatMessage.create({ content: finalMessage });
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