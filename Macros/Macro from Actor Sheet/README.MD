# Macro from Actor Sheet
From the Sandbox 0.10.3 we now have the possibility to run a macro from a button(which of course can be styled as a icon with some CSS) on a actor sheet but one can only select the macro and no arguments or even what actor triggered it(so far) meaning it gets somewhat less usable. 
But! With some more javascript in your macro you can find out what actor triggered the macro!
This approach uses the event chain of the button click and travels upwards in the sheet and finds the actor id(those random letters and numbers)
With this, then a world of possibilities opens up for  macros on the sheet.

See an example here
https://github.com/Anderware/Foundry-Vtt-Sandbox-Macros/blob/main/Macros/Macro%20from%20Actor%20Sheet/Roll_Hit_Dice_1.0.js

## Version Compability
This macro has been tested with the following versions

Sandbox  | Foundry
-------  | ----------
0.10.11   | 0.8.9
