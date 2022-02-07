// NOTES ON USING THIS
// The user(player) needs relevant permissions to access the macro and item. 
let journalfoldername="Item Journals";  // this folder must exist in Journals

await ShowItemJournalEntry(journalfoldername);


// **************************************************************** 
// Function:            ShowItemJournalEntry
// Version Compability: Tested with
//                      Sandbox 0.12.2 | Foundry 9.249
// Description:         Shows journal entry for item(journal entry 
//                      with same name as the item)
// Parameters:          journalfoldername
//                      bShowJournalTextInChat
//                        - true(default) to display journal content in chat,
//                        - false to display journal entry
//                      bDisplayPrivate
//                        - true to only show chat message for invoking user
//                        - false(default) to diaply chat for all players            
// ================================================================ 
// Date       Version  Author               Description             
// ---------- -------- -------------------- -----------------------
// 2022-02-07 1.0.0    Ramses800            Macro created                          
// ****************************************************************  
async function ShowItemJournalEntry(journalfoldername,bShowJournalTextInChat=true,bDisplayPrivate=false){  
  let callingitem=GetCallingItem(event);
  if(callingitem!=null){
    console.log(callingitem.name);    
    let journalname=callingitem.name;
    let img=callingitem.img;
    let journalfolder=game.folders.getName(journalfoldername);
    if(journalfolder!=null){
      let folderid=journalfolder.id;
      let journal = game.journal.getName(journalname);
      // if not exists, create it
      if (journal==null) {
        let createjournalentry=await _confirmDialog('No journal entry found for item ' + journalname,'Do you want to create a new journal entry for this item?');
        if (createjournalentry){    
          journal= await JournalEntry.create({        
              img,
              name: journalname, 
              folder: folderid
          });
          // if the journal has ben created, show it          
          if (journal!=null){
            journal.sheet.rendered ? journal.sheet.close() : journal.sheet.render(true);
          }
        }
      } else{
        // journal exists
        if(bShowJournalTextInChat) {
          // get the text
          let messageData={
            user: game.user._id,
            speaker: ChatMessage.getSpeaker({token: actor}),
            content: journal.data.content
          }    
          if(bDisplayPrivate){
            messageData.whisper = ChatMessage.getWhisperRecipients(game.user.name);
          }
          ChatMessage.create(messageData);
        } else{
          // show journal entry
          journal.sheet.rendered ? journal.sheet.close() : journal.sheet.render(true);
        }
      }       
    } else{
      // journal folder does not exists
      ui.notifications.warn('The journal folder ' + journalfoldername + ' does not exists.' ); 
    }
  } else{
    ui.notifications.error('Error getting item' );
  }
}

// **************************************************************** 
// Function:            GetCallingItem
// Version Compability: Tested with
//                      Sandbox 0.12.2 | Foundry 9.249
// Parameters:          event            
// Return:              Returns the item that called this macro
//                      If no item found, it returns null. 
//                      This means generally that the macro have 
//                      been run from the hot bar
// ================================================================ 
// Date       Version  Author               Description             
// ---------- -------- -------------------- -----------------------
// 2022-02-07 1.0.0    Ramses800            Macro created                          
// ****************************************************************  
function GetCallingItem(event) {
  let returnitem;
  let itemid = '';
  let cp = event.composedPath();
 
  for (let key in cp) {
    if (cp.hasOwnProperty(key)) {
      if ((typeof (cp[key]) !== "undefined" && cp[key] !== null)) {
        if ((typeof (cp[key].classList) !== "undefined" && cp[key].classList !== null)) {         
          if (cp[key].classList.contains('sandbox') && cp[key].classList.contains('sheet') && cp[key].classList.contains('item')) {
            //console.log(cp[key].id);  // item-c4HDkU3DD5FvJvOX
            // get the id from the div
            itemid = cp[key].id.substring(5);  // length of 'item-'                                                              
            returnitem = game.items.get(itemid);            
            // exit for loop
            break;
          }
        }
      }
    }
  }
  return returnitem;
}

// **************************************************************** 
// Function:            _confirmDialog
// Version Compability: Tested with
//                      Sandbox 0.12.2 | Foundry 9.249
// Description:         Prompts user to confirm answer
// Parameters:          title,question            
// Return:              Returns true or false
// ================================================================ 
// Date       Version  Author               Description             
// ---------- -------- -------------------- -----------------------
// 2022-02-07 1.0.0    Ramses800            Macro created                          
// ****************************************************************
async function _confirmDialog(sTitle,sQuestion,trueanswertext='Ok',falseanswertext='Cancel'){
  let dialog=new Promise((resolve,reject)=>{
    new Dialog({
      title: sTitle,
      content: '<p>' + sQuestion + '</p>' ,
      buttons: {
        ok: {
          icon:'<i class ="fas fa-check"></i>',
          label: trueanswertext,            
          callback: () => {resolve(true)}
        },
        cancel: { 
          icon:'<i class ="fas fa-times"></i>',
          label: falseanswertext,            
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