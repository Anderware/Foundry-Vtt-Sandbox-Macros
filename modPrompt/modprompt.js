  export async function modPrompt(rollname){
    let dialog=new Promise((resolve,reject)=>{
      new Dialog({
        title: 'Roll modifier',
        content: '<label style="padding-right:12px;" for="modPromptValue" >' + rollname + '</label><input style="width:64px" id="modPromptValue" name="modPromptValue" value="0" type="number"><hr>',
        buttons: {
          ok: {
            label: "Ok",            
            callback: (html) => {
              let value = html.find('input[name=modPromptValue]').val();
              resolve(value);
            }
          }
        },
        default: "ok",
        close:  html => {              
              resolve(0);
              }   
      }).render(true);             
    });    
    console.log(rollname);
    let modpromptvalue=await dialog;
    return modpromptvalue;
  }
   
