# HOWTO - Align two tables with CS

This article outlines how to align two columns with different number of columns with some CSS

## Version Compability

The content of this article has been tested with the following versions

| Sandbox | Foundry |
| ------- | ------- |
| 0.10.1  | 0.8.8   |

## General  Information

This articles uses the module [Custom CSS Rules](https://foundryvtt.com/packages/custom-css) to apply CSS. The module is not necessary per se, the CSS could be applied with a CSS-file just as well.

## Goal of this article

To make the following two tables(TABLE_FIRST and TABLE_SECOND) appear as one.

![image-20211024205054784](HOWTO - align tables with CSS.assets/image-20211024205054784.png)

### Step 1

Remove header from second table(for the property TABLE_SECOND, uncheck **Has Header?**)

![image-20211024205141577](HOWTO - align tables with CSS.assets/image-20211024205141577.png)

Position the second table directly after the first

```css
/* Remove gap between tables */
.sandbox.sheet .sbtable.TABLE_SECOND{
  margin-top:-4px;	
}	
```

![image-20211024205239888](HOWTO - align tables with CSS.assets/image-20211024205239888.png)

Align columns for both tables by setting the columns width to suitable values

```css
/* Remove gap between tables */
.sandbox.sheet .sbtable.TABLE_SECOND{
  margin-top:-4px;	
}	

/* set width of first column for first table*/
.sandbox.sheet .sbtable.TABLE_FIRST td:nth-of-type(1){
 width:200px;    
}

/* set width of first column for second table*/
.sandbox.sheet .sbtable.TABLE_SECOND td:nth-of-type(1){
 width:245px;    
}
```

![image-20211024205355410](HOWTO - align tables with CSS.assets/image-20211024205355410.png)

If your table have more columns, just add more CSS as needed with more `td:nth-of-type(n)` where n is the column number.

