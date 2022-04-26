

# MODIFICATION - Monks Enhanced Journal Shop - For Sandbox

> By Ramses800

This modification will allow you to use the Shop Journal found in Monks Enhanced Journals to let the players buy and pay for citems in a Shop Journal using  coinage stored as Sandbox actor properties.

Note that this modification will only work with an Open Shop, the Request Purchase is not working with Sandbox at this time due to the Sandbox custom chat template.

## Version Compability

The content of this article has been tested with the following versions

| Sandbox | Foundry | Monks Enhanced Journals |
| ------- | ------- | ----------------------- |
| 0.12.4  | 9.255    | 1.0.52                  |

##  Warnings, notes and disclaimers

* :pushpin: Make a backup of your Sandbox world __**before**__ any editing! This modification, **if** implemented incorrectly or in a untested version(of Foundry/Sandbox/Monks Enhanced Journals) can corrupt your data. You have been warned.
* :pushpin: Make a backup of any original files you edit __**before**__ any editing
* :warning: Any changes you have made to original files will be overwritten when updating Monks Enhanced Journals to a newer version so save your edits somewhere to re-apply them again 

## Modification of Monks Enhanced Journals files

### Step 1 - Modify  file named EnhancedJournalSheet.js

#### Step 1 A - Modify method getCurrency

Find the method getCurrency

```javascript
static getCurrency(actor, denomination) {
```

In the method getCurrency, find this code

```javascript
switch (game.system.id) {
    case 'pf2e':
        {
            let coin = actor.data.items.find(i => { return i.isCoinage && i.data.data.denomination.value == denomination });
            coinage = (coin && this.getValue(coin.data, quantityname(), 0));
        }
        break;
    case 'age-system':
        coinage = parseInt(actor.data.data[denomination]);
        break;
    case 'swade':
        coinage = parseInt(actor.data.data.details.currency);
        break;
    case 'shadowrun5e':
        coinage = parseInt(actor.data.data.nuyen);
        break;
    case 'starwarsffg':
        coinage = parseInt(actor.data.data.stats.credits.value);
        break;  
    default:
        {   
            let coin = this.getValue(actor.data, currencyname());
            coinage = parseInt(this.getValue(coin, denomination));
        }
        break;
}
```

Add the following code to the switch statement

```javascript
// Modification for sandbox   
case 'sandbox':      
if(actor.data.data.attributes.hasOwnProperty(denomination)){
    coinage=parseInt(actor.data.data.attributes[denomination].value);
} else {    
    coinage=0;
}
break;
```

It will now look like this

```javascript
switch (game.system.id) {
    case 'pf2e':
        {
            let coin = actor.data.items.find(i => { return i.isCoinage && i.data.data.denomination.value == denomination });
            coinage = (coin && this.getValue(coin.data, quantityname(), 0));
        }
        break;
    case 'age-system':
        coinage = parseInt(actor.data.data[denomination]);
        break;
    case 'swade':
        coinage = parseInt(actor.data.data.details.currency);
        break;
    case 'shadowrun5e':
        coinage = parseInt(actor.data.data.nuyen);
        break;
    case 'starwarsffg':
        coinage = parseInt(actor.data.data.stats.credits.value);
        break;  
        // Modification for sandbox   
    case 'sandbox':      
        if(actor.data.data.attributes.hasOwnProperty(denomination)){
            coinage=parseInt(actor.data.data.attributes[denomination].value);
        } else {    
            coinage=0;
        }
        break;
    default:
        {   
            let coin = this.getValue(actor.data, currencyname());
            coinage = parseInt(this.getValue(coin, denomination));
        }
        break;
}
```

#### Step 1 B - Modify method addCurrency

Find the method addCurrency

```javascript
static addCurrency(actor, denomination, value) {
```

In the method addCurrency, find the code

```javascript
switch (game.system.id) {
    case 'age-system':
        updates[`data.${k}`] = v;
        break;
    case 'swade':
        updates[`data.details.currency`] = v;
        break;
    case 'shadowrun5e':
        updates[`data.nuyen`] = v;
        break;
    case 'starwarsffg':
        updates[`data.stats.credits.value`] = v;
        break;
    default:
        let coin = this.getValue(actor.data, currencyname());
        updates[`data.${currencyname()}.${k}`] = (coin[k] && coin[k].hasOwnProperty("value") ? { value: v } : v);
        break;
}
```

Add the following code to the switch statement

```javascript
case 'sandbox':
        updates={[`data.attributes.${denomination}.value`]: v, [`data.attributes.${denomination}.modified`]: true}; 
        break;
```

It will now look like this

