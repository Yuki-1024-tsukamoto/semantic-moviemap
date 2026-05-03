import { SemanticMap } from './types';
export interface SearchResult { nodeId: string; label: string; match: string }
const norm=(s:string)=>s.toLowerCase();
export const searchMap=(map:SemanticMap,query:string,lang:'en'|'ja'='en'):SearchResult[]=>{
  const q=norm(query.trim()); if(!q) return [];
  const routeTexts=map.routes.flatMap((r)=>[r.name.en,r.name.ja]);
  return map.nodes.flatMap((n)=>{
    const bag=[n.id,n.label.en,n.label.ja,...n.tags,...(n.landmark_tags??[]),...n.ocr,...routeTexts,...Object.values(n.direction_tags??{}).flat()];
    Object.values(n.descriptions).forEach((levels)=>Object.values(levels).forEach((txt)=>bag.push(txt.en,txt.ja)));
    const found=bag.find((v)=>norm(v).includes(q));
    return found?[{nodeId:n.id,label:n.label[lang],match:found}]:[];
  });
};
