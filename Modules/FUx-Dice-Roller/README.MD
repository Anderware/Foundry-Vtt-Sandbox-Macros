# FUx Dice Roller

Dice roller for FreeForm Universal(FU) RPG Classic & v2, Action Tales! RPG, Neon City Overdrive RPG, Earthdawn - Age Of Legend

Builtin support for 

- Game system Sandbox chat result style
- Dice So Nice

The dice roller is not dependent on any specific Foundry game system but can used in any one.
### Recommended Foundry Game systems
- [Sandbox System Builder](https://foundryvtt.com/packages/sandbox)
- [Simple World-Building](https://foundryvtt.com/packages/worldbuilding)

![fux_fu_v2](readme.assets/fux_fu_v2.gif)
## Installation
### Manifest URL
https://raw.githubusercontent.com/Anderware/Foundry-Vtt-Sandbox-Macros/main/Modules/FUx-Dice-Roller/releases/module.json


See here on help on how to use the manifest URL to install a module  
[Foundry Wiki - How to install module](https://foundryvtt.wiki/en/basics/Modules) 

## Variants
### FU v2
As taken from FU v2 beta

#### For game system Sandbox

![FU v2](readme.assets/FU_v2.png)

#### Other Foundry game systems than Sandbox

![core style results](readme.assets/core_style_results.png)

### Neon City Overdrive/Action! Tales

![NCO](readme.assets/NCO.png)

### FU Classic

In Classic, the roller will reduce selected Action(Start + Bonus)/Danger(Penalty)dice before the roll

The oracle used for Classic is the alternative numbering(1-3 Bad, 4-6 Good result) and not the default Even/Odd due to programming reasons.

![FU Classic](readme.assets/FU_Classic.png)
### Earthdawn - Age Of Legend

In Earthdawn - Age Of Legend, the roller will reduce selected Action(Start + Bonus)/Danger(Penalty)dice before the roll

The oracle used for Earthdawn - Age Of Legend is the alternative numbering(1-3 Bad, 4-6 Good result) and not the default Even/Odd due to programming reasons.

![FU Classic](readme.assets/ED_AoL.png)

## Launching FUx Dice Roller

The dice roller can be launched by clicking the FU icon on the Chat tab of the sidebar

![Launch dice roller from icon](readme.assets/Launch_dice_roller_from_icon.png)

The dice roller can  also be launched from the Module Settings window

![Game Settings](readme.assets/Game_Settings.png)

## Roll commands from chat

FUx Dice roller support chat commands to roll

Command format

```
/fux xayd
```

where x is the number of Action Dice and y is the number of Danger Dice

*Example.*

*This will roll 2 Action Dice and 1 Danger Dice*

```
/fux 2a1d
```

![Launch dice roller from chat command](readme.assets/Launch_dice_roller_from_chat_command.png)

## Settings

![Settings](readme.assets/Settings.png)

## FU v2 Combat Helper

If the current system variant is FU v2, a Combat Helper is available on the dice roller

The Combat Helper makes it easy to quickly determine attacks and defend effects.

![FU v2 Combat Helper](readme.assets/FU_v2_Combat_Helper.png)
