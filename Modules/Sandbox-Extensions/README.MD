# Sandbox Extensions
A module for extending Sandbox functionality.
## Installation
### Manifest URL
https://raw.githubusercontent.com/Anderware/Foundry-Vtt-Sandbox-Macros/main/Modules/Sandbox-Extensions/releases/module.json

See here on help on how to use the manifest URL to install a module  
[Foundry Wiki - How to install module](https://foundryvtt.wiki/en/basics/Modules) 
 
## Version Compability
This module has been tested with the following versions

Sandbox  | Foundry
-------  | -------
0.10.1   | 0.8.8  

## Dependencies
Sandbox Extension requires the excellent module [CodeMirror for Foundry VTT](https://github.com/League-of-Foundry-Developers/codemirror-lib)

# Module Features
* Functions for auto generate values based on item name, item type and configurable prefix/suffix/case for 
  * Key
  * Tag
  * Title
  * Tooltip
  * Fontgroup
  * Inputgroup
  * Headergroup
  * Roll ID  
* Function for validate key
  * Validates for valid key name
  * Validates if key is already in use  
* Expression Editor with syntax highlighting
  * Roll Formula
  * Roll Name
  * Auto
  * Max(for simplenumerics properties)
* Key Checker   
* Supports item types  
  * Property
  * Panel
  * Multipanel
  * Group
  * Tab
  * cItem
# Module Operations
## Auto Generate Inputs
![sbe_autogenerate](https://user-images.githubusercontent.com/81265884/134352052-37ce91bf-10b7-4573-adc5-e7ad193330ad.gif)
## Validate Keys
![sbe_validate_key](https://user-images.githubusercontent.com/81265884/134353199-511477de-f755-4491-85e0-900d3a5060ca.gif)

## Expression Editor
The expression editor  with syntax highlightning and bracket matching makes it easier to write expressions for roll formulas etc
![sbe_expression_editor_highlight](https://user-images.githubusercontent.com/81265884/135227867-f2c09317-a1b5-40ce-89a8-1be47aec04a5.gif)


## Key Checker
The Key Checker lists all Sandbox items and validates them according to the current validation mode.
Open the Key Checker by going by the Game Settings page, on the the Module tab  
![game_settings](https://user-images.githubusercontent.com/81265884/134831200-22ae0e77-873a-479f-986a-20ede9cf7e63.png)

![key_checker](https://user-images.githubusercontent.com/81265884/134831209-9eb5e91d-c000-4584-bcd1-41fd82a11f01.png)
Click an item in the result list to open the item.

To filter the results, use the filter controls on the bottom.
# Module Settings
![settings](https://user-images.githubusercontent.com/81265884/134831902-4327b34c-4c6a-47cb-946d-11186ed1951e.png)



