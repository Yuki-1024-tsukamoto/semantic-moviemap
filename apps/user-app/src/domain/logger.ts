import { Direction, LogEvent, Mode } from './types';
export class Logger { events: LogEvent[]=[];
  log(event_type:string,node_id:string,heading:Direction,mode:Mode,payload:Record<string,unknown>={}){this.events.push({timestamp:new Date().toISOString(),event_type,node_id,heading,mode,payload});}
  exportJson(){return JSON.stringify({session_id:'local-session',events:this.events},null,2)}
}
