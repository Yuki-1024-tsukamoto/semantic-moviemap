import { BranchQuestion, Direction, SemanticMap } from './types';

export const shortestPath=(map:SemanticMap,start:string,goal:string):string[]=>{
  const q:[[string,string[]]]=[[start,[start]]]; const seen=new Set([start]);
  while(q.length){const [cur,path]=q.shift()!; if(cur===goal) return path;
    for(const e of map.edges.filter((x)=>x.from===cur)){if(!seen.has(e.to)){seen.add(e.to); q.push([e.to,[...path,e.to]]);}}
  }
  return [start];
};
export const selectRoute=(map:SemanticMap,start:string,goal:string)=>map.routes.find((r)=>r.start_node_id===start&&r.goal_node_id===goal)?.node_sequence ?? shortestPath(map,start,goal);
export const branchQuestionFor=(map:SemanticMap,nodeId:string):BranchQuestion|undefined=>map.branch_questions?.find((b)=>b.node_id===nodeId);
export const validateBranch=(correct:Direction,selected:Direction)=>({ok:correct===selected,correct});
