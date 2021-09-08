# Import cItems from CSV
This macro imports the content of a CSV(delimited text file) into cItems


# BACKUP YOUR SANDBOX WORLD BEFORE TESTING THIS MACRO!
If you decide to use this macro, make a smaller test import first to check your CSV formatting and template items.

## Version Compability
This macro has been tested with the following versions

Sandbox  | Foundry
-------  | ----------
0.10.1   | 0.8.8


# CSV Formatting
The CSV file can use the following list separators
* pipe |
* semicolon ;
* comma ,

## Compulsotary headers
The first line in the file must contain the following headers  and they must be in this order:  
```Name|Template|ImportFolder|Image|Description```

Header|Comment
------|-------
Name|The name of the cItem
Template|The name of the cItem template that must exist in your world
ImportFolder|Where the cItem should be imported into, this must exist in your world
Image|Valid path to the image file for the cItem, this can be empty
Description|Description is the text on the Bio/info-tab and can be a valid HTML string. This can be empty

## Custom headers

