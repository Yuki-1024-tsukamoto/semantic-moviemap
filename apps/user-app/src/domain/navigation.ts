import { DIRECTIONS, Direction, EdgeData, SemanticMap } from './types';
export const rotateLeft=(h:Direction)=>DIRECTIONS[(DIRECTIONS.indexOf(h)+7)%8];
export const rotateRight=(h:Direction)=>DIRECTIONS[(DIRECTIONS.indexOf(h)+1)%8];
export const opposite=(h:Direction)=>DIRECTIONS[(DIRECTIONS.indexOf(h)+4)%8];
export const move=(nodeId:string, heading:Direction, edges:EdgeData[], forward=true)=>{
  const dir=forward?heading:opposite(heading);
  const edge=edges.find((e)=>e.from===nodeId&&e.direction_from===dir);
  return edge?.to ?? nodeId;
};
export const nodeById=(map:SemanticMap,id:string)=>map.nodes.find((n)=>n.id===id);
