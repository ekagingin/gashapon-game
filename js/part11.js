vaan:[{n:'Sword',mp:0,pwr:1.0,t:'phys'},{n:'Steal',mp:6,pwr:0.5,t:'phys',e:'stun'},{n:'Rapid Fire',mp:10,pwr:1.4,t:'phys',e:'all'},{n:'Pyroclasm',mp:20,pwr:2.2,t:'phys'}],
lightning:[{n:'Gunblade',mp:0,pwr:1.1,t:'phys'},{n:'Ruin',mp:8,pwr:1.4,t:'magic'},{n:'Army of One',mp:14,pwr:1.8,t:'phys',e:'all'},{n:'Zantetsuken',mp:22,pwr:2.5,t:'phys'}],
noctis:[{n:'Sword',mp:0,pwr:1.1,t:'phys'},{n:'Warp Strike',mp:8,pwr:1.5,t:'phys'},{n:'Armiger',mp:14,pwr:1.8,t:'phys',e:'all'},{n:'Armiger Unleashed',mp:22,pwr:2.5,t:'phys',e:'all'}],
ramza:[{n:'Sword',mp:0,pwr:1.0,t:'phys'},{n:'Tailwind',mp:8,pwr:0,t:'buff',e:'haste 3t'},{n:'Shout',mp:10,pwr:0,t:'buff',e:'atk+50% 3t'},{n:'Ultima',mp:20,pwr:2.2,t:'magic',e:'all'}],
shantotto:[{n:'Staff',mp:0,pwr:0.5,t:'phys'},{n:'Water',mp:6,pwr:1.3,t:'magic'},{n:'Stone',mp:6,pwr:1.3,t:'magic'},{n:'Spirit Magic',mp:18,pwr:2.2,t:'magic',e:'all'}],
ace:[{n:'Card',mp:0,pwr:0.9,t:'phys'},{n:'Fire',mp:6,pwr:1.3,t:'magic'},{n:'Firaga',mp:14,pwr:1.8,t:'magic',e:'all'},{n:'Tri-Beam',mp:20,pwr:2.3,t:'magic',e:'all'}],
jack:[{n:'Sword',mp:0,pwr:1.2,t:'phys'},{n:'Blood Sword',mp:8,pwr:1.4,t:'phys',e:'lifesteal'},{n:'Lightning',mp:10,pwr:1.5,t:'magic'},{n:'Chaosbringer',mp:22,pwr:2.5,t:'phys',e:'all'}],
luneth:[{n:'Sword',mp:0,pwr:1.0,t:'phys'},{n:'Jump',mp:8,pwr:1.6,t:'phys'},{n:'Spellblade',mp:10,pwr:1.4,t:'magic'},{n:'Onion Knight',mp:20,pwr:2.3,t:'phys',e:'all'}]
};
function getHeroMoves(id){return MOVE_POOL[id]||[{n:'Attack',mp:0,pwr:1.0,t:'phys'},{n:'Focus',mp:8,pwr:0,t:'buff',e:'atk+40% 2t'},{n:'Spell',mp:8,pwr:1.3,t:'magic'},{n:'Crush',mp:14,pwr:1.6,t:'phys'}];}
function makeHeroUnit(hero){var s=RARITY_STATS[hero.rarity];var jt=JOB_TYPES[hero.id]||'hybrid';var m=TYPE_MODS[jt];return{hero:hero,hp:s.hp,maxhp:s.hp,mp:s.mp,maxmp:s.mp,patk:Math.floor(s.patk*m.patk),matk:Math.floor(s.matk*m.matk),pdef:Math.floor(s.pdef*m.pdef),mdef:Math.floor(s.mdef*m.mdef),type:jt,pres:m.pres||0,mres:m.mres||0,moves:getHeroMoves(hero.id),buffs:{atk:0,def:0},alive:true,acted:false};}
function makeEnemyUnit(floor){var m=getFloorMonster(floor);var hp=getFloorHP(floor);var atk=getFloorATK(floor);var b=floor%5===0;var mt=m.type||'physical';var pres=m.pres||0,mres=m.mres||0;var patk,matk,pdef,mdef;if(mt==='physical'){patk=Math.floor(atk*1.3);matk=Math.floor(atk*0.3);pdef=Math.floor(atk*0.35);mdef=Math.floor(atk*0.15);}else if(mt==='magical'){patk=Math.floor(atk*0.3);matk=Math.floor(atk*1.3);pdef=Math.floor(atk*0.15);mdef=Math.floor(atk*0.35);}else{patk=Math.floor(atk*0.9);matk=Math.floor(atk*0.9);pdef=Math.floor(atk*0.25);mdef=Math.floor(atk*0.25);}var moves=b?[{n:'Attack',mp:0,pwr:1.0,t:'phys'},{n:'Crushing Blow',mp:0,pwr:1.5,t:'phys'},{n:'AoE Slam',mp:0,pwr:0.7,t:'phys',e:'all'},{n:'Enrage',mp:0,pwr:0,t:'buff',e:'atk+30% 2t'}]:mt==='magical'?[{n:'Attack',mp:0,pwr:1.0,t:'magic'},{n:'Spell',mp:0,pwr:1.3,t:'magic'},{n:'Growl',mp:0,pwr:0,t:'debuff',e:'atk-20% 2t'}]:[{n:'Attack',mp:0,pwr:1.0,t:'phys'},{n:'Bite',mp:0,pwr:1.3,t:'phys'},{n:'Growl',mp:0,pwr:0,t:'debuff',e:'atk-20% 2t'}];return{name:m.name,sprite:m.sprite,hp:hp,maxhp:hp,patk:patk,matk:matk,pdef:pdef,mdef:mdef,type:mt,pres:pres,mres:mres,moves:moves,buffs:{atk:0,def:0},alive:true,isBoss:b};}
var towerState={floor:1,party:[],enemies:[],turn:0,activeIdx:0,phase:'select',selectedMove:null,targetIdx:0,targetEnemyIdx:0,targetAllyIdx:0,targetMode:null,log:[],rewards:0,battleOver:false};var enemyTurnTimer=null;
function startTower(){towerState.floor=state.towerFloor||1;towerState.rewards=0;renderTowerTeamSelect();showScreen('towerSelectScreen');}
function renderTowerTeamSelect(){
var grid=document.getElementById('towerTeamGrid');grid.innerHTML='';towerState.party=[];
document.getElementById('towerFloorDisplay').textContent='Floor '+(state.towerFloor||1)+(state.towerFloor%5===0?' - BOSS':'');
var owned=HEROES.filter(function(h){return state.collection[h.id]>0;});
if(owned.length===0){grid.innerHTML='<div style="font-size:0.575em;color:var(--s);text-align:center;padding:20px">No heroes! Pull from gashapon first.</div>';document.getElementById('towerPartyDisplay').innerHTML='';return;}
owned.forEach(function(hero){
var isDead=state.towerDead&&state.towerDead.indexOf(hero.id)>=0;
var card=document.createElement('div');card.className='tower-hero-card'+(isDead?' dead-hero':'');card.style.borderColor=RARITY_INFO[hero.rarity].color;
var canvas=document.createElement('canvas');drawSprite(canvas,hero.sprite,hero.rarity,3);card.appendChild(canvas);
var ne=document.createElement('div');ne.className='th-name';ne.textContent=hero.name;ne.style.color=RARITY_INFO[hero.rarity].color;card.appendChild(ne);
var st=document.createElement('div');st.className='th-stats';var s=RARITY_STATS[hero.rarity];var jt=JOB_TYPES[hero.id]||'hybrid';var tm=TYPE_MODS[jt];var jtLabel={physical:'PHY',magical:'MAG',hybrid:'HYB',tank:'TNK'};st.textContent=isDead?'KO':(jtLabel[jt]+' | HP '+s.hp+' P'+Math.floor(s.patk*tm.patk)+' M'+Math.floor(s.matk*tm.matk));card.appendChild(st);
if(!isDead){card.onclick=function(){var idx=towerState.party.indexOf(hero);if(idx>=0){towerState.party.splice(idx,1);card.classList.remove('selected');}else if(towerState.party.length<3){towerState.party.push(hero);card.classList.add('selected');}updatePartyDisplay();};}
grid.appendChild(card);});
updatePartyDisplay();}
function updatePartyDisplay(){var pd=document.getElementById('towerPartyDisplay');pd.innerHTML='';for(var i=0;i<3;i++){var slot=document.createElement('div');slot.className='tower-party-slot';if(towerState.party[i]){slot.classList.add('filled');var c=document.createElement('canvas');drawSprite(c,towerState.party[i].sprite,towerState.party[i].rarity,3);slot.appendChild(c);}else{slot.textContent='EMPTY';}pd.appendChild(slot);}}
function enterTowerFloor(){
if(towerState.party.length<1)return;
if(enemyTurnTimer){clearTimeout(enemyTurnTimer);enemyTurnTimer=null;}
towerState.battleOver=false;
towerState.party=towerState.party.map(function(p){return p.maxhp?p:makeHeroUnit(p);});
var isBoss=towerState.floor%5===0;
var count=isBoss?1:(1+Math.floor(Math.random()*3));
towerState.enemies=[];
for(var i=0;i<count;i++){towerState.enemies.push(makeEnemyUnit(towerState.floor));}
towerState.party.forEach(function(p){p.acted=false;p.buffs={atk:0,def:0};});
towerState.turn=0;towerState.activeIdx=-1;towerState.phase='player';towerState.selectedMove=null;towerState.targetEnemyIdx=0;towerState.targetAllyIdx=0;towerState.targetMode=null;towerState.log=[];
var bl=document.getElementById('battleLog');if(bl)bl.innerHTML='';
document.getElementById('battleFloorDisplay').textContent='Floor '+towerState.floor+(isBoss?' - BOSS':' ('+count+' enemies)');
renderFloorIndicator();
showScreen('towerBattleScreen');renderBattle();}
function renderFloorIndicator(){
var fi=document.getElementById('floorIndicator');if(!fi)return;fi.innerHTML='';
var lbl=document.createElement('div');lbl.className='fi-label';lbl.textContent='TOWER';fi.appendChild(lbl);
for(var f=1;f<=TOWER_FLOORS;f++){
var fd=document.createElement('div');fd.className='fi-floor';
if(f%5===0)fd.classList.add('boss');
if(f<state.towerFloor)fd.classList.add('cleared');
if(f===towerState.floor)fd.classList.add('current');
fd.textContent=f;fi.appendChild(fd);
}
}
function logMsg(msg,cls){towerState.log.push({msg:msg,cls:cls||''});if(towerState.log.length>30)towerState.log.shift();var el=document.getElementById('battleLog');el.innerHTML=towerState.log.map(function(l){return'<p class="'+l.cls+'">'+l.msg+'</p>';}).join('');el.scrollTop=el.scrollHeight;}
function drawMonster(canvas,spriteKey,scale){var ctx=canvas.getContext('2d');var sp=MONSTER_SPRITES[spriteKey];var pal=MONSTER_PALETTES[spriteKey];if(!sp||!pal)return;var px=scale;canvas.width=16*px;canvas.height=16*px;ctx.clearRect(0,0,canvas.width,canvas.height);ctx.imageSmoothingEnabled=false;for(var y=0;y<16;y++){var row=sp[y]||'';for(var x=0;x<16;x++){var ch=row[x]||'.';var idx=ch==='.'?0:parseInt(ch);var c=pal[idx];if(c){ctx.fillStyle=c;ctx.fillRect(x*px,y*px,px,px);}}}}
function renderBattle(){
if(towerState.battleOver)return;
var arena=document.getElementById('battleArena');arena.innerHTML='';
var ea=document.createElement('div');ea.className='battle-enemy-area';
towerState.enemies.forEach(function(e,idx){
if(!e.alive)return;
var ePct=Math.max(0,e.hp/e.maxhp*100);var eColor=e.isBoss?'#ff44ff':'#e94560';
var ec=document.createElement('canvas');drawMonster(ec,e.sprite,4);
ec.style.cursor='pointer';ec.style.border=towerState.targetEnemyIdx===idx?'2px solid #00f0ff':'2px solid transparent';ec.style.borderRadius='4px';
ec.onclick=function(){towerState.targetEnemyIdx=idx;renderBattle();};
ea.appendChild(ec);
var en=document.createElement('div');en.className='battle-enemy-name';var eTypeColor={physical:'#ff6b6b',magical:'#7b2ff7',hybrid:'#00ff88',tank:'#ffd700'};var eTypeLabel={physical:'[PHY]',magical:'[MAG]',hybrid:'[HYB]',tank:'[TNK]'};var eType=e.isBoss?(BOSS_LIST.filter(function(b){return b.sprite===e.sprite;})[0]||{}).type||'physical':(MONSTER_LIST.filter(function(b){return b.sprite===e.sprite;})[0]||{}).type||'physical';en.innerHTML=e.name+(e.isBoss?' [BOSS]':'')+' <span style="font-size:0.92em;color:'+eTypeColor[eType]+'">'+eTypeLabel[eType]+'</span>';en.style.color=eColor;ea.appendChild(en);
var ehb=document.createElement('div');ehb.className='battle-hp-bar';ehb.innerHTML='<div class="battle-hp-fill" style="width:'+ePct+'%;background:linear-gradient(90deg,'+eColor+',#ff6b6b)"></div><div class="battle-hp-text">'+Math.max(0,Math.ceil(e.hp))+'/'+e.maxhp+'</div>';ea.appendChild(ehb);
if(e.buffs.atk>0){var eb=document.createElement('div');eb.style.fontSize='0.3em';eb.style.color='#ff4444';eb.textContent='ATK Up ('+e.buffs.atk+'t)';ea.appendChild(eb);}
});
if(towerState.enemies.filter(function(e){return e.alive;}).length===0){return;}
arena.appendChild(ea);
var pa=document.createElement('div');pa.className='battle-party-area';
towerState.party.forEach(function(u,i){
