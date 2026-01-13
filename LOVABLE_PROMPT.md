# Interactive Digital Comic Book - Complete Build Prompt for Lovable

## Project Overview
Build an interactive digital comic book reader with branching narrative paths, emotional decision points, and parallel path visualization. The reader presents a story about two emotional approaches to life: **Struggle/Resistance** vs **Acceptance**, showing how the same external events can be experienced completely differently based on our internal state.

---

## Core Features Required

### 1. Story Structure (23 Scenes Total)
- **Linear Introduction**: Scenes 1-7 (all readers experience the same opening)
- **First Decision Point** (Scene 7): Choose between "Struggle/Resistance" or "Acceptance"
- **Branching Paths** (Scenes 8-12): Different content based on first choice
- **Second Decision Point** (Scene 13): Choose path again with parallel visualization
- **Parallel Visualization** (Scenes 14-23): Chosen path displayed full size, non-chosen path shown smaller and darker
- **Absolute Endings**: Two endings (scenes 18 and 23) showing same place, different emotional states - NO restart or return buttons

### 2. Unique Visual Features

#### Parallel Path Visualization
After the second decision point (scene 13), implement a split-screen view:
- **Main Path** (chosen): Full size, normal brightness, displayed on the left side (RTL layout)
- **Alternative Path** (not chosen): Small thumbnail (280px wide), darkened (40% opacity, 0.4 brightness filter), shown on the right side
- Label the alternative path with "The path not taken"
- This continues through all remaining scenes until the ending

#### RTL (Right-to-Left) Reading Direction
- Layout flows right-to-left
- Navigation arrows reversed (right arrow = next, left arrow = previous)
- Content alignment follows RTL conventions

### 3. Navigation System
- **Previous/Next buttons**: Standard navigation through linear scenes
- **Keyboard shortcuts**: Arrow keys for navigation (Right = Next, Left = Previous)
- **Decision points**: Must choose a path before proceeding (Next button disabled until choice is made)
- **History tracking**: Can go back to previous scenes
- **Progress bar**: Shows scenes completed out of total (e.g., "12 / 23")

### 4. User Interface Components

