//                                                                  
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
//                                                                  
//                     Settings for this macro                      
//                                                                  
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
//
function Setting_DiceAvailable(){return 10;}
function Setting_DefaultSelectedActionDice(){return 1;}
function Setting_DefaultSelectedDangerDice(){return 0;}
function Setting_FormWidth(){return 0;} // set to 0 to autosize
//                                                                  
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
//                                                                  
//                        Macro generic code                        
//                                                                  
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
// 
// **************************************************************** 
// Macro:         FU-dicebyMacro     
//                (place images in \Data\icons\FUDice)                    
// ================================================================ 
// Date       Version  Author               Description             
// ---------- -------- -------------------- -----------------------
// 2021-04-29 1.0.0    Ramses800            Macro created
// 2021-04-29 1.0.1    Ramses800            Configurable dice available, sort result list
// ****************************************************************    
function macroTitle() {
  let thismacroname=`FU2 Dice`;  
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
<style>
  .${thisMacroName()}_hbo:hover {cursor: pointer;color: darkred; box-shadow:0 0 7px darkred;} 
   
</style>
<script>
function ${thisMacroName()}_singleQuoted(text)  {return '&quot;' + text + '&quot;';} 
function ${thisMacroName()}_getSelectedFUDice(dietype)
{
 let selectedcount=0;
 for (let i = 1; i <= ${Setting_DiceAvailable()}; i++) 
 {
  if (document.getElementById('FU' + dietype + 'Die'+ i).style.opacity==1)
  {
    selectedcount= selectedcount+ 1;
  }
 }
 return selectedcount;
}

function ${thisMacroName()}_rollFUDice()
{
// get selected count
let actiondice=${thisMacroName()}_getSelectedFUDice("Action");
let dangerdice=${thisMacroName()}_getSelectedFUDice("Danger");

// roll
let actiondiceresults=new Roll(actiondice + "d6").roll();
let dangerdiceresults=new Roll(dangerdice + "d6").roll();

let arrFinals=[0,0,0,0,0,0];  // array for result counts, slot corresponds to face value 1- 6
// action
let actionresult='';
let actionssorted=[];
if(actiondiceresults.terms[0].results.length>0){
  for (let i = 0; i < actiondiceresults.terms[0].results.length; i++){ 
    // increment finals
    arrFinals[actiondiceresults.terms[0].results[i].result-1]= arrFinals[actiondiceresults.terms[0].results[i].result-1] + 1;  
    actionssorted.push(actiondiceresults.terms[0].results[i].result);
  }
}

actionssorted.sort(function(a, b) {
  return a - b;
});
// build result string for action dice
for (let i = 0; i < actionssorted.length; i++){ 
    if (i==0){ 
      actionresult=actionssorted[i];
    }
    else{
      actionresult=actionresult + ','+  actionssorted[i];
    }
}

//danger
let dangerresult='';
let dangersorted=[];
if(dangerdiceresults.terms[0].results.length>0){
  for (let i = 0; i < dangerdiceresults.terms[0].results.length; i++){  
    // dec finals
    arrFinals[dangerdiceresults.terms[0].results[i].result-1]= arrFinals[dangerdiceresults.terms[0].results[i].result-1] - 1;
    dangersorted.push(dangerdiceresults.terms[0].results[i].result);
  }
}

dangersorted.sort(function(a, b) {
  return a - b;
});
// build result string for danger dice
for (let i = 0; i < dangersorted.length; i++){ 
    if (i==0){ 
      dangerresult=dangersorted[i];
    }
    else{
      dangerresult=dangerresult + ','+  dangersorted[i];
    }
}


// find highest positive in finals
let highest=0;
for (let i = 0; i < 6 ; i++){
  if(arrFinals[i]>0){
    highest=i+1;
  }
}
let oracle='';
let boons=0;
let hascrit=false;
let hasfumble=false
let submsg='Action('+ actionresult +') Danger(' +dangerresult + ')';
switch(highest){
  case 0:
    oracle='BOTCH';
    hasfumble=true;
    break;
  case 1:
    oracle='NO AND...';
    break;
  case 2:
    oracle='NO';
    break;
  case 3:
    oracle='NO BUT...';
    break;
  case 4:
    oracle='YES BUT...';
    break;
  case 5:
    oracle='YES';
    break;
  case 6:
    oracle='YES AND...'; 
    // check for boon
    boons=arrFinals[5]-1;
    if (boons>0){      
      hascrit=true;
      submsg=submsg + ' Boons('+boons+')'
    }
    break;
}

let rolldice='';

let rollData = {
            token:{
                img:game.user.avatar,
                name:game.user.name
            },
            actor:game.user.name,
            flavor: actiondice + ' Action dice vs ' + dangerdice + ' Danger dice',
            formula: '',
            mod: '',
            result: oracle,
            dice: '',
            subdice: '',
            user: game.user.name,
            conditional: submsg,
            iscrit: hascrit,
            isfumble: hasfumble
        };

renderTemplate("systems/sandbox/templates/dice.html", rollData).then(html => {
            let rolltype = document.getElementsByClassName("roll-type-select");
            let rtypevalue = rolltype[0].value;
            let rvalue = 0;
            if(rtypevalue=="gmroll")
                rvalue = 1;
            let newmessage = ChatMessage.create({
                content: html,
                type:rvalue
            });            
        });

 
}

function ${thisMacroName()}_BuildAvailableDice(){
  let actionelement= document.getElementById('${thisMacroName()}_ActionDiceAvailable');
  if (actionelement!=null){
    let actionhtml='';
    for (let i = 1; i <= ${Setting_DiceAvailable()}; i++) {
      if(i<=${Setting_DefaultSelectedActionDice()}){
        actionhtml+='<input id="FUActionDie'+ i +'" type="image" class="${thisMacroName()}_hbo" style="margin:0 3px 1px 0;border:0px;width:45px;opacity:1;"   onclick="this.style.opacity = (this.style.opacity!==' +${thisMacroName()}_singleQuoted(0.4)+' ? ' +${thisMacroName()}_singleQuoted(0.4) +' : ' + ${thisMacroName()}_singleQuoted(1.0) + ');" src=icons/FUDice/actiondie.svg>';
      }  
      else{
        actionhtml+='<input id="FUActionDie'+ i +'" type="image" class="${thisMacroName()}_hbo" style="margin:0 3px 1px 0;border:0px;width:45px;opacity:0.4;"   onclick="this.style.opacity = (this.style.opacity!==' +${thisMacroName()}_singleQuoted(0.4)+' ? ' +${thisMacroName()}_singleQuoted(0.4) +' : ' + ${thisMacroName()}_singleQuoted(1.0) + ');" src=icons/FUDice/actiondie.svg>';        
      }    
    } 
    actionelement.innerHTML= actionhtml;
  }
  let dangerelement= document.getElementById('${thisMacroName()}_DangerDiceAvailable');
  if (dangerelement!=null){
    let dangerhtml='';
    for (let i = 1; i <= ${Setting_DiceAvailable()}; i++) { 
      if(i<=${Setting_DefaultSelectedDangerDice()}){
        dangerhtml+='<input id="FUDangerDie'+ i +'" type="image" class="${thisMacroName()}_hbo" style="margin:0 3px 1px 0;border:0px;width:45px;opacity:1;"   onclick="this.style.opacity = (this.style.opacity!==' +${thisMacroName()}_singleQuoted(0.4)+' ? ' +${thisMacroName()}_singleQuoted(0.4) +' : ' + ${thisMacroName()}_singleQuoted(1.0) + ');" src=icons/FUDice/dangerdie.svg>';
      }
      else{
        dangerhtml+='<input id="FUDangerDie'+ i +'" type="image" class="${thisMacroName()}_hbo" style="margin:0 3px 1px 0;border:0px;width:45px;opacity:0.4;"   onclick="this.style.opacity = (this.style.opacity!==' +${thisMacroName()}_singleQuoted(0.4)+' ? ' +${thisMacroName()}_singleQuoted(0.4) +' : ' + ${thisMacroName()}_singleQuoted(1.0) + ');" src=icons/FUDice/dangerdie.svg>';
      }  
    } 
    dangerelement.innerHTML= dangerhtml;
  }
  
}

</script>


<fieldset>
  <legend>Action Dice</legend>
  <div id="${thisMacroName()}_ActionDiceAvailable"></div>
</fieldset>

<fieldset>
  <legend>Danger Dice</legend> 
  <div id="${thisMacroName()}_DangerDiceAvailable"></div>
</fieldset>

  <script> 
     ${thisMacroName()}_BuildAvailableDice();
  </script>
<br>
<button style="width:100%;"  onclick="${thisMacroName()}_rollFUDice();">Roll!</button>

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
            elem.onclick.apply(elem);
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
    d.options.resizable=true;
    d.render(true);        
  }