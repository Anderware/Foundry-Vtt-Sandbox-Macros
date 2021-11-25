//                                                                  
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
//                                                                  
//                        Macro code                        
//                                                                  
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
// 
// **************************************************************** 
// Macro:        BugReport     
// Compability:  Tested with 
//               Foundry 0.8.8 - Sandbox 0.10.1             
// ================================================================ 
// Date       Version  Author               Description             
// ---------- -------- -------------------- -----------------------
// 2021-11-19 1.0.0    Ramses800            Macro created
// ****************************************************************    
function macroTitle() {
  let thismacroname=`Bug Report`; 
  return thismacroname;  
}

// -----------------------------------------------------------------------------
//                               generic macro code
// -----------------------------------------------------------------------------
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



  
function getSysInfo() {
  // 
  // original Client detection script by viazenetti GmbH (Christian Ludwig)
  // found here https://stackoverflow.com/questions/9514179/how-to-find-the-operating-system-details-using-javascript
  let unknown = '-';
  // screen
  let screenSize = '';
  if (screen.width) {
    width = (screen.width) ? screen.width : '';
    height = (screen.height) ? screen.height : '';
    screenSize += '' + width + " x " + height;
  }
  // browser
  let nVer = navigator.appVersion;
  let nAgt = navigator.userAgent;
  let browser = navigator.appName;
  let version = '' + parseFloat(navigator.appVersion);
  let majorVersion = parseInt(navigator.appVersion, 10);
  let nameOffset, verOffset, ix;

  // Opera
  if ((verOffset = nAgt.indexOf('Opera')) != -1) {
    browser = 'Opera';
    version = nAgt.substring(verOffset + 6);
    if ((verOffset = nAgt.indexOf('Version')) != -1) {
      version = nAgt.substring(verOffset + 8);
    }
  }
  // Opera Next
  if ((verOffset = nAgt.indexOf('OPR')) != -1) {
    browser = 'Opera';
    version = nAgt.substring(verOffset + 4);
  }
  // FoundryVirtualTabletop
  else if ((verOffset = nAgt.indexOf('FoundryVirtualTabletop')) != -1) {    
    browser = 'Foundry Virtual Tabletop';
    version = nAgt.substring(verOffset + browser.length - 2 + 1);
  }
  // Legacy Edge
  else if ((verOffset = nAgt.indexOf('Edge')) != -1) {
    browser = 'Microsoft Legacy Edge';
    version = nAgt.substring(verOffset + 5);
  }
  // Edge (Chromium)
  else if ((verOffset = nAgt.indexOf('Edg')) != -1) {
    browser = 'Microsoft Edge';
    version = nAgt.substring(verOffset + 4);
  }
  // MSIE
  else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
    browser = 'Microsoft Internet Explorer';
    version = nAgt.substring(verOffset + 5);
  }
  // Chrome
  else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {
    browser = 'Chrome';
    version = nAgt.substring(verOffset + 7);
  }
  // Safari
  else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
    browser = 'Safari';
    version = nAgt.substring(verOffset + 7);
    if ((verOffset = nAgt.indexOf('Version')) != -1) {
      version = nAgt.substring(verOffset + 8);
    }
  }
  // Firefox
  else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {
    browser = 'Firefox';
    version = nAgt.substring(verOffset + 8);
  }
  // MSIE 11+
  else if (nAgt.indexOf('Trident/') != -1) {
    browser = 'Microsoft Internet Explorer';
    version = nAgt.substring(nAgt.indexOf('rv:') + 3);
  }
  // Other browsers
  else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
    browser = nAgt.substring(nameOffset, verOffset);
    version = nAgt.substring(verOffset + 1);
    if (browser.toLowerCase() == browser.toUpperCase()) {
      browser = navigator.appName;
    }
  }
  // trim the version string
  if ((ix = version.indexOf(';')) != -1)
    version = version.substring(0, ix);
  if ((ix = version.indexOf(' ')) != -1)
    version = version.substring(0, ix);
  if ((ix = version.indexOf(')')) != -1)
    version = version.substring(0, ix);
    majorVersion = parseInt('' + version, 10);
  if (isNaN(majorVersion)) {
    version = '' + parseFloat(navigator.appVersion);
    majorVersion = parseInt(navigator.appVersion, 10);
  }
  // mobile version
  let mobile = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(nVer);
  // cookie
  let cookieEnabled = (navigator.cookieEnabled) ? true : false;

  if (typeof navigator.cookieEnabled == 'undefined' && !cookieEnabled) {
    document.cookie = 'testcookie';
    cookieEnabled = (document.cookie.indexOf('testcookie') != -1) ? true : false;
  }

  // system
  let os = unknown;
  const clientStrings = [
    {s: 'Windows 10', r: /(Windows 10.0|Windows NT 10.0)/},
    {s: 'Windows 8.1', r: /(Windows 8.1|Windows NT 6.3)/},
    {s: 'Windows 8', r: /(Windows 8|Windows NT 6.2)/},
    {s: 'Windows 7', r: /(Windows 7|Windows NT 6.1)/},
    {s: 'Windows Vista', r: /Windows NT 6.0/},
    {s: 'Windows Server 2003', r: /Windows NT 5.2/},
    {s: 'Windows XP', r: /(Windows NT 5.1|Windows XP)/},
    {s: 'Windows 2000', r: /(Windows NT 5.0|Windows 2000)/},
    {s: 'Windows ME', r: /(Win 9x 4.90|Windows ME)/},
    {s: 'Windows 98', r: /(Windows 98|Win98)/},
    {s: 'Windows 95', r: /(Windows 95|Win95|Windows_95)/},
    {s: 'Windows NT 4.0', r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/},
    {s: 'Windows CE', r: /Windows CE/},
    {s: 'Windows 3.11', r: /Win16/},
    {s: 'Android', r: /Android/},
    {s: 'Open BSD', r: /OpenBSD/},
    {s: 'Sun OS', r: /SunOS/},
    {s: 'Chrome OS', r: /CrOS/},
    {s: 'Linux', r: /(Linux|X11(?!.*CrOS))/},
    {s: 'iOS', r: /(iPhone|iPad|iPod)/},
    {s: 'Mac OS X', r: /Mac OS X/},
    {s: 'Mac OS', r: /(Mac OS|MacPPC|MacIntel|Mac_PowerPC|Macintosh)/},
    {s: 'QNX', r: /QNX/},
    {s: 'UNIX', r: /UNIX/},
    {s: 'BeOS', r: /BeOS/},
    {s: 'OS/2', r: /OS\/2/},
    {s: 'Search Bot', r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/}
  ];
  for (let id in clientStrings) {
    let cs = clientStrings[id];
    if (cs.r.test(nAgt)) {
      os = cs.s;
      break;
    }
  }

  let osVersion = unknown;

  if (/Windows/.test(os)) {
    osVersion = /Windows (.*)/.exec(os)[1];
    os = 'Windows';
  }

  switch (os) {
    case 'Mac OS':
    case 'Mac OS X':
    case 'Android':
      osVersion = /(?:Android|Mac OS|Mac OS X|MacPPC|MacIntel|Mac_PowerPC|Macintosh) ([\.\_\d]+)/.exec(nAgt)[1];
      break;

    case 'iOS':
      osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
      osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
      break;
  }
    
  // ---------------------------------------------------------------------------
  // get foundry info
  // ---------------------------------------------------------------------------
  let foundryversion='';
  let gamesystemtitle='';
  let gamesystemversion='';
  let activemodulescount=0;
  try {  
    foundryversion=game.data.version;
    gamesystemtitle=game.system.data.title; 
    gamesystemversion=game.system.data.version;    
    let modules = Array.from(game.modules, ([name, value]) => ({ name, value }))
    for (let i = 0; i < modules.length; i++) {
        if (modules[i].value.active) {
          activemodulescount = activemodulescount + 1;  
        }
      }     
  }
  catch(err){
    ui.notifications.error('Error when attempting to collect Foundry information, see details in console log.' );
    console.error(err);
  }
  
  // assemble data
  let jscd = {
    screen: screenSize,
    browser: browser,
    browserVersion: version,
    browserMajorVersion: majorVersion,
    mobile: mobile,
    os: os,
    osVersion: osVersion,
    cookies: cookieEnabled,
    useragent:nAgt,
    
    foundryversion:foundryversion,
    gamesystemtitle:gamesystemtitle,
    gamesystemversion:gamesystemversion,
    activemodulescount:activemodulescount
  };
  return jscd;
}


