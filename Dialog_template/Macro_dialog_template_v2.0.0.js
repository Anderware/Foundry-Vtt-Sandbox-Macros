//                                                                  
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
//                                                                  
//                     Settings for this macro                      
//                                                                  
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
// 
function Setting_FormWidth(){return 0;} // set to 0 to autosize                                                                                                                                              
function Setting_Greeting()          {return ', it is now ';  }
   
//                                                                  
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
//                                                                  
//                        Macro generic code                        
//                                                                  
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
//         
// **************************************************************** 
// Macro:         Macro Dialog Example                        
// ================================================================ 
// Date       Version  Author               Description             
// ---------- -------- -------------------- -----------------------
// 2021-03-26 1.0.0    Ramses800            Macro created
// 2021-04-04 2.0.0    Ramses800            Complete rewrite  
// ****************************************************************                                                                                                                                         
function macroTitle() {
  let thismacroname=`Macro Dialog Example`;  
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
  </style> 
  
  <!--macro dialog content-->  
  <i id="${thisMacroName()}_btnRefresh" title="Refresh" class="fas fa-redo-alt ${thisMacroName()}_hbo" onclick="${thisMacroName()}_Main()"></i>
  
  <p id="show_here"></p>  
    
  <!--macro dialog scripts-->     
  <script>
   // support functions    
    function ${thisMacroName()}_singleQuoted(text)  {return '&quot;' + text + '&quot;';}  
    
     function ${thisMacroName()}_showTime(){  
      let greeting='';                          
      let currentuser=game.user.name;     
      let dnow = new Date();
      let snow = dnow.toLocaleString();
      if (currentuser==null){
        currentuser='Faceless stranger';
      }     
      greeting=currentuser + '${Setting_Greeting()}' + snow; 
      document.getElementById('show_here').innerText=greeting;
    }

    // Main function
    function ${thisMacroName()}_Main(){ 
     //console.log("${thisMacroName()}_Main()");
     ${thisMacroName()}_showTime();
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
