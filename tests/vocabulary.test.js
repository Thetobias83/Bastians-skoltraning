import {test} from 'node:test';
import assert from 'node:assert/strict';
import {english,swedish,vocabulary,wordBatchIndices,wordId,migrateWordStats,wordQuestion} from '../content.js';
test('exakt 2000 unika ord med användbara betydelser och giltig Unicode',()=>{
 for(const [lang,list] of [['en',english],['sv',swedish]]){
  assert.equal(list.length,1000);assert.equal(new Set(list.map(x=>x[0].toLocaleLowerCase('sv'))).size,1000);
  for(const [word,meaning] of list){assert.ok(word&&meaning);assert.ok(!meaning.match(/^se\s+\w/));assert.ok(!/[\uFFFD]/.test(word+meaning));if(lang==='sv')assert.ok(meaning!==word);}
  const all=vocabulary[lang];assert.ok(all.every((x,i)=>!i||x.frequencyRank>=all[i-1].frequencyRank));
 }
});
test('50 omgångar om 20 täcker varje ord exakt en gång',()=>{for(const lang of ['en','sv']){const batches=Array.from({length:50},(_,i)=>wordBatchIndices(lang,i));assert.ok(batches.every(x=>x.length===20));assert.deepEqual(batches.flat(),Array.from({length:1000},(_,i)=>i));assert.equal(wordBatchIndices(lang,'all').length,1000);}});
test('alla ord går att träna i båda engelska riktningarna och på svenska',()=>{for(const lang of ['en','sv'])for(let i=0;i<1000;i++)for(const reverse of lang==='en'?[false,true]:[false]){const q=wordQuestion(lang,i,reverse);assert.equal(q.options.length,4);assert.equal(new Set(q.options).size,4);assert.equal(q.options.filter(x=>x===q.answer).length,1);assert.equal(q.id,wordId(lang,vocabulary[lang][i].word,reverse));}});
test('gamla framsteg flyttas från index till beständiga ord-id utan förlust',()=>{const result=migrateWordStats({'en-0-false':{a:5,c:3},'sv-0-false':{a:2,c:1},'math-Plus-2-3':{a:1,c:1}});assert.deepEqual(result[wordId('en','dog')],{a:5,c:3});assert.deepEqual(result[wordId('sv','modig')],{a:2,c:1});assert.deepEqual(result['math-Plus-2-3'],{a:1,c:1});assert.deepEqual(migrateWordStats(result),result);});
test('vanliga småord och tydliga betydelser finns',()=>{const en=Object.fromEntries(english),sv=Object.fromEntries(swedish);assert.equal(en.dog,'hund');assert.equal(en.sister,'syster');assert.equal(en.blue,'blå');assert.ok(en.the);assert.ok(en.a);assert.ok(en.I||en.i);assert.ok(sv.är);assert.match(sv.bok,/sidor/);assert.match(sv.springa,/snabbt/);assert.match(sv.älska,/tycka mycket om/);});
