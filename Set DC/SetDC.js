/** 
 * Displays dialog for quickly set Sandbox DC
 * @Author: Ramses800
 */
let html = `
<script>
function setDC(difficultylevel)
{
  game.settings.set("sandbox", "diff",difficultylevel);
  document.getElementsByName("dc")[0].value=difficultylevel;
}
</script>
<style>
.btnDC{
  height:35px;
  width:100%;
  border-radius: 3px;
  background: rgba(0, 0, 0, 0.05);
  border: 2px groove #c9c7b8;
  line-height: 28px;
  margin: 0 5px 0 0;
}
.btnDC:hover {
  box-shadow: 0 0 5px red;
}

</style>
<p>Set Difficulty Level(DC)</p>
<form>

<div>
<input class="btnDC" type="button" onclick="setDC('1')" value="Easy!">
<input class="btnDC" type="button" onclick="setDC('2')" value="Routine!">
<input class="btnDC" type="button" onclick="setDC('4')" value="Normal!">
<input class="btnDC" type="button" onclick="setDC('8')" value="Hard!">
<input class="btnDC" type="button" onclick="setDC('16')" value="Extreme!">
<input class="btnDC" type="button" onclick="setDC('32')" value="Absurd!">
</div>

</form>
<p>
`;


let d = new Dialog({
 title: "Set Difficulty Level(DC)",
 content: html,
 buttons: {
  btnClose: {   
   label: "Close",
   callback: () => console.log("Close")
  }
 },
 default: "btnClose"
});
d.options.width = 100;
d.position.width = 100;
d.render(true);