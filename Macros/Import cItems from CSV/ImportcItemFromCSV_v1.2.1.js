  //                                                                  
  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
  //                                                                  
  //                     Settings for this macro                      
  //                                                                  
  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
  // 
  function Setting_ShowDebugMsg(){return false;}  // set to true to show detailed debug info
  function Setting_FormWidth(){return 610;} // set to 0 to autosize                                                                                                                                              

     
  //                                                                  
  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
  //                                                                  
  //                        Macro generic code                        
  //                                                                  
  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
  //         
  // **************************************************************** 
  // Macro:             : ImportcItemsFromCSV      
  // Version Compability: Tested with
  //                      Sandbox 0.14.0 | Foundry 10.291                         
  // ================================================================ 
  // Date       Version  Author               Description             
  // ---------- -------- -------------------- -----------------------
  // 2021-09-09 1.0.0    Ramses800            Macro created 
  // 2022-07-24 1.0.1    Ramses800            Rewrite of cloning, now item attributes will be added on first import correctly
  // 2023-02-09 1.1.0    Ramses800            Rewrite for Foundry v10
  // 2023-02-12 1.2.0    Ramses800            Folder are now using hiearchical naming and are created if not existing 
  // 2024-03-02 1.2.1    Ramses800            Error information for unhandled errors, fix for if any citems is located at root
  // ****************************************************************                                                        
  function macroVersion(){
    return "1.2.1";
  }                                                                                 
  function macroTitle() {
    let thismacroname=`Import cItem from CSV`+` (version ` + macroVersion() +`)`;  
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
      
    <fieldset>
    <legend style="text-align:left">Import settings</legend>   
    
    <table style="border: 0px solid black;text-align:left">
      <tr>
        <td> 
          CSV file <input style="width: 85%;border: 1px solid black;" type="text" id="${thisMacroName()}_csvfile" style="width:80%;height:26px;" value="" disabled>
        </td>
        <td style="text-align:center"> 
          <input id="${thisMacroName()}_btnFilePicker" type="button" onclick="${thisMacroName()}_pickFile('${thisMacroName()}_csvfile')" value="..." style="width:26px;height:26px;">
        </td>
      </tr>
       
      <tr> 
        <td>List separator character used in CSV-file  </td>
        <td style="text-align:center;">
          <select id="${thisMacroName()}_listseparator" style="background-color:white;">
            <option value="|" selected>|</option>
            <option value=";">;</option>
            <option value=",">,</option> 
          </select>
        </td>
      </tr>
      
      <tr>
        <td> 
          <label for="${thisMacroName()}_chkUpdateExisting">Update existing items with data from import file</label>
        </td>
        <td style="text-align:center"> 
          <input type="checkbox" id="${thisMacroName()}_chkUpdateExisting">
        </td> 
      </tr>
      
      <tr>
        <td>
          <label  for="${thisMacroName()}_chkUpdatesRequireIdenticalGroups">For update of existing items, require identical Group configuration</label>
        </td>
        <td style="text-align:center"> 
          <input  type="checkbox" id="${thisMacroName()}_chkUpdatesRequireIdenticalGroups" >       
        </td>
      </tr>
    </table>
    
    </fieldset>
    
    <fieldset style="text-align:left;">
    <legend style="text-align:left">Import results</legend> 
    <label  for="${thisMacroName()}_importcount">Import count</label>
    <input type="number" id="${thisMacroName()}_importcount" style="width:48px;height:26px;border: 1px solid black;" value="0" disabled>
    
    <label  for="${thisMacroName()}_updatecount">Updates</label>
    <input type="number" id="${thisMacroName()}_updatecount" style="width:48px;height:26px;border: 1px solid black;" value="0" disabled>
        
    <label  for="${thisMacroName()}_importwarningcount">Warnings</label>
    <input type="number" id="${thisMacroName()}_importwarningcount" style="width:48px;height:26px;border: 1px solid black;" value="0" disabled>
    
    <label  for="${thisMacroName()}_importerrcount">Errors</label>
    <input type="number" id="${thisMacroName()}_importerrcount" style="width:48px;height:26px;border: 1px solid black;" value="0" disabled>
    
    <table style="height:250px;border:1px solid black;border-style:inset;" >
      <thead style="display:block;color:black;background-color:gainsboro;">
        <tr>
          <th style="width:64px;padding-left:4px;font-weight:normal;text-shadow: none;border-right:1px solid black">Class</th><th style="width:100%px;padding-left:4px;font-weight:normal;text-shadow: none;">Message</th>
        </tr>
      </thead>
      <tbody id="import_tablelog" style="display:block;height: 250px;overflow-y: auto;overflow-x: hidden;background-color: white !important;">
      </tbody>
    </table> 
    </fieldset>
          
    
    
    <input id="${thisMacroName()}_btnExecuteImport" type="button" style="width:50%;height:34px;margin-top:8px;" onclick="${thisMacroName()}_ImportcItemFromCSV()" value="Run import" style="height:26px;margin-left:2px;margin-top:3px;">  
    <!--macro dialog scripts-->     
    <script>       
    
    function ${thisMacroName()}_LogImportMessage(msg,msgclass='Info',scrollToLast=false){ 
      if (msgclass=='Debug' &&  ${Setting_ShowDebugMsg()}==false){
        // dont log this, exit
        return 0;
      }
      //access the table and store it in a variable
      let table = document.querySelector('#import_tablelog');
      //create rows and store it in a variable
      let row = table.insertRow();             
      let backgroundcolor;       
      
      switch(msgclass){ 
        case 'Debug':
          backgroundcolor='skyblue'; 
          console.log('${macroTitle()} | ' + msg );
          break;
        case 'Warning':
          backgroundcolor='yellow';  
          console.warn('${macroTitle()} | ' + msg );
          break;
        case 'Error':
          backgroundcolor='red';
          console.error('${macroTitle()} | ' + msg );
          break;              
        default:
          backgroundcolor='white';  
          //console.log('${macroTitle()} | ' + msg );
          break;
      }     
      //now need to give some data to the table
      row.innerHTML = '<td style="vertical-align: top;padding-left:4px;padding-right:4px;background-color: ' + backgroundcolor +' !important;">' + msgclass + '</td><td style="vertical-align: top;padding-left:4px;padding-right:4px;width:90%;background-color: ' + backgroundcolor +' !important;">' + msg + '</td>';
      if(scrollToLast){
        table.scrollTop = table.scrollHeight;
      }  
    }
    
    
    // support functions  
    async function ${thisMacroName()}_confirmDialog(sTitle,sQuestion){
      let dialog=new Promise((resolve,reject)=>{
        new Dialog({
          title: sTitle,
          content: '<p>' + sQuestion + '</p>' ,
          buttons: {
            ok: {
              icon:'<i class ="fas fa-check"></i>',
              label: "Ok",            
              callback: () => {resolve(true)}
            },
            cancel: { 
              icon:'<i class ="fas fa-times"></i>',
              label: "Cancel",            
              callback: () => {resolve(false)}
            }
          },
          default: "ok",
          close:  () => {resolve(false) }   
        }).render(true);             
      }); 
      let answer=await dialog;
      return answer;    
     }
      
    async function ${thisMacroName()}_messageDialog(sTitle,sMessage){
      let dialog=new Promise((resolve,reject)=>{
        new Dialog({
          title: sTitle,
          content: '<p>' + sMessage + '</p>' ,
          buttons: {
            ok: {
              icon:'<i class ="fas fa-check"></i>',
              label: "Ok",            
              callback: () => {resolve(true)}
            }
          },
          default: "ok",
          close:  () => {resolve(true) }   
        }).render(true);             
      }); 
      let answer=await dialog;
      return answer;    
     } 
     
      
      function ${thisMacroName()}_singleQuoted(text)  {return '&quot;' + text + '&quot;';}  
      
      async function ${thisMacroName()}_pickFile(inputtextid){
        let inputtext=document.getElementById(inputtextid);
        let currentinput='';
        if (inputtext.value.length==0){
          currentinput = 'worlds/${game.world.id}';
        }                     
        else{
          currentinput =inputtext.value; 
        }
        let fp = new FilePicker( { 
          current:currentinput,        
          callback: (url, fp) => {                        
            if(inputtext!=null) {
              inputtext.value = url;             
            } 
          }
        });         
        fp.type=" - Select CSV file";
        //fp.options.title="Select CSV file";
        //fp.name="Select CSV file";
        fp.extensions = [".csv"];
        
        fp.render(true);
        
      }    
      

      
      function ${thisMacroName()}_SetErrCount(value){
        document.getElementById('${thisMacroName()}_importerrcount').value=value;
      }
      
      function ${thisMacroName()}_SetWarningCount(value){
        document.getElementById('${thisMacroName()}_importwarningcount').value=value;
      }
         
      function ${thisMacroName()}_SetImportCount(value){
        document.getElementById('${thisMacroName()}_importcount').value=value;
      }
      
      function ${thisMacroName()}_SetUpdateCount(value){
        document.getElementById('${thisMacroName()}_updatecount').value=value;
      }
      
      function ${thisMacroName()}_IncErrCount(){
        document.getElementById('${thisMacroName()}_importerrcount').value=parseInt(document.getElementById('${thisMacroName()}_importerrcount').value, 10) + 1;
      } 
        
      function ${thisMacroName()}_IncWarningCount(){
        document.getElementById('${thisMacroName()}_importwarningcount').value=parseInt(document.getElementById('${thisMacroName()}_importwarningcount').value, 10) + 1;
      } 
      
      function ${thisMacroName()}_IncImportCount(){
        document.getElementById('${thisMacroName()}_importcount').value=parseInt(document.getElementById('${thisMacroName()}_importcount').value, 10) + 1;
      }   
      
      function ${thisMacroName()}_IncUpdateCount(){
        document.getElementById('${thisMacroName()}_updatecount').value=parseInt(document.getElementById('${thisMacroName()}_updatecount').value, 10) + 1;
      }
       
       
      function ${thisMacroName()}_GetImportCount(){
        return parseInt(document.getElementById('${thisMacroName()}_importcount').value, 10);
      } 
      function ${thisMacroName()}_GetUpdateCount(){
        return parseInt(document.getElementById('${thisMacroName()}_updatecount').value, 10);
      } 
      
      function ${thisMacroName()}_GetErrCount(){
        return parseInt(document.getElementById('${thisMacroName()}_importerrcount').value, 10);
      } 
      
      function ${thisMacroName()}_GetWarningCount(){
        return parseInt(document.getElementById('${thisMacroName()}_importwarningcount').value, 10);
      } 
         
      
      function ${thisMacroName()}_ResetCount(){
        ${thisMacroName()}_SetImportCount(0); 
        ${thisMacroName()}_SetErrCount(0);
        ${thisMacroName()}_SetUpdateCount(0);
        ${thisMacroName()}_SetWarningCount(0);
        // clear table   
        let table = document.querySelector('#import_tablelog');; 
        // empty gear tables
        if (table.rows.length>0){
          for(let i=table.rows.length;i>=1;i--){
            table.deleteRow(-1);	
          }
        }
      }
      
      async function ${thisMacroName()}_FetchImportFile(url, callback) {
      return fetch(
            url
        ).then( ( /** @type {Response} */ response ) =>
        {
            if ( response.ok ) {
                return response.text();
            } else {
                throw '${macroTitle()} | Error in response, file('+url+') not found';
            }
        } ).then( ( data ) =>
        {
            // to something with success response
            //console.log(data);
            return data;
            
        } ).catch( ( error ) =>
        {
            // every possible kind of error even 404            
            console.log(error);
            return "";
        } );
      }
      
      // -----------------------------------------------------------------------
      // Folder functions
      // -----------------------------------------------------------------------
      // returns the folder for a full path, if it does not exists, it is created or null on error
      // always call with await
      async function PrepareFolder(folderpath,foldersearchmap=null,foldertype='Item'){
        //console.log('PrepareFolder '+ folderpath );
        let returnfolder=null;
        if(foldersearchmap==null){
          foldersearchmap = await CreateFolderSearchMap(foldertype);
        }
        // check if folderpath exists
        let folder=foldersearchmap.get(folderpath);
        if(folder!=null){
          // folder exists
          returnfolder=folder;
        } else {
          // folder does not exist
          //console.log('PrepareFolder ' + folderpath + ' does not exists');
          let folderarr=folderpath.split('/');
          let foldercheck='';
          // loop hiearki, find existing folders or create as neccessary
          for (let i = 0; i < folderarr.length; i++) {
            if(i==0){
              foldercheck = folderarr[i];
            } else {
              foldercheck += '/' + folderarr[i];
            }
            if(foldersearchmap.get(foldercheck)==null){
              // dont exist
              //console.log('PrepareFolder ' + foldercheck + ' does not exists');
              //console.warn('folderpath:[' + folderpath  + ']  checking:['+ folderarr[i] + '] with path ['+ foldercheck +']does not exist')
              // time to create it
              if(i==0){
                // create at root
                ${thisMacroName()}_LogImportMessage('Creating folder:' + folderarr[i]);
                let newfolder = await Folder.create({name: folderarr[i], type: foldertype});
                // update search Map
                await foldersearchmap.set(foldercheck,newfolder);          
              } else {
                // create at parent
                let parentfolderpath='';
                for (let j = 0; j < i; j++) {
                  if(j==0){
                    parentfolderpath += folderarr[j];
                  } else {
                    parentfolderpath += '/' + folderarr[j];
                  }
                }
                //console.log('getting parent folder:' + parentfolderpath)
                let parentfolder=foldersearchmap.get(parentfolderpath);
                if(parentfolder!=null){
                  ${thisMacroName()}_LogImportMessage('Creating folder:' + parentfolderpath + '/' + folderarr[i]);
                  let newfolder = await Folder.create({name: folderarr[i], type: foldertype, folder: parentfolder.id});
                  // update search Map
                  await foldersearchmap.set(foldercheck,newfolder);
                }
              }
            }
          }
          // by now, the folder should been created
          returnfolder=foldersearchmap.get(folderpath)
        }
        // final line
        return returnfolder;
      }

      // returns Map where 
      //   key:   Full path to the folder
      //   value: Folder
      async function CreateFolderSearchMap(foldertype='Item'){
        let returnmap=new Map();
        folders = await game.folders.filter(y=>(y.type==foldertype));
        let folderpath='';
        for (let i = 0; i < folders.length; i++) {
          folderpath=GetFolderPath(folders[i]);    
          //console.warn('folderpath:['+ folderpath +']');
          returnmap.set(folderpath, folders[i]);
        }  
        return returnmap;
      }

      // recursive folder that get the full path to a folder
      function GetFolderPath(folder){
        let returnpath=''
        if(folder.folder==null){
          // no parent, return this folder name
          returnpath=folder.name;
        } else {
          // recursion
          returnpath=GetFolderPath(folder.folder) + '/' + folder.name ;
        }
        return returnpath;
      }
      
      // -----------------------------------------------------------------------
      
      async function ${thisMacroName()}_ImportcItemFromCSV() {
        
        const MANDATORYFIELDSINDEX = {
          NAME: 0,
          TEMPLATE: 1,
          IMPORTFOLDER: 2 ,
          IMAGE: 3,
          DESCRIPTION:4       
        }; 
        const MANDATORYFIELDSCOUNT=5;
        let LISTSEPARATOR=document.getElementById('${thisMacroName()}_listseparator').value;    
        
        ${thisMacroName()}_ResetCount(); 
        // validate user input
        let importfile = document.getElementById('${thisMacroName()}_csvfile').value;
        if (importfile=='' || !(importfile.endsWith('.csv')||importfile.endsWith('.CSV'))) {
          await ${thisMacroName()}_messageDialog('Invalid settings',' A valid CSV import file must be specified');
        }
        else{
          let userconfirmation=await ${thisMacroName()}_confirmDialog('Please confirm','Do you want to start the import?<br>Make sure that you have made a backup of your world.');
          if  (userconfirmation){                                                 
            let bUpdateExisting =document.getElementById("${thisMacroName()}_chkUpdateExisting").checked;           
            let bUpdatesRequireIdenticalGroups =document.getElementById("${thisMacroName()}_chkUpdatesRequireIdenticalGroups").checked;                     
            LISTSEPARATOR=document.getElementById('${thisMacroName()}_listseparator').value;
            
            ${thisMacroName()}_LogImportMessage('Running import. List separator:[' + LISTSEPARATOR + '] Verbose mode:[' + ${Setting_ShowDebugMsg()} +']' ); 
            
            document.getElementById("${thisMacroName()}_btnExecuteImport").disabled = true;
            document.getElementById("${thisMacroName()}_chkUpdateExisting").disabled = true;          
            ${thisMacroName()}_LogImportMessage('Import started');
            let currentOperation='';
            try{          
              // get the file 
              ${thisMacroName()}_LogImportMessage('Fetching file ['+ importfile+']');             
              let importdata;           
              importdata = await ${thisMacroName()}_FetchImportFile(importfile);  
              // check returned data from fetch
              if(importdata.length>0){                      
                ${thisMacroName()}_LogImportMessage('Reading file ['+ importfile+']');
                let lines = importdata.split('\\n');
                // check that file has at least two lines
                if(lines.length>1){
                  // validate compulsotory headers
                  // header must be in this order
                  // Name|Template|ImportFolder|Image|Description 
                  // Image and Description may be empty
                  // Description is the text on the Bio-tab and can be a valid HTML string.  
                  // get the header from the first line
                  let header=lines[0].trim().split(LISTSEPARATOR);   // use trim to get rid of end of line
                  if(header.length>=MANDATORYFIELDSCOUNT){                           
                    // make sure that all the needed headers are there
                    if(header[MANDATORYFIELDSINDEX.NAME]=='Name' && header[MANDATORYFIELDSINDEX.TEMPLATE]=='Template' && header[MANDATORYFIELDSINDEX.IMPORTFOLDER]=='ImportFolder' && header[MANDATORYFIELDSINDEX.IMAGE]=='Image' && header[MANDATORYFIELDSINDEX.DESCRIPTION]=='Description' ){
                      // create map of citems by name and folder id to speed up searches
                      let citemsMap=new Map();
                      items = await game.items.filter(y=>(y.type=="cItem" ));
                      currentOperation='Setting citemMap';
                      for (let i = 0; i < items.length; i++) {
                        currentOperation='Setting citemMap for item ['+ items[i].name +']';
                        citemsMap.set(items[i].name + '-' + items[i].folder?.id , items[i]);
                      }
                      currentOperation='CreateFolderSearchMap';
                      let itemmap=await CreateFolderSearchMap('Item');
                      for(let line = 1; line < lines.length; line++){
                        currentOperation='Processing line ['+ line +'] : ['+ lines[line] +']';
                        // ignore empty lines
                        if (lines[line].trim()!=''){                     
                          let itemdata=lines[line].trim().split(LISTSEPARATOR);   // use trim to get rid of end of line
                          // make sure it matches header count
                          if (itemdata.length==header.length){  
                            
                            let sItemname=itemdata[MANDATORYFIELDSINDEX.NAME].trim(); 
                            let sTemplatename=itemdata[MANDATORYFIELDSINDEX.TEMPLATE].trim();
                            let sImportFolder=itemdata[MANDATORYFIELDSINDEX.IMPORTFOLDER].trim();
                            let sImage=itemdata[MANDATORYFIELDSINDEX.IMAGE].trim();
                            let sDescription=itemdata[MANDATORYFIELDSINDEX.DESCRIPTION].trim();
                            ${thisMacroName()}_LogImportMessage('Preparing import for item:[' + sItemname+']','Debug');
                            
                            let citemtemplate=game.items.find(y=>y.type=="cItem" && y.name==sTemplatename); 
                            
                            let importfolder=await PrepareFolder(sImportFolder,itemmap);
                            let bValidData=true;
                            // check that template item  exists
                            if (citemtemplate==null){                            
                              ${thisMacroName()}_LogImportMessage('Invalid template item on line [' + line +']<br>' + lines[line] ,'Error');
                              ${thisMacroName()}_IncErrCount();
                              bValidData=false;
                            }                                                                                              
                            // check that  import folder exists
                            if(importfolder==null){                            
                              ${thisMacroName()}_LogImportMessage('Invalid import folder on line [' + line +']<br>' + lines[line],'Error');
                              ${thisMacroName()}_IncErrCount();
                              bValidData=false;
                            }                                            
                            
                            if(bValidData==true ){ 
                              ${thisMacroName()}_IncImportCount();                                                        
                              let bUpdateThis=false;
                              let bNewcitem=false;
                              // check if this citem already exists in specified importfolder                                 
                              //let newcitem=await game.items.find(y=>y.type=="cItem" && y.name==sItemname && y.folder.id==importfolder.id);
                              // use the search map 
                              let newcitem = citemsMap.get(sItemname  + '-' + importfolder.id); 
                              if (newcitem==null){
                                ${thisMacroName()}_LogImportMessage('Creating item [' + sItemname + '] in folder [' + sImportFolder+']' );
                                // base mandatory data
                                let newitemdata={
                                  "name":sItemname,
                                  "system.attributes.name":sItemname,
                                  "folder":importfolder.id
                                };
                                // add optional data
                                if(sImage.length>0){
                                  newitemdata['img']=sImage;
                                }
                                if(sDescription.length>0){
                                  newitemdata['system.description']=sDescription;
                                }
                                // now for the custom attributes
                                if(header.length>MANDATORYFIELDSCOUNT){                                 
                                  for(let i = MANDATORYFIELDSCOUNT ; i < header.length; i++){
                                    let sAttribute=header[i];
                                    let sAttributeValue=itemdata[i].trim();  // trim of whitespace             
                                    if (sAttribute!='' && sAttributeValue!=''){
                                      // check that citem template has the attribute                                  
                                      if (citemtemplate.system.attributes.hasOwnProperty(sAttribute)){ 
                                        if(citemtemplate.system.attributes[sAttribute].value!=sAttributeValue){                                         
                                          newitemdata['system.attributes.' + sAttribute + '.value']=sAttributeValue;                                          
                                        }
                                      }  
                                      else{
                                        // citem template does not have this attribute
                                        ${thisMacroName()}_LogImportMessage('cItem template ['+ sTemplatename + '] does not have property [' + sAttribute+']','Warning'); 
                                        ${thisMacroName()}_IncWarningCount();
                                      }
                                    }
                                  } 
                                } 
                                // make a clone of the template
                                newcitem=await citemtemplate.clone(newitemdata, {save: true,keepEmbeddedIds:false}); 
                                
                                bNewcitem=true;    
                                // add this to search map
                                citemsMap.set(sItemname + '-' + importfolder.id , newcitem);
                              }
                              else{
                                // item already exists in this folder!                                                                                   
                                if (bUpdateExisting==true){
                                  if(bUpdatesRequireIdenticalGroups==true){                               
                                    // make sure it is compatible item, ie has the same/identical groups as the template
                                    if (citemtemplate.system.groups.length==newcitem.system.groups.length){
                                      // both have the same number of groups
                                      // check every one 
                                      let bSameGroups=true;
                                      for(let i = 0 ; i < citemtemplate.system.groups.length; i++){
                                        if(citemtemplate.system.groups[i].name!=newcitem.system.groups[i].name ){
                                          // mismatch
                                          bSameGroups=false;                                         
                                          ${thisMacroName()}_LogImportMessage('Update of existing item [' +sItemname + '] denied for mismatched groups','Warning');
                                          ${thisMacroName()}_IncWarningCount();
                                          // exit loop
                                          break;
                                        }
                                      }  
                                      // at this point we know if it is ok or not
                                      if(bSameGroups==true){
                                        // all green for updating this                                      
                                        ${thisMacroName()}_LogImportMessage('Item [' +sItemname + '] exists in folder ['  + sImportFolder + '], checking for changes');
                                        bUpdateThis=true;
                                      }                                
                                    }                                       
                                    else{
                                      // differents number of groups                                    
                                      ${thisMacroName()}_LogImportMessage('Update of existing item [' +sItemname + '] denied for mismatched group count','Warning');
                                      ${thisMacroName()}_IncWarningCount();
                                    }
                                  }
                                  else{
                                    bUpdateThis=true;
                                    ${thisMacroName()}_LogImportMessage('Item [' +sItemname + '] exists in folder '  + sImportFolder + ', checking for changes');
                                  }                                                                                                                                                        
                                }
                                else{
                                  // citem already exists and setting for update have not been set                                
                                  ${thisMacroName()}_LogImportMessage('Item ['+ sItemname + '] already exists in folder ['+ sImportFolder +']','Warning');
                                  ${thisMacroName()}_IncWarningCount();   
                                }
                              }  
                              
                              
                              if(bUpdateThis==true){                                 
                                let bIsEdited=false;                                
                                let objUpdateData = {};  
                                // set item data from import
                                ${thisMacroName()}_LogImportMessage('Checking import data for item [' +sItemname+']','Debug');
                                 // set/check mandatory fields
                                let whatchanged='';
                                if(newcitem.name!=sItemname){                                                                 
                                  objUpdateData['name']=sItemname;
                                  bIsEdited=true;  
                                  whatchanged+='name,';
                                }
                                if(newcitem.folder.id!=importfolder.id){ 
                                  
                                  objUpdateData['folder.id']= importfolder.id;                                                                 
                                  bIsEdited=true;
                                  whatchanged+='folder,';
                                }
                                // if image have been submitted use that instead
                                if (sImage!=''){   
                                  if(newcitem.img!=sImage){
                                    objUpdateData['img']=sImage;
                                    bIsEdited=true;
                                    whatchanged+='img,';
                                  }
                                }       
                                // if description has been submitted use that instead 
                                if (sDescription!=''){ 
                                  if(newcitem.system.description!=sDescription){
                                    objUpdateData['system.description']= sDescription;
                                    bIsEdited=true;  
                                    whatchanged+='description,';
                                  }
                                }                             
                                // now for the custom attributes
                                if(header.length>MANDATORYFIELDSCOUNT){                                 
                                  for(let i = MANDATORYFIELDSCOUNT ; i < header.length; i++){
                                    let sAttribute=header[i];
                                    let sAttributeValue=itemdata[i].trim();  // trim of whitespace             
                                    if (sAttributeValue!=''){
                                      // check that citem has the attribute                                  
                                      if (newcitem.system.attributes.hasOwnProperty(sAttribute)){                                            
                                        if(newcitem.system.attributes[sAttribute].value!=sAttributeValue){                                         
                                          objUpdateData['system.attributes.' + sAttribute + '.value']=sAttributeValue;
                                          bIsEdited=true;  
                                          whatchanged+=sAttribute + ',';
                                        }
                                      }  
                                      else{
                                        // citem does not have this attribute
                                        ${thisMacroName()}_LogImportMessage('Item ['+ sItemname + '] does not have property [' + sAttribute+']','Warning'); 
                                        ${thisMacroName()}_IncWarningCount();
                                      }
                                    }
                                  } 
                                } 
                                if(bIsEdited==true){   
                                  ${thisMacroName()}_LogImportMessage('Updating item [' +sItemname+'] '+ whatchanged);                                                                  
                                  await newcitem.update(objUpdateData); 
                                  ${thisMacroName()}_IncUpdateCount();
                                }                                                        
                              }                                                                              
                            }                                                
                          }
                          else{
                            ${thisMacroName()}_LogImportMessage('Invalid field count on line [' + line +']<br>' + lines[line],'Error');
                            ${thisMacroName()}_IncErrCount();
                          }
                        }
                      }    
                    }
                    else{    
                      ${thisMacroName()}_LogImportMessage('Invalid header configuration.','Error'); 
                      ${thisMacroName()}_IncErrCount();                    
                    }               
                  } 
                  else{
                    // invalid header
                    ${thisMacroName()}_LogImportMessage('Invalid header count or invalid list separator.','Error'); 
                    ${thisMacroName()}_IncErrCount();
                  }
                }
                
              }
              else{
                // no importdata  
                ${thisMacroName()}_LogImportMessage('No import data found.','Warning'); 
                ${thisMacroName()}_IncWarningCount();

              }
            }
            catch(err){
              // any other errors  
              console.error(err);
              ${thisMacroName()}_LogImportMessage('Unhandled error in ' + currentOperation,'Error');
              ${thisMacroName()}_LogImportMessage(err,'Error');
              ${thisMacroName()}_IncErrCount();
            }
            
            // import completed                            
            let errcount=${thisMacroName()}_GetErrCount();
            let importcount=${thisMacroName()}_GetImportCount();
            let updatecount=${thisMacroName()}_GetUpdateCount();
            let warningcount=${thisMacroName()}_GetWarningCount();   
            let importsummary='Import summary<br>Import count:[' + importcount + ']<br> Updates:[' + updatecount + ']<br> Warnings:['+ warningcount +']<br> Errors:[' + errcount +']';  
            
            let dialogtitle;
            let dialogmsg;
            if (errcount==0 && warningcount==0){
              // no errors and no warnings
              dialogtitle='Import completed';
              dialogmsg='Import completed for file ['+ importfile +']<br>'+ importsummary;
              ${thisMacroName()}_LogImportMessage(dialogmsg,'Info',true); 
            }
            else if(errcount==0 && warningcount>0){
              // no error but warnings
              dialogtitle='Import completed with warnings';
              dialogmsg='Import completed with warnings for file ['+ importfile +']<br>'+ importsummary + '<br>Please check the message log for warning descriptions';
              ${thisMacroName()}_LogImportMessage(dialogmsg,'Warning',true); 
            }                      
            else{
              // errors found                            
              dialogtitle='Import completed with errors';
              dialogmsg='Import completed with errors for file ['+ importfile +']<br>'+ importsummary + '<br>Please check the message log for error/warnings descriptions';
              ${thisMacroName()}_LogImportMessage(dialogmsg,'Error',true); 
            }
                                         
            await ${thisMacroName()}_messageDialog(dialogtitle,dialogmsg );
                                                    
            document.getElementById("${thisMacroName()}_btnExecuteImport").disabled = false; 
            document.getElementById("${thisMacroName()}_chkUpdateExisting").disabled = false; 
                                       
          }
          else{                             
            ${thisMacroName()}_LogImportMessage('Import not started');
          } 
        }
      }
      
      // Main function
      function ${thisMacroName()}_Main(){ 
       //console.log("${thisMacroName()}_Main()");
       
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
          // and trigger refresh content button(if any)
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
