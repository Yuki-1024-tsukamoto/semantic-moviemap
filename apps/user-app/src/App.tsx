import { useMemo, useState, useEffect } from 'react';
import sampleMap from '../../../data/sample/semantic_map_auto.json';
import { Logger } from './domain/logger';
import { move, nodeById, rotateLeft, rotateRight } from './domain/navigation';
import { branchQuestionFor, isCompleted, nextExpected, startPractice, stepPractice } from './domain/practice';
import { searchMap } from './domain/search';
import { Direction, LevelKey, Mode, SemanticMap } from './domain/types';

const levels: LevelKey[]=['level_1','level_3','level_5'];

export default function App(){
  const map=sampleMap as SemanticMap; const logger=useMemo(()=>new Logger(),[]);
  const [nodeId,setNodeId]=useState('N1'); const [heading,setHeading]=useState<Direction>('front'); const [mode,setMode]=useState<Mode>('tourism'); const [level,setLevel]=useState<LevelKey>('level_1');
  const [lastAction,setLastAction]=useState('init'); const [announce,setAnnounce]=useState('Map loaded'); const [query,setQuery]=useState(''); const [results,setResults]=useState<ReturnType<typeof searchMap>>([]);
  const [jumpFlash,setJumpFlash]=useState(false); const [practice,setPractice]=useState({active:false,start:'N1',goal:'N8',route:[] as string[],routeId:'',index:0});
  const node=nodeById(map,nodeId)!;
  const push=(type:string,payload:Record<string,unknown>={})=>{logger.log(type,nodeId,heading,mode,payload); setLastAction(type);};
  const announceMsg=(m:string)=>{setAnnounce(m); push('announce',{message:m});};
  const shortDesc=()=>node.descriptions[heading][level].ja;

  const moveAction=(forward:boolean)=>{
    if(mode==='route_practice'&&practice.active){
      const next=stepPractice(practice,forward); setPractice(next); const to=next.route[next.index]; setNodeId(to); announceMsg(`練習移動: ${to} (${next.index+1}/${next.route.length})`); push('practice_move',{forward,index:next.index});
      if(isCompleted(next)){announceMsg(`練習完了。到達: ${next.goal}`); push('practice_completed',{goal:next.goal}); setPractice({...next,active:false});}
      return;
    }
    const from=nodeId; const nextNode=move(nodeId,heading,map.edges,forward); setNodeId(nextNode); announceMsg(`移動: ${from} -> ${nextNode}`); push('move',{forward,from_node:from,to_node:nextNode});
  };

  const jump=(id:string)=>{const from=nodeId; setNodeId(id); setJumpFlash(true); setTimeout(()=>setJumpFlash(false),700); const n=nodeById(map,id)!; const msg=`ジャンプ先 ${id} ${n.label.ja} 方位 ${heading} ${n.descriptions[heading][level].ja}`; announceMsg(msg); push('jumped',{from_node:from,to_node:id});};
  const onLevel=()=>{const next=levels[(levels.indexOf(level)+1)%levels.length]; setLevel(next); announceMsg(`説明レベル ${next}`); push('level_change',{level:next});};
  const onSearch=()=>{const r=searchMap(map,query,'ja'); setResults(r); announceMsg(`検索結果 ${r.length} 件`); push('search',{query,count:r.length});};
  const onStartPractice=()=>{const p=startPractice(map,practice.start,practice.goal); setPractice(p); setNodeId(p.route[0]); setMode('route_practice'); announceMsg(`練習開始 ルート ${p.routeId}`); push('practice_start',{routeId:p.routeId});};
  const onHint=()=>{const nxt=practice.active?nextExpected(practice):undefined; announceMsg(nxt?`ヒント: 次は ${nxt}`:'ヒント: 練習を開始してください'); push('practice_hint',{next:nxt});};

  useEffect(()=>{const onKey=(e:KeyboardEvent)=>{const k=e.key.toLowerCase(); if(e.key==='ArrowUp') moveAction(true); if(e.key==='ArrowDown') moveAction(false); if(e.key==='ArrowLeft') setHeading((h)=>rotateLeft(h)); if(e.key==='ArrowRight') setHeading((h)=>rotateRight(h)); if(e.key===' ') {e.preventDefault(); announceMsg(shortDesc()); push('description_request',{level});} if(k==='l') onLevel(); if(k==='s') onSearch(); if(k==='p') onStartPractice(); if(k==='h') onHint(); if(k==='e'){announceMsg('緊急確認を記録しました'); push('emergency_confirmation',{});}}; window.addEventListener('keydown',onKey); return ()=>window.removeEventListener('keydown',onKey);});

  const bq=branchQuestionFor(map,nodeId);
  return <main><h1>Semantic MovieMap MVP</h1>
  <section style={{border:'1px solid #888',padding:8,background:jumpFlash?'#fff3cd':'transparent'}}><h2>Current State</h2>
  <div>Current Node: {nodeId}</div><div>Node Label: {node.label.ja}</div><div>Current Heading: {heading}</div><div>Current Mode: {mode}</div><div>Current Description Level: {level}</div><div>Last Action: {lastAction}</div><div>Last Announcement: {announce}</div></section>
  <div aria-live='polite'>{announce}</div>
  <button onClick={()=>moveAction(true)}>Forward</button><button onClick={()=>moveAction(false)}>Backward</button><button onClick={()=>setHeading((h)=>rotateLeft(h))}>Rotate Left</button><button onClick={()=>setHeading((h)=>rotateRight(h))}>Rotate Right</button><button onClick={()=>{announceMsg(shortDesc()); push('description_request',{level});}}>Read Direction</button><button onClick={onLevel}>Cycle Level</button>
  <section><h2>Search</h2><input value={query} onChange={(e)=>setQuery(e.target.value)} /><button onClick={onSearch}>Search</button>{results.map((r)=><div key={r.nodeId}>{r.nodeId} {r.label} <button onClick={()=>jump(r.nodeId)}>Jump</button></div>)}</section>
  <section><h2>Practice Status</h2><div>Active: {String(practice.active)}</div><div>Start: {practice.start}</div><div>Goal: {practice.goal}</div><div>Route ID: {practice.routeId}</div><div>Progress: {practice.index+1}/{practice.route.length||0}</div><div>Next Expected Node: {nextExpected(practice)??'-'}</div><div>Branch Question: {bq?.prompt.ja ?? '-'}</div>
  <label>Start <input value={practice.start} onChange={(e)=>setPractice({...practice,start:e.target.value})} /></label><label>Goal <input value={practice.goal} onChange={(e)=>setPractice({...practice,goal:e.target.value})} /></label><button onClick={onStartPractice}>Start Practice</button><button onClick={onHint}>Hint</button><button onClick={()=>{announceMsg('緊急確認を記録しました'); push('emergency_confirmation',{});}}>Emergency</button>
  {bq && <div>{bq.choices.map((c)=><button key={c} onClick={()=>{const ok=c===bq.correct_direction; if(!ok){announceMsg(`不正解。正解は ${bq.correct_direction}`); push('practice_answer_wrong',{selected:c,correct:bq.correct_direction});} else {announceMsg('正解です'); push('practice_answer_correct',{selected:c});}}}>{c}</button>)}</div>}</section>
  <section><h2>Latest Logs (10)</h2><pre>{logger.events.slice(-10).map((e)=>`${e.timestamp} ${e.event_type} ${e.node_id}`).join('\n')}</pre><button onClick={()=>{const b=new Blob([logger.exportJson()],{type:'application/json'}); const a=document.createElement('a'); a.href=URL.createObjectURL(b); a.download='semantic_log.json'; a.click();}}>Export Logs JSON</button></section>
  </main>;
}
