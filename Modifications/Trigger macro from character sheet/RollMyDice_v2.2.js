// Macro for demonstrating trigger macro from Sandbox character sheet
// rolls are made from Foundry Tables
// this macro requires 3 tables(D4,D6,D8)

// Example JSON(to be entered in the rollable propertys Roll ID)
// {"rollname":"#{name}","D4":#{D4},"D6":#{D6},"D8":#{D8}} 

function BuildFieldSet(sTableName,defaultvalue=0){
  let sFieldset=`
    <fieldset style="text-align:left;"><legend style="text-align:left;">` + game.tables.getName(sTableName).data.name + `</legend>
      <img src="` + game.tables.getName(sTableName).data.img + `" style="height:26px;vertical-align: bottom;"> <input class="spinner" style="width:48px;" type="number" min="0" name="` + sTableName + `" value="`+ defaultvalue +`">
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
let macroname=this.data.name;
// get arguments from user flag with this macro´s name
let args=game.user.getFlag('world',macroname);
console.log('Args are:');
console.log(args);

let rollname='';
let d4=0;
let d6=0;
let d8=0;
if (args!=null){
  rollname=GetArguments(args,'rollname','string');
  d4=GetArguments(args,'D4');
  d6=GetArguments(args,'D6');
  d8=GetArguments(args,'D8');  
  // reset arguments(unset flag)
  await game.user.unsetFlag('world',macroname); 
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
    `+ BuildFieldSet("D4",d4)+ BuildFieldSet("D6",d6)+ BuildFieldSet("D8",d8) + `
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
                                     
        baseMessage +=await RollOnTable("D4");
        baseMessage +=await RollOnTable("D6");
        baseMessage +=await RollOnTable("D8");
                 
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