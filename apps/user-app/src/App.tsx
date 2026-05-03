import { useMemo, useState, useEffect } from 'react';
import sampleMap from '../../../data/sample/semantic_map_auto.json';
import { Logger } from './domain/logger';
import { move, nodeById, rotateLeft, rotateRight } from './domain/navigation';
import { branchQuestionFor, selectRoute, validateBranch } from './domain/practice';
import { searchMap } from './domain/search';
import { Direction, LevelKey, Mode, SemanticMap } from './domain/types';

const levels: LevelKey[]=['level_1','level_3','level_5'];

export default function App(){
  const map=sampleMap as SemanticMap;
  const [nodeId,setNodeId]=useState(map.nodes[0].id);
  const [heading,setHeading]=useState<Direction>('front');
  const [mode,setMode]=useState<Mode>('tourism');
  const [level,setLevel]=useState<LevelKey>('level_1');
  const [announce,setAnnounce]=useState('Map loaded.');
  const [query,setQuery]=useState('');
  const [results,setResults]=useState<ReturnType<typeof searchMap>>([]);
  const [practice,setPractice]=useState<{route:string[];idx:number;start:string;goal:string}>({route:[],idx:0,start:'N1',goal:'N8'});
  const logger=useMemo(()=>new Logger(),[]);
  const node=nodeById(map,nodeId)!;

  const doAnnounce=(msg:string)=>{setAnnounce(msg); logger.log('announce',nodeId,heading,mode,{msg});};
  const doMove=(forward:boolean)=>{const next=move(nodeId,heading,map.edges,forward); setNodeId(next); logger.log('move',next,heading,mode,{forward});};
  const readDesc=()=>{const txt=node.descriptions[heading][level].ja; doAnnounce(txt); logger.log('description_request',nodeId,heading,mode,{level});};
  const doSearch=()=>{const r=searchMap(map,query,'ja'); setResults(r); logger.log('search',nodeId,heading,mode,{query,count:r.length});};
  const jump=(id:string)=>{setNodeId(id); doAnnounce(`現在地 ${id}、方位 ${heading}`); logger.log('jump',id,heading,mode,{});};

  const startPractice=()=>{const route=selectRoute(map,practice.start,practice.goal); setPractice((p)=>({...p,route,idx:0})); setMode('route_practice'); doAnnounce(`練習開始 ${practice.start} から ${practice.goal}`); logger.log('practice_start',practice.start,heading,'route_practice',{route});};
  const checkBranch=(selected:Direction)=>{
    const bq=branchQuestionFor(map,nodeId);
    if(!bq) return;
    const result=validateBranch(bq.correct_direction,selected);
    if(!result.ok){doAnnounce(`不正解。正解は ${result.correct}`); logger.log('practice_answer_wrong',nodeId,heading,mode,{selected,correct:result.correct});}
    else doAnnounce('正解です。');
  };
  const exportLogs=()=>{const blob=new Blob([logger.exportJson()],{type:'application/json'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='semantic_log.json'; a.click();};

  useEffect(()=>{const onKey=(e:KeyboardEvent)=>{if(e.key==='ArrowUp') doMove(true); if(e.key==='ArrowDown') doMove(false); if(e.key==='ArrowLeft') {setHeading((h)=>rotateLeft(h)); logger.log('rotate',nodeId,heading,mode,{dir:'left'});} if(e.key==='ArrowRight') {setHeading((h)=>rotateRight(h)); logger.log('rotate',nodeId,heading,mode,{dir:'right'});} if(e.key===' ') {e.preventDefault(); readDesc();} if(e.key.toLowerCase()==='l') setLevel((lv)=>levels[(levels.indexOf(lv)+1)%levels.length]); if(e.key.toLowerCase()==='s') doSearch(); if(e.key.toLowerCase()==='p') startPractice(); if(e.key.toLowerCase()==='h'){doAnnounce('ヒントを記録しました。'); logger.log('practice_hint',nodeId,heading,mode,{});} if(e.key.toLowerCase()==='e'){doAnnounce('緊急確認を記録しました。'); logger.log('emergency_confirmation',nodeId,heading,mode,{})}}
    window.addEventListener('keydown',onKey); return ()=>window.removeEventListener('keydown',onKey);
  });

  return <main>
    <h1>Semantic MovieMap MVP</h1>
    <p><strong>Node:</strong> {nodeId} / <strong>Heading:</strong> {heading} / <strong>Mode:</strong> {mode}</p>
    <div aria-live='polite'>{announce}</div>
    <div>
      <button onClick={()=>doMove(true)}>Forward</button><button onClick={()=>doMove(false)}>Backward</button>
      <button onClick={()=>setHeading((h)=>rotateLeft(h))}>Rotate Left</button><button onClick={()=>setHeading((h)=>rotateRight(h))}>Rotate Right</button>
      <button onClick={readDesc}>Read Direction</button><button onClick={()=>setLevel((lv)=>levels[(levels.indexOf(lv)+1)%levels.length])}>Cycle Level</button>
      <button onClick={()=>doAnnounce(Object.entries(node.descriptions).map(([d,v])=>`${d}:${v.level_1.ja}`).join(' / '))}>Surrounding Summary</button>
    </div>
    <section><h2>Search</h2><input value={query} onChange={(e)=>setQuery(e.target.value)} /><button onClick={doSearch}>Search</button>{results.map((r)=><div key={r.nodeId}><span>{r.label}</span><button onClick={()=>jump(r.nodeId)}>Jump</button></div>)}</section>
    <section><h2>Route Practice</h2>
      <label>Start <input value={practice.start} onChange={(e)=>setPractice((p)=>({...p,start:e.target.value}))} /></label>
      <label>Goal <input value={practice.goal} onChange={(e)=>setPractice((p)=>({...p,goal:e.target.value}))} /></label>
      <button onClick={startPractice}>Start Practice</button><button onClick={()=>{doAnnounce('ヒントを記録しました。'); logger.log('practice_hint',nodeId,heading,mode,{})}}>Hint</button><button onClick={()=>{doAnnounce('緊急確認を記録しました。'); logger.log('emergency_confirmation',nodeId,heading,mode,{})}}>Emergency</button>
      {branchQuestionFor(map,nodeId) && <div><p>{branchQuestionFor(map,nodeId)!.prompt.ja}</p>{branchQuestionFor(map,nodeId)!.choices.map((c)=><button key={c} onClick={()=>checkBranch(c)}>{c}</button>)}</div>}
    </section>
    <button onClick={exportLogs}>Export Logs JSON</button>
  </main>
}
