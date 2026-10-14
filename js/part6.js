{id:'locke',name:'Locke',rarity:'legendary',sprite:'locke'},{id:'celes',name:'Celes',rarity:'legendary',sprite:'celes'},
{id:'aerith',name:'Aerith',rarity:'legendary',sprite:'aerith'},{id:'vivi',name:'Vivi',rarity:'legendary',sprite:'vivi'},
{id:'auron',name:'Auron',rarity:'legendary',sprite:'auron'},
{id:'warriorLight',name:'Warrior of Light',rarity:'rainbow',sprite:'warriorLight'},{id:'firion',name:'Firion',rarity:'rainbow',sprite:'firion'},
{id:'onionKnight',name:'Onion Knight',rarity:'rainbow',sprite:'onionKnight'},{id:'cecil',name:'Cecil',rarity:'rainbow',sprite:'cecil'},
{id:'bartz',name:'Bartz',rarity:'rainbow',sprite:'bartz'},{id:'terra',name:'Terra',rarity:'rainbow',sprite:'terra'},
{id:'cloud',name:'Cloud',rarity:'rainbow',sprite:'cloud'},{id:'squall',name:'Squall',rarity:'rainbow',sprite:'squall'},
{id:'zidane',name:'Zidane',rarity:'rainbow',sprite:'zidane'},{id:'tidus',name:'Tidus',rarity:'rainbow',sprite:'tidus'},
{id:'vaan',name:'Vaan',rarity:'rainbow',sprite:'vaan'},{id:'lightning',name:'Lightning',rarity:'rainbow',sprite:'lightning'},
{id:'noctis',name:'Noctis',rarity:'rainbow',sprite:'noctis'}
];
var RARITY_INFO={regular:{label:'REGULAR',color:'#b0b0c0',rate:0.59,refund:20},elite:{label:'ELITE',color:'#00ff88',rate:0.28,refund:50},epic:{label:'EPIC',color:'#7b2ff7',rate:0.09,refund:150},legendary:{label:'LEGENDARY',color:'#ffd700',rate:0.03,refund:500},rainbow:{label:'UNIQUE',color:'#ff44ff',rate:0.01,refund:1000}};
var PULL_COST_1=100,PULL_COST_10=900,PITY_EPIC=50,PITY_LEGENDARY=90;
var state={playerName:'',coins:1000,collection:{},pityEpic:0,pityLegendary:0,totalPulls:0,towerFloor:1,towerDead:[]};
// ===== AUDIO =====
var audioCtx=null;
function initAudio(){if(!audioCtx)audioCtx=new(window.AudioContext||window.webkitAudioContext)();}
function playTone(f,d,t,v){/* sound disabled */}
function sfxCoin(){playTone(988,0.08);setTimeout(function(){playTone(1319,0.12)},80);}
function sfxCrank(){playTone(200,0.05,'sawtooth',0.1);setTimeout(function(){playTone(150,0.08,'sawtooth',0.1)},60);}
function sfxDrop(){playTone(400,0.05,'square',0.12);setTimeout(function(){playTone(300,0.08,'square',0.1)},50);}
function sfxReveal(r){var n={regular:[523,659],elite:[523,659,784],epic:[523,659,784,1047],legendary:[523,659,784,1047,1319],rainbow:[523,659,784,1047,1319,1568,2093]};var a=n[r]||n.regular;a.forEach(function(f,i){setTimeout(function(){playTone(f,0.15)},i*100);});}
function sfxError(){playTone(150,0.2,'sawtooth',0.1);}
// ===== SPRITE RENDERING =====
function drawSprite(canvas,spriteKey,rarity,scale){var ctx=canvas.getContext('2d');var sp=SPRITES[spriteKey];var pal=PALETTES[rarity];if(!sp||!pal)return;var px=scale;canvas.width=16*px;canvas.height=16*px;ctx.clearRect(0,0,canvas.width,canvas.height);ctx.imageSmoothingEnabled=false;for(var y=0;y<16;y++){var row=sp[y]||'';for(var x=0;x<16;x++){var ch=row[x]||'.';var idx=ch==='.'?0:parseInt(ch);var c=pal[idx];if(c){ctx.fillStyle=c;ctx.fillRect(x*px,y*px,px,px);}}}}
function drawSilhouette(canvas,scale){var ctx=canvas.getContext('2d');var px=scale;canvas.width=16*px;canvas.height=16*px;ctx.clearRect(0,0,canvas.width,canvas.height);ctx.fillStyle='rgba(100,100,120,0.3)';ctx.fillRect(4*px,2*px,8*px,12*px);ctx.fillStyle='rgba(100,100,120,0.5)';ctx.font=(6*px)+'px monospace';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('?',canvas.width/2,canvas.height/2);}
// ===== GACHA LOGIC =====
function getHeroesByRarity(r){return HEROES.filter(function(h){return h.rarity===r;});}
function doPull(){var roll=Math.random();var rarity;if(roll<0.01)rarity='rainbow';else if(roll<0.04)rarity='legendary';else if(roll<0.13)rarity='epic';else if(roll<0.41)rarity='elite';else rarity='regular';if(state.pityLegendary>=PITY_LEGENDARY-1&&rarity!=='legendary'&&rarity!=='rainbow')rarity='legendary';if(state.pityEpic>=PITY_EPIC-1&&rarity==='regular')rarity='elite';var pool=getHeroesByRarity(rarity).filter(function(h){return !state.collection[h.id];});if(pool.length===0){var order=['rainbow','legendary','epic','elite','regular'];for(var oi=0;oi<order.length;oi++){pool=getHeroesByRarity(order[oi]).filter(function(h){return !state.collection[h.id];});if(pool.length>0){rarity=order[oi];break;}}}
if(pool.length===0){if(rarity==='rainbow'){state.pityLegendary=0;state.pityEpic=0;}else if(rarity==='legendary'){state.pityLegendary=0;state.pityEpic=0;}else if(rarity==='epic'){state.pityEpic=0;state.pityLegendary++;}else{state.pityEpic++;state.pityLegendary++;}state.totalPulls++;return null;}
var hero=pool[Math.floor(Math.random()*pool.length)];if(rarity==='rainbow'){state.pityLegendary=0;state.pityEpic=0;}else if(rarity==='legendary'){state.pityLegendary=0;state.pityEpic=0;}else if(rarity==='epic'){state.pityEpic=0;state.pityLegendary++;}else{state.pityEpic++;state.pityLegendary++;}state.totalPulls++;return hero;}
function doMultiPull(count){var results=[];for(var i=0;i<count;i++){var h=doPull();if(h){results.push(h);}else{var coinReward=RARITY_INFO[rarity||'regular'].refund*2;state.coins+=coinReward;results.push({id:'__coin__',name:'+'+coinReward+' COINS',rarity:'regular',sprite:'knight'});}}if(count>=10&&results.every(function(r){return r.rarity==='regular';})){var pool=getHeroesByRarity('elite').filter(function(h){return !state.collection[h.id];});if(pool.length>0)results[count-1]=pool[Math.floor(Math.random()*pool.length)];}return results;}
function addHero(hero){if(hero.id==='__coin__'){return{isNew:false,refund:0};}var isNew=!state.collection[hero.id];state.collection[hero.id]=(state.collection[hero.id]||0)+1;var refund=isNew?0:RARITY_INFO[hero.rarity].refund;state.coins+=refund;return{isNew:isNew,refund:refund};}
// ===== UI =====
function showScreen(id){document.querySelectorAll('.screen').forEach(function(s){s.classList.remove('active');});document.getElementById(id).classList.add('active');}
function updateHUD(){document.getElementById('coinCount').textContent=state.coins;document.getElementById('hudName').textContent=state.playerName||'PLAYER';document.getElementById('hudPity').textContent='Pity: E('+(PITY_EPIC-state.pityEpic)+') L('+(PITY_LEGENDARY-state.pityLegendary)+')';document.getElementById('pull1Btn').disabled=state.coins<PULL_COST_1;document.getElementById('pull10Btn').disabled=state.coins<PULL_COST_10;}
var CAPSULE_COLORS=['#ffcc00','#0066cc','#e60000','#00aa44','#ff8800','#ff44aa','#8800ff','#00ccff'];
var globeCapsules=[];
var GLOBE_W=260,GLOBE_H=230,CAP_SIZE=54;
var MAX_CAPSULES=18;
var GRAVITY=0.55,BOUNCE=0.02,FRICTION=0.80,ROT_FRICTION=0.55;
var SLEEP_VEL=0.4,SLEEP_POS=0.2,WAKE_FORCE=2.0,SLEEP_FRAMES=4;
var physicsRunning=false;
function initGlobeCapsules(){var c=document.getElementById('capsulesContainer');c.innerHTML='';globeCapsules=[];var pos=[[22.0,-14.1],[76.0,-14.1],[130.0,-14.1],[184.0,-14.1],[49.0,32.7],[103.0,32.7],[157.0,32.7],[22.0,79.5],[76.0,79.5],[130.0,79.5],[184.0,79.5],[49.0,126.2],[103.0,126.2],[157.0,126.2],[22.0,173.0],[76.0,173.0],[130.0,173.0],[184.0,173.0]];for(var i=0;i<pos.length;i++){var cap=document.createElement('div');cap.className='capsule';var col=CAPSULE_COLORS[i%CAPSULE_COLORS.length];cap.style.background='linear-gradient(180deg,'+col+' 50%,rgba(255,255,255,0.3) 50%)';var x=pos[i][0],y=pos[i][1];cap.style.transform='translate3d('+x+'px,'+y+'px,0)';c.appendChild(cap);globeCapsules.push({el:cap,x:x,y:y,vx:0,vy:0,rot:0,vr:0,sleeping:true,sleepTimer:0,prevX:x,prevY:y});}if(!physicsRunning){physicsRunning=true;requestAnimationFrame(physicsLoop);}}
function removeGlobeCapsules(n){for(var i=0;i<n&&globeCapsules.length>0;i++){var cap=globeCapsules.pop();cap.el.remove();}for(var i=0;i<globeCapsules.length;i++){globeCapsules[i].sleeping=false;globeCapsules[i].sleepTimer=0;}}
function refillGlobeCapsules(){var c=document.getElementById('capsulesContainer');var pos=[[22.0,-14.1],[76.0,-14.1],[130.0,-14.1],[184.0,-14.1],[49.0,32.7],[103.0,32.7],[157.0,32.7],[22.0,79.5],[76.0,79.5],[130.0,79.5],[184.0,79.5],[49.0,126.2],[103.0,126.2],[157.0,126.2],[22.0,173.0],[76.0,173.0],[130.0,173.0],[184.0,173.0]];for(var i=globeCapsules.length;i<pos.length&&i<MAX_CAPSULES;i++){var cap=document.createElement('div');cap.className='capsule';var col=CAPSULE_COLORS[i%CAPSULE_COLORS.length];cap.style.background='linear-gradient(180deg,'+col+' 50%,rgba(255,255,255,0.3) 50%)';var x=pos[i][0],y=pos[i][1];cap.style.transform='translate3d('+x+'px,'+y+'px,0)';c.appendChild(cap);globeCapsules.push({el:cap,x:x,y:y,vx:0,vy:0,rot:0,vr:0,sleeping:true,sleepTimer:0,prevX:x,prevY:y});}}
function physicsLoop(){if(document.getElementById('gameScreen')&&document.getElementById('gameScreen').classList.contains('active'))stepPhysics();requestAnimationFrame(physicsLoop);}