let sys_info = getSysInfo();

// -----------------------------------------------------------------------------
//                     This macros main dialog HTML content
// ----------------------------------------------------------------------------- 
let labelwidth=115;
let inputwidth=212;
let modulewarning='';
if(sys_info.activemodulescount>0){
  modulewarning=`<i title="Disable all modules and check if the problem persists" class="${thisMacroName()}_modulewarning fas fa-exclamation-circle"></i>`;
}
let html_content = `
  <!--macro custom styles-->
    <style>  
      .${thisMacroName()}_hbo:hover {cursor: pointer;box-shadow: 0 0 5px darkred;}
      legend.${thisMacroName()}_legend {text-align:left !important;}
      label.${thisMacroName()}_label {min-width:115px;display: inline-block; }
      label.${thisMacroName()}_label_right_column {margin-left: 48px;}
      label.${thisMacroName()}_label_radio {min-width:100px;display: inline-block;}
      label.${thisMacroName()}_label_radio:hover {cursor: pointer;box-shadow: 0 0 5px darkred;}
      input[type="text"].${thisMacroName()}_text_input{width:212px;}
      input[type="text"].${thisMacroName()}_text_input_right_column{width:212px;}
      
      textarea.${thisMacroName()}_text_area_description{width:100%;border: 1px solid #7a7971; border-radius: 3px;}
      input[type="checkbox"].${thisMacroName()}_chk_incorrect_client{vertical-align: middle;        margin: 3px 0px 0px 125px;   }       
      label.${thisMacroName()}_invisible{color:rgba(0, 0, 0, 0)!important;}
      input[type="text"].${thisMacroName()}_invisible{color:rgba(0, 0, 0, 0)!important;background-color:rgba(0, 0, 0, 0)!important;border-style: none;}
      i.${thisMacroName()}_extrainfo{font-size: 16px;    margin: 0px 0px 0px 3px;    padding: 0px 0px 0px 0px;    vertical-align: middle;}
      i.${thisMacroName()}_modulewarning{color: red;    font-size: 21px;    margin: 0px 0px 0px 3px;    padding: 0px 0px 0px 0px;    vertical-align: middle;}
    </style>
  <form style="text-align: left;">
  <fieldset style="text-align: left;display:inline;width:49%">
    <legend class="${thisMacroName()}_legend">Foundry Information</legend> 
    <label class="${thisMacroName()}_label" for="${thisMacroName()}_sys_info_foundry_version">Foundry Version</label>
    <input class="${thisMacroName()}_text_input" type="text" id="${thisMacroName()}_sys_info_foundry_version" name="${thisMacroName()}_sys_info_foundry_version" value="Foundry Virtual Tabletop `+ sys_info.foundryversion +`" disabled><br>     
    <label class="${thisMacroName()}_label" for="${thisMacroName()}_sys_info_game_system_name">Game System</label>
    <input class="${thisMacroName()}_text_input" type="text" id="${thisMacroName()}_sys_info_game_system_name" name="${thisMacroName()}_sys_info_game_system_name" value="`+ sys_info.gamesystemtitle + ` ` + sys_info.gamesystemversion +`" disabled><br>   
    <label class="${thisMacroName()}_label" for="${thisMacroName()}_sys_info_active_module_count">Active Modules</label>
    <input class="${thisMacroName()}_text_input" style="width:60px;" type="text" id="${thisMacroName()}_sys_info_active_module_count" name="${thisMacroName()}_sys_info_active_module_count" value="`+sys_info.activemodulescount+`" disabled>`+ modulewarning + `      
  </fieldset>
        
  <fieldset style="text-align: left;display:inline;height: 110px;vertical-align: top;">
    <legend class="${thisMacroName()}_legend">Hosting Information</legend>   
    
    <input class="${thisMacroName()}_hbo" style="margin-left:0px;" type="radio" id="${thisMacroName()}_sys_info_self_hosted" name="${thisMacroName()}_sys_info_hosting" value="Self-hosted">
    <label class="${thisMacroName()}_label_radio" for="${thisMacroName()}_sys_info_self_hosted">Self-hosted</label><br>
    
    <input class="${thisMacroName()}_hbo" style="margin-left:0px;" type="radio" id="${thisMacroName()}_sys_info_hostingservice" name="${thisMacroName()}_sys_info_hosting" value="Hosting Service">    
    <label class="${thisMacroName()}_label_radio" for="${thisMacroName()}_sys_info_hostingservice">Hosting Service</label>                
    
    
    <input class="${thisMacroName()}_text_input" style="margin-left: 10px;" type="text" id="${thisMacroName()}_sys_info_hosting_service" name="${thisMacroName()}_sys_info_hosting_service" value="">
  </fieldset>
    
  <fieldset style="text-align: left;">
    <legend class="${thisMacroName()}_legend">Client Information</legend>
    <label class="${thisMacroName()}_label" for="${thisMacroName()}_sys_info_os">Operating System</label>
    <input class="${thisMacroName()}_text_input" type="text" id="${thisMacroName()}_sys_info_os" name="${thisMacroName()}_sys_info_os" value="` + sys_info.os + ` `  + sys_info.osVersion + `" disabled >
    
    <label class="${thisMacroName()}_label ${thisMacroName()}_label_right_column" for="${thisMacroName()}_sys_info_os_also">Bug also found on</label>
    <input style="width:${inputwidth}px;" type="text" id="${thisMacroName()}_sys_info_os_also" name="${thisMacroName()}_sys_info_os_also" value="" > <br>
    
    <label class="${thisMacroName()}_label" for="${thisMacroName()}_sys_info_client_name">Desktop Client</label>
    <input class="${thisMacroName()}_text_input" type="text" id="${thisMacroName()}_sys_info_client_name" name="${thisMacroName()}_sys_info_client_name" value="` + sys_info.browser + ` ` + sys_info.browserVersion + `" disabled>
    
    <label class="${thisMacroName()}_label ${thisMacroName()}_label_right_column" for="${thisMacroName()}_sys_info_client_name_also">Bug also found on</label>
    <input class="${thisMacroName()}_text_input" type="text" id="${thisMacroName()}_sys_info_client_name_also" name="${thisMacroName()}_sys_info_client_name_also" value="">
    
    <label class="${thisMacroName()}_label" for="${thisMacroName()}_sys_info_client_name_not_correct"> Detected client is incorrect <i title="Some browser identify themselves as another browser, this can be on purpose or not. &#013;&#010;This client provided the following User Agent string: &#013;&#010; ${sys_info.useragent}" class="${thisMacroName()}_extrainfo far fa-question-circle"></i></label>
    <input class="${thisMacroName()}_hbo ${thisMacroName()}_chk_incorrect_client" type="checkbox" id="${thisMacroName()}_sys_info_client_name_not_correct" name="${thisMacroName()}_sys_info_client_name_not_correct" onclick="${thisMacroName()}_toggle_display()" value="">
    
    
    
    <label class="${thisMacroName()}_label ${thisMacroName()}_label_right_column ${thisMacroName()}_invisible" name="${thisMacroName()}_sys_info_client_name_corrected_label" for="${thisMacroName()}_sys_info_client_name_corrected" disabled>Actual client used</label>
    <input class="${thisMacroName()}_text_input ${thisMacroName()}_invisible" type="text" id="${thisMacroName()}_sys_info_client_name_corrected" name="${thisMacroName()}_sys_info_client_name_corrected" value="" disabled>
    
    
    
</fieldset>
    
  <fieldset style="text-align: left;">
    <legend class="${thisMacroName()}_legend">Bug Information</legend> 
    <label class="${thisMacroName()}_label" for="${thisMacroName()}_subject">Subject:</label><br>
    <input style="width:100%;" type="text" id="${thisMacroName()}_subject" name="${thisMacroName()}_subject" value=""><br>
    <label class="${thisMacroName()}_label" for="${thisMacroName()}_description">Description:</label><br>
    <textarea class="${thisMacroName()}_text_area_description" id="${thisMacroName()}_description" name="${thisMacroName()}_description" rows="10" cols="50"></textarea>
  </fieldset>
  </form>
  
  <br>
  
  <button id="${thisMacroName()}_btnCopy" style="width:32%;cursor:pointer;"  onclick="${thisMacroName()}_copyBugReport(false)" title="Copy Bug Report as text to Clipboard"><i class ="fas fa-copy"></i>Copy</button>
  <button id="${thisMacroName()}_btnCopyForDiscord" style="width:32%;cursor:pointer;"  onclick="${thisMacroName()}_copyBugReport(true)" title="Copy Bug Report as Discord formatted text to Clipboard"><i class ="fab fa-discord"></i>Copy with Discord formatting</button>
  
  <button id="${thisMacroName()}_btnCloseThisDialog" style="width:32%;cursor:pointer;"  onclick="${thisMacroName()}_closethisdialog()" title="Close this dialog"><i class ="fas fa-window-close"></i>Close</button>
  <!--Hidden marker element used to detect if dialog is loaded-->
  <input type="hidden" id="${thisMacroName()}_appId" value="-1"> 
  
  <script>
  function ${thisMacroName()}_toggle_display(){
    let element=document.querySelector('input[name="${thisMacroName()}_sys_info_client_name_corrected"]');
    ;
    element.classList.toggle("${thisMacroName()}_invisible");
    element.toggleAttribute("disabled");
    // the label
    element=document.querySelector('label[name="${thisMacroName()}_sys_info_client_name_corrected_label"]');
    element.classList.toggle("${thisMacroName()}_invisible");
  }  
    
  function ${thisMacroName()}_copyBugReport(discordformatting=false){
    let sBugReport='';
    // validate inputs
    let valid_input=true;
    let hosting_answer = document.querySelector('input[name="${thisMacroName()}_sys_info_hosting"]:checked');
    
    if(hosting_answer==null){
      ui.notifications.warn('No hosting selected');
      valid_input=false;
    }
      
    if(valid_input){
      let activemodulecount=document.querySelector('input[name="${thisMacroName()}_sys_info_active_module_count"]').value;
      let moduletext='';
      if (activemodulecount==0){
        moduletext='TRUE';
      }
      else{
        moduletext='FALSE - '+ activemodulecount +' active modules';
      }
      let hostingtext='';
      if(hosting_answer.value=='Self-hosted'){
        hostingtext='Self-hosted';
      }
      else{
        hostingtext='Hosting service';
        let hosting_service=document.querySelector('input[name="${thisMacroName()}_sys_info_hosting_service"]').value;
        if(hosting_service.length>0){
          hostingtext += ' - '+ hosting_service + ''; 
        }
      }
      
      let ostext=document.querySelector('input[name="${thisMacroName()}_sys_info_os"]').value;
      let osalso=document.querySelector('input[name="${thisMacroName()}_sys_info_os_also"]').value
      if (osalso.length>0){
        ostext += ', ' + osalso;
      } 
    
      let clienttext=document.querySelector('input[name="${thisMacroName()}_sys_info_client_name"]').value;
      let actualclient=document.querySelector('input[name="${thisMacroName()}_sys_info_client_name_corrected"]').value;
      let clientincorrect = document.querySelector('input[name="${thisMacroName()}_sys_info_client_name_not_correct"]');
      if(clientincorrect.checked){
        clienttext=actualclient;
      }
      let clientalso=document.querySelector('input[name="${thisMacroName()}_sys_info_client_name_also"]').value
      if (clientalso.length>0){
        clienttext += ', ' + clientalso;
      }
    
      // assemble report
      let headersuffix='';
      let headerprefix='';
      if (discordformatting){
        headersuffix='\`';
        headerprefix='\`';
      }
      sBugReport  =headerprefix + 'ALL MODULES DISABLED    :'+ headersuffix + ' ' + moduletext + '\\n';
      sBugReport +=headerprefix + 'FOUNDRY VERSION         :'+ headersuffix + ' ' + document.querySelector('input[name="${thisMacroName()}_sys_info_foundry_version"]').value + '\\n';
      sBugReport +=headerprefix + 'GAME SYSTEM             :'+ headersuffix + ' ' + document.querySelector('input[name="${thisMacroName()}_sys_info_game_system_name"]').value+ '\\n';
      sBugReport +=headerprefix + 'CLIENT OPERATING SYSTEM :'+ headersuffix + ' ' + ostext + '\\n';      
      sBugReport +=headerprefix + 'CLIENT BROWSER          :'+ headersuffix + ' ' + clienttext+ '\\n\\n';
      sBugReport +=headerprefix + 'HOSTING                 :'+ headersuffix + ' ' + hostingtext+ '\\n';
      sBugReport +=headerprefix + 'SUBJECT                  '+ headersuffix + ' \\n' + document.querySelector('input[name="${thisMacroName()}_subject"]').value+ '\\n';
      sBugReport +=headerprefix + 'DESCRIPTION              '+ headersuffix + ' \\n' + document.querySelector('textarea[name="${thisMacroName()}_description"]').value+ '\\n';
      navigator.clipboard.writeText(sBugReport);
      ui.notifications.info('Bug report copied to Clipboard');
    }
  }  
  </script> 
  
  <script>
    function ${thisMacroName()}_closethisdialog(){     
      let appId_element=document.getElementById('${thisMacroName()}_appId'); 
      if (appId_element!=null){            
        let appId=appId_element.getAttribute('value');
        if (appId!=null){ 
          let app=ui.windows[appId];
          if (app!=null){                
            app.close();             
          }
        }
      }      
    }
  </script>
    
`;
// -----------------------------------------------------------------------------
//                          HTML dialog content completed
// -----------------------------------------------------------------------------
// check if this macro dialog is already loaded 
let appId_element=document.getElementById(`${thisMacroName()}_appId`); 
if (appId_element!=null){
  // already loaded    
  let appId=appId_element.getAttribute('value');
  if (appId!=null){ 
    let app=ui.windows[appId];
    if (app!=null){    
      // attempt to bring to the front
      app.bringToTop(); 
      // and trigger refresh content button(if applicable)
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
  let d = new Dialog({
    title: `${macroTitle()}`,
    content: html_content,
    buttons: {},        
    render: html => document.getElementById(`${thisMacroName()}_appId`).setAttribute('value', d.appId)
  });
  d.options.width = 768;
  d.position.width = 768;
  d.options.resizable=false;
  d.options.closeOnEscape= true;
  d.render(true);        
}
