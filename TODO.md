# Spreadsheet TO DO
  1) Continue testing formulas

# App TO DO
  ~~1) Target user input values in app.js~~

  ~~2) Add simple calc functions to js (Hits, Wounds, Damage, DPP). Remove all calcs from html~~

  ~~3) Push models to an array so that they may be accessed for graphs and display purposes~~

  ~~4) Add logic for wounds against T3 thru T8.~~

  ~~5) Familiarize myself with graphs (chartjs,flotjs,or d3)~~

  ~~6) Add logic for advanced options - rerolls/modifiers/misc~~

  ~~7) Add model-grouping feature~~

  ~~8) Interpolation~~

  ~~9) Delete model~~ 

  10) Finalize Wireframe. (Header, Footer, Model states, Horizontal Scrollbars on Models)

  11) Layout HTML hierarchy

  12) Learn CSS requirements
  ~~-vertical dragbars~~
  ~~-tabs~~
  
  13) Add CSS

  14) Finalize Graphs

# Feature Creep

Top priority
1) Users may copy/paste models
2) Users may choose model color from list of unused colors
3) Users may change default input values in Settings widget
4) Users may save models for future import -- Browser? $UIRouter? Other?
5) Users may import from predefined models (Space Marine, Ork Boy, Bolter, Shoota, etc.) 

Second priority
1) Users may choose type of graph display (line, bar, other?) in Settings widget
2) Display best time to use reroll strategem (failed hit, failed wound, low damage) & added damage. Ask user "Always/Opportunisticly use a reroll strategem for this model?". Display chance of strategem use.      
3) Users may select Psychic, Shooting, Fight, (multiple selections allowed) or None (default) for model.type. "Psychic" option adds/replaces model HTML with Psychic test inputs (WC, Spell effect, Rerolls, strategems). "Shooting" option adds Rapid-Fire input. 
4) "Split into seperate model" button per each model.type   
5) Damage-by-phase results (with each % of total damage). Graph and/or text form ("Your army outputs X% dmg in Psychic, Y% dmg in Shooting, Z% dmg in fight.")
6) Damage-by-turn results. Users may select each model.type to have Battle-Round variants (BR 1,2,3..7). Each variant contains inputs unique to that Battle-Round, or users may select variant(s) with "No Attacks". "Fight" model.type adds charge inputs (distance, rerolls, modifiers, strategems). Displays chance of charge. Asks user "scale results down by chance of charge?"
7) Users may import models/rosters from Battlescribe