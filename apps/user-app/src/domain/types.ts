export const DIRECTIONS = ['front', 'front_right', 'right', 'back_right', 'back', 'back_left', 'left', 'front_left'] as const;
export type Direction = (typeof DIRECTIONS)[number];
export type Mode = 'tourism' | 'route_practice';
export type LevelKey = 'level_1' | 'level_3' | 'level_5';
export interface LocalizedText { en: string; ja: string }
export interface NodeData { id: string; label: LocalizedText; tags: string[]; ocr: string[]; landmark_tags?: string[]; direction_tags?: Record<string,string[]>; descriptions: Record<Direction, Record<LevelKey, LocalizedText>> }
export interface EdgeData { id: string; from: string; to: string; direction_from: Direction; direction_to: Direction; distance_m: number }
export interface RouteData { id: string; name: LocalizedText; start_node_id: string; goal_node_id: string; node_sequence: string[] }
export interface BranchQuestion { node_id: string; prompt: LocalizedText; correct_direction: Direction; choices: Direction[] }
export interface SemanticMap { meta: { map_id: string; version: string; condition_type: 'auto'|'manual_plus' }; nodes: NodeData[]; edges: EdgeData[]; routes: RouteData[]; branch_questions?: BranchQuestion[] }
export interface LogEvent { timestamp: string; event_type: string; node_id: string; heading: Direction; mode: Mode; payload: Record<string, unknown> }
