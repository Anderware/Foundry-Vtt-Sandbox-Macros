// **************************************************************** 
// Macro:               CombineRoll 
// Description:         Displays a dialog for player characters
//                      allowing them to combine(average) simplenumeric 
//                      properties and roll against them
// Version Compability: Tested with
//                      Sandbox 0.12.2 | Foundry 9.251                      
// ================================================================ 
// Date       Version  Author               Description             
// ---------- -------- -------------------- -----------------------
// 2022-03-04 1.0.0    Ramses800            Macro created
// 2022-03-08 1.0.1    Ramses800            Use player character name/img  
// ****************************************************************   
//                                                                  
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
//                                                                  
//                     Settings for this macro                      
//                                                                  
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
// 
function Setting_DiceToRoll(){
  return "1d100";
}

function Setting_ActorProperties(){
  // only simplenumeric properties are supported
  // to use a cItem in  propertykey, use "<cItem name>|<cItem property>"
  let objActorPropertiesToDisplay = {
		"columns":[
			{
			  "columntag":"First column",
				"propertygroups": [
					{
					  "propertygrouptag": "Primary Mental Attributes",
						"properties": [
							{"propertykey":"DRV"},
							{"propertykey":"INT"},
              {"propertykey":"REA"}
						]
					},
					{
						"propertygrouptag": "Primary Physical Attributes",
						"properties": [
							{"propertykey":"STY"},
							{"propertykey":"KRB"},
              {"propertykey":"MOT"}
						]
					},
          {
						"propertygrouptag": "Primary Soul Attributes",
						"properties": [
							{"propertykey":"CHA"},
							{"propertykey":"TUR"},              
              {"propertykey":"INU"}
						]
					}
				]
			},
			{
				"columntag":"Second column",
				"propertygroups": [
					{
					  "propertygrouptag": "Tactical Attributes",
						"properties": [
							{"propertykey":"REF"},
							{"propertykey":"UPP"},
              {"propertykey":"MEN"},
              {"propertykey":"FYS"},
              {"propertykey":"MAN"},
              {"propertykey":"PRE"},
              {"propertykey":"INF"}
						]						
					},
					{
						"propertygrouptag": "Health",
						"properties": [
							{"propertykey":"TÅL"},
							{"propertykey":"VST"}
						]
					},
					{
						"propertygrouptag": "Skills(cItems)",
						"properties": [
							{"propertykey":"Köpslå|SkillRank"},
							{"propertykey":"Hazardspel|SkillRank"}  
						]
					}
				]
			}
		]	
  };
  return JSON.stringify(objActorPropertiesToDisplay);
}


function Setting_FormWidth(){return 0;} // set to 0 to autosize                                                                                                                                              

   
//                                                                  
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
//                                                                  
//                        Macro generic code                        
//                                                                  
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
//         
                                                                                                                                      
function macroTitle() {
  let thismacroname=`Roll against combined average of players values `;  
  return thismacroname;  
}


// This is used to convert texts into javascript/programmable acceptable definitions
function slugify(text,separator) {
  return text
    .toString()
    .normalize('NFD')                   // split an accented letter in the base letter and the acent
    .replace(/[\u0300-\u036f]/g, '')   // remove all previously split accents
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 ]/g, '')   // remove all chars not letters, numbers and spaces (to be replaced)
    .replace(/\s+/g, separator);
}
// This is used to make sure that function styles id etc are unique in the total namespace
// if not unique, then macros/other functinalities could be intermixed and produce unpredictable results
function thisMacroName(){return `${slugify(macroTitle(),'_')}`;  } 

// --------------
// dialog content
// -------------- 

