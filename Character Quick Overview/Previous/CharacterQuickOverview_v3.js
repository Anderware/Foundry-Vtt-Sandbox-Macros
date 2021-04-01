let html = `
  <script>
  // --------------------------------------------------------------------------------------
  // Change settings to fit your needs
  // Properties format entered is 'Name of sandbox property key;Any label you want to show'
  // if you dont need a special label just use the propertykey(without any ;)
  // ---------------------------------------------------------------------------------------
  function Setting_PropertiesRequested() {return ['STY','REF','INT','CHA', 'TÅL;HP Max', 'TÅL_AKTUELL;HP Current','VST;WIL Max','VST_AKTUELL;WIL Current'];  } 
  function Setting_Foldername()          {return 'Characters';  }
  </script>  

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
        let sHCell = '<th><i title="Refresh" class="fas fa-redo-alt"'; 
        sHCell += ' style="border: 0px groove #c9c7b8;border-radius: 3px;padding:3px 3px 3px 3px;"';
        sHCell += ' onclick="ListActorsProperties(Setting_Foldername(),Setting_PropertiesRequested());"'; 
        sHCell += ' onMouseOver="this.style.boxShadow=' + singleQuote() + '0 0 5px red' + singleQuote() + '"';
        sHCell += ' onMouseOut="this.style.boxShadow=' + singleQuote() + '0 0 0 black' + singleQuote() + '">';
        sHCell += ' </i> </th>';

        hCell.outerHTML  = sHCell;     

	row.insertCell(-1).outerHTML = '<th></th>';
	
	for (let sProperty of requestedpropertiesstringarray ){  	
           
		row.insertCell(-1).outerHTML = '<th style="vertical-align: bottom;word-wrap: break-word;padding-left:5px;padding-right:5px;">' + splitString(sProperty,';',1) +  '</th>';
	}
	for(let actor of folder.content){
	  
	  let row = table.insertRow(-1);
          row.style.lineHeight="12px";
	  row.insertCell(-1).outerHTML = '<td style="text-align:center;display: block;padding:2px 0px 0px 2px;vertical-align:middle;"><img style="height:48px;width:48px;object-fit:cover;object-position:50% 0;margin: 0 8px 0 2px;border: none;" src="' + actor.data.img +'"</img></td>';
	  row.insertCell(-1).outerHTML = '<td style="padding-left:2px;">' + actor.name +'</td>';
	  let targetattributes=actor.data.data.attributes;
          let sPropertyName='';
	  for (let sProperty of requestedpropertiesstringarray ){
            sPropertyName=splitString(sProperty,';',0);
	  	  let cell=row.insertCell(-1);
	  	  cell.style.textAlign = "center";
		  if (targetattributes[sPropertyName]!=null)
		  {			
			cell.innerHTML=targetattributes[sPropertyName].value;					   
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
