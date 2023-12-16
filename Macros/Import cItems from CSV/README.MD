# Import cItems from CSV
This macro imports the content of a CSV(delimited text file) into Sandbox cItems  
_Example run._  
![ImportcItemFromCSV](https://user-images.githubusercontent.com/81265884/132607247-2e46a8b2-0aaf-45f9-b84d-588b48f63e15.gif)

# :warning: Important notes
**BACKUP YOUR SANDBOX WORLD BEFORE TESTING THIS MACRO!**

If you decide to use this macro, make a smaller test import first to check your CSV formatting and template items.

## If you want to delete a folder with items in it
When deleting a folder with items in it ALWAYS use **Delete All** instead of **Remove Folder**  
Why? Because Remove Folder just does that, it does not remove the items in the folder, in other words any items that were in that folder are still in the world folderless.

![Delete All](https://user-images.githubusercontent.com/81265884/132606148-78c58f1e-4f57-4307-a5a7-0bb79d18af5e.png)

## Version Compability
This macro has been tested with the following versions

Sandbox  | Foundry    | Macro Version | Notes
-------  | ---------- | ------------- | -----
0.10.1   | 0.8.8      | 1.0.1         | :warning: Not compatible with Foundry 10x
0.12.2   | 9.251      | 1.0.1         | :warning: Not compatible with Foundry 10x
0.13.4   | 9.269      | 1.0.1         | :warning: Not compatible with Foundry 10x
0.14.0   | 10.291     | 1.1.0         | :warning: Not compatible with Foundry 9x
0.14.0   | 10.291     | 1.2.0         | :warning: Not compatible with Foundry 9x<br>Folders will now be created if not existing and are hierarchical named
0.14.1   | 11.315     | 1.2.0         | :warning: Not compatible with Foundry 9x

Note. This have only been tested on a self-hosted Foundry VTT on Windows 10/11.  
If you use Forge or some other remote hosting, please tell me your results on the Sandbox Discord.

# :gear: How it works
The macro uses an existing cItem as a template for the import data. It reads the file, matching each item to the template structure.  
It actually duplicates the template item and then process the line in the CSV and updates this duplicate with the data in the line.
If the item already exists, it can update it or warn you  depening on your settings in the UI.

# How to use this macro

## Step 1 - Prepare your world
### Create cItem templates
Create one cItem that will act as the template to build the imported items.  
Set it up just like a normal cItem with groups,properties, MODS etc.
The macro can only modify properties(attributes) so any MOD-related things you need, have to be on the template item.  
if you have values in a MOD, it is recommended to use a property and reference(with #{citem property key} it in the MOD instead of entering a numerical value.  
_Example._
![MOD](https://user-images.githubusercontent.com/81265884/132749629-3601c42a-9d0f-4861-afca-7bd4c93c23e8.png)

If you have added any MODs to the cItems(either the template item or imported ones after the import, you can still update the citems properties in a future update without removing the MODs.

### Create import folders
Specified import folders must exist.  
As of macro version 1.2, folders are now created if not existing

## Step 2 - Prepare your CSV file
See section of CSV formatting below

## Step 3  - Backup your world
Before running any advanced data manipulating macro, always make sure that you have a good backup!

## Step 4 - Run the macro
![UI](https://user-images.githubusercontent.com/81265884/132597257-e87f5a30-bae8-4486-8dd6-156611cf7524.png)
### Setup import settings
Setting|Comment
-------| ------
CSV file| Use the filepicker to select the CSV file
List separator character used in CSV-file| What character the macro should use to determine fields in the file. If the file does not match this a error will be displayed.
Update existing items with data from import file|If this is not checked, any already existing cItems will not be updated. Default check for existence is the name of the citem and that it exist in the specified import folder
For update of existing items, require identical Group configuration|This is used to validate and identify an existing cItem. Can be unchecked for a more relaxed check

### Run the import
The UI contains a log with the result.  
If you have an invalid setup, it will be listed here.

# CSV Formatting
The macro can read files with the following list separators
* pipe |
* semicolon ;
* comma ,

### Recommended list separator
Since commas(and sometimes semicolon) might appear in normal text, it is generally recomended to use pipe(|) as list separator.  
The macro can be easily be modified to use any character as list separator if needed.

## Compulsory headers
The first line in the file must contain at least the following headers  and they must be in this order: 

Using pipe as list separator
```CSV
Name|Template|ImportFolder|Image|Description
```
Using semicolon as list separator
```CSV
Name;Template;ImportFolder;Image;Description
```

Using comma as list separator
```CSV
Name,Template,ImportFolder,Image,Description
```

Header key|Description|Can be empty
------|-------|--------------
Name|The name of the cItem|No
Template|The name of the cItem template that must exist in your world. Different templates can be used in the same file|No
ImportFolder|Where the cItem should be imported into, this must exist in your world<br> As of 1.2, folders are created if not existing|No
Image|Valid path to the image file for the cItem|This can be empty
Description|Description is the text on the Bio/info-tab and can be a valid HTML string. Just make sure that any text here dont conflict with the list separator setting|This can be empty

### Hierarchical folder names(version 1.2)
From this version, import folder name must be a full path  
Examples  
```
Imports/Items/Weapons  
Imports/Items/Containers  
Imports/Skills/Containers  
```
Note that default maximum number of levels in Foundry is 3  
The import will work with more levels but unless a suitable module is active, only 3 levels will be shown(the citem will still be there, just not shown.)
If more levels are needed, use a suitable module to display them.

## Custom headers
After the compulsory headers, you can add cItem property keys that exist in your cItem template item.
If an item in the file has any value in a field the macro will check if the template item has that property and update it if it is not the same as in the file. If the cItem does not have that property, a warning will be logged. 
If you are using numerical properties that have decimal values, make sure to use a value with the correct decimal character(dot(.) or comma(,) depending on your system.


## CSV file examples
### Example 1
Data  
|Name            |Template               |ImportFolder |Image                                                  |Description                   |ItemWeight|Damage|
|----------------|-----------------------|-------------|-------------------------------------------------------|------------------------------|----------|------|
|Leather Gauntlet|_Miscellaneous_Template|MISCELLANEOUS|icons/equipment/hand/gauntlet-simple-leather-brown.webp|A standard leather glove      |1         |      |
|Leather Belt    |_Miscellaneous_Template|MISCELLANEOUS|icons/equipment/waist/belt-buckle-gold.webp            |Belt with buckle              |1         |      |
|Ring            |_Miscellaneous_Template|MISCELLANEOUS|icons/equipment/finger/ring-ball-gold-pink.webp        |A nice looking ring with stone|0         |      |
|Mace            |_Weapon_Template       |WEAPONS      |icons/weapons/maces/mace-cube-spiked-steel.webp        |A solid mace with spikes      |3         |8     |

CSV


```CSV
Name|Template|ImportFolder|Image|Description|ItemWeight|Damage
Leather Gauntlet|_Miscellaneous_Template|MISCELLANEOUS|icons/equipment/hand/gauntlet-simple-leather-brown.webp|A standard leather glove|1|
Leather Belt|_Miscellaneous_Template|MISCELLANEOUS|icons/equipment/waist/belt-buckle-gold.webp|Belt with buckle|1|
Ring|_Miscellaneous_Template|MISCELLANEOUS|icons/equipment/finger/ring-ball-gold-pink.webp|A nice looking ring with stone|0|
Mace|_Weapon_Template|WEAPONS|icons/weapons/maces/mace-cube-spiked-steel.webp|A solid mace with spikes|3|8
```
### Example 2
Data  
|Name            |Template               |ImportFolder |Image                                                  |Description                   |ItemGroup|Damage|ArmorClass|ItemWeight|
|----------------|-----------------------|-------------|-------------------------------------------------------|------------------------------|---------|------|----------|----------|
|Club            |_Weapon_Template       |WEAPONS      |icons\weapons\clubs\club-simple-black.webp             |Light                         |Weapon   |1d4 bludgeoning|          |2         |
|Dagger          |_Weapon_Template       |WEAPONS      |icons\weapons\daggers\dagger-straight-blue.webp        |Finesse, light, thrown (range 20/60)|Weapon   |1d4 piercing|          |1         |
|Greatclub       |_Weapon_Template       |WEAPONS      |icons\weapons\clubs\club-heavy-barbed-grey.webp        |Two-handed                    |Weapon   |1d8 bludgeoning|          |10        |
|Handaxe         |_Weapon_Template       |WEAPONS      |icons\weapons\axes\shortaxe-yellow.webp                |Light, thrown (range 20/60)   |Weapon   |1d6 slashing|          |2         |
|Javelin         |_Weapon_Template       |WEAPONS      |icons\weapons\polearms\javelin.webp                    |Thrown (range 30/120)         |Weapon   |1d6 piercing|          |2         |
|Light Hammer    |_Weapon_Template       |WEAPONS      |icons\weapons\hammers\shorthammer-embossed-white.webp  |Light, thrown (range 20/60)   |Weapon   |1d4 bludgeoning|          |2         |
|Mace            |_Weapon_Template       |WEAPONS      |icons\weapons\maces\shortmace-round-spiked-wood.webp   |—                             |Weapon   |1d6 bludgeoning|          |4         |
|Quarterstaff    |_Weapon_Template       |WEAPONS      |icons\weapons\staves\staff-simple.webp                 |Versatile (1d8)               |Weapon   |1d6 bludgeoning|          |4         |
|Sickle          |_Weapon_Template       |WEAPONS      |icons\weapons\sickles\sickle-simple-grey.webp          |Light                         |Weapon   |1d4 slashing|          |2         |
|Spear           |_Weapon_Template       |WEAPONS      |icons\weapons\polearms\spear-flared-steel.webp         |Thrown (range 20/60), versatile (1d8)|Weapon   |1d6 piercing|          |3         |
|Ring Mail       |_Armor_Template        |ARMOR        |icons\equipment\chest\vest-leather-pink.webp           |Disadvantage                  |Armor    |      |14        |40        |
|Chain Mail      |_Armor_Template        |ARMOR        |icons\equipment\chest\breastplate-scale-grey.webp      |Disadvantage                  |Armor    |      |16        |55        |
|Splint          |_Armor_Template        |ARMOR        |icons\equipment\chest\breastplate-scale-grey.webp      |Disadvantage                  |Armor    |      |17        |60        |
|Plate           |_Armor_Template        |ARMOR        |icons\equipment\chest\breastplate-cuirass-steel-grey.webp|Disadvantage                  |Armor    |      |18        |65        |

CSV
```CSV
Name;Template;ImportFolder;Image;Description;ItemGroup;Damage;ArmorClass;ItemWeight
Club;_Weapon_Template;WEAPONS;icons\weapons\clubs\club-simple-black.webp;Light;Weapon;1d4 bludgeoning;;2
Dagger;_Weapon_Template;WEAPONS;icons\weapons\daggers\dagger-straight-blue.webp;Finesse, light, thrown (range 20/60);Weapon;1d4 piercing;;1
Greatclub;_Weapon_Template;WEAPONS;icons\weapons\clubs\club-heavy-barbed-grey.webp;Two-handed;Weapon;1d8 bludgeoning;;10
Handaxe;_Weapon_Template;WEAPONS;icons\weapons\axes\shortaxe-yellow.webp;Light, thrown (range 20/60);Weapon;1d6 slashing;;2
Javelin;_Weapon_Template;WEAPONS;icons\weapons\polearms\javelin.webp;Thrown (range 30/120);Weapon;1d6 piercing;;2
Light Hammer;_Weapon_Template;WEAPONS;icons\weapons\hammers\shorthammer-embossed-white.webp;Light, thrown (range 20/60);Weapon;1d4 bludgeoning;;2
Mace;_Weapon_Template;WEAPONS;icons\weapons\maces\shortmace-round-spiked-wood.webp;—;Weapon;1d6 bludgeoning;;4
Quarterstaff;_Weapon_Template;WEAPONS;icons\weapons\staves\staff-simple.webp;Versatile (1d8);Weapon;1d6 bludgeoning;;4
Sickle;_Weapon_Template;WEAPONS;icons\weapons\sickles\sickle-simple-grey.webp;Light;Weapon;1d4 slashing;;2
Spear;_Weapon_Template;WEAPONS;icons\weapons\polearms\spear-flared-steel.webp;Thrown (range 20/60), versatile (1d8);Weapon;1d6 piercing;;3
Ring Mail ;_Armor_Template;ARMOR;icons\equipment\chest\vest-leather-pink.webp;Disadvantage;Armor;;14;40
Chain Mail ;_Armor_Template;ARMOR;icons\equipment\chest\breastplate-scale-grey.webp;Disadvantage;Armor;;16;55
Splint ;_Armor_Template;ARMOR;icons\equipment\chest\breastplate-scale-grey.webp;Disadvantage;Armor;;17;60
Plate ;_Armor_Template;ARMOR;icons\equipment\chest\breastplate-cuirass-steel-grey.webp;Disadvantage;Armor;;18;65
```
