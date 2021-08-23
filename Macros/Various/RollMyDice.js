// Simple script to roll dice using a rollable table in FoundryVTT and displays the images.
function Setting_Tablename(){return "My Dice"};  // Replace text with the name of your table.
let d = new Dialog( {
  title: 'Roll My Dice',
  content: 
    '<form>    <input type="text" name="baseinput" placeholder="Number of Dice">    </form>'
    ,
  buttons: {
    no: {
      label: 'Cancel'
    },
    yes: {
      label: 'Roll',
      callback: async (html) => {              
        // get the input in the text field.  name is the name attribute for the input element above
        let baseInput = html.find('[name="baseinput"]').val();
        // Our ultimate chat message starts empty.
        let baseMessage = "";
        // loop the number of dice entered in the input box
        let roll;       
        let baseTable=game.tables.getName(`${Setting_Tablename()}`); 
        for (let i = 0; i < baseInput; i++)
        {
          // roll against the rollable table                            
          roll = await baseTable.roll({async:true});                     
          // add to the message the image of the entry and a debug of the text message
          baseMessage += '<span style="position: relative; text-align: center; color: red; padding: 1px;"><img src="' + roll.results[0].data.img +'" ><div style="position: absolute; left: 50%; transform: translate(0%, -50%);">' + roll.results[0].text + '</div></span>';
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
  close: () => {}
}).render(true);