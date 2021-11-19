<table>
<tr><th>Attribute</th><th>Value</th><th>Attribute</th><th>Value</th></tr>
<tr><td>Item Type</td><td style="font-family:monospace">PROPERTY</td><td>Name</td><td style="font-family:monospace">00 - Weapon Attack Roll</td></tr><tr><td>Data Type</td><td style="font-family:monospace">label</td><td>Key</td><td style="font-family:monospace">WEAPON_ATTACK_ROLL__COPY_</td></tr><tr><td>Tag</td><td style="font-family:monospace">Weapon Attack Roll</td><td>Tooltip</td><td style="font-family:monospace"></td></tr><tr><td>Hidden</td><td style="font-family:monospace">false</td><td>Label Size</td><td style="font-family:monospace">Fit</td></tr><tr><td>Label Format</td><td style="font-family:monospace">Die</td><td>Font Group</td><td style="font-family:monospace"></td></tr><tr><td>Input Group</td><td style="font-family:monospace"></td><td>Rollable</td><td style="font-family:monospace">true</td></tr><tr><td>Roll Name</td><td style="font-family:monospace">#{name}</td><td>Roll ID</td><td style="font-family:monospace">WEAPON_ATTACK_ROLL_ROLL</td></tr><tr><td>Roll Formula</td><td style="font-family:monospace">$<10;if[@{COMBAT_STANCE_OFFENSIVE}:true,0,<br/>
&emsp;ELSE if[@{COMBAT_STANCE_DEFENSIVE}:true, -2,<br/>
&emsp;&emsp;ELSE if[@{COMBAT_STANCE_RUN_AWAY}:true,-5,0]<br/>
&emsp;&emsp;]<br/>
&emsp;]<br/>
><br/>
$<11;@{SKILL_LEVEL} +#{WEAPON_RATING} + $10 + d{SITUATIONAL_MODIFIER}><br/>
$<12;($11)d3-($11)><br/>
$<13;@{DAMAGE_BONUS} + #{WEAPON_DAMAGE}><br/>
$<14;max(#{diff},1)><br/>
$<15;%[1d6,<br/>
&emsp;1:Left arm,<br/>
&emsp;2:Right arm,<br/>
&emsp;3:Left leg,<br/>
&emsp;4:Right leg,<br/>
&emsp;5:Torso,<br/>
&emsp;6:Head]<br/>
><br/>
$<16;min(ceil((($13-1)/$14)*($12-$14)+1),$13)><br/>
$<19;if[$12:0,-1,$12]><br/>
$12<br/>
&&$19;<br/>
&emsp;0:FUMBLE!,<br/>
&emsp;1:MISS!,<br/>
 &emsp;$14:Hit(Damage $16) in area $15,<br/>
&emsp;ceil($14*1.25):Solid hit(Damage $16) in area $15,<br/>
&emsp;ceil($14*1.5):Excellent hit(Damage $16) in area $15,<br/>
&emsp;ceil($14*1.75):Extraordinary hit(Damage $16) in area $15,<br/>
&emsp;$14*2: Perfect hit(Damage $13) in Designated Target area or area $15<br/>
&&</td><td>Has Dialog</td><td style="font-family:monospace">true</td></tr><tr><td>Dialog Panel</td><td style="font-family:monospace">MULTIPANEL_MODIFIERS</td><td></td><td style="font-family:monospace"></td></tr>
