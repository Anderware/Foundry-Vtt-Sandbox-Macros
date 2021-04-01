let html = `
  <table id="CharactersProperties">
  </table>
  <div>
  <script>
  // Change settings to fit your needs
  function Setting_PropertiesRequested() {return ['STY','REF','INT','CHA', 'TÅL', 'TÅL_AKTUELL','VST','VST_AKTUELL'];  }
  function Setting_Foldername()          {return 'Characters';  }
  // ----------------------------------------------------------------------
  // Generic code below
  // ----------------------------------------------------------------------
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
	row.insertCell(-1).outerHTML = '<th style="text-align: left;"></th>';
	row.insertCell(-1).outerHTML = '<th style="text-align: left;"></th>';
	
	for (let sProperty of requestedpropertiesstringarray ){  	
		row.insertCell(-1).outerHTML = "<th>" + sProperty +  "</th>";
	}
	for(let actor of folder.content){
	  
	  let row = table.insertRow(-1);
	  row.insertCell(-1).innerHTML = '<img style="border:0px;width:40px" src=' + actor.data.img + '>';
	  row.insertCell(-1).innerHTML = actor.name;
	  let targetattributes=actor.data.data.attributes;
	  for (let sProperty of requestedpropertiesstringarray ){
	  	  let cell=row.insertCell(-1);
	  	  cell.style.textAlign = "center";
		  if (targetattributes[sProperty]!=null)
		  {			
			cell.innerHTML=targetattributes[sProperty].value;					   
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
  </div> 
  <button style="width:80px;" onclick="ListActorsProperties(Setting_Foldername(),Setting_PropertiesRequested());">Refresh</button><hr>  
`;
// HTML Form completed
// show it as dialog
let d = new Dialog({
 title: "Character Quick Overview",
 content: html,
 buttons: {
  btnClose: {   
   label: "Close",
   callback: () => console.log("Close")
  }
 },
 default: "btnClose"
});
d.options.width = 500;
d.position.width = 500;
d.render(true);
