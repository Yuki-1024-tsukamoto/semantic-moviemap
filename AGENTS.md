# AGENTS.md

## Project Overview

This repository contains a research prototype called Semantic MovieMap.

The goal is to build an accessible route-practice and exploration system for totally blind users.
The system loads a semantic route graph generated from a 360-degree video of an indoor exhibition facility.
Users can explore the route using audio descriptions and practice routes to places of interest.

## Core Research Requirements

- Target users: totally blind users.
- Target environment: indoor exhibition facilities.
- Primary purpose: route practice.
- Secondary purpose: tourism-style exploration and post-visit review.
- Initial demo: use mock semantic map data, not real SLAM.
- Later extension: generate maps from 360-degree videos and SLAM/SfM camera poses.

## Key Concepts

- Semantic route graph
- 1-meter nodes
- 8-direction descriptions
- Tourism support mode
- Route practice mode
- Auto map
- Manual+ map
- Experiment logging

## Implementation Priorities

1. Build the data schema first.
2. Build the user app with mock data.
3. Add route-practice logic.
4. Add logging.
5. Add the review tool.
6. Add video frame extraction.
7. Add 8-direction perspective image export.
8. Add semantic generation.
9. Add SLAM/SfM pose providers.

## Accessibility Requirements

- The user app must be usable without relying on visual information.
- All important state changes must be represented as text announcements.
- Use clear and short messages in route-practice mode.
- Use hierarchical descriptions in tourism mode.
- Avoid hover-only interactions.
- Keep keyboard operation available even if touch gestures are implemented.

## Data Requirements

The app must load semantic maps from JSON files.
The schema must support:
- nodes
- edges
- 8 directions
- hierarchical descriptions
- OCR strings
- tags
- confidence values
- source attribution
- routes
- branch questions
- experiment logs

## Coding Constraints

- Prefer TypeScript for web apps.
- Prefer Python for video processing and SLAM/SfM adapters.
- Keep modules small and testable.
- Do not hard-code demo data inside components.
- Keep Auto and Manual+ maps separate.
- Do not implement real-time navigation or GPS in the MVP.
- Do not assume internet access during runtime.
- Add tests for graph navigation, route practice, search, and logging.

## Done Criteria for Each Task

A task is complete only when:
- The app or script runs locally.
- The relevant README instructions are updated.
- The implementation has at least basic tests.
- No unrelated files are changed.
- The output data format is documented.
