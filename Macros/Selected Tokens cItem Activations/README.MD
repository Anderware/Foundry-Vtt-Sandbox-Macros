# Selected Tokens cItem Activations
This macro displays a table with configured cItems for the currently selected tokens and has the following features
- Activate/deactivate cItems with a ACTIVATION MOD
- Add/remove configured cItems to/from tokens/actors
- Updates the table if any currently displayed tokens/actors are updated elsewhere

![selectedtokenscitems](https://user-images.githubusercontent.com/81265884/165173242-51a690d4-d926-406a-b9f8-397ef1334eec.gif)


## Version Compability
This macro has been tested with the following versions

Sandbox  | Foundry
-------  | ----------
0.12.4   | 9.255
0.12.7   | 9.255

# Configuration
```javascript
// Note on configuring this macro
  // Attribute field:
  //   citemname - the name of the citem, required. If the token/actor does not have the citem, it will be marked 
  //   category - any string, optional   
  objcItems = [
      {"citemname": "Blinded","category":"State"},
      {"citemname": "Deaf","category":"State"},
      {"citemname": "Frozen","category":"State"},
      {"citemname": "Paralyzed","category":"State"},
      {"citemname": "Prone","category":"State"},  
      {"citemname": "Dark Vision","category":"Trait"},
      {"citemname": "Rage","category":"Trait"},
      {"citemname": "Wings","category":"Trait"}
 ]; 
```
