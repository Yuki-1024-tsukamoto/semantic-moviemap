import map from '../../../../data/sample/semantic_map_auto.json';
import { searchMap } from './search';

test('search finds non-exhibit terms',()=>{
  expect(searchMap(map,'entrance').length).toBeGreaterThan(0);
  expect(searchMap(map,'通路').length).toBeGreaterThan(0);
  expect(searchMap(map,'案内板').length).toBeGreaterThan(0);
});
