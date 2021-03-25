let html = `
  <script>  
  // --------------------------------------------------------------------------------------
  // GearExchange
  // This macro needs the following
  //  - Gear ciTems must belong to a specific group
  //  - User must have OWNER right to both source actor and target actor
  // Change settings to fit your needs
  // 
  // To change the width of the form(dialog), change the rows at the bottom with
  //   d.options.width = 600;
  //   d.position.width = 600;
  //
  // Macro by Ramses800, 2021-03-25
  // ---------------------------------------------------------------------------------------
  function Setting_GearGroupKey()          {return 'grpGear';  }// this must be specified according to your groups key 
  function Setting_CommonStorageName()          {return 'Group Storage';  }// this must be specified according to your common actor
  // ---------------------------------------------------------------------------------------
  // generic code below
  // ---------------------------------------------------------------------------------------
  </script>
  <style> 
  table.mastertable{   
    width:100%;
    border-spacing: 0px;
    border-top: 0px solid transparent;
    border-bottom: 0px solid transparent;
    background: rgba(0, 0, 0, 0) !important;
  }
  td.topAlign{
    vertical-align:top;
  } 
  td.centerAlign{
    text-align:center;
  } 
            
  th.portrait{          
    text-align:left;
    height:55px; 
    width:60px;
    padding:2px 0px 0px 2px;
    vertical-align:middle;
  }             
  
  th.leftpad{
    padding-left:3px;
    padding-right:3px;
  }
  
  tbody.sep{
    background: rgba(0, 0, 0, 0) !important;
  }
  
  td.halftd{  
    width:50%;  
    text-align:left; 
    vertical-align:top; 
    padding:0px 3px 0px 3px;
    background: rgba(0, 0, 0, 0) !important;
  }  
  
  tr.major{
    padding:0px 0px 0px 0px;
    border: 0px solid transparent;
    background: rgba(0, 0, 0, 0) !important;
    margin-top:0px;
    
  }
  td.moveaction{
    width:24px;
    text-align:center;
    padding-right: 3px;
    padding-left:3px;
  }
  th.alignLeftth{
    text-align:left;
    width:40%;
  } 
  img.item{
    height:36px;
  } 
  td.itemimage{
    width:40px;
  }    
  td.itemname{
    padding-left:3px;
  }
  tr.actorbar{
    height:55px;
  }  
 
  .hbo:hover {box-shadow:0 0 5px red}
  </style>     
  
  <i title="Refresh" class="fas fa-redo-alt hbo" onclick="ListGear()"></i>
  <table id="tblGearExchange" class="mastertable"> 
    <tbody class="sep">
    <tr class="major">
      <td class="halftd"> 
        <table>
         <thead>
            <tr><th id="ActorAPortrait" class="portrait"></th><th id="ActorAName" class="halftd"></th></tr>
          </thead>  
        </table>
      </td>
      <td class="halftd">
        <table> 
          <thead>
            <tr><th id="ActorBPortrait" class="portrait"></th><th id="ActorBName" class="halftd"></th></tr>
          </thead>  
        </table>
      </td>
    </tr>
    
    <tr class="major">
      <td class="halftd"> 
        <table id="tblActorAGear" class="halftable" >
        <thead>
        <tr><th class="leftpad">Item</th><th class="alignLeftth"></th><th class="leftpad">Quantity</th><th class="leftpad">Uses</th><th></th><th></th></tr>
        </thead> 
        <tbody id="tbodyAGear">
        </tbody>
        </table>
      </td>  
      
      <td class="halftd">
        <table id="tblActorBGear"class="halftable"> 
        <thead>
        <tr><th></th><th></th><th class="leftpad">Item</th><th class="alignLeftth"></th><th class="leftpad">Quantity</th><th class="leftpad">Uses</th></tr>
        </thead>
        <tbody id="tbodyBGear">
        </tbody>
        </table>
      </td>
    </tr>  
    </tbody>
  </table> 
        
  
<script>
  function singleQuote()
  {
    return '&quot;';
  }
  async function ExchangeGear(sourceActorID,targetActorID,itemID,itemCount=1,uses=1){ 
  try{
    let actorSource =await game.actors.get(sourceActorID);
    let actorTarget = await game.actors.get(targetActorID);
    let item = await game.items.get(itemID);     
    //console.log(item.img);
    //console.log('Moving ' +itemCount + item.name + ' with ' + uses + ' uses '  +  ' from ' + actorSource.name + ' to ' + actorTarget.name );
    let citem;   
    let subitemsTag;
    let isTab = false;
    let subiDataKey;
    let isUnique = false; 
    subitemsTag = "citems";
    subiDataKey = "ciKey";
    let subitems;  
    
    // check if target already has this citem
    citem = actorTarget.data.data.citems.find(y=>y.name == item.name);
    // target handling
    if(citem==null){
      // add it to target
      citem = await actorTarget.addcItem(item);
      //
      subitems = actorTarget.data.data[subitemsTag];
      for (let i=0;i<subitems.length;i++) {
        if (subitems[i].id == itemID) {
          subitems[i].number = parseInt(itemCount);
          subitems[i].uses = parseInt(uses);                   
          actorTarget.data.data.citems= subitems;                                                 
        }
      } 
    }
    else    
    {
      // increase count on target      
      subitems = actorTarget.data.data[subitemsTag];
      for (let i=0;i<subitems.length;i++) {
        if (subitems[i].id == itemID) {
          subitems[i].number = parseInt(subitems[i].number) + parseInt(itemCount);
          subitems[i].uses = parseInt(subitems[i].uses) + parseInt(uses);                   
          actorTarget.data.data.citems= subitems;                                                 
        }
      }      
    }  
    // now adjust source
    citem = actorSource.data.data.citems.find(y=>y.name == item.name); 
    if(citem.number==1){
      // delete it 
      await actorSource.deletecItem(itemID);        
    }             
    else{        
      subitems = actorSource.data.data[subitemsTag];
      for (let i=0;i<subitems.length;i++) {
        if (subitems[i].id == itemID) {
          subitems[i].number = parseInt(subitems[i].number) - itemCount;
          if(parseInt(subitems[i].uses) - parseInt(uses)<=0){ 
             subitems[i].uses =0;
          }
          else{
            subitems[i].uses = parseInt(subitems[i].uses) - parseInt(uses);
          } 
          actorSource.data.data.citems= subitems;
          if (subitems[i].number==0){
            await actorSource.deletecItem(itemID);
          }                                                 
        }
      }
    }                          
    // update both
    await actorTarget.update(actorTarget.data); 
    await actorSource.update(actorSource.data);
    // finally refresh list 
    ListGear();
    }
    catch(err){
      console.log('ERR:' + err);
    }
  }   
  
function sortTableBodyByColumn(tableBody,columnNumber) { // (string,integer)
  //var tableElement=document.getElementById(tableId);
  [].slice.call(tableBody.rows).sort(function(a, b) {
    return (
      a.cells[columnNumber-1].textContent<b.cells[columnNumber-1].textContent?-1:
      a.cells[columnNumber-1].textContent>b.cells[columnNumber-1].textContent?1:
      0);
  }).forEach(function(val, index) {
    tableBody.appendChild(val);
  });
}
  
  async function ListGear(){
    let itemSelectedGroupKey=Setting_GearGroupKey();       
    
    let table ; 
    table= document.getElementById("tblActorAGear"); 
    // empty gear tables
    if (table.rows.length>0){
      for(let i=table.rows.length;i>1;i--){
        table.deleteRow(-1);	
      }
    }
    table= document.getElementById("tblActorBGear");
    // empty table
    if (table.rows.length>0){
      for(let i=table.rows.length;i>1;i--){
        table.deleteRow(-1);	
      }
    }  
    let selected = canvas.tokens.controlled; 
    if (selected!=null){         
      let tokenA;
      let tokenB;
      let actorA;
      let actorB; 
      let actorBID; 
      let actorAID;
      let tbody;
      let thCell;           
      let row;
      let tdCell;   
      let item;
      let usestomoveforsingleitem=1; 
      let citems;  
      let showmoveactions=false;
      let actorBStatus=0;  
      let userprimarycharacter;
      
      // if no tokens selected - show primary and common
      if (selected.length==0){
        userprimarycharacter=game.user.character;          
        if (userprimarycharacter!=null){
          actorAID=userprimarycharacter._id;
          actorA= game.actors.get(actorAID);
        }  
        actorB = game.actors.getName(Setting_CommonStorageName() );
        if(actorB!=null){
          actorBID=actorB._id;
          actorBStatus=2;
        } 
        else{              
          actorBStatus=-2;
        }
      }
      // if 1 token selected - show token and primary
      else if(selected.length==1){
        tokenA = selected[0];
        actorA = tokenA.actor;  
        actorAID=actorA._id; 
        
        userprimarycharacter=game.user.character;          
        if (userprimarycharacter!=null){
          actorBID=userprimarycharacter._id;
          actorB= game.actors.get(actorBID);
        }  
        // if the single selected is the same as primary or primary not found show common instead 
        if (actorAID==actorBID || userprimarycharacter==null){
          actorB = game.actors.getName(Setting_CommonStorageName() );
          if(actorB!=null){
            actorBID=actorB._id;
            actorBStatus=2;
          } 
          else{              
            actorBStatus=-2;
          }
        }
              
      }            
      // if 2 token selected - show token 1 and token 2
      else if(selected.length>=2){
        tokenA = selected[0];
        actorA = tokenA.actor;  
        actorAID=actorA._id;
        tokenB = selected[1]; 
        actorB = tokenB.actor;
        actorBID=actorB._id; 
        actorBStatus=1;
      }

      // ------- 
      // Actor A 
      // ------
      if (actorA==null){
        thCell = document.getElementById("ActorAName");
        thCell.innerHTML= 'Not selected'; 
        thCell = document.getElementById("ActorAPortrait");
        thCell.innerHTML='';
      }
      else{                                              
        
        // list all citems for actor a   
        //console.log(actorA.name);       
        thCell = document.getElementById("ActorAName");
        thCell.innerHTML= actorA.name;
        thCell = document.getElementById("ActorAPortrait");
        thCell.innerHTML='<img style="height:48px;width:48px;object-fit:cover;object-position:50% 0;margin: 0 8px 0 2px;border: none;" src="' + actorA.data.img +'"</img>'; 
               
        tbody= document.getElementById("tbodyAGear"); 
        citems = actorA.data.data.citems;
        if(citems!=null){
          for(let l=0;l<citems.length;l++){            
            let citem=citems[l];
            // check if this citem has any group                
            if (citem.groups.length>0){                         
              // loop all the groups of this citem                 
              for(let iGroup=0;iGroup<citem.groups.length;iGroup++){  
                //console.log(citem.groups[iGroup]);
                if(citem.groups[iGroup].ikey==itemSelectedGroupKey){ 
                  //console.log(citem.id + " " +citem.number + " " +citem.name ); 
                  //console.log(citem);
                  row=tbody.insertRow(-1);  
                  let item = game.items.get(citem.id);     
                   
                  tdCell=row.insertCell(-1)
                  tdCell.className='itemimage';
                  tdCell.innerHTML='<img class="item" src="' + item.img + '"></img>';
                  
                  tdCell=row.insertCell(-1)
                  tdCell.innerHTML=citem.name;
                  tdCell.className='itemname';
                  tdCell=row.insertCell(-1);
                  tdCell.innerHTML=citem.number; 
                  tdCell.className='centerAlign';
                  tdCell=row.insertCell(-1);                     
                  if(citem.number==1){
                    usestomoveforsingleitem=citem.uses;
                  }                       
                  else{
                    if(citem.uses<citem.maxuses){
                      usestomoveforsingleitem=citem.uses;
                    }                                    
                    else{                    
                      usestomoveforsingleitem=citem.maxuses;
                    }
                  }                    
                  if(citem.usetype== 'CON'){
                    //console.log(citem); 
                    tdCell.innerHTML=citem.uses + '/' + (citem.maxuses*citem.number) ;                    
                  } 
                  else{
                    tdCell.innerHTML='';
                  }
                  tdCell.className='centerAlign'; 
                  tdCell=row.insertCell(-1); 
                  if(actorAID!=null && actorBID!=null && citem.id!=null ){ 
                    showmoveactions=true;                       
                  }
                  
                  else{
                    showmoveactions=false;
                  }
                   
                  if(showmoveactions==true){                      
                    tdCell.innerHTML='<i title="Move all items" class=" fas fa-angle-double-right hbo" onclick="ExchangeGear(' + singleQuote() + actorAID  + singleQuote() +','+ singleQuote()+ actorBID + singleQuote() +',' + singleQuote() + citem.id + singleQuote() +',' +singleQuote() + citem.number +singleQuote() +','+singleQuote() + citem.uses +singleQuote()  +');"></i>';                  
                  }
                                    
                  tdCell.className='moveaction';
                  tdCell=row.insertCell(-1);  
                  if(showmoveactions==true){                                     
                    tdCell.innerHTML='<i title="Move single item" class=" fas fa-angle-right hbo" onclick="ExchangeGear(' + singleQuote() + actorAID  + singleQuote() +','+ singleQuote()+ actorBID + singleQuote() +',' + singleQuote() + citem.id + singleQuote() +',1,' +singleQuote() + usestomoveforsingleitem +singleQuote()  +');"></i>';
                  }
                  tdCell.className='moveaction'; 
                }                    
              }                                        
            }
          }
        }
        // sort table
          
        sortTableBodyByColumn(tbody,2);
       }
     // -------------
     // Actor B 
     // ------------
      if(actorB==null){
        thCell = document.getElementById("ActorBName"); 
        if(actorBStatus==-2){
          thCell.innerHTML= 'No common storage found';
        }
        else{
          thCell.innerHTML= 'Not selected';
        }
        thCell = document.getElementById("ActorBPortrait");
        thCell.innerHTML='';
        }
        else
        {                 
        // list alll items for actor b 
        //console.log(actorB.name);  
        thCell = document.getElementById("ActorBName");
        thCell.innerHTML= actorB.name;
        thCell = document.getElementById("ActorBPortrait");
        thCell.innerHTML='<img style="height:48px;width:48px;object-fit:cover;object-position:50% 0;margin: 0 8px 0 2px;border: none;" src="' + actorB.data.img +'"</img>'; 
        
        tbody=document.getElementById("tbodyBGear");     
        citems = actorB.data.data.citems;
        if(citems!=null){
          for(let l=0;l<citems.length;l++){            
            let citem=citems[l];
            // check if this citem has any group                
            if (citem.groups.length>0){                         
              // loop all the groups of this citem
              for(let iGroup=0;iGroup<citem.groups.length;iGroup++){
                if(citem.groups[iGroup].ikey==itemSelectedGroupKey){ 
                  //console.log(citem.id + " " +citem.number + " " +citem.name );                   
                  row=tbody.insertRow(-1);         
                  tdCell=row.insertCell(-1); 
                  if(citem.number==1){
                    usestomoveforsingleitem=citem.uses;
                  }                       
                  else{
                    if(citem.uses<citem.maxuses){
                      usestomoveforsingleitem=citem.uses;
                    }                                    
                    else{                    
                      usestomoveforsingleitem=citem.maxuses;
                    }
                  }      
                  if(actorAID!=null && actorBID!=null && citem.id!=null ){ 
                    showmoveactions=true;                       
                  }
                  
                  else{
                    showmoveactions=false;
                  }  
                  if(showmoveactions==true){         
                    tdCell.innerHTML='<i title="Move single item" class=" fas fa-angle-left hbo" onclick="ExchangeGear(' + singleQuote() + actorBID  + singleQuote() +','+ singleQuote()+ actorAID + singleQuote() +',' + singleQuote() + citem.id + singleQuote() +',1,' +singleQuote() + usestomoveforsingleitem +singleQuote()  +');"></i>';
                  }
                  tdCell.className='moveaction';
                  tdCell=row.insertCell(-1);
                  if(showmoveactions==true){                  
                    tdCell.innerHTML='<i title="Move all items" class=" fas fa-angle-double-left hbo" onclick="ExchangeGear(' + singleQuote() + actorBID  + singleQuote() +','+ singleQuote()+ actorAID + singleQuote() +',' + singleQuote() + citem.id + singleQuote() +',' +singleQuote() + citem.number +singleQuote() +','+singleQuote() + citem.uses +singleQuote()   +');"></i>';
                  }
                  tdCell.className='moveaction'; 
                  let item = game.items.get(citem.id);
                  tdCell=row.insertCell(-1) 
                  tdCell.className='itemimage';
                  tdCell.innerHTML='<img class="item" src="' + item.img + '"></img>';
                  tdCell=row.insertCell(-1)
                  tdCell.innerHTML=citem.name;
                  tdCell.className='itemname';
                  tdCell=row.insertCell(-1)
                  tdCell.innerHTML=citem.number;  
                  tdCell.className='centerAlign';
                  tdCell=row.insertCell(-1); 
                  if(citem.usetype== 'CON'){ 
                    tdCell.innerHTML=citem.uses + '/' + (citem.maxuses*citem.number) ;                    
                  } 
                  else{
                    tdCell.innerHTML='';
                  }
                  tdCell.className='centerAlign';
                }                    
              }                                        
            }
          }
        }
        // sort table
        
        sortTableBodyByColumn(tbody,4);                        
      }    
    }        
  }    
  ListGear();
</script>
`;
// HTML Form completed
// show it as dialog
let d = new Dialog({
 title: "Gear Exchange",
 content: html,
 buttons: {
  },
});
d.options.width = 600;
d.position.width = 600;
d.render(true);