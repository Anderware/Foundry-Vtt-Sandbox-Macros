let html = `
  <script>                                                                    
  function Setting_Greeting()          {return ', it is now ';  }
  </script>
  <style>  
  .hbo:hover {box-shadow:0 0 5px red}
  </style>       
  <i id="TemplateMacrorefreshbtnid" title="Refresh" class="fas fa-redo-alt hbo" onclick="showTime()"></i>
  <p id="show_here"></p>        
  <script>
  function singleQuote(){
    return '&quot;';
  }      
  function showTime(){  
    let greeting='';                          
    let currentuser=game.user.name;     
    let dnow = new Date();
    let snow = dnow.toLocaleString();
    if (currentuser==null){
      currentuser='Faceless stranger';
    }     
    greeting=currentuser + Setting_Greeting() + snow; 
    document.getElementById('show_here').innerText=greeting;
  }  
  showTime();
  </script>
  <!--Marker element to detect if macro is running-->
  <input type="hidden" id="TemplateMacro_appId" value="-1"> 
`;
  // HTML Form completed
  // check if this already loaded 
  let appId_element=document.getElementById('TemplateMacro_appId'); 
  if (appId_element!=null){
    // already loaded    
    let appId=appId_element.getAttribute('value');
    if (appId!=null){ 
      let app=ui.windows[appId];
      if (app!=null){    
        // attempt to bring to the front
        app.bringToTop(); 
        // and trigger refresh content button
        let elem = document.getElementById("TemplateMacrorefreshbtnid");
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
     title: "Macro template example",
     content: html,
     buttons: {},
     render: html => document.getElementById('TemplateMacro_appId').setAttribute('value',d.appId),
    });
    d.options.width = 200;
    d.position.width = 200;
    d.options.resizable=true;
    d.render(true);        
  }
