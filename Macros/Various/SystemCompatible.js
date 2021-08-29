function SystemCompatible(requiredsystem,requiredversion,exactversion=false){
  let runningsystemname=game.system.data.name; // sandbox
  let runningversion=game.system.data.version;
  let returnvalue=false; // assume fail
  if  (runningsystemname==requiredsystem || requiredsystem==""){ 
  	let result=runningversion.localeCompare(requiredversion, undefined, { numeric: true, sensitivity: 'base' });
    if(exactversion){
      if(result==0){
      	returnvalue=true;
      }
    }
    else{
      if(result==1 || result==0){
      	returnvalue=true;
      }
    }
  }
  return returnvalue;
}

function CheckSandboxVersion(requiredsystem,requiredversion,exactversion=false){
  let result =SystemCompatible(requiredsystem,requiredversion,exactversion);
  let currentversion="0.9.27";
	console.log (currentversion + ' vs ' + requiredversion + ' = ' + result ) ;
}


CheckSandboxVersion("sandbox","0.9.28");
CheckSandboxVersion("sandbox","0.9.20");
CheckSandboxVersion("sandbox","0.9.20",true);
CheckSandboxVersion("sandbox","0.9.26.0");
CheckSandboxVersion("sandbox","0.9.271");
CheckSandboxVersion("sandbox","0.9.27.0");
CheckSandboxVersion("","0.9.27.0");