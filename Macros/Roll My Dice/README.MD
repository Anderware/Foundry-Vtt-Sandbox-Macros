# Roll My Dice
Macro for generating a dialog with UI for rolling on Foundry Tables

+ Can use arguments for Trigger Macro modification(https://github.com/Anderware/Foundry-Vtt-Sandbox-Macros/tree/main/Modifications/Trigger%20macro%20from%20character%20sheet) from Sandbox character sheet

![MacroFromSheet_2 3_ffm](https://user-images.githubusercontent.com/81265884/130839256-1f1d54f2-48b4-4f69-8c12-4624583d19ec.gif)

## Version Compability
This modification has been tested with the following versions
Sandbox  | Foundry
-------  | ----------
0.9.26   | 0.8.8
0.9.27   | 0.8.8

# Specials
Please use a custom css for the class roll-result to make the resulting chat message window big enough
``` css
 /* Custom CSS */
roll-result{height:10%;}
```
# How to use with Trigger Macro modification
To pass arguments with the Trigger Macro modification
In a rollable property set the fields
Roll Name: <the name of the macro> Example RollMyDice
Roll Formula: ~macro~
Roll ID: <JSON string with parameters to pass
Example JSON
``` javascript 
{"rollname":"#{name}","D4":#{D4},"D6":#{D6},"D8":#{D8}}
``` 
