# Import cItems from CSV
This macro imports the content of a CSV(delimited text file) into Sandbox cItems


# BACKUP YOUR SANDBOX WORLD BEFORE TESTING THIS MACRO!
If you decide to use this macro, make a smaller test import first to check your CSV formatting and template items.

## Version Compability
This macro has been tested with the following versions

Sandbox  | Foundry
-------  | ----------
0.10.1   | 0.8.8

Note. This have only been tested on a self-hosted Foundry VTT on Windows 10. If you use Forge or some other remote hosting, please tell me your results on the Sandbox Discord.

# How it works
The macro reads the file, matching each item to an existing cItem in your world that will act as a template. It actually duplicates the templateitem and then process the line in the CSV and updates this duplicate with the data in the line.
If the item already exists, it can update it or warn you  depening on your settings in the UI.

# How to use this macro

## Step 1 - Prepare your world
### Create cItem templates
Create one cItem that will act as the template to build the imported items.  
Set it up just like a normal cItem with groups,properties, MODS etc
### Create import folders
Specified import folders must exist

## Step 2 - Prepare your CSV file
See section of CSV formatting below

## Step 3  - Backup your world
Before running any advanced data manipulating macro, always make sure that you have a good backup!

## Step 4 - Run the macro
![UI](https://user-images.githubusercontent.com/81265884/132597257-e87f5a30-bae8-4486-8dd6-156611cf7524.png)
### Setup import settings
Setting|Comment
-------| ------
CSV file| use the filepicker to select the CSV file
List separator character used in CSV-file| What character the macro should use to determine fields in the file
Update existing items with data from import file|If this is not checked, any already existing cItems will not be updated
For update of existing items, require identical Group configuration|This is used to validate and identify an existing cItem. Can be unchecked for a more relaxed check

# CSV Formatting
The CSV file can use the following list separators
* pipe |
* semicolon ;
* comma ,

## Compulsory headers
The first line in the file must contain at least the following headers  and they must be in this order:  
```CSV
Name|Template|ImportFolder|Image|Description
```

Header|Comment
------|-------
Name|The name of the cItem
Template|The name of the cItem template that must exist in your world
ImportFolder|Where the cItem should be imported into, this must exist in your world
Image|Valid path to the image file for the cItem, this can be empty
Description|Description is the text on the Bio/info-tab and can be a valid HTML string. This can be empty

## Custom headers
After the compulsory headers, you can add cItem property keys that exist in your cItem template


## CSV file examples
```CSV
Name|Template|ImportFolder|Image|Description|ItemWeight|Damage
Leather Gauntlet|_Miscellaneous_Template|MISCELLANEOUS|icons/equipment/hand/gauntlet-simple-leather-brown.webp|A standard leather glove|1|
Leather Belt|_Miscellaneous_Template|MISCELLANEOUS|icons/equipment/waist/belt-buckle-gold.webp|Belt with buckle|1 |
Ring|_Miscellaneous_Template|MISCELLANEOUS|icons/equipment/finger/ring-ball-gold-pink.webp|A nice looking ring with stone|0|
Mace|_Weapon_Template|WEAPONS|icons/weapons/maces/mace-cube-spiked-steel.webp|A solid mace with spikes|3|8
```

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
