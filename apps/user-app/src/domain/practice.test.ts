import map from '../../../../data/sample/semantic_map_auto.json';
import { branchQuestionFor, isCompleted, nextExpected, startPractice, stepPractice, validateBranch } from './practice';

test('practice start and forward progression',()=>{const p=startPractice(map,'N1','N8'); expect(p.route[0]).toBe('N1'); const p2=stepPractice(p,true); expect(p2.route[p2.index]).toBe('N2'); expect(nextExpected(p2)).toBe('N3');});
test('wrong branch answer detected',()=>{const b=branchQuestionFor(map,'N6')!; expect(validateBranch(b.correct_direction,'front').ok).toBe(false);});
test('practice completion',()=>{let p=startPractice(map,'N1','N2'); p=stepPractice(p,true); expect(isCompleted(p)).toBe(true);});
