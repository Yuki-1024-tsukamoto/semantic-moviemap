# Semantic MovieMap MVP (Phase 1)

## Implemented fixes
- Forward/Backward corrected for sample route validation (`N1 -> N2` forward, `N2 -> N1` backward).
- Current description level is visible and announced on cycle.
- Jump now announces destination node id, label, heading, and short direction description.
- Search expanded to node id, labels, landmark tags, direction tags, OCR, descriptions, and route labels.
- Added visible current state panel and jump highlight.
- Route practice now tracks active state, route id, index progress, next expected node, hints, branch feedback, and completion.
- Added latest 10 log preview while keeping JSON export.

## Run
```bash
cd apps/user-app
npm install
npm run dev
```

## Test
```bash
cd apps/user-app
npm test
```

## Keyboard
- ArrowUp: Forward
- ArrowDown: Backward
- ArrowLeft/ArrowRight: Rotate 45°
- Space: Read current-direction description
- L: Cycle description level (and announce)
- S: Search
- P: Start practice
- H: Hint
- E: Emergency confirmation
