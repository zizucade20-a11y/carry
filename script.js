(function(){
const KEY='gymweek-v3';
const D=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
const MC={Chest:'#e8456b',Back:'#3b82f6',Shoulders:'#f59e0b',Biceps:'#8b5cf6',Triceps:'#14b8a6',Abs:'#f97316',Legs:'#22c55e',Cardio:'#06b6d4'};
const G={
'Treadmill (minutes)':['Cardio','Walk or jog. Start slow for 2 minutes, then go at a pace where you can still talk but feel warm. Stand tall and don’t grip the handles hard.'],
'Lat pulldown':['Back','Hold the bar wider than your shoulders. Pull it down to your upper chest and squeeze your back, then let it up slowly.'],
'Seated cable row':['Back','Sit with your back straight. Pull the handle to your belly and squeeze your shoulder blades together, then return slowly.'],
'Triceps pushdown':['Triceps','Elbows tucked at your sides. Push the bar down until your arms are straight, then let it rise slowly. Only your forearms move.'],
'Overhead triceps extension':['Triceps','Hold one dumbbell with both hands behind your head. Straighten your arms up, then lower it slowly behind your head.'],
'Dumbbell row':['Back','One hand and one knee on a bench. Pull a dumbbell up to your waist with the other hand, then lower slowly. Switch sides after all the reps.'],
'Shoulder press':['Shoulders','Sit with a dumbbell in each hand at shoulder height. Push them straight up, then lower slowly.'],
'Lateral raise':['Shoulders','Light dumbbells at your sides. Lift your arms out to the side up to shoulder height, then lower slowly.'],
'Rear delt fly':['Shoulders','Bend forward with light dumbbells hanging down. Lift your arms out like wings and squeeze your upper back, then lower slowly.'],
'Triceps dips':['Triceps','Sit on a bench edge with hands beside you. Slide off the bench, bend your elbows to lower your body, then push back up. Stay close to the bench.'],
'Bench press':['Chest','Lie on the bench, feet on the floor. Lower the bar slowly to your chest, then push it straight up. Use a spotter (someone behind you) for heavy weight.'],
'Incline dumbbell press':['Chest','Lie on a bench tilted up. Push two dumbbells up from your chest until your arms are straight, then lower slowly.'],
'Dumbbell curl':['Biceps','Dumbbell in each hand, palms forward. Bend your elbows to lift to your shoulders, then lower slowly. Keep elbows by your body.'],
'Hanging knee raise':['Abs','Hang from a bar. Pull your knees up toward your chest, then lower them slowly without swinging.'],
'Crunch':['Abs','Lie on your back, knees bent, hands by your head. Lift your shoulders by tightening your stomach, then lower slowly. Don’t pull your neck.'],
'Plank (seconds)':['Abs','Rest on your forearms and toes, body in a straight line. Hold for the seconds shown. Keep your stomach tight and hips up.'],
'Incline bench press':['Chest','Like the bench press, but the bench is tilted up. Lower the bar to your upper chest, then push up.'],
'Chest fly machine':['Chest','Back on the pad, hold the handles at chest height. Bring your hands together and squeeze your chest, then open slowly.'],
'Push-up':['Chest','Hands a little wider than your shoulders, body straight. Lower your chest to the floor, then push up. Too hard? Keep your knees on the floor.'],
'Barbell curl':['Biceps','Hold a bar with palms up. Bend your elbows to lift it to your shoulders, then lower slowly. Don’t swing your back.'],
'Hammer curl':['Biceps','Palms facing each other like holding a hammer. Curl up to your shoulders, then lower slowly.'],
'Squat':['Legs','Feet shoulder width apart. Sit back and down like sitting on a chair, chest up, knees over toes, then stand.'],
'Leg press':['Legs','Feet on the plate. Push it away until your legs are almost straight, then bring it back slowly. Don’t lock your knees.'],
'Leg curl':['Legs','Pad behind your ankles. Bend your knees to pull the pad toward you, then return slowly.'],
'Lunge':['Legs','Step forward and lower your back knee toward the floor. Push back to standing, then switch legs.'],
'Calf raise':['Legs','Stand on the edge of a step. Rise up on your toes as high as you can, then lower slowly.'],
'Dumbbell bench press':['Chest','Lie on a flat bench with a dumbbell in each hand. Push up until your arms are straight, then lower slowly to the sides of your chest.']
};
let u=0;const E=(n,s,r)=>({id:'e'+Date.now().toString(36)+(u++),n,s,r,w:0});
const starter=()=>[
 {t:'Cardio, back and triceps',x:[E('Treadmill (minutes)',1,20),E('Lat pulldown',3,10),E('Seated cable row',3,10),E('Triceps pushdown',3,12),E('Overhead triceps extension',3,12)]},
 {t:'Back, shoulders and triceps',x:[E('Dumbbell row',3,10),E('Shoulder press',3,10),E('Lateral raise',3,12),E('Rear delt fly',3,12),E('Triceps dips',3,10)]},
 {t:'Chest, biceps and abs',x:[E('Bench press',3,10),E('Incline dumbbell press',3,10),E('Dumbbell curl',3,12),E('Hanging knee raise',3,12),E('Crunch',3,15),E('Plank (seconds)',3,30)]},
 {t:'Chest and biceps',x:[E('Incline bench press',3,10),E('Chest fly machine',3,12),E('Push-up',3,12),E('Barbell curl',3,10),E('Hammer curl',3,12)]},
 {t:'Legs',x:[E('Squat',3,10),E('Leg press',3,12),E('Leg curl',3,12),E('Lunge',3,10),E('Calf raise',3,15)]},
 {t:'Upper body',x:[E('Lat pulldown',3,10),E('Dumbbell bench press',3,10),E('Shoulder press',3,10),E('Seated cable row',3,10),E('Plank (seconds)',3,30)]}
];
let S;
try{S=JSON.parse(localStorage.getItem(KEY));}catch(e){}
if(!S||!Array.isArray(S.plan)){
 let old=null;try{old=JSON.parse(localStorage.getItem('gymweek-v2'));}catch(e){}
 S={plan:Array.isArray(old)&&old.length===6?old.map(p=>({t:p.t,x:p.x.map(e=>({id:e.id,n:e.n,s:e.s,r:e.r,w:e.w}))})):starter(),log:{},rev:{}};
}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}};
const $=s=>document.querySelector(s);
const esc=s=>{const d=document.createElement('div');d.textContent=String(s==null?'':s);return d.innerHTML;};
const pad=n=>String(n).padStart(2,'0');
const ds=d=>d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());
const pd=s=>{const a=s.split('-');return new Date(+a[0],+a[1]-1,+a[2]);};
const wd=s=>(pd(s).getDay()+6)%7;
const nice=s=>pd(s).toLocaleDateString('en-KE',{weekday:'short',day:'numeric',month:'short'});
const todayS=ds(new Date());
let sel=todayS,cy=new Date().getFullYear(),cm=new Date().getMonth(),open={};
const wk=s=>S.plan[wd(s)]||null;
function prog(s){const p=wk(s),ids=S.log[s]||[];if(!p)return [0,0];return [p.x.filter(e=>ids.includes(e.id)).length,p.x.length];}
function hero(){const p=wk(todayS),a=prog(todayS);$('#today').innerHTML='<small>Today</small><h2>'+D[wd(todayS)]+'</h2>'+(p?'<div>'+esc(p.t)+'</div><div class="bar" style="background:rgba(255,255,255,.25)"><i style="width:'+(a[1]?a[0]/a[1]*100:0)+'%;background:#fff"></i></div><small>'+a[0]+' of '+a[1]+' exercises done</small>':'<div>Rest day. Eat well and sleep well.</div>');}
function goals(){
 const p=wk(sel),a=prog(sel),ids=S.log[sel]||[];
 if(!p){$('#score').innerHTML='<b>Rest</b><p class="sub" style="margin:4px 0 0">'+nice(sel)+' is a Sunday. Muscles grow while you rest. Choose another day to see its workout.</p>';$('#list').innerHTML='';return;}
 const pc=a[1]?Math.round(a[0]/a[1]*100):0;
 $('#score').innerHTML='<small style="color:var(--mute)">Daily score · '+nice(sel)+'</small><br><b>'+pc+'%</b> <span class="sub">'+a[0]+' of '+a[1]+' exercises done</span><div class="bar"><i style="width:'+pc+'%"></i></div>';
 let nx=p.x.findIndex(e=>!ids.includes(e.id));
 let h='<div class="card"><input class="title" id="t" value="'+esc(p.t)+'" aria-label="Workout name"></div>';
 h+=p.x.length&&nx<0?'<div class="fin">🎉 Day done. Great work, rest up for tomorrow.</div>':(p.x.length?'<div class="nxt">Up next: '+esc(p.x[nx].n)+'</div>':'');
 p.x.forEach((e,i)=>{
  const dn=ids.includes(e.id),g=G[e.n.trim()],m=g?'<span class="mus" style="--c:'+MC[g[0]]+'">'+g[0]+'</span>':'';
  h+='<article class="ex'+(dn?' done':'')+(i===nx?' next':'')+'" data-id="'+e.id+'"><input class="chk" type="checkbox" data-f="done"'+(dn?' checked':'')+' aria-label="Mark done"><div class="mid"><div class="nm"><span class="no">'+(i+1)+'</span><span class="t">'+esc(e.n)+'</span></div>'+m+
  '<div class="nums"><label>Sets<input type="number" min="1" data-f="s" value="'+e.s+'"></label><label>Reps<input type="number" min="1" data-f="r" value="'+e.r+'"></label><label>Weight (kg)<input type="number" min="0" step="0.5" data-f="w" value="'+(e.w||'')+'" placeholder="0"></label></div>'+
  '<details data-id="'+e.id+'"'+(open[e.id]?' open':'')+'><summary>How to do it</summary><p>'+(g?esc(g[1]):'No guide for this one yet. Ask a trainer at your gym to show you.')+'</p><button class="rm" data-del="'+e.id+'">Remove this exercise</button></details></div></article>';
 });
 h+='<form class="add card" id="af"><input id="an" placeholder="Add an exercise" aria-label="New exercise" required><input id="as" type="number" min="1" value="3" aria-label="Sets"><input id="ar" type="number" min="1" value="10" aria-label="Reps"><button class="btn" type="submit">Add</button></form>';
 $('#list').innerHTML=h;
}
function cal(){
 $('#ml').textContent=new Date(cy,cm,1).toLocaleDateString('en-KE',{month:'long',year:'numeric'});
 let h=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(x=>'<div class="h">'+x+'</div>').join('');
 const first=(new Date(cy,cm,1).getDay()+6)%7,n=new Date(cy,cm+1,0).getDate();
 for(let i=0;i<first;i++)h+='<div class="cd e"></div>';
 for(let d=1;d<=n;d++){const s=cy+'-'+pad(cm+1)+'-'+pad(d),a=prog(s);
  h+='<button class="cd'+(wd(s)===6?' rest':a[1]&&a[0]===a[1]?' full':a[0]?' part':'')+(s===todayS?' td':'')+(s===sel?' sl':'')+'" data-d="'+s+'" aria-label="'+nice(s)+'">'+d+'</button>';}
 $('#cal').innerHTML=h;
 const a=prog(sel),p=wk(sel);
 $('#cs').innerHTML=nice(sel)+(p?' · '+esc(p.t)+' · '+a[0]+' of '+a[1]+' done. <a href="#goals" style="color:var(--acc);font-weight:600">Open this day</a>':' · Rest day');
}
function stats(m){
 let days=0,full=0,sum=0;
 Object.keys(S.log).forEach(s=>{if(s.slice(0,7)!==m)return;const a=prog(s);if(!a[0])return;days++;sum+=a[0]/a[1];if(a[0]===a[1])full++;});
 return [days,full,days?Math.round(sum/days*100):0];
}
let rmon=todayS.slice(0,7);
function review(){
 const s=stats(rmon),r=S.rev[rmon]||{r:5,t:''};
 $('#s1').textContent=s[0];$('#s2').textContent=s[1];$('#s3').textContent=s[2]+'%';
 $('#rr').value=r.r;$('#rv').textContent=r.r;$('#rt').value=r.t;$('#rok').textContent='';
}
function hist(){
 const k=Object.keys(S.log).filter(s=>prog(s)[0]>0).sort().reverse();
 $('#hist').innerHTML=k.length?k.map(s=>{const a=prog(s),p=wk(s);return '<button class="hi" data-d="'+s+'"><b>'+nice(s)+'</b><span>'+a[0]+'/'+a[1]+'</span><small>'+esc(p.t)+'</small><small></small><div class="bar"><i style="width:'+(a[0]/a[1]*100)+'%"></i></div></button>';}).join(''):'<div class="empty">Your trained days will appear here after you tick your first exercise.</div>';
}
function all(){hero();goals();cal();hist();stats&&review();}
const go=s=>{sel=s;const d=pd(s);cy=d.getFullYear();cm=d.getMonth();$('#dt').value=s;all();};
const ex=id=>(wk(sel)||{x:[]}).x.find(x=>x.id===id);
document.addEventListener('click',e=>{
 const t=e.target.closest('[data-d],[data-del],#pm,#nm,#rsv');if(!t)return;
 if(t.dataset.d){go(t.dataset.d);if(t.closest('#hist'))$('#goals').scrollIntoView();return;}
 if(t.dataset.del){const p=wk(sel);p.x=p.x.filter(x=>x.id!==t.dataset.del);save();all();return;}
 if(t.id==='pm'||t.id==='nm'){cm+=t.id==='pm'?-1:1;if(cm<0){cm=11;cy--;}if(cm>11){cm=0;cy++;}cal();return;}
 if(t.id==='rsv'){S.rev[rmon]={r:+$('#rr').value,t:$('#rt').value};save();$('#rok').textContent='Saved ✓';}
});
document.addEventListener('input',e=>{
 const t=e.target;
 if(t.id==='t'){wk(sel).t=t.value;save();return;}
 if(t.id==='rr'){$('#rv').textContent=t.value;return;}
 const a=t.closest('.ex');if(!a||!t.dataset.f||t.dataset.f==='done')return;
 const x=ex(a.dataset.id);if(x){x[t.dataset.f]=parseFloat(t.value)||0;save();}
});
document.addEventListener('change',e=>{
 const t=e.target;
 if(t.id==='dt'){if(t.value)go(t.value);return;}
 if(t.id==='rm'){if(t.value){rmon=t.value;review();}return;}
 if(t.dataset.f==='done'){const id=t.closest('.ex').dataset.id,l=S.log[sel]||(S.log[sel]=[]),i=l.indexOf(id);if(t.checked&&i<0)l.push(id);if(!t.checked&&i>=0)l.splice(i,1);save();all();}
});
document.addEventListener('toggle',e=>{const d=e.target;if(d.tagName==='DETAILS')open[d.dataset.id]=d.open;},true);
document.addEventListener('submit',e=>{
 if(e.target.id!=='af')return;e.preventDefault();
 const n=$('#an').value.trim();if(!n)return;
 wk(sel).x.push(E(n,parseInt($('#as').value)||3,parseInt($('#ar').value)||10));save();all();$('#an').focus();
});
$('#dt').value=sel;$('#rm').value=rmon;all();
})();