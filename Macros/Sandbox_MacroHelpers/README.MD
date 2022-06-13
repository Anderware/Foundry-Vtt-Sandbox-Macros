# Sandbox Macro Helpers
A collection of macro functions

Please note that in order to use them, you need to include their actual code(found in the js-file) into your macro

```
// ---------------------------------------------------------------
// Functions for getting an actor
// ---------------------------------------------------------------
// Actor_GetFromPlayerCharacter();  
// Actor_GetFromSelectedToken();
// Actor_GetFromSandboxSheet(event); 
// Actor_GetFromName(actorname)    

// ---------------------------------------------------------------
// Functions for handling actor properties
// ---------------------------------------------------------------
// ActorProperty_HasProperty(actor,propertykey)
// ActorProperty_GetValue(actor,propertykey)
// ActorProperty_SetValue(actor,propertykey,newvalue='',newmax='')
// ActorProperty_ToggleValue(actor,propertykey)

// ---------------------------------------------------------------
// Functions for handling actor cItems
// ---------------------------------------------------------------
// ActorcItem_GetFromName(actor,citemname)
// ActorcItem_IsActive(actor,actorcitem)
// ActorcItem_Activate(actor,actorcitem)
// ActorcItem_Deactivate(actor,actorcitem)
// ActorcItem_ToggleActivation(actor,actorcitem)
// ActorcItem_ChangeActivation(actor,actorcitem,newvalue=true)
// ActorcItem_Consume(actor,actorcitem)
// ActorcItem_Recharge(actor,actorcitem)
// ActorcItem_ChangeUses(actor,actorcitem,newvalue=0)
// ActorcItem_IncreaseUses(actor,actorcitem)
// ActorcItem_DecreaseUses(actor,actorcitem)
// ActorcItem_Add(actor,citem,number=1)
// ActorcItem_Delete(actor,actorcitem)
// ActorcItem_IncreaseNumber(actor,actorcitem,number=1)
// ActorcItem_DecreaseNumber(actor,actorcitem)

// ---------------------------------------------------------------
// Functions for handling cItems
// ---------------------------------------------------------------
// cItem_GetFromName(citemname)
```
