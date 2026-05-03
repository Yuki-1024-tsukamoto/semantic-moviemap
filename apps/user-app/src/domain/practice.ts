import { BranchQuestion, Direction, SemanticMap } from './types';
export interface PracticeState { active:boolean; start:string; goal:string; route:string[]; routeId:string; index:number }
export const shortestPath=(map:SemanticMap,start:string,goal:string):string[]=>{const q:[[string,string[]]]=[[start,[start]]]; const seen=new Set([start]); while(q.length){const [c,p]=q.shift()!; if(c===goal) return p; for(const e of map.edges.filter((x)=>x.from===c)){if(!seen.has(e.to)){seen.add(e.to); q.push([e.to,[...p,e.to]]);}}} return [start];};
export const startPractice=(map:SemanticMap,start:string,goal:string):PracticeState=>{const r=map.routes.find((x)=>x.start_node_id===start&&x.goal_node_id===goal); return {active:true,start,goal,route:r?.node_sequence??shortestPath(map,start,goal),routeId:r?.id??'shortest_path',index:0};};
export const nextExpected=(p:PracticeState)=>p.route[p.index+1];
export const stepPractice=(p:PracticeState,forward:boolean):PracticeState=>{if(!p.active) return p; const idx=forward?Math.min(p.index+1,p.route.length-1):Math.max(p.index-1,0); return {...p,index:idx};};
export const isCompleted=(p:PracticeState)=>p.active && p.index===p.route.length-1;
export const branchQuestionFor=(map:SemanticMap,nodeId:string):BranchQuestion|undefined=>map.branch_questions?.find((b)=>b.node_id===nodeId);
export const validateBranch=(correct:Direction,selected:Direction)=>({ok:correct===selected,correct});
