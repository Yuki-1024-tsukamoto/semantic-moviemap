# Semantic MovieMap MVP (Phase 1)

This repository contains a browser-based MVP demo for **Semantic MovieMap** targeting route practice and tourism-style exploration for totally blind users.

## Scope
- Loads mock semantic graph data from `data/sample/semantic_map_auto.json`
- Tourism exploration mode
- Route practice mode with branch questions
- 8-direction heading and 45-degree rotation
- Search across tags/OCR/descriptions
- Log export to JSON

## Repository Structure
- `apps/user-app` React + TypeScript frontend
- `schemas/semantic_map.schema.json`
- `schemas/experiment_log.schema.json`
- `data/sample/semantic_map_auto.json`
- `logs/` exported logs destination (manual copy)
- `AGENTS.md`

## Assumptions documented
1. MVP uses only Auto sample map in UI; Manual+ file can be added later.
2. Branch questions are explicit JSON first priority.
3. If no predefined route exists, shortest-path fallback is used.
4. Japanese (`ja`) and English (`en`) localized text are both present in the data model.
5. Log persistence is in-memory during runtime; download JSON is primary record.

## Install and Run
```bash
cd apps/user-app
npm install
npm run dev
```
Open the local URL shown by Vite.

## Test
```bash
cd apps/user-app
npm test
```

## Keyboard Controls
- ArrowUp: move forward
- ArrowDown: move backward
- ArrowLeft: rotate left 45°
- ArrowRight: rotate right 45°
- Space: read current direction description
- L: cycle description level
- S: run search with current query
- P: start route practice
- H: request hint
- E: emergency confirmation

## How to use the demo
1. Start app and confirm current node/heading/mode.
2. Use arrows to move and rotate.
3. Press Space to read current heading description.
4. Enter search query and jump to result.
5. Start route practice with start/goal node IDs.
6. At branch nodes, choose direction.
7. Export logs via "Export Logs JSON".

## Non-goals
- No OCR engine integration (uses mock OCR strings)
- No SLAM/SfM/video processing
- No GPS / real-time navigation
- No external AI services
