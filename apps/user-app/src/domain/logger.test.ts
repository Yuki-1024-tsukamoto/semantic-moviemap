import { Logger } from './logger';

test('logger creates events',()=>{const l=new Logger(); l.log('move','N1','front','tourism',{a:1}); expect(l.events).toHaveLength(1); expect(l.events[0].event_type).toBe('move');});
