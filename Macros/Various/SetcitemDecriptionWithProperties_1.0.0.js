// **************************************************************** 
// Macro:             : SetcitemDecriptionWithProperties      
// Version Compability: Tested with
//                      Sandbox 0.13.4 | Foundry 9.269                  
// ================================================================ 
// Date       Version  Author               Description             
// ---------- -------- -------------------- -----------------------
// 2022-06-27 1.0.0    Ramses800            Macro created 
// ****************************************************************   

let d = Dialog.confirm({
 title: "User confirmation",
 content: "<p>This will OVERWRITE citems current description with a table of selected citem properties.</p> Do you want to continue?",
 yes: () => SetcitemDecriptionWithProperties(), 
 defaultYes: false
});

async function SetcitemDecriptionWithProperties(){
 let filtergroup=['GROUP_ITEMS']; // array of strings
  // filter the citems from all items in db
  let citems=game.items.filter(function(item){ 
    // only return cItems
    if(item.type=='cItem'){
      return item.data.data.groups.find(function(group){
        return filtergroup.includes(group.name); // use group.ikey to look for group key
      });  
    }
  });

  if (citems!=null){           
    citems.forEach(function(citem){
      let objUpdateData = {}; 
      let sDescription;   
      // compose content from citem attributes 
      sDescription='<table>'
      sDescription+='<thead><tr><th style="text-align:left;">Property</th><th style="text-align:left;">Value</th></thead><tbody>'
      // --------------------------------------
      // add whatever citem properties you want
      sDescription+= GetProperty(citem,'NUM_ITEMWEIGHT'); // the second argument is the key of the property
      
      // ----------      
      // close table
      sDescription+='</tbody></table>'             
      objUpdateData['data.description']= sDescription; 
      UpdatecItem(citem, objUpdateData);
    });
  }
}

function GetProperty(citem,propertykey){
  let returnvalue;
  // check that citem has property
  if(citem.data.data.attributes.hasOwnProperty(propertykey)){
    // get the property                                     
    let propertyname=propertykey;
    let property=game.items.find(y=>y.type=="property" && y.data.data.attKey==propertykey)
    if (property!=null){        
      if(property.data.data.tag.length>0){
        propertyname=property.data.data.tag;
      } else {
        propertyname=property.name;
      }
    }
    returnvalue='<tr><td>' + propertyname + '</td><td>' + citem.data.data.attributes[propertykey].value +'</td></tr>';
  }
  return returnvalue;
}


async function UpdatecItem(citem, objUpdateData){  
  console.log('Updating ' + citem.name); 
  await citem.update(objUpdateData);
}