#### Progress Bar
- Fixed at top of screen
- Shows percentage completion with animated gradient fill (blue gradient: #4facfe to #00f2fe)
- Displays text: "X / 23" showing current progress

#### Scene Display
- Main scene image container with rounded corners and shadow
- Scene description below the image (italic text, center-aligned)
- Smooth fade-in animation when loading new scenes

#### Decision Interface
- Appears at decision points (scenes 7 and 13)
- Two large buttons for each choice:
  - **Struggle/Resistance**: Purple gradient background (#667eea to #764ba2)
  - **Acceptance**: Pink/red gradient background (#f093fb to #f5576c)
- Buttons have hover effects with ripple animation
- Title: "Choose your path..."

#### Ending Screen
- Full-screen overlay when reaching either ending
- Display ending title: "The Path of Struggle" or "The Path of Acceptance"
- Show emotional state information:
  - **Struggle Ending (Scene 18)**: Sadness, disconnection, no enjoyment
  - **Acceptance Ending (Scene 23)**: Presence, connection to the moment, enjoyment
- Final message: "This is where your journey ends..."
- **IMPORTANT**: NO restart button - endings are absolute and final

#### Loading & Error States
- Loading spinner with text "Loading your story..."
- Error screen for missing files or load failures

---

## Technical Implementation

### File Structure Required
```
/
├── index.html          # Main HTML file
├── styles.css          # All styling
├── app.js             # Application logic
├── story_complete.json # Story data structure
└── images/            # Comic image assets
    ├── 1.png
    ├── 2.png
    ├── ...
    └── 23.png
```

### JSON Data Structure (story_complete.json)

```json
{
  "$schema": "Interactive Comic Story Schema v1.0",
  "metadata": {
    "title": "Interactive Digital Comic",
    "readingDirection": "rtl",
    "totalScenes": 23,
    "features": {
      "parallelVisualization": true,
      "absoluteEndings": true,
      "emotionalContrast": true
    }
  },
  "start": "scene_1",
  "scenes": {
    "scene_1": {
      "id": "scene_1",
      "image": "1.png",
      "description": "Opening scene",
      "type": "linear",
      "next": "scene_2"
    },
    "scene_7": {
      "id": "scene_7",
      "image": "7.png",
      "description": "First decision point",
      "type": "decision",
      "decisionNumber": 1,
      "choices": [
        {
          "label": "Struggle / Resistance",
          "emotionalTone": "struggle",
          "next": "scene_8_struggle"
        },
        {
          "label": "Acceptance",
          "emotionalTone": "acceptance",
          "next": "scene_12"
        }
      ]
    },
    "scene_13": {
      "id": "scene_13",
      "image": "13.png",
      "description": "Second decision point - paths converge here",
      "type": "decision",
      "decisionNumber": 2,
      "parallelVisualization": true,
      "choices": [
        {
          "label": "Struggle / Resistance",
          "emotionalTone": "struggle",
          "next": "scene_14_struggle",
          "parallelPath": "scene_14_acceptance"
        },
        {
          "label": "Acceptance",
          "emotionalTone": "acceptance",
          "next": "scene_19_acceptance",
          "parallelPath": "scene_14_struggle"
        }
      ]
    },
    "scene_14_struggle": {
      "id": "scene_14_struggle",
      "image": "14.png",
      "description": "Struggle path - scene 14",
      "type": "parallel",
      "emotionalTone": "struggle",
      "parallelPath": "scene_19_acceptance",
      "next": "scene_15_struggle"
    },
    "scene_18": {
      "id": "scene_18",
      "image": "18.png",
      "description": "Struggle ending - same place as acceptance ending, but with sadness, disconnection, lack of enjoyment",
      "type": "ending",
      "emotionalTone": "struggle",
      "endingType": "absolute",
      "emotionalState": {
        "mood": "sadness",
        "connection": "disconnected",
        "experience": "no enjoyment"
      }
    },
    "scene_23": {
      "id": "scene_23",
      "image": "23.png",
      "description": "Acceptance ending - same place as struggle ending, but with presence, connection to moment, enjoyment",
      "type": "ending",
      "emotionalTone": "acceptance",
      "endingType": "absolute",
      "emotionalState": {
        "mood": "presence",
        "connection": "connected to the moment",
        "experience": "enjoyment"
      }
    }
  }
}
```

### Application Logic (JavaScript Class Structure)

Create a `ComicReader` class with:

#### Properties:
- `story`: Loaded JSON data
- `currentScene`: Current scene object
- `history`: Array of visited scene IDs for navigation back
- `visitedScenes`: Set of all visited scenes for progress tracking
- `showingParallelPath`: Boolean flag
- `chosenPath`: Track emotional path chosen

#### Methods:
- `loadStory()`: Fetch and parse story_complete.json
- `loadScene(sceneId)`: Load and display a specific scene
- `renderScene(scene)`: Update UI with scene content
- `showParallelPath(scene)`: Display the alternative path thumbnail
- `hideParallelPath()`: Hide alternative path
- `showChoices(scene)`: Display decision buttons
- `makeChoice(choice)`: Handle user choice and navigate
- `goToNextScene()`: Navigate forward
- `goToPreviousScene()`: Navigate back through history
- `showEnding(scene)`: Display ending screen
- `updateProgress()`: Update progress bar
- `updateNavigation()`: Enable/disable navigation buttons

#### Scene Type Handling:
- **linear**: Standard scene with next button
- **decision**: Show choice buttons, disable next until choice made
- **parallel**: Show main scene + alternative path thumbnail
- **ending**: Full-screen ending display, disable all navigation

---

## Styling Requirements

### Color Scheme
- **Background**: Dark blue gradient (#1e3c72 to #2a5298)
- **Progress bar**: Light blue gradient (#4facfe to #00f2fe)
- **Struggle buttons**: Purple gradient (#667eea to #764ba2)
- **Acceptance buttons**: Pink gradient (#f093fb to #f5576c)
- **Text**: White with various opacity levels
- **Containers**: Semi-transparent black backgrounds with blur effects

### Layout Specifications
- **RTL direction**: All content flows right-to-left
- **Max width**: 1400px centered container
- **Scene container**: Flexbox with 20px gap
- **Main scene**: Flexible width with rounded corners (15px radius)
- **Parallel scene**: Fixed 280px width, 0.4 opacity, darkened (filter: brightness(0.4))
- **Responsive**: Mobile breakpoint at 768px - stack vertically

### Animations
- **fadeIn**: Opacity 0 to 1 (0.6s) for scene transitions
- **slideUp**: Slide from bottom with fade (0.5s) for choice buttons
- **spin**: Rotation for loading spinner (1s linear infinite)
- **Hover effects**:
  - Buttons lift up 3px with increased shadow
  - Parallel scene opacity increases to 0.6 on hover

### Typography
- **Font family**: 'Segoe UI', Tahoma, sans-serif
- **Scene description**: 18px, italic, centered
- **Choice title**: 28px, bold
- **Choice buttons**: 18px, bold
- **Navigation buttons**: 16px, bold
- **Ending title**: 48px, gradient text effect
- **Ending description**: 22px, line-height 1.6

---

## Image Handling

### Image Paths
All images stored in `/images/` folder with this naming:
- Linear scenes: `1.png`, `2.png`, ..., `7.png`, `12.png`, `13.png`
- Branching scenes: `8_struggle.png`, `8_acceptance.png`, etc.
- Parallel scenes: `14_struggle.png`, `14_acceptance.png`, through `22_acceptance.png`
- Endings: `18.png` (struggle), `23.png` (acceptance)

### Image Display
- Full width in container, auto height
- Maintain aspect ratio
- Rounded corners on container
- Shadow effects for depth
- Smooth fade-in on load

---

## Complete Scene Flow Map

```
Scene 1 (linear) → Scene 2 → Scene 3 → Scene 4 → Scene 5 → Scene 6 →
Scene 7 (DECISION 1)
├── [Struggle] → Scenes 8, 9, 10, 11 (with loop option) → Scene 12
└── [Acceptance] → Scene 12

Scene 12 (convergence) → Scene 13 (DECISION 2 - with parallel viz)
├── [Struggle] → Scenes 14, 15, 16, 17 (main) → Scene 18 (ENDING)
│   [Shows 19, 20, 21, 22 as small/dark alternative]
└── [Acceptance] → Scenes 19, 20, 21, 22 (main) → Scene 23 (ENDING)
    [Shows 14, 15, 16, 17 as small/dark alternative]
```

### Special Scene Logic

**Scene 11** (struggle loop):
- Contains a decision to either:
  - Stay in struggle → loops back to scene 8
  - Exit struggle → proceeds to scene 12

**Scenes 14-17** and **Scenes 19-22** (parallel visualization):
- When user chooses struggle at scene 13: Show 14-17 as main, 19-22 as dark thumbnails
- When user chooses acceptance at scene 13: Show 19-22 as main, 14-17 as dark thumbnails
- Thumbnails appear next to main scene throughout this section

---

## Functional Requirements Checklist

### Must Have:
- ✓ Load story from JSON file
- ✓ Display scenes with images and descriptions
- ✓ RTL reading direction throughout
- ✓ Next/Previous navigation with keyboard support
- ✓ Two decision points with choice buttons
- ✓ Parallel path visualization after second decision
- ✓ Progress tracking and display
- ✓ Two distinct endings with emotional states
- ✓ No restart option at endings (absolute endings)
- ✓ History tracking for backward navigation
- ✓ Disable next button at decision points until choice made
- ✓ Loading and error states
- ✓ Responsive design for mobile and desktop

### Visual Details:
- ✓ Gradient backgrounds throughout
- ✓ Smooth animations between scenes
- ✓ Hover effects on interactive elements
- ✓ Alternative path shown darker and smaller (40% opacity, brightness 0.4)
- ✓ Progress bar with gradient fill animation
- ✓ Distinct styling for struggle vs acceptance buttons
- ✓ Full-screen ending overlay
- ✓ Shadow effects for depth

### User Experience:
- ✓ Intuitive navigation flow
- ✓ Clear visual feedback for choices
- ✓ Cannot proceed without making decisions
- ✓ Can review previous scenes via back button
- ✓ Progress clearly visible at all times
- ✓ Emotional tone reflected in UI colors
- ✓ Alternative path visible but de-emphasized
- ✓ Endings feel final and complete

---

## Design Philosophy

The application should convey the story's central message: **external circumstances are the same, but internal emotional state transforms the experience**. The parallel path visualization makes this literal - the reader sees both paths simultaneously, understanding "this is what I'm experiencing, but this is what could have been."

The absolute endings (no restart) emphasize that once you've walked a path and arrived at an emotional state, that's your journey's resolution. This creates weight and meaning to the choices made throughout.

---

## Testing Scenarios

1. **Complete linear path**: Start → Navigate through scenes 1-7 → Make first choice → Navigate to scene 13 → Make second choice → Reach ending
2. **Struggle loop**: Choose struggle at scene 7 → Loop through scenes 8-11 multiple times → Exit to scene 12
3. **Parallel visualization**: After scene 13 decision, verify both paths display correctly
4. **Back navigation**: Use previous button to review earlier scenes, then continue forward
5. **Keyboard navigation**: Test arrow keys work throughout
6. **Decision points**: Verify next button disabled until choice made
7. **Both endings**: Experience both scene 18 (struggle) and scene 23 (acceptance)
8. **Responsive design**: Test on mobile and desktop viewports
9. **Error handling**: Test with missing images or invalid JSON

---

## Implementation Notes for Lovable

- Use vanilla JavaScript (ES6+ class syntax)
- Fetch API for loading JSON
- CSS Grid/Flexbox for layouts
- CSS animations for transitions
- No external libraries required (pure HTML/CSS/JS)
- Images can be placeholder URLs during development (replace with actual comic images later)
- Ensure all event listeners are properly attached
- Handle edge cases (missing scenes, invalid data)
- Use semantic HTML for accessibility
- Ensure keyboard navigation works throughout
- Test in all major browsers

---

## Success Criteria

The application is complete when:
1. All 23 scenes load and display correctly
2. Both decision points function and track choices
3. Parallel visualization displays correctly after scene 13
4. Both endings display with proper emotional states
5. Navigation (buttons and keyboard) works in all scenes
6. Progress bar accurately tracks completion
7. RTL layout functions correctly
8. Responsive design works on mobile and desktop
9. No restart option appears at endings
10. Visual design matches the emotional tone of the story
