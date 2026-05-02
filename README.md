# Semantic MovieMap

Semantic MovieMap is a research prototype for totally blind users.

The goal is to support route practice and tourism-style exploration in indoor exhibition facilities by using semantic route maps generated from 360-degree videos.

This project is inspired by 3DMovieMap, which generates interactive route-viewing movie maps from equirectangular videos using visual SLAM and route graph construction. This prototype extends the idea toward non-visual exploration, audio descriptions, route-practice interaction, and accessibility-focused evaluation.

## Current Status

This repository is in the MVP stage.

The first version does not implement real 360-degree video processing, OCR, AI captioning, GPS, or SLAM.

Instead, it uses mock Semantic MovieMap data to build and test the core user experience:

- tourism-style exploration
- route practice
- 8-direction descriptions
- tag and OCR-text search
- jump-to-location
- route-practice feedback
- experiment logging

## Target Users

- Totally blind users
- Users who can operate a smartphone and earphones
- The first research target is route practice in indoor exhibition facilities

## Target Environment

The initial target environment is an indoor exhibition facility.

The system is intended to support the following scenario:

1. A 360-degree video is captured along a route in an exhibition facility.
2. The system generates a semantic route graph.
3. A user explores the space through audio descriptions.
4. The user selects an interesting exhibit or place.
5. The user practices the route to that place.
6. The effect of the practice can be evaluated through virtual tasks and, if possible, real walking tasks.

## MVP Scope

The MVP uses mock data only.

### Included in MVP

- Load `semantic_map_auto.json`
- Represent approximately 1-meter route nodes
- Support 8 directions:
  - front
  - front_right
  - right
  - back_right
  - back
  - back_left
  - left
  - front_left
- Support hierarchical descriptions:
  - level_1
  - level_3
  - level_5
- Support tourism mode
- Support route practice mode
- Support search and jump
- Always announce current location and heading after jump
- Log user actions
- Export experiment logs as JSON
- Provide keyboard-accessible operation

### Not Included in MVP

- Real 360-degree video processing
- OCR engine
- AI image captioning
- SLAM
- GPS
- Real-time navigation
- Multi-video integration
- Native smartphone app

These functions will be added in later phases.

## Planned Development Phases

### Phase 1: Mock-data MVP

Build the basic accessible user app using mock Semantic MovieMap data.

Core functions:

- node movement
- heading rotation
- 8-direction descriptions
- tourism mode
- route practice mode
- search
- jump
- logging

### Phase 2: Manual+ Review Tool

Build a tool for researchers to inspect and edit automatically generated Semantic MovieMap data.

The tool will support:

- Auto map inspection
- Manual correction
- Additional explanations
- OCR correction
- tag editing
- diff recording
- Manual+ map export

### Phase 3: 360-degree Video Processing

Add scripts to sample frames from equirectangular videos and export 8-direction perspective images.

### Phase 4: Semantic Generation

Add OCR, tag generation, and description-generation modules.

### Phase 5: SLAM / SfM Integration

Add pose providers for trajectory estimation.

Planned pose sources:

- time-based provisional poses
- manual CSV poses
- COLMAP poses
- future SLAM output

## Repository Structure

Expected structure:

```text
semantic-moviemap/
  README.md
  AGENTS.md

  apps/
    user-app/
      src/

    review-tool/
      src/

  services/
    map-builder/
      src/

    semantic-generator/
      src/

    slam-adapter/
      src/

  schemas/
    semantic_map.schema.json
    experiment_log.schema.json

  data/
    sample/
      semantic_map_auto.json
      semantic_map_manual_plus.json
      images/

    raw/
      videos/

    processed/

  logs/
    experiment/
