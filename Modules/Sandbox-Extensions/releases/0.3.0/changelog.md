# Sandbox Extensions Change Log

## Version 0.3.0 (2021-12-07)
- Sandbox 0.10.11
- Foundry 0.8.9
- Major refactoring of all item sheet related code for future expansions
- Compacted extensions buttons for item sheet to option dropdown menus
- Item Delete Protection for Actor and Item sheets
  - Hides the Delete icon for table items, panel properties etc .
    Checkbox in window header to toggle visibillity for delete icons
- Added option for Details as default tab for Properties/Panels/Multipanels/Groups/Tabs. Only for GMs
- Added option for Attributes as default tab for cItems. Only for GMs 
- Added option for adapt item sheets size and position based on content automatically on open. Only for GMs
- Added option for automatic latin conversion(transliteration) for key autogenerating support for many(!) alphabets(Using https://github.com/dzcpy/transliteration )
- Added item helper dropdowns for text inputs
- Added Cut/Copy/Paste/Clear for text inputs
- Added Tooltip based on value for text inputs
- Added Copy options for Key
  - Copy as actor property(@{key})
  - Copy as citem property(#{key})
  - Copy as dialog property(d{key})
- Added Copy as CSS Rule Set for fields
  - Fontgroup
  - Inputgroup
  - Headergroup
- Added Validate option for fields 
  - Check Group
  - Options(a,b,c)
- Added Expresion Editor for fields
  - Default
  - Roll ID
  - Roll Name
  - Fontgroup
  - Inputgroup
  - Headergroup
  - Options(a,bc)
- Added Autogenerate for
  - Roll Name
- Added item menu with
  - Autogenerate All
  - Validate All
  - Clear All
  - Export options for Property/Multipanel/Panel/Group/Tab
    - Copy as HTML
    - Copy as Markdown
    - Copy as PlainText
  - Show Settings
- Added settings for
  - Hide item helpers
  - Activate item deletion protection
  - Confirm batch overwrite
  - Use property data type for prefix
  - Default tab
  - Adapt size and position
- Minor fixes

## Version 0.2.0 (2021-09-29)
* Updated Expression Editor with CodeMirror for syntax highlightning and tab support
* Added Expression Editor for simplenumeric property Max
* Minor fixes

## Version 0.1.1 (2021-09-27)
* Improved key validation
* Key Checker
* Expression Editor
* Changed settings to 'world'-scope(meaning that settings is no longer in 'client'-scope, in other words, each Sandbox world will have its own settings of this module )
* Minor fixes

## Version 0.1.0 (2021-09-22)
First release


