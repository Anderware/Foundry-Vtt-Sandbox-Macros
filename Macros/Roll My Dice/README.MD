# Roll My Dice
Macro for generating a dialog with UI for rolling on Foundry Tables

+ Can use arguments for [Trigger Macro modification](https://github.com/Anderware/Foundry-Vtt-Sandbox-Macros/tree/main/Modifications/Trigger%20macro%20from%20character%20sheet) from Sandbox character sheet

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
# How to configure and use this macro
* Create your rollable tables, the name you give them is what you need to configure in macro settings section.  
The name, description and image will be used to build the dialog.  
![Roll Table](https://user-images.githubusercontent.com/81265884/130842626-07a5b40a-c65a-4582-9990-9d659f5e63e3.png)
* Configure macro settings  
![macro Settings](https://user-images.githubusercontent.com/81265884/130842860-2c5ebb28-6438-4536-9993-1094bb31d0d2.png)  
```
// Configure tables to use.
let objRollTables = [
{"tablename":"D4","defaultnrofdice":0},
{"tablename":"D6","defaultnrofdice":0},
{"tablename":"D8","defaultnrofdice":0}
];
```  

To use several variants(with different table configuration), simply rename the macro

# How to use with Trigger Macro modification
To pass arguments with the Trigger Macro modification, in a rollable property set the fields
+ Roll Name: \<the name of the macro\>  
*Example: RollMyDice*
+ Roll Formula: \~macro\~
+ Roll ID: <Valid JSON string with parameters to pass>  
*Example JSON:* ``` javascript {"rollname":"#{name}","D4":#{D4},"D6":#{D6},"D8":#{D8}}``` 
![rollable property](https://user-images.githubusercontent.com/81265884/130851504-549b2d0f-de08-4331-b2c3-c94a6c895aa4.png)
 
 This macro will accept the following arguments
 * actorID
 * actorLink - if false, then the it is an unlinked token(on the canvas)
 * rollname
 * For each configured table, the table name. This argument will be used to enter the number of rolls for that table
 
