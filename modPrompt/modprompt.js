  export async function modPrompt(rollname){
    let dialog=new Promise((resolve,reject)=>{
      new Dialog({
        title: 'Roll modifier',
        content: '<label style="padding-right:12px;" for="modPromptValue" >' + rollname + '</label><input style="width:64px" id="modPromptValue" name="modPromptValue" value="0" type="number"><hr>',
        buttons: {
          ok: {
            icon:'<i class ="fas fa-check"></i>',
            label: "Ok",            
            callback: (html) => {
              let value = html.find('input[name=modPromptValue]').val();
              resolve(value);
            }
          },
          cancel: { 
            icon:'<i class ="fas fa-times"></i>',
            label: "Cancel",            
            callback: (html) => {              
              resolve(-999999);
            }
          }
        },
        default: "ok",
        close:  html => {                            
        }   
      }).render(true);             
    });    
    console.log(rollname);
    let modpromptvalue=await dialog;  
    if (modpromptvalue==-999999){
      throw new Error("User aborted roll by clicking Cancel button.");
    }
    return modpromptvalue;
  }
   
