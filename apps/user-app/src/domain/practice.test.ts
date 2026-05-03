import map from '../../../../data/sample/semantic_map_auto.json';
import { branchQuestionFor, selectRoute, validateBranch } from './practice';

test('route select uses predefined',()=>{const route=selectRoute(map,'N1','N8'); expect(route[0]).toBe('N1'); expect(route.at(-1)).toBe('N8');});
test('branch correctness',()=>{const b=branchQuestionFor(map,'N6')!; expect(validateBranch(b.correct_direction,'front').ok).toBe(false);});
