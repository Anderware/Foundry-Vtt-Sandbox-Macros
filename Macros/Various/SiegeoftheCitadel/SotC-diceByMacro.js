let html = `
<script>
function getSelectedSotCDice(color)
{
 let selectedcount=0;
 for (let i = 1; i <= 6; i++) 
 {
  if (document.getElementById('SotC' + color + 'Dice'+ i).style.opacity==1)
  {
    selectedcount= selectedcount+ 1;
  }
 }
 return selectedcount;
}
function generateSotCDiceHTML(dicerolled,hits,imgsrchit,imgsrcmiss)
{
  let returnHTML="";
  for (let i = 1; i <= dicerolled; i++) 
  {
   if (i<=hits)
   {
     returnHTML+='<img style="border:0px;width:40px;margin-right:3px" src=' + imgsrchit +'>'
   }
   else
   {
     returnHTML+='<img style="border:0px;width:40px;margin-right:3px" src='  +imgsrcmiss +  '>'
   }
  
  }
 return returnHTML;
}
function rollSotCDice()
{
// get selected count
let blackdice=getSelectedSotCDice("Black");
let whitedice=getSelectedSotCDice("White");
let reddice=getSelectedSotCDice("Red");
// roll
let blackdicehits=new Roll(blackdice + "d6cs>=3").roll().total;
let blackdicemisses=blackdice - blackdicehits;
let reddicehits=new Roll(reddice + "d6cs>=4").roll().total;
let reddicemisses=reddice - reddicehits;
let whitedicehits=new Roll(whitedice + "d6cs>=5").roll().total;
let whitedicemisses=whitedice - whitedicehits;


let htmlResult="Rolling " + blackdice + "  black dice," + reddice +" red dice, " + whitedice +" white dice <br>";

htmlResult+=generateSotCDiceHTML(blackdice ,blackdicehits ,"icons/SotCv1Dice/sotc_v1_black_hit.png","icons/SotCv1Dice/sotc_v1_black_miss.png") + "<br>";
htmlResult+=generateSotCDiceHTML(reddice ,reddicehits ,"icons/SotCv1Dice/sotc_v1_red_hit.png","icons/SotCv1Dice/sotc_v1_red_miss.png") + "<br>";
htmlResult+=generateSotCDiceHTML(whitedice ,whitedicehits ,"icons/SotCv1Dice/sotc_v1_white_hit.png","icons/SotCv1Dice/sotc_v1_white_miss.png")+ "<br>";

      let rolltype = document.getElementsByClassName("roll-type-select");
            let rtypevalue = rolltype[0].value;
            let rvalue = 0;
            if(rtypevalue=="gmroll")
                rvalue = 1;  
     let newmessage = ChatMessage.create({
                content: htmlResult,
                type:rvalue
            })   
}
</script>


<p>Select dice to roll</p>


<div id="selectedSotCDice">


<input id="SotCBlackDice1" type="image" style="border:0px;width:45px;opacity:0.4;" onclick="this.style.opacity = (this.style.opacity!=='0.4' ? '0.4' : '1.0');" src=icons/SotCv1Dice/sotc_v1_black_hit.png>

<input id="SotCBlackDice2" type="image" style="border:0px;width:45px;opacity:0.4;" onclick="this.style.opacity = (this.style.opacity!=='0.4' ? '0.4' : '1.0');" src=icons/SotCv1Dice/sotc_v1_black_hit.png>
<input id="SotCBlackDice3" type="image" style="border:0px;width:45px;opacity:0.4;" onclick="this.style.opacity = (this.style.opacity!=='0.4' ? '0.4' : '1.0');" src=icons/SotCv1Dice/sotc_v1_black_hit.png>
<input id="SotCBlackDice4" type="image" style="border:0px;width:45px;opacity:0.4;" onclick="this.style.opacity = (this.style.opacity!=='0.4' ? '0.4' : '1.0');" src=icons/SotCv1Dice/sotc_v1_black_hit.png>
<input id="SotCBlackDice5" type="image" style="border:0px;width:45px;opacity:0.4;" onclick="this.style.opacity = (this.style.opacity!=='0.4' ? '0.4' : '1.0');" src=icons/SotCv1Dice/sotc_v1_black_hit.png>
<input id="SotCBlackDice6" type="image" style="border:0px;width:45px;opacity:0.4;" onclick="this.style.opacity = (this.style.opacity!=='0.4' ? '0.4' : '1.0');" src=icons/SotCv1Dice/sotc_v1_black_hit.png>
<br>
<input id="SotCRedDice1" type="image" style="border:0px;width:45px;opacity:0.4;" onclick="this.style.opacity = (this.style.opacity!=='0.4' ? '0.4' : '1.0');" src=icons/SotCv1Dice/sotc_v1_red_hit.png>
<input id="SotCRedDice2" type="image" style="border:0px;width:45px;opacity:0.4;" onclick="this.style.opacity = (this.style.opacity!=='0.4' ? '0.4' : '1.0');" src=icons/SotCv1Dice/sotc_v1_red_hit.png>
<input id="SotCRedDice3" type="image" style="border:0px;width:45px;opacity:0.4;" onclick="this.style.opacity = (this.style.opacity!=='0.4' ? '0.4' : '1.0');" src=icons/SotCv1Dice/sotc_v1_red_hit.png>
<input id="SotCRedDice4" type="image" style="border:0px;width:45px;opacity:0.4;" onclick="this.style.opacity = (this.style.opacity!=='0.4' ? '0.4' : '1.0');" src=icons/SotCv1Dice/sotc_v1_red_hit.png>
<input id="SotCRedDice5" type="image" style="border:0px;width:45px;opacity:0.4;" onclick="this.style.opacity = (this.style.opacity!=='0.4' ? '0.4' : '1.0');" src=icons/SotCv1Dice/sotc_v1_red_hit.png>
<input id="SotCRedDice6" type="image" style="border:0px;width:45px;opacity:0.4;" onclick="this.style.opacity = (this.style.opacity!=='0.4' ? '0.4' : '1.0');" src=icons/SotCv1Dice/sotc_v1_red_hit.png>
<br>
<input id="SotCWhiteDice1" type="image" style="border:0px;width:45px;opacity:0.4;" onclick="this.style.opacity = (this.style.opacity!=='0.4' ? '0.4' : '1.0');" src=icons/SotCv1Dice/sotc_v1_white_hit.png>
<input id="SotCWhiteDice2" type="image" style="border:0px;width:45px;opacity:0.4;" onclick="this.style.opacity = (this.style.opacity!=='0.4' ? '0.4' : '1.0');" src=icons/SotCv1Dice/sotc_v1_white_hit.png>
<input id="SotCWhiteDice3" type="image" style="border:0px;width:45px;opacity:0.4;" onclick="this.style.opacity = (this.style.opacity!=='0.4' ? '0.4' : '1.0');" src=icons/SotCv1Dice/sotc_v1_white_hit.png>
<input id="SotCWhiteDice4" type="image" style="border:0px;width:45px;opacity:0.4;" onclick="this.style.opacity = (this.style.opacity!=='0.4' ? '0.4' : '1.0');" src=icons/SotCv1Dice/sotc_v1_white_hit.png>
<input id="SotCWhiteDice5" type="image" style="border:0px;width:45px;opacity:0.4;" onclick="this.style.opacity = (this.style.opacity!=='0.4' ? '0.4' : '1.0');" src=icons/SotCv1Dice/sotc_v1_white_hit.png>
<input id="SotCWhiteDice6" type="image" style="border:0px;width:45px;opacity:0.4;" onclick="this.style.opacity = (this.style.opacity!=='0.4' ? '0.4' : '1.0');" src=icons/SotCv1Dice/sotc_v1_white_hit.png>

</div>

<button  onclick="rollSotCDice();">Roll!</button>

<p>
`;
// HTML Form completed
// show it as dialog
let d = new Dialog({
 title: "Siege of the Citadel",
 content: html,
 buttons: {
  btnClose: {   
   label: "Close",
   callback: () => console.log("Close")
  }
 },
 default: "btnClose"
});
d.options.width = 330;
d.position.width = 330;
d.render(true)