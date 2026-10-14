SPRITES.bushi=["................","....1111........","...122221.......","...123321.......","...122221.......","....1111........","...144441.......","..14444441......","..14444441......","..14444441......","...144441.......","....14441.......","....16661.......","....16661.......","................","................"];
SPRITES.timeBattlemage=[".......5........",".......1........",".....11111......","....122221......","....123321......","....122221......",".....1111.......","....144441......","...14444441.....","...14444441.....","...14444441.....","....144441......","....16661.......","....16661.......","................","................"];
SPRITES.redBattlemage=["................","....5555........","...122221.......","...123321.......","...122221.......","....1111........","...144441.......","..14444441......","..14444441......","..14444441......","...144441.......","....14441.......","....16661.......","....16661.......","................","................"];
SPRITES.breaker=["................","....1111........","...122221.......","...123321.......","...122221.......","....1111........","...144441.......","..14444441......","..14444441......","..14444441......","...144441.......","....14441.......","....16661.......","....16661.......","................","................"];
SPRITES.memorist=["................","....5555........","...122221.......","...123321.......","...122221.......","....1111........","...144441.......","..14444441......","..14444441......","..14444441......","...144441.......","....14441.......","....16661.......","....16661.......","................","................"];
SPRITES.holyKnight=[".......5........","......555.......",".....11111......","....122221......","....123321......","....122221......","....111111......","...1444441......","..144444441.....","..144444441.....","..144554441.....","..144444441.....","...1444441......","....16661.......","....16661.......","................"];
SPRITES.corsair=["................","....5555........","...122221.......","...123321.......","...122221.......","....1111........","...144441.......","..14444441......","..14444441......","..14444441......","...144441.......","....14441.......","....16661.......","....16661.......","................","................"];
SPRITES.puppetmaster=["................","....7777........","...122221.......","...123321.......","...122221.......","....1111........","...144441.......","..14444441......","..14444441......","..14444441......","...144441.......","....14441.......","....16661.......","....16661.......","................","................"];
SPRITES.gunbreaker=["................","....1111........","...122221.......","...123321.......","...122221.......","....1111........","..1444441.......",".144444441......",".1444444415.....",".1444444415.....",".144444441......","..1444441.......","...16661........","...16661........","................","................"];
SPRITES.reaper=["........5.......",".......55.......","......55........","....11111.......","...122221.......","...123321.......","...122221.......","....1111........","...144441.......","..14444441......","..14444441......","..14444441......","...144441.......","....16661.......","....16661.......","................"];
// ===== PALETTES (0=transparent,1=hair/helm,2=skin,3=eyes,4=armor,5=accent,6=boots,7=detail) =====
var PALETTES={
regular:{0:null,1:'#5a5a7a',2:'#f0c090',3:'#2244aa',4:'#8888aa',5:'#aaaacc',6:'#444466',7:'#666688'},
elite:{0:null,1:'#2a8a4a',2:'#f0c090',3:'#0044aa',4:'#2a6a3a',5:'#4aff88',6:'#1a3a2a',7:'#3a8a5a'},
epic:{0:null,1:'#4a2a8a',2:'#f0c090',3:'#aa22ff',4:'#3a1a6a',5:'#9a4aff',6:'#2a1a4a',7:'#6a3aaa'},
legendary:{0:null,1:'#aa8a2a',2:'#f0c090',3:'#ffaa00',4:'#8a6a1a',5:'#ffd700',6:'#5a4a1a',7:'#ccaa44'},
rainbow:{0:null,1:'#ff0080',2:'#f0c090',3:'#00ffff',4:'#8000ff',5:'#ff00ff',6:'#0080ff',7:'#ff8800'}
};
var HEROES=[
{id:'knight',name:'Knight',rarity:'regular',sprite:'knight'},{id:'whiteMage',name:'White Mage',rarity:'regular',sprite:'whiteMage'},
{id:'blackMage',name:'Black Mage',rarity:'regular',sprite:'blackMage'},{id:'monk',name:'Monk',rarity:'regular',sprite:'monk'},
{id:'thief',name:'Thief',rarity:'regular',sprite:'thief'},{id:'ranger',name:'Ranger',rarity:'regular',sprite:'ranger'},
{id:'berserker',name:'Berserker',rarity:'regular',sprite:'berserker'},{id:'redMage',name:'Red Mage',rarity:'regular',sprite:'redMage'},
{id:'chemist',name:'Chemist',rarity:'regular',sprite:'chemist'},{id:'geomancer',name:'Geomancer',rarity:'regular',sprite:'geomancer'},
{id:'bard',name:'Bard',rarity:'regular',sprite:'bard'},{id:'lancer',name:'Lancer',rarity:'regular',sprite:'lancer'},
{id:'gladiator',name:'Gladiator',rarity:'regular',sprite:'gladiator'},{id:'conjurer',name:'Conjurer',rarity:'regular',sprite:'conjurer'},
{id:'animist',name:'Animist',rarity:'regular',sprite:'animist'},{id:'archer',name:'Archer',rarity:'regular',sprite:'archer'},
{id:'beastmaster',name:'Beastmaster',rarity:'regular',sprite:'beastmaster'},{id:'blackBelt',name:'Black Belt',rarity:'regular',sprite:'blackBelt'},
{id:'fighter',name:'Fighter',rarity:'regular',sprite:'fighter'},{id:'fencer',name:'Fencer',rarity:'regular',sprite:'fencer'},
{id:'mime',name:'Mime',rarity:'regular',sprite:'mime'},{id:'scholar',name:'Scholar',rarity:'regular',sprite:'scholar'},
{id:'squire',name:'Squire',rarity:'regular',sprite:'squire'},{id:'viking',name:'Viking',rarity:'regular',sprite:'viking'},
{id:'paladin',name:'Paladin',rarity:'elite',sprite:'paladin'},{id:'darkKnight',name:'Dark Knight',rarity:'elite',sprite:'darkKnight'},
{id:'ninja',name:'Ninja',rarity:'elite',sprite:'ninja'},{id:'dragoon',name:'Dragoon',rarity:'elite',sprite:'dragoon'},
{id:'blueMage',name:'Blue Mage',rarity:'elite',sprite:'blueMage'},{id:'timeMage',name:'Time Mage',rarity:'elite',sprite:'timeMage'},
{id:'dancer',name:'Dancer',rarity:'elite',sprite:'dancer'},{id:'gunner',name:'Gunner',rarity:'elite',sprite:'gunner'},
{id:'mystic',name:'Mystic',rarity:'elite',sprite:'mystic'},{id:'templar',name:'Templar',rarity:'elite',sprite:'templar'},
{id:'machinist',name:'Machinist',rarity:'elite',sprite:'machinist'},{id:'astrologian',name:'Astrologian',rarity:'elite',sprite:'astrologian'},
{id:'spellblade',name:'Spellblade',rarity:'elite',sprite:'spellblade'},{id:'orator',name:'Orator',rarity:'elite',sprite:'orator'},
{id:'alchemist',name:'Alchemist',rarity:'elite',sprite:'alchemist'},{id:'arcanist',name:'Arcanist',rarity:'elite',sprite:'arcanist'},
{id:'assassin',name:'Assassin',rarity:'elite',sprite:'assassin'},{id:'bishop',name:'Bishop',rarity:'elite',sprite:'bishop'},
{id:'breaker',name:'Breaker',rarity:'elite',sprite:'breaker'},{id:'bushi',name:'Bushi',rarity:'elite',sprite:'bushi'},
{id:'cannoneer',name:'Cannoneer',rarity:'elite',sprite:'cannoneer'},{id:'chocoboKnight',name:'Chocobo Knight',rarity:'elite',sprite:'chocoboKnight'},
{id:'devout',name:'Devout',rarity:'elite',sprite:'devout'},{id:'elementalist',name:'Elementalist',rarity:'elite',sprite:'elementalist'},
{id:'evoker',name:'Evoker',rarity:'elite',sprite:'evoker'},{id:'flintlock',name:'Flintlock',rarity:'elite',sprite:'flintlock'},
{id:'foebreaker',name:'Foebreaker',rarity:'elite',sprite:'foebreaker'},{id:'gadgeteer',name:'Gadgeteer',rarity:'elite',sprite:'gadgeteer'},
{id:'greenMage',name:'Green Mage',rarity:'elite',sprite:'greenMage'},{id:'hunter',name:'Hunter',rarity:'elite',sprite:'hunter'},
{id:'illusionist',name:'Illusionist',rarity:'elite',sprite:'illusionist'},{id:'juggler',name:'Juggler',rarity:'elite',sprite:'juggler'},
{id:'ladyLuck',name:'Lady Luck',rarity:'elite',sprite:'ladyLuck'},{id:'magus',name:'Magus',rarity:'elite',sprite:'magus'},
{id:'memorist',name:'Memorist',rarity:'elite',sprite:'memorist'},{id:'mogKnight',name:'Mog Knight',rarity:'elite',sprite:'mogKnight'},
{id:'moogleKnight',name:'Moogle Knight',rarity:'elite',sprite:'moogleKnight'},{id:'raptor',name:'Raptor',rarity:'elite',sprite:'raptor'},
{id:'ravager',name:'Ravager',rarity:'elite',sprite:'ravager'},{id:'redBattlemage',name:'Red Battlemage',rarity:'elite',sprite:'redBattlemage'},
{id:'seer',name:'Seer',rarity:'elite',sprite:'seer'},{id:'shikari',name:'Shikari',rarity:'elite',sprite:'shikari'},
{id:'sniper',name:'Sniper',rarity:'elite',sprite:'sniper'},{id:'songstress',name:'Songstress',rarity:'elite',sprite:'songstress'},
{id:'timeBattlemage',name:'Time Battlemage',rarity:'elite',sprite:'timeBattlemage'},{id:'tinker',name:'Tinker',rarity:'elite',sprite:'tinker'},
{id:'trainer',name:'Trainer',rarity:'elite',sprite:'trainer'},{id:'uhlan',name:'Uhlan',rarity:'elite',sprite:'uhlan'},
{id:'summoner',name:'Summoner',rarity:'epic',sprite:'summoner'},{id:'sage',name:'Sage',rarity:'epic',sprite:'sage'},
{id:'samurai',name:'Samurai',rarity:'epic',sprite:'samurai'},{id:'oracle',name:'Oracle',rarity:'epic',sprite:'oracle'},
{id:'calculator',name:'Calculator',rarity:'epic',sprite:'calculator'},{id:'mediator',name:'Mediator',rarity:'epic',sprite:'mediator'},
{id:'runeKnight',name:'Rune Knight',rarity:'epic',sprite:'runeKnight'},{id:'necromancer',name:'Necromancer',rarity:'epic',sprite:'necromancer'},
{id:'corsair',name:'Corsair',rarity:'epic',sprite:'corsair'},{id:'gunbreaker',name:'Gunbreaker',rarity:'epic',sprite:'gunbreaker'},
{id:'holyKnight',name:'Holy Knight',rarity:'epic',sprite:'holyKnight'},{id:'puppetmaster',name:'Puppetmaster',rarity:'epic',sprite:'puppetmaster'},
{id:'reaper',name:'Reaper',rarity:'epic',sprite:'reaper'},
{id:'shadow',name:'Shadow',rarity:'legendary',sprite:'shadow'},
{id:'mog',name:'Mog',rarity:'legendary',sprite:'mog'},{id:'setzer',name:'Setzer',rarity:'legendary',sprite:'setzer'},
{id:'redxiii',name:'Red XIII',rarity:'legendary',sprite:'redxiii'},{id:'caitsith',name:'Cait Sith',rarity:'legendary',sprite:'caitsith'},
{id:'faris',name:'Faris',rarity:'legendary',sprite:'faris'},{id:'rydia',name:'Rydia',rarity:'legendary',sprite:'rydia'},
