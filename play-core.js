const playMissions=[
 {id:'start',icon:'🌱',name:'Fröets första steg',description:'Hjälp ett litet frö att komma igång.',strategy:'Göra första steget litet och tydligt.'},
 {id:'memory',icon:'🎒',name:'Packa skattväskan',description:'Titta, göm och hitta vägen tillbaka till tre skatter.',strategy:'Försöka minnas utan att titta och sedan kontrollera.'},
 {id:'detective',icon:'🔎',name:'Spårdetektiven',description:'Hitta en ledtråd i en liten berättelse.',strategy:'Läsa med en fråga, återberätta och kontrollera i texten.'},
 {id:'robot',icon:'🤖',name:'Robotens små steg',description:'Hjälp en vänlig robot med en sak i taget.',strategy:'Dela upp ett uppdrag, följa en plan och be om en ledtråd.'},
 {id:'pause',icon:'🏝️',name:'Den lugna viken',description:'Välj en liten paus och en mjuk väg tillbaka.',strategy:'Välja paus, märka vad som hjälper och återgå med ett litet steg.'}
];
const memorySets=[
 [{word:'sol',icon:'☀️'},{word:'bok',icon:'📘'},{word:'katt',icon:'🐈'}],
 [{word:'boll',icon:'⚽'},{word:'träd',icon:'🌳'},{word:'fisk',icon:'🐟'}],
 [{word:'äpple',icon:'🍎'},{word:'nyckel',icon:'🔑'},{word:'båt',icon:'⛵'}]
];
const detectiveStories=[
 {text:'Kim lade den blå nyckeln under en kopp. Sedan gick Kim till dörren.',q:'Var lade Kim nyckeln?',options:['Under en kopp','I en sko','På en stol'],answer:0,hint:'Leta efter ordet under i första meningen.',why:'I första meningen står det att nyckeln ligger under en kopp.'},
 {text:'Mira såg en röd boll vid grinden. Hon lade bollen i sin korg.',q:'Var lade Mira bollen?',options:['I sin korg','Bakom en sten','Under bordet'],answer:0,hint:'Den andra meningen berättar vad Mira gjorde.',why:'Den andra meningen säger att Mira lade bollen i sin korg.'}
];
const robotSteps=['Ta fram ett papper','Rita en liten sol','Lägg pennan på bordet'];
function validatePlay(raw){
 if(raw===undefined)return {visited:[],remember:null,helpers:[]};
 if(!raw||typeof raw!=='object'||Array.isArray(raw)||!Array.isArray(raw.visited)||!Array.isArray(raw.helpers))throw new Error('Ogiltiga lekdata');
 const ids=playMissions.map(x=>x.id),helpers=['small','remember','check','help','pause'];
 if(raw.visited.length>5||raw.helpers.length>5||!raw.visited.every(x=>ids.includes(x))||!raw.helpers.every(x=>helpers.includes(x)))throw new Error('Ogiltigt uppdrag');
 let remember=null;if(raw.remember!=null){const r=raw.remember;if(!Number.isInteger(r.set)||r.set<0||r.set>=memorySets.length||!/^\d{4}-\d{2}-\d{2}$/.test(r.day))throw new Error('Ogiltig minnesskatt');remember={set:r.set,day:r.day};}
 return {visited:[...new Set(raw.visited)],helpers:[...new Set(raw.helpers)],remember};
}
function finishPlay(raw,id,helper,remember){const data=validatePlay(raw);if(!playMissions.some(x=>x.id===id))throw new Error('Okänt uppdrag');data.visited=[...new Set([...data.visited,id])];if(helper){if(!['small','remember','check','help','pause'].includes(helper))throw new Error('Okänt knep');data.helpers=[...new Set([...data.helpers,helper])];}if(remember)data.remember=remember;return validatePlay(data);}
function revisitAvailable(raw,today){const data=validatePlay(raw);return Boolean(data.remember&&data.remember.day<today);}
function memoryChoice(set,index,word){if(!Number.isInteger(set)||!memorySets[set]||!Number.isInteger(index)||!memorySets[set][index])throw new RangeError('Okänd skatt');return memorySets[set][index].word===word;}
export {playMissions,memorySets,detectiveStories,robotSteps,validatePlay,finishPlay,revisitAvailable,memoryChoice};
