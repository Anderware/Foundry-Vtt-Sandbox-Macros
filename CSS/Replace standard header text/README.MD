With a CSS trick it is possible to replace the table headers.
```css
/* Replace the Active text on all tables*/
/* the nth-of-type(2) means the second column*/
.sandbox.sheet .sbtable th.tableheader:nth-of-type(2) {        
    /*make this element invisible*/
    color: rgba(0, 0, 0, 0); /* transparent*/
    text-shadow:none;
}    

/*show this element instead*/
.sandbox.sheet .sbtable  th.tableheader:nth-of-type(2):after {
  content:'ACTIVE!'; /*show this text instead*/
  visibility: visible;
  position: relative;
  background-color:rgba(0, 0, 0, 0); /* transparent*/
  color:white; /* matching standard table header color*/
  left:-25px;         /*adapted to the replacement text length*/
  margin-left:-15px;  /*adapted to the replacement text length*/
  margin-right:-30px; /*adapted to the replacement text length*/
  text-shadow:rgb(0, 0, 0) 1px 1px 0px; /* matching standard table header text-shadow*/ 
}

/* Replace the Num text but only on a specific table(in this example Table_Miscellaneous)*/
/* the nth-of-type(3) means the third column*/
.sandbox.sheet .sbtable.Table_Miscellaneous th.tableheader:nth-of-type(3) {        
    /* make this element invisible*/
    color: rgba(0, 0, 0, 0); /* transparent*/
    text-shadow:none;    
}    

/*show this element instead*/
.sandbox.sheet .sbtable.Table_Miscellaneous  th.tableheader:nth-of-type(3):after {
  content:'Quantity'; /*show this text instead*/
  visibility: visible;
  position: relative;
  background-color:rgba(0, 0, 0, 0); /* transparent*/
  color:white; /* matching standard table header color*/
  left:-25px;         /*adapted to the replacement text length*/
  margin-left:-15px;  /*adapted to the replacement text length*/
  margin-right:-40px; /*adapted to the replacement text length*/
  text-shadow:rgb(0, 0, 0) 1px 1px 0px; /* matching standard table header text-shadow*/ 
}
```