```javascript
switch (game.system.id) {
    case 'age-system':
        updates[`data.${k}`] = v;
        break;
    case 'swade':
        updates[`data.details.currency`] = v;
        break;
    case 'shadowrun5e':
        updates[`data.nuyen`] = v;
        break;
    case 'starwarsffg':
        updates[`data.stats.credits.value`] = v;
        break;
    case 'sandbox':
        updates={[`data.attributes.${denomination}.value`]: v, [`data.attributes.${denomination}.modified`]: true}; 
        break;
    default:
        let coin = this.getValue(actor.data, currencyname());
        updates[`data.${currencyname()}.${k}`] = (coin[k] && coin[k].hasOwnProperty("value") ? { value: v } : v);
        break;
}
```

Save the file

### Step 2 - Modify  file named  -  ShopSheet.js

#### Step 2 A - Modify method requestItem

Find the method requestItem

```javascript
async requestItem(event) {
```

In the method requestItem, find the following code

```javascript
// Create the owned item
if (!ShopSheet.canAfford((result.quantity * price.value) + " " + price.currency, actor))
    ui.notifications.error(`${actor.name} cannot afford ${result.quantity} ${item.name}`);
else {
    let itemData = duplicate(item);
    delete itemData._id;
    this.setValue(itemData, quantityname(), result.quantity);
    await actor.createEmbeddedDocuments("Item", [itemData]);

    MonksEnhancedJournal.emit("purchaseItem",
                              {
        shopid: this.object.id,
        itemid: item._id,
        actorid: actor.id,
        user: game.user.id,
        quantity: result.quantity,
        purchase: true
    });
} 
```

Modify it to like like this

```javascript
// Create the owned item
if (!ShopSheet.canAfford((result.quantity * price.value) + " " + price.currency, actor))
    ui.notifications.error(`${actor.name} cannot afford ${result.quantity} ${item.name}`);
else {   
    // Modification for Sandbox
    if(game.system.id=='sandbox'){
        // check that actor has citem
        let ciKey=item.data.ciKey;
        let citem = actor.data.data.citems.find(y=>y.ciKey == ciKey);
        let citemIDs;
        let citemNew;
        let newuses;
        if (citem!=null){   
          console.warn(citem);
          // increase number 
          let newnumber=parseInt(citem.number)+result.quantity;              
          // account for uses
          newuses=parseInt(citem.uses) + (Math.round(citem.maxuses/citem.number)*result.quantity);                          
          citemIDs = duplicate(actor.data.data.citems);
          citemNew = citemIDs.find(y => y.id == citem.id);
          citemNew.number = newnumber;                                
          citemNew.uses = parseInt(newuses);
          await actor.update({ "data.citems": citemIDs });
        } else {  
            // actor does not have this citem
            // get citem from game db
            citem=await game.items.find(y=>y.data.data.ciKey == ciKey);
            if (citem!=null){               
                // prepare citem to be added to actor
                let subitems =await actor.addcItem(citem,null,null,result.quantity);                                            
                if (actor.isToken) {
                    let myToken = canvas.tokens.get(actor.token.id);
                    await myToken.document.update({ "actorData.data.citems": subitems });
                }
                else {                                    
                    await actor.update({ "data.citems": subitems });
                }  
                // if bought quantity is more than 1, adjust uses 
                // (seems to be a small bug in Sandbox addcItem that only adds uses for 1 item regardless )
                if(result.quantity>1){
                  citem = actor.data.data.citems.find(y=>y.ciKey == ciKey);
                  newuses=parseInt(citem.maxuses*result.quantity);
                  citemIDs = duplicate(actor.data.data.citems);
                  citemNew = citemIDs.find(y => y.id == citem.id);
                  citemNew.uses = parseInt(newuses); 
                  await actor.update({ "data.citems": citemIDs });
                }
            }
          }
    } else {
      let itemData = duplicate(item);
      delete itemData._id;
      this.setValue(itemData, quantityname(), result.quantity);
      await actor.createEmbeddedDocuments("Item", [itemData]);
    }

    MonksEnhancedJournal.emit("purchaseItem",
        {
            shopid: this.object.id,
            itemid: item._id,
            actorid: actor.id,
            user: game.user.id,
            quantity: result.quantity,
            purchase: true
        });
}

```

Save the file

## Step 3 

In Foundry press F5 to refresh(reload the scripts) - needs to be done on both gm and player.

## Setup Monks Enhanced Journal

Create your currency of choice 

![image](https://user-images.githubusercontent.com/81265884/164990379-4c51a533-50cf-44bd-9252-0ac16949991e.png)


## Setup Sandbox Actor Property

Create a simplenumeric actor property with the key of your currency

Example the key 'gold'