let html_content = ` 
  <!--macro custom styles-->
  <style>  
    .${thisMacroName()}_hbo:hover {cursor: pointer;color: darkred;    font-weight: bold;} 
    img.${thisMacroName()}_portrait_img{height:48px;width:48px;min-width:48px;object-fit:cover;object-position:50% 0;margin: 0 8px 0 2px;border: none;} 

    table.table-properties{
      margin-top:0px;
      margin-bottom: 0px;
      border-bottom: 0px;
      border-top:0px;
      padding:0px;
    }   
    th,td,tr{
      margin-top:0px;
      margin-bottom: 0px;
      border-bottom: 0px;
      border-top:0px;
      height: 25px;
      max-height:25px;
      overflow: hidden;
    }
    th.th-property{
      text-align:left;
      padding-left:10px; 
      padding-right:5px; 
      
    }     
    td.td-property{
      text-align:left;      
    }   
     
    th.th-value{
      text-align:right;
      padding-right: 5px;
      width:60px;    
      max-width:60px;
    }               
    td.td-value{
      text-align:center;
      padding-right: 5px;
      width:60px;
      max-width:60px;
    }
    
    th.th-use{
      text-align:left;
      width:30px;    
      max-width:30px;
    }    
    td.td-use-property{ 
      text-align:center;
      width:30px;
      max-width:30px;
    }
    
    input[type="checkbox"].use-property{     
      width: 14px;
      height: 14px;
      cursor: pointer;
      margin: 0px ;
    }   
    
    td.bad-property,p.bad-property{
      color:red;
      font-weight:bold;
    }
    label.label-clickable{
      cursor:pointer;
    } 
    .property-column {
      float: left;      
      padding-left: 5px;
      padding-right: 5px;
    }   
    .playerinfo,.result-item{
      display: flex; 
      align-items: center;
      float:left;
      margin-right:10px;
    }                                                          
    fieldset.fieldset-combine{
      height:60px;
    }
  </style> 
  
  <!--macro dialog content-->  
  <i style="display:none" id="${thisMacroName()}_btnRefresh" title="Refresh" class="fas fa-redo-alt ${thisMacroName()}_hbo" onclick="${thisMacroName()}_Main()"></i>
  <form>
  <fieldset>
    <legend>Select players to determine the groups values from</legend>
    <div id="${thisMacroName()}_PlayerList" ></div> 
    <script>
      function ${thisMacroName()}_CreatePlayerList(){  
        let checkOptions = ""
        let users = game.users.filter(user => user.active);
        let actor;
        let actorimg="icons/svg/mystery-man.svg";
        // Build checkbox list for all active players
        users.forEach(user => {           
          if (!user.isGM && user.data.character!=null){             
            actor=game.actors.get(user.data.character);
            if(actor!=null){
              actorimg=actor.data.img;
            }
            checkOptions+='<div class="playerinfo"><input type="checkbox" class="${thisMacroName()}_playerselected" name="' + user.data.character +'" value="' + user.data.character +'" onclick="${thisMacroName()}_PlayersChange()" checked><img class="${thisMacroName()}_portrait_img"  src="' + actorimg +'"</img><p>' + user.charname+'<br>[' + user.name  +']' + '</p></div>';
          }
        });               
        return checkOptions;        
      } 
      document.getElementById("${thisMacroName()}_PlayerList").innerHTML = ${thisMacroName()}_CreatePlayerList();
    </script>
  </fieldset> 
  <fieldset>
    <legend>Select stat/skills to calculate average from</legend>
    <div id="data_content"></div> 
  </fieldset>
  <fieldset>
    <legend>Combined value</legend>
    <div id="data_combined">
      <div class="result-item">
        <fieldset class="fieldset-combine">  
          <legend>Value selection mode</legend>
          <input type="radio" id="use-players-highest" name="selected-value-mode" value="HIGHEST" onclick="${thisMacroName()}_PlayersChange()"  checked>
          <label for="use-players-highest">Highest</label>
          <input type="radio" id="use-players-lowest" name="selected-value-mode" value="LOWEST" onclick="${thisMacroName()}_PlayersChange()">
          <label for="use-players-lowest">Lowest</label>
        </fieldset>
      </div> 
      
      <div class="result-item">
        <fieldset class="fieldset-combine">  
          <legend>Success evaluation mode</legend>
          <input type="radio" id="success-on-lower" name="success-evaluation-mode" value="LOWER" >
          <label for="success-on-lower">&#60;</label>
          <input type="radio" id="success-on-lower-and-equal" name="success-evaluation-mode" value="LOWERANDEQUAL"  checked>
          <label for="success-on-lower-and-equal">&#60;=</label>
           
          <input type="radio" id="success-on-higher-and-equal" name="success-evaluation-mode" value="HIGHERANDEQUAL">
          <label for="success-on-higher-and-equal">&#62;=</label>  
          <input type="radio" id="success-on-higher" name="success-evaluation-mode" value="HIGHER" >
          <label for="success-on-higher">&#62;</label>
        </fieldset>
      </div>
           
      <div class="result-item">         
        <fieldset class="fieldset-combine">  
          <legend>Calculated average</legend>
          <input type="number" style="max-width:65px;" id="calculated-average" name="calculated-average" disabled> 
        </fieldset>
      </div>
      <div class="result-item">     
        <fieldset class="fieldset-combine">  
          <legend>Dice expression</legend>
          <input type="text" style="max-width:80px;" id="dice-expression" name="dice-expression" value="" > <i class="fas fa-dice-d20" title="Roll against calculated average" onclick="${thisMacroName()}_Roll()" ></i>
        </fieldset>
      </div> 
       
                     
      <script>
        document.getElementById('dice-expression').value='${Setting_DiceToRoll()}';
      </script>              
    </div> 
  </fieldset>
  </form> 
    
  <!--macro dialog scripts-->     
  <script>
   // support functions    
    function ${thisMacroName()}_singleQuoted(text)  {return '&quot;' + text + '&quot;';} 
    function ${thisMacroName()}_splitString(sInput,sSeparator,iFieldNr){
      let arr=sInput.split(sSeparator);
      if(arr.length>0 && arr.length>iFieldNr )      {
        return arr[iFieldNr];
      }
      else{
        return sInput;
      }
    } 
    //
    
    async function ${thisMacroName()}_Roll() {
      // get dice  
      let dieroll=document.getElementById('dice-expression').value;
      let targetnumber=parseInt(document.getElementById('calculated-average').value);
      const roll = await new Roll(dieroll).evaluate({async: true});                  
      let rollresult= roll.total;
      let succeslevel;
      let iscrit=false;
      let isfumble=false;
      let bSuccess=false;
      // get success evaluation mode
      let sEvaluationMode=$('input[name="success-evaluation-mode"]:checked').val(); 
      let sEvaluationSign='';
      switch(sEvaluationMode){
        case 'HIGHER': 
          sEvaluationSign='>';
          if(rollresult>targetnumber){
            bSuccess=true;
          }
          break;
        case 'HIGHERANDEQUAL':
          sEvaluationSign='>=';
          if(rollresult>=targetnumber){
            bSuccess=true;
          }
          break;
        case 'LOWER':
          sEvaluationSign='<';
          if(rollresult<targetnumber){
            bSuccess=true;
          }
          break;
        default: 
          //LOWERANDEQUAL   
          sEvaluationSign='<=';
          if(rollresult<=targetnumber){
            bSuccess=true;
          } 
          break;
      }
                   
      if(bSuccess){
        // success
        succeslevel='SUCCESS';
        iscrit=true;
      } else{
        // fail
        succeslevel='FAILURE'; 
        isfumble=true;
      }
      
      let displayname;
      let displayimage;
      
      //displayname = game.user.name;     //  use for player name,
      displayname = game.user.charname; //  use for player character name,
               
      let actor=game.actors.get(game.user.data.character);
      if(actor!=null) {
        displayimage=actor.data.img;
      } else {
        displayimage=game.user.avatar
      }
      
      let rollData = {
          token: {
              img: displayimage,
              name: "Combined Roll"
          },
          
          actor: displayname, 
          flavor: "Combined roll vs " + sEvaluationSign +" target " + targetnumber,
          formula: roll.formula,
          mod: 0,
          result: roll.total,
          dice: roll.dice,
          user: game.user.name,
          iscrit: iscrit,
          isfumble: isfumble, 
          conditional:   succeslevel
      };

      let blindmode=false;    
      let rolltype = document.getElementsByClassName("roll-type-select");
      let rtypevalue = rolltype[0].value; 
      let rvalue = CONST.CHAT_MESSAGE_TYPES.OTHER;
      switch(rtypevalue){      //roll, gmroll,blindroll,selfroll
        case CONST.DICE_ROLL_MODES.PUBLIC:
          break;
        case CONST.DICE_ROLL_MODES.PRIVATE:
          rvalue = 1;
          break;
        case CONST.DICE_ROLL_MODES.BLIND:
          rvalue = 1;
          blindmode=true; 
          break;
        case CONST.DICE_ROLL_MODES.SELF:    
          break;
        default:    
      } 
      
      renderTemplate("systems/sandbox/templates/dice.html", rollData).then(html => {
        let messageData ={
          content: html,
          type:rvalue,
          blind:blindmode
        };
        if(rtypevalue==CONST.DICE_ROLL_MODES.PRIVATE || rtypevalue==CONST.DICE_ROLL_MODES.BLIND ){
          messageData.whisper = ChatMessage.getWhisperRecipients('GM');
        } 
        else if(rtypevalue==CONST.DICE_ROLL_MODES.SELF){
          // whisper to self  
          messageData.whisper = ChatMessage.getWhisperRecipients(game.user.name);
        }           
        let newmessage = ChatMessage.create(messageData);
      });
    }
    
    function ${thisMacroName()}_buildTable(){
      let sHtml='';        
      let arrProperties = JSON.parse('${Setting_ActorProperties()}');
      let propertyitem; 
      let selectedvalue='';
      let propertykey='';
      let iscitem=false; 
      let citem;
      let citemname='';
      let citemproperty='';
      let tag='';
      let itemok=false;
      try{                                                                    
        for (let icol = 0; icol < arrProperties.columns.length; icol++){
          sHtml += '<div class="property-column" style="width:'+ (1/arrProperties.columns.length)*100 +'%;" id="' + arrProperties.columns[icol].columntag +'">'
          // get this column propertygroups
          for (let igroup = 0; igroup < arrProperties.columns[icol].propertygroups.length; igroup++){
            //sHtml += '<p>' + arrProperties.columns[icol].propertygroups[igroup].propertygrouptag +'</p>'
            // this groups properties
            sHtml+='<table class="table-properties"><thead><tr class="tr-header"><th colspan=2 class="th-property">'+ arrProperties.columns[icol].propertygroups[igroup].propertygrouptag + '</th><th class="th-value">Value</th></tr></thead>';
            for (let iproperty = 0; iproperty < arrProperties.columns[icol].propertygroups[igroup].properties.length; iproperty++){
              //sHtml += '<p>' + arrProperties.columns[icol].propertygroups[igroup].properties[iproperty].propertykey +'</p>'
              propertykey=arrProperties.columns[icol].propertygroups[igroup].properties[iproperty].propertykey; 
              itemok=false;
              // check if citem(look for |)
              iscitem=false;              
              if (propertykey.indexOf('|')>-1){          
                iscitem=true;                                                 
              }
                                          
              if (!iscitem) {
                // property
                propertyitem=game.items.find(y=>y.type=="property" && y.data.data.attKey==propertykey);                 
                if(propertyitem!=null){ 
                  // check datatype
                  if(propertyitem.data.data.datatype=='simplenumeric'){                             
                    tag=propertyitem.data.data.tag;
                    itemok=true; 
                  }                
                }
              } else  {
                // citem  
                //debugger;
                citemname=${thisMacroName()}_splitString(propertykey,'|',0);
                citemproperty=${thisMacroName()}_splitString(propertykey,'|',1);
                // find the citem     
                citem=game.items.find(y=>y.data.type=="cItem" && y.data.name==citemname);
                if(citem!=null){
                  // citem exists                
                  // get the tag from the property
                  propertyitem = game.items.find(y=>y.type=="property" && y.data.data.attKey==citemproperty);
                  if(propertyitem!=null){ 
                    if(propertyitem.data.data.datatype=='simplenumeric'){ 
                      tag=citemname ;//+ '-' + propertyitem.data.data.tag;
                      itemok=true;
                    }
                  } 
                }
                
              }
               
              if(itemok){
                sHtml+='<tr>';
                sHtml+='<td class="td-use-property"><input class="use-property" type="checkbox" id="use-property-'+ propertykey +'" value="'+ propertykey +'" onclick="${thisMacroName()}_CalculateAverage()"></td>';
                sHtml+='<td class="td-property"><label class="label-clickable" for="use-property-'+ propertykey +'">' + tag +'</label></td>';          
                // close tag
                sHtml+='<td class="td-value" id="selected-value-'+ propertykey +'" data-propertykey="'+ propertykey +'">' + selectedvalue +'</td></tr>'
              } else{
                // property/citem does not exists
                sHtml+='<tr><td class="bad-property">BAD</td><td class="td-property bad-property">'+ propertykey +'</td><td class="bad-property">BAD</td></tr>';              
              }
              
              
              
              
              
            } 
            sHtml+='</table>';
          } 
          sHtml+='</div>';
        }
        document.getElementById('data_content').innerHTML=sHtml;
      }
      catch(err){     
        console.error("Error in macro function ${thisMacroName()}_buildTable()");   
        console.error(err) ;
        document.getElementById('data_content').innerHTML='<p class="bad-property">ERROR!</p>';
      }
      
    }    
        

    // Main function
    function ${thisMacroName()}_Main(){ 
     //console.log("${thisMacroName()}_Main()");
     ${thisMacroName()}_buildTable(); 
     ${thisMacroName()}_GetValuesFromPlayers();
    }
            
    function  ${thisMacroName()}_PlayersChange(){
      ${thisMacroName()}_GetValuesFromPlayers();
      ${thisMacroName()}_CalculateAverage();
    }
    
    function ${thisMacroName()}_GetValuesFromPlayers(){ 
      // get option
      let bUseHighest=true;
      let iscitem=false;
      let citemname='';
      let citemproperty='';
      let citem;  
      let sSelectionMode=$('input[name="selected-value-mode"]:checked').val();
      if (sSelectionMode=='HIGHEST'){
        bUseHighest=true;
      } else {
        bUseHighest=false;
      }
      // create a array of actors
      const selectedplayers = document.getElementsByClassName("${thisMacroName()}_playerselected");       
      let selectedactors=[]; 
      let actor;  
      if(selectedplayers.length>0){
        // get them
        for (let i = 0; i < selectedplayers.length; i++){
          if(selectedplayers[i].checked){                          
            actor=game.actors.get(selectedplayers[i].value);
            if(actor!=null){
              //  
              selectedactors.push(actor);
            }
          }
        }
        // get all selected value elements                
        let eAllSelected=document.getElementsByClassName("td-value");
        if(eAllSelected.length>0){      
          let propertykey=''; 
          let selectedvalue=''; 
          
          for (let i = 0; i < eAllSelected.length; i++){
            selectedvalue='';
            // get the key(stored in data-propertykey)
            propertykey=eAllSelected[i].dataset.propertykey; 
            
            //
            iscitem=false;              
            if (propertykey.indexOf('|')>-1){          
              iscitem=true;
                                                               
            }
            
            // now get the value from the actors
            for (let i = 0; i < selectedactors.length; i++){ 
            
              if(!iscitem){                       
                // make sure that the actor has the property
                if (selectedactors[i].data.data.attributes.hasOwnProperty(propertykey)) {
                  if(selectedvalue==''){
                    selectedvalue=selectedactors[i].data.data.attributes[propertykey].value;
                  } else{                     
                    if(bUseHighest){
                      // use higher         
                      if (parseInt(selectedvalue)<selectedactors[i].data.data.attributes[propertykey].value){
                       selectedvalue=selectedactors[i].data.data.attributes[propertykey].value;
                      }   
                    } else{             
                      // use lower
                      if (!parseInt(selectedvalue)<selectedactors[i].data.data.attributes[propertykey].value){
                       selectedvalue=selectedactors[i].data.data.attributes[propertykey].value;
                      }
                    }  
                  }
                }
              } else{   
                
                // citem , get the parts
                citemname=${thisMacroName()}_splitString(propertykey,'|',0);
                citemproperty=${thisMacroName()}_splitString(propertykey,'|',1);
                // check that actor has this citem
                citem = selectedactors[i].data.data.citems.find(y=>y.name == citemname);
                if(citem!=null){   
                  // actor has this citem
                  //console.log(selectedactors[i].data.name + ' have ' + citemname );
                  if(citem.attributes.hasOwnProperty(citemproperty)) {
                    // citem.attributes[citempropKey].value;
                    if(selectedvalue==''){
                       selectedvalue=citem.attributes[citemproperty].value;
                    } else{
                      if(bUseHighest){
                        // use higher         
                        if (parseInt(selectedvalue)<citem.attributes[citemproperty].value){
                         selectedvalue=citem.attributes[citemproperty].value;
                        }   
                      } else{             
                        // use lower
                        if (!parseInt(selectedvalue)<citem.attributes[citemproperty].value){
                         selectedvalue=citem.attributes[citemproperty].value;
                        }
                      }
                    }
                  }
                }                  
                
                
              }
            }
            eAllSelected[i].innerText=selectedvalue;
          }
        }
      }
    }
    
    function ${thisMacroName()}_CalculateAverage(){       
      const selectedproperties = document.getElementsByClassName("use-property");
       if(selectedproperties.length>0){
        // get them
        
        let eSelectedValue;
        let combinedsum=0;
        let combinedcount=0;
        let combinedaverage=0; 
       
        for (let i = 0; i < selectedproperties.length; i++){
          if(selectedproperties[i].checked){                          
            // get the value
            eSelectedValue=document.getElementById("selected-value-"+ selectedproperties[i].value);
            if (eSelectedValue!=null){ 
              combinedcount+=1;
              combinedsum += parseInt(eSelectedValue.innerText);
            }
          }
        }  
        if(combinedcount>0){           
          combinedaverage= Math.round(combinedsum / combinedcount);
        }
        document.getElementById('calculated-average').value=combinedaverage;
      } 
    }  
    
    
             
    // Run main
    ${thisMacroName()}_Main();
  </script>
  <!--Marker element to detect if dialog is loaded-->
  <input type="hidden" id="${thisMacroName()}_appId" value="-1"> 
`;
  // HTML content completed
  // check if this already loaded 
  let appId_element=document.getElementById(`${thisMacroName()}_appId`); 
  if (appId_element!=null){
    // already loaded    
    let appId=appId_element.getAttribute('value');
    if (appId!=null){ 
      let app=ui.windows[appId];
      if (app!=null){    
        // attempt to bring to the front
        app.bringToTop(); 
        // and trigger refresh content button
        let elem = document.getElementById(`${thisMacroName()}_btnRefresh`);
        if (elem!=null){
          if (typeof elem.onclick == "function") {
            //elem.onclick.apply(elem);
          }               
        }
      }
    }
  }
  else{
    // show it as dialog, after render update hidden id
    let d =new Dialog({
     title: `${macroTitle()}`,
     content: html_content,
     buttons: {},
     render: html => document.getElementById(`${thisMacroName()}_appId`).setAttribute('value',d.appId),
    });
    d.options.width = Setting_FormWidth();
    d.position.width = Setting_FormWidth();
    //d.options.height=600;
    //d.position.height=600;
    d.options.resizable=true;
    d.render(true);        
  }
