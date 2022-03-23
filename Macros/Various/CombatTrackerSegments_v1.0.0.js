// **************************************************************** 
// Macro:               CombatTrackerSegments 
// Description:         Recalculate initaitive values in Combat Tracker
//                      as Segments
// Version Compability: Tested with
//                      Sandbox 0.12.4 | Foundry 9.255                      
// ================================================================ 
// Date       Version  Author               Description             
// ---------- -------- -------------------- -----------------------
// 2022-03-22 1.0.0    Ramses800            Macro created
// ****************************************************************   
//   
//                                                                  
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
//                                                                  
//                     Settings for this macro                      
//                                                                  
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
// 

// This setting determines what column in the Segment table to use
// for each actor to determine if they have an action in segments
function Setting_ActionsProperty(){
  return 'ACTION_POINTS';  // set to the KEY of a simplenumeric property
}
// This setting determines the order of actors on the segments
function Setting_InitiativeOrderProperty(){
  return 'DEX';    // set to the KEY of a simplenumeric property
}

function Setting_LowestActionsColumn(){
  return 5;
}

function Setting_HighestActionsColumn(){
  return 20;
} 
// This setting determines on how the Segment table looks like
function Setting_SegmentsTable(){
  let objSegmentTable= [ 
// 0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15,16,17,18,19,20    // Action Columns
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],  //Segment 0
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],  //Segment 1
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],  //Segment 2
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2],  //Segment 3
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 2, 1],  //Segment 4
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],  //Segment 5
  [0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2],  //Segment 6 
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1],  //Segment 7
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 2, 1],  //Segment 8
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2],  //Segment 9
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],  //Segment 10
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],  //Segment 11
  [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2],  //Segment 12
];
  
  return JSON.stringify(objSegmentTable);
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
  let thismacroname=`Combat Tracker Segments`;  
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
    th.th-action-column{    
      min-width:40px;
    }
    th.th-segment-cell{ 
      text-align:left;
    }   
    th.th-segment-header{
      text-align: left;
      padding-left:3px;
      padding-right:3px;
    }
    td.td-action-cell{ 
      vertical-align: top;
      white-space: nowrap; 
      text-align: left;
      padding-left:3px;
      padding-right:3px;
    } 
    input[type=radio].radio-segment{
      margin-right: 6px; 
      cursor: pointer;
    } 
    div.action-item:hover{
      cursor: pointer;
    }
  </style> 
  
  <!--macro dialog content-->  
  <i id="${thisMacroName()}_btnRefresh" title="Refresh" class="fas fa-redo-alt ${thisMacroName()}_hbo" onclick="${thisMacroName()}_Main()"></i>
  <form>
  <fieldset>
    <legend>Segment Table</legend>
    <table> 
      <thead id="${thisMacroName()}_SegmentTableHeader">
      </thead>
      <tbody id="${thisMacroName()}_SegmentTableBody">
      </tbody>
    </table>
  </fieldset>
  </form> 
  <!--macro dialog scripts-->     
  <script>
   // support functions    
    function ${thisMacroName()}_singleQuoted(text)  {return '&quot;' + text + '&quot;';}  
    
    function ${thisMacroName()}_AddActionHeader(){ 
      let lowestActionsColumn= parseInt('${Setting_LowestActionsColumn()}');
      let highestActionsColumn=parseInt('${Setting_HighestActionsColumn()}');
      let thead = document.getElementById('${thisMacroName()}_SegmentTableHeader'); 
      let row = thead.insertRow(0); 
      let headerCell = document.createElement("TH");
      headerCell.className='th-segment-header';
      headerCell.innerHTML = 'Segment';
      row.appendChild(headerCell);
      for (let icol = lowestActionsColumn; icol <= highestActionsColumn; icol++){
       let headerCell = document.createElement("TH");
       headerCell.className='th-action-column';
       headerCell.innerHTML = icol;
       row.appendChild(headerCell);
      }
    }
    
    function ${thisMacroName()}_SetSegment(segment){ 
      let actionscolumn=0;
      let initiative=0;
      
      let actionsproperty='${Setting_ActionsProperty()}';
      let initiativeproperty='${Setting_InitiativeOrderProperty()}';
      let arrSegmentTable = JSON.parse('${Setting_SegmentsTable()}');
      for( let thisCombatant of game.combat.combatants){
        // get actor 
        initiative=0;
        let actor=thisCombatant.token.actor;
        if (actor!=null){
          // check actor for attributes
          if (actor.data.data.attributes.hasOwnProperty(actionsproperty) && actor.data.data.attributes.hasOwnProperty(initiativeproperty) ) {
            actionscolumn=actor.data.data.attributes[actionsproperty].value;
            
            // check if this actor has actions in this segment
            if (arrSegmentTable[segment][actionscolumn]>0){ 
              initiative=actor.data.data.attributes[initiativeproperty].value;
            } 
            
          } else {  
            ui.notifications.warn('Actor ' + thisCombatant.name + ' does not have needed properties('+ actionsproperty + '/' +  initiativeproperty +')');
          }
          game.combat.setInitiative(thisCombatant.id, initiative); 
        } 
        
      }
    }
    function ${thisMacroName()}_ToggleAction(action){ 
      console.log(action.style.textDecoration);
      if(action.style.textDecoration=='none' || action.style.textDecoration=='' ){
        action.style.textDecoration ='line-through'
      } else {
       action.style.textDecoration ='none';
      }
      
    } 
                                                  
    function ${thisMacroName()}_update(){
      //let actionscolumn=0;
      //let initiative=0;
      let actionsproperty='${Setting_ActionsProperty()}';
      let initiativeproperty='${Setting_InitiativeOrderProperty()}'; 
      // get combatatants
      const combatants = game.combat.combatants;
      let arrCombatants=[];
    
      for( let thisCombatant of game.combat.combatants){ 
        // get actor
        let actor=thisCombatant.token.actor;
        if (actor!=null){
          // check actor for attributes
          if (actor.data.data.attributes.hasOwnProperty(actionsproperty) && actor.data.data.attributes.hasOwnProperty(initiativeproperty) ) {
            let c={  
              name:thisCombatant.name,
              id:thisCombatant.id,
              actionscolumn:actor.data.data.attributes[actionsproperty].value,
              initiative:actor.data.data.attributes[initiativeproperty].value
            }
            // add it to array
            arrCombatants.push(c);
          } else {  
            ui.notifications.warn('Actor ' + thisCombatant.name + ' does not have needed properties('+ actionsproperty + '/' +  initiativeproperty +')');
          }
        }
      }
        
      // sort by initiative
      arrCombatants.sort((a, b) => {  
        // if initiative is not equal sort by inititive
        if (b.initiative != a.initiative){
          return b.initiative - a.initiative;
        } else{
          // sort by actions 
          if(b.actionscolumn!=a.actionscolumn){
            return b.actionscolumn - a.actionscolumn;
          } else{
            // both values the same sort by name
            let fa = a.name.toLowerCase();
            let fb = b.name.toLowerCase();

            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0;
          }
        }
      });
      
      let arrSegmentTable = JSON.parse('${Setting_SegmentsTable()}');
      let lowestActionsColumn= parseInt('${Setting_LowestActionsColumn()}');
      let highestActionsColumn=parseInt('${Setting_HighestActionsColumn()}');
      let old_tbody=document.getElementById('${thisMacroName()}_SegmentTableBody'); 
      
      let tbody = document.createElement('tbody');
      tbody.setAttribute("id", '${thisMacroName()}_SegmentTableBody');
      
      // add rows & cells
      for (let irow = 1; irow < arrSegmentTable.length; irow++){ 
        let row = tbody.insertRow(-1); 
        let headerCell = document.createElement("TH");
        headerCell.className='th-segment-cell';
        headerCell.innerHTML = '<input onclick="${thisMacroName()}_SetSegment('+irow+')" class="radio-segment" type="radio" id="segment_' + irow +'" name="current_segment" value="'+irow+'"><label for="segment_'+irow+'">'+irow+'</label>';
        row.appendChild(headerCell);
        for (let icol = lowestActionsColumn; icol <= highestActionsColumn; icol++){ 
          let cell = row.insertCell(-1); 
          cell.className='td-action-cell'; 
          if(arrSegmentTable[irow][icol]>0){
            for(let action=1; action<=arrSegmentTable[irow][icol];action++ ){
              for(let i=0; i<arrCombatants.length;i++ ){ 
                if(arrCombatants[i].actionscolumn==icol){
                cell.innerHTML += '<div class="action-item" id="action-'+ action +'-segment' + irow +'-'+arrCombatants[i].id  +'" onclick="${thisMacroName()}_ToggleAction(this)">' + arrCombatants[i].name +'</div>'; 
                }
              }
            }
          }
        }
      }
      
      old_tbody.parentNode.replaceChild(tbody, old_tbody);
    }

    // Main function
    function ${thisMacroName()}_Main(){ 
     //console.log("${thisMacroName()}_Main()");
     ${thisMacroName()}_update();
    }
                
    // Prepare table
    ${thisMacroName()}_AddActionHeader();
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
