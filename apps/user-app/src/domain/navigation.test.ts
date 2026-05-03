import map from '../../../../data/sample/semantic_map_auto.json';
import { move, rotateLeft, rotateRight } from './navigation';

test('rotation works',()=>{expect(rotateLeft('front')).toBe('front_left'); expect(rotateRight('front')).toBe('front_right');});
test('move forward/backward works',()=>{expect(move('N1','front',map.edges,true)).toBe('N2'); expect(move('N2','front',map.edges,false)).toBe('N1');});
