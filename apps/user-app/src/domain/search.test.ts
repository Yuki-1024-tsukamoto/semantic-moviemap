import map from '../../../../data/sample/semantic_map_auto.json';
import { searchMap } from './search';

test('search finds tags and japanese text',()=>{
  expect(searchMap(map,'exhibit').length).toBeGreaterThan(0);
  expect(searchMap(map,'短い案内').length).toBeGreaterThan(0);
});
