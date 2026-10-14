var hd=document.createElement('div');hd.className='battle-hero'+(u.alive?'':' dead')+(u.acted?' acted':'')+(u.alive&&!u.acted&&towerState.phase==='player'?' selectable':'')+(towerState.phase==='player'&&i===towerState.activeIdx?' active':'');
var c=document.createElement('canvas');drawSprite(c,u.hero.sprite,u.hero.rarity,3);hd.appendChild(c);
var nm=document.createElement('div');nm.className='bh-name';var hJt=JOB_TYPES[u.hero.id]||'hybrid';var hTypeColor={physical:'#ff6b6b',magical:'#7b2ff7',hybrid:'#00ff88',tank:'#ffd700'};var hTypeLabel={physical:'P',magical:'M',hybrid:'H',tank:'T'};nm.innerHTML=u.hero.name+' <span style="font-size:0.805em;color:'+hTypeColor[hJt]+'">'+hTypeLabel[hJt]+'</span>';nm.style.color=RARITY_INFO[u.hero.rarity].color;hd.appendChild(nm);
var hpPct=Math.max(0,u.hp/u.maxhp*100);var hb=document.createElement('div');hb.className='bh-hp';hb.innerHTML='<div class="battle-hp-fill" style="width:'+hpPct+'%"></div>';hd.appendChild(hb);
var mpPct=Math.max(0,u.mp/u.maxmp*100);var mb=document.createElement('div');mb.className='bh-mp';mb.innerHTML='<div class="battle-mp-fill" style="width:'+mpPct+'%"></div>';hd.appendChild(mb);
if(u.alive&&!u.acted&&towerState.phase==='player'){hd.onclick=function(){towerState.activeIdx=i;towerState.selectedMove=null;towerState.targetMode=null;renderBattle();};}
pa.appendChild(hd);});
arena.appendChild(pa);renderBattleActions();}
function renderBattleActions(){
var act=document.getElementById('battleActions');act.innerHTML='';
if(towerState.phase==='player'){
var u=towerState.party[towerState.activeIdx];
if(!u||!u.alive||u.acted){
var avail=towerState.party.filter(function(p){return p.alive&&!p.acted;});
if(avail.length===0){
var etb=document.createElement('button');etb.className='btn btn-s battle-action-btn';etb.textContent='END TURN';etb.onclick=function(){startEnemyPhase();};act.appendChild(etb);
return;
}
towerState.activeIdx=towerState.party.indexOf(avail[0]);
u=towerState.party[towerState.activeIdx];
}
if(towerState.selectedMove===null){
var lbl=document.createElement('div');lbl.style.fontSize='0.4em';lbl.style.color='var(--p)';lbl.textContent=u.hero.name+' - Choose Action:';act.appendChild(lbl);
u.moves.forEach(function(m,i){var btn=document.createElement('button');btn.className='btn btn-s battle-action-btn';btn.textContent=m.n+(m.mp>0?' ('+m.mp+'MP)':'');if(u.mp<m.mp)btn.disabled=true;btn.onclick=function(){selectMove(i);};act.appendChild(btn);});
}else{
var move=u.moves[towerState.selectedMove];
if(towerState.targetMode==='ally'){
var p=document.createElement('div');p.className='battle-target-prompt';p.textContent='Target for '+move.n+':';act.appendChild(p);
towerState.party.forEach(function(ally,ai){
if(!ally.alive)return;
var ab=document.createElement('button');ab.className='btn btn-s battle-action-btn';ab.style.fontSize='0.35em';ab.textContent=ally.hero.name+' (HP:'+Math.ceil(ally.hp)+'/'+ally.maxhp+')';ab.onclick=function(){towerState.targetAllyIdx=ai;executePlayerMove();};act.appendChild(ab);
});
var aab=document.createElement('button');aab.className='btn btn-g battle-action-btn';aab.style.fontSize='0.35em';aab.textContent='ALL ALLIES';aab.onclick=function(){towerState.targetAllyIdx=-1;executePlayerMove();};act.appendChild(aab);
var xb=document.createElement('button');xb.className='btn btn-s battle-action-btn';xb.style.fontSize='0.35em';xb.textContent='CANCEL';xb.onclick=function(){towerState.targetMode=null;renderBattleActions();};act.appendChild(xb);
}else if(towerState.targetMode==='enemy'){
var tgtE=towerState.enemies[towerState.targetEnemyIdx];
var p=document.createElement('div');p.className='battle-target-prompt';p.textContent='Using: '+move.n+(tgtE&&tgtE.alive?' -> '+tgtE.name:'')+' - Confirm?';act.appendChild(p);
var cb=document.createElement('button');cb.className='btn btn-g battle-action-btn';cb.textContent='CONFIRM';cb.onclick=executePlayerMove;act.appendChild(cb);
var xb=document.createElement('button');xb.className='btn btn-s battle-action-btn';xb.textContent='CANCEL';xb.onclick=function(){towerState.targetMode=null;renderBattleActions();};act.appendChild(xb);
}else{
if(move.t==='heal'||move.t==='buff'){
var tb=document.createElement('button');tb.className='btn btn-g battle-action-btn';tb.textContent='SELECT TARGET';tb.onclick=function(){towerState.targetMode='ally';renderBattleActions();};act.appendChild(tb);
var sb=document.createElement('button');sb.className='btn btn-s battle-action-btn';sb.textContent='SELF';sb.onclick=function(){towerState.targetAllyIdx=towerState.activeIdx;executePlayerMove();};act.appendChild(sb);
}else if(move.t==='flee'){
var fb=document.createElement('button');fb.className='btn btn-s battle-action-btn';fb.textContent='FLEE';fb.onclick=executePlayerMove;act.appendChild(fb);
}else{
var tgtE=towerState.enemies[towerState.targetEnemyIdx];
var p=document.createElement('div');p.className='battle-target-prompt';p.textContent='Using: '+move.n+(tgtE&&tgtE.alive?' -> '+tgtE.name:'')+' - Confirm?';act.appendChild(p);
var cb=document.createElement('button');cb.className='btn btn-g battle-action-btn';cb.textContent='CONFIRM';cb.onclick=executePlayerMove;act.appendChild(cb);
}
var xb=document.createElement('button');xb.className='btn btn-s battle-action-btn';xb.textContent='CANCEL';xb.onclick=function(){towerState.selectedMove=null;towerState.targetMode=null;renderBattleActions();};act.appendChild(xb);
}
}
}else{var l=document.createElement('div');l.style.fontSize='0.4em';l.style.color='var(--s)';l.textContent='Enemy turn...';act.appendChild(l);}}
function selectMove(idx){var u=towerState.party[towerState.activeIdx];var m=u.moves[idx];if(u.mp<m.mp){logMsg('Not enough MP!','log-dmg');return;}towerState.selectedMove=idx;towerState.targetMode=null;renderBattleActions();}
function typeEff(mt,dt){if(mt==='phys'&&dt==='magical')return 1.2;if(mt==='magic'&&dt==='physical')return 1.2;if((mt==='phys'||mt==='magic')&&dt==='tank')return 0.8;return 1.0;}function calcDamage(atk,def,mult,res,tm){var base=atk*(100/(100+def*4));var dmg=base*mult*(0.85+Math.random()*0.3);dmg=dmg*(1-(res||0));dmg=dmg*(tm||1);return Math.max(1,Math.floor(dmg));}
function executePlayerMove(){
var u=towerState.party[towerState.activeIdx];var move=u.moves[towerState.selectedMove];var e=towerState.enemies[towerState.targetEnemyIdx]||towerState.enemies.filter(function(en){return en.alive;})[0];u.mp-=move.mp;
if(move.mp===0){var mpRest=Math.floor(u.maxmp*0.1);u.mp=Math.min(u.maxmp,u.mp+mpRest);logMsg(u.hero.name+' recovers '+mpRest+' MP!','log-info');}
var effPAtk=u.patk*(u.buffs.atk>0?1.5:1);var effMAtk=u.matk*(u.buffs.atk>0?1.5:1);
if(move.t==='phys'){
var dmg=calcDamage(effPAtk,e.pdef,move.pwr,e.pres,typeEff('phys',e.type));e.hp-=dmg;logMsg(u.hero.name+' uses '+move.n+'! '+e.name+' -'+dmg+'!','log-dmg');
if(move.e==='atk-30% 2t'){e.buffs.atk=Math.max(0,e.buffs.atk-1);logMsg(e.name+' ATK lowered!','log-info');}
if(move.e==='def-40% 2t'){e.buffs.def=Math.max(0,e.buffs.def-1);logMsg(e.name+' DEF lowered!','log-info');}
if(move.e==='def-50% 1t'){e.buffs.def=0;logMsg(e.name+' DEF pierced!','log-info');}
if(move.e==='self-10%hp'){var sd=Math.floor(u.maxhp*0.1);u.hp-=sd;logMsg(u.hero.name+' takes '+sd+' recoil!','log-dmg');}
if(move.e==='x3hits'){for(var h=1;h<3;h++){var d2=calcDamage(effPAtk,e.pdef,move.pwr,e.pres,typeEff('phys',e.type));e.hp-=d2;logMsg('Hit '+h+': '+d2+'!','log-dmg');}}
if(move.e==='coins+20'){var c=20;state.coins+=c;towerState.rewards+=c;logMsg('Stole '+c+' coins!','log-heal');}
if(move.e==='coins+40'){var c=40;state.coins+=c;towerState.rewards+=c;logMsg('Mugged '+c+' coins!','log-heal');}
if(move.e==='all'){towerState.enemies.forEach(function(en){if(en.alive){var ad=calcDamage(effPAtk,en.pdef,move.pwr*0.5,en.pres,typeEff('phys',en.type));en.hp-=ad;}});logMsg('AoE hits all!','log-dmg');}
}else if(move.t==='magic'){
var dmg=calcDamage(effMAtk,e.mdef,move.pwr,e.mres,typeEff('magic',e.type));e.hp-=dmg;logMsg(u.hero.name+' casts '+move.n+'! '+e.name+' -'+dmg+' magic!','log-dmg');
if(move.e==='x2'){var d2=calcDamage(effMAtk,e.mdef,move.pwr,e.mres,typeEff('magic',e.type));e.hp-=d2;logMsg('Doublecast! '+d2+' more!','log-dmg');}
}else if(move.t==='heal'){
var tgt=(towerState.targetAllyIdx>=0)?towerState.party[towerState.targetAllyIdx]:u;var heal=Math.floor(tgt.maxhp*move.pwr*0.3);tgt.hp=Math.min(tgt.maxhp,tgt.hp+heal);logMsg(u.hero.name+' casts '+move.n+'! '+tgt.hero.name+' +'+heal+' HP!','log-heal');
}else if(move.t==='healall'){
var heal=Math.floor(u.maxhp*move.pwr*0.2);towerState.party.forEach(function(p){p.hp=Math.min(p.maxhp,p.hp+heal);});logMsg(u.hero.name+' casts '+move.n+'! Party +'+heal+' HP!','log-heal');
}else if(move.t==='healself'){
var heal=Math.floor(u.maxhp*move.pwr*0.3);u.hp=Math.min(u.maxhp,u.hp+heal);logMsg(u.hero.name+' uses '+move.n+'! +'+heal+' HP!','log-heal');
}else if(move.t==='revive'){
var dead=towerState.party.filter(function(p){return!p.alive;});
if(dead.length>0){var tgt=dead[0];tgt.hp=Math.floor(tgt.maxhp*move.pwr);tgt.alive=true;logMsg(u.hero.name+' casts '+move.n+'! '+tgt.hero.name+' revived!','log-heal');}
else{logMsg(u.hero.name+' casts '+move.n+'! No effect.','log-info');}
}else if(move.t==='reviveall'){
var dead=towerState.party.filter(function(p){return!p.alive;});
if(dead.length>0){dead.forEach(function(p){p.hp=Math.floor(p.maxhp*move.pwr);p.alive=true;});logMsg(u.hero.name+' casts '+move.n+'! '+dead.length+' allies revived!','log-heal');}
else{logMsg(u.hero.name+' casts '+move.n+'! Party is fully restored!','log-heal');}
}else if(move.t==='buff'){
var targets=[];
if(towerState.targetAllyIdx===-1){targets=towerState.party.filter(function(p){return p.alive;});}
else if(towerState.targetAllyIdx>=0&&towerState.party[towerState.targetAllyIdx]){targets=[towerState.party[towerState.targetAllyIdx]];}
else{targets=[u];}
targets.forEach(function(t){
if(move.e.indexOf('atk')>=0){t.buffs.atk=2;logMsg(t.hero.name+' ATK raised!','log-info');}
if(move.e.indexOf('def')>=0){t.buffs.def=2;logMsg(t.hero.name+' DEF raised!','log-info');}
