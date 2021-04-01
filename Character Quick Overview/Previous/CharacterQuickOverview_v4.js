let html = `
  <script>
  // --------------------------------------------------------------------------------------
  // Change settings to fit your needs
  // Properties format entered is 'Name of sandbox property key;Any label you want to show'
  // if you dont need a special label just use the propertykey(without any ;)
  // 
  // To change the width of the form(dialog), change the rows at the bottom with
  //   d.options.width = 450;
  //   d.position.width = 450;
  //
  // Macro by Ramses800, 2021-03-23
  // ---------------------------------------------------------------------------------------
  function Setting_PropertiesRequested() {return ['Attack','Defense','Hits;HP'];  } 
  function Setting_Foldername()          {return 'Team A';  }
  </script>  
  <style>
  .hbo:hover {box-shadow:0 0 5px red}
  </style>
  <table id="CharactersProperties">
  </table>
  <div>
  <script>

  // ----------------------
  // Generic code below
  // ----------------------
  function splitString(sInput,sSeparator,iFieldNr)
  {
    let arr=sInput.split(sSeparator);
    if(arr.length>0 && arr.length>iFieldNr )
  	{
      return arr[iFieldNr];
    }
    else
    {
      return sInput;
    }
  }
  function singleQuote()
  {
    return '&quot;';
  }
  function rollActorProperty(actorId,sPropertyId )
  {
   let actor = game.actors.get(actorId);
   let actorattributes = actor.data.data.attributes;
   console.log(sPropertyId + ':' + actor.data.name);
   let rollexp;
   let rollname;
   let rollid = [];

   let property = game.items.get(sPropertyId );
   rollexp = property.data.data.rollexp;
   rollname = property.data.data.rollname;
   rollid.push(property.data.data.rollid);
   actor.rollSheetDice(rollexp,rollname,rollid,actorattributes,null);
  }
  function ListActorsProperties(foldername,requestedpropertiesstringarray){
    let table = document.getElementById("CharactersProperties");
    // empty table
    if (table.rows.length>0)
    {
      for(let i=table.rows.length;i>=1;i--){
        table.deleteRow(-1);	
      }
    }
    // build table    
	let folder = game.folders.getName(foldername);
	header = table.createTHead();
	let row = header.insertRow(0);
        let hCell=row.insertCell(-1);
        let sHCell = '<th style="text-align:left;padding-left:5px;"><i title="Refresh" class="fas fa-redo-alt hbo"'; 
        sHCell += ' style="border: 0px groove #c9c7b8;border-radius: 3px;padding:3px 3px 3px 3px;"';
        sHCell += ' onclick="ListActorsProperties(Setting_Foldername(),Setting_PropertiesRequested());"'; 

        sHCell += ' ></i> </th>';

        hCell.outerHTML  = sHCell;     

	row.insertCell(-1).outerHTML = '<th></th>';
	
	for (let sProperty of requestedpropertiesstringarray ){  	
           
		row.insertCell(-1).outerHTML = '<th style="vertical-align: bottom;word-wrap: break-word;padding-left:5px;padding-right:5px;">' + splitString(sProperty,';',1) +  '</th>';
	}
	for(let actor of folder.content){
	  console.log(actor);
	  let row = table.insertRow(-1);
          row.style.lineHeight="12px";
	  row.insertCell(-1).outerHTML = '<td style="text-align:left;display: block;padding:2px 0px 0px 2px;vertical-align:middle;"><img style="height:48px;width:48px;object-fit:cover;object-position:50% 0;margin: 0 8px 0 2px;border: none;" src="' + actor.data.img +'"</img></td>';
	  row.insertCell(-1).outerHTML = '<td style="padding-left:2px;">' + actor.name +'</td>';
	  let targetattributes=actor.data.data.attributes;
          
          let sPropertyName='';
          let property;
          let sAttrID='';

	  for (let sProperty of requestedpropertiesstringarray ){
            sPropertyName=splitString(sProperty,';',0);
	  	  let cell=row.insertCell(-1);
	  	  cell.style.textAlign = "center";
		  if (targetattributes[sPropertyName]!=null)
		  {			
                       cell.innerHTML=targetattributes[sPropertyName].value;
                       sAttrID=targetattributes[sPropertyName].id;
		       property = game.items.get(sAttrID);
                       rollexp = property.data.data.rollexp;                       
                       if (rollexp!=null)
                       {
                          if (rollexp.length>0)
                         {  
                          cell.innerHTML='<label class="hbo" onclick="rollActorProperty(' + singleQuote() + actor._id  + singleQuote() +','+ singleQuote()+ sAttrID + singleQuote() +');">' + targetattributes[sPropertyName].value+ ' </a>';
                         }
                       }
		  }
		  else
		  {
			cell.innerHTML="N/A";
		  }
		}
	  }
  }  
  ListActorsProperties(Setting_Foldername(),Setting_PropertiesRequested());
  </script>

`;
// HTML Form completed
// show it as dialog
let d = new Dialog({
 title: "Character Quick Overview",
 content: html,
 buttons: {
  }
 ,
 
 
});
d.options.width = 450;
d.position.width = 450;
d.render(true);
