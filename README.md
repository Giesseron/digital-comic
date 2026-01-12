# Interactive Digital Comic

A branching narrative comic experience with emotional decision points and parallel path visualization.

## Features

### Core Experience
- **23 Interactive Scenes**: Complete story with multiple paths and endings
- **RTL Reading Direction**: Right-to-left reading experience
- **Branching Narrative**: Two major decision points that shape the story
- **Emotional Paths**: Choose between "Struggle/Resistance" or "Acceptance"

### Unique Features

#### 1. Parallel Path Visualization
After the second decision point, the reader sees **both paths simultaneously**:
- **Chosen path**: Displayed in full size and normal brightness
- **Non-chosen path**: Shown smaller and darker alongside
- This creates emotional contrast and shows "the path not taken"

#### 2. Absolute Endings
- **Slide 18**: Struggle ending - same place, different emotion (sadness, disconnection, no enjoyment)
- **Slide 23**: Acceptance ending - same place, different emotion (presence, connection, enjoyment)
- **No restart or return** - endings are final, representing the emotional resolution

## File Structure

```
digital_comic/
├── index.html              # Main HTML viewer
├── styles.css              # Styling with parallel visualization
├── app.js                  # Application logic
├── story_complete.json     # Complete story structure with all scenes
├── schema_proposal.json    # Original schema proposal
├── images/                 # Image assets folder
│   ├── 1.jpg
│   ├── 2.jpg
│   ├── ...
│   └── 23.jpg
└── README.md              # This file
```

## Story Structure

### Linear Introduction (Scenes 1-6)
All readers experience the same opening sequence.

### First Decision Point (Scene 7)
**Choice:**
- Struggle / Resistance → leads to struggle_path
- Acceptance → leads to acceptance_path

### Branching Paths (Scenes 8-12)
Different content based on first choice, showing the emotional journey.

### Second Decision Point (Scene 13)
**Choice (with parallel visualization):**
- Struggle / Resistance → leads to Scene 18 (struggle ending)
- Acceptance → leads to Scene 23 (acceptance ending)

After this decision, both paths are shown simultaneously.

### Final Scenes (14-23)
- Scenes continue with chosen path in full view
- Non-chosen path visible as smaller, darker images
- Two absolute endings representing same place, different emotional states

## Image Naming Convention

Images must follow this naming pattern in the `images/` folder:

### Linear Scenes (1-7, 13)
- `1.jpg`, `2.jpg`, `3.jpg`, etc.

### Branching Paths (8-12)
- `8_struggle.jpg` / `8_acceptance.jpg`
- `9_struggle.jpg` / `9_acceptance.jpg`
- `10_struggle.jpg` / `10_acceptance.jpg`
- `11_struggle.jpg` / `11_acceptance.jpg`
- `12_struggle.jpg` / `12_acceptance.jpg`

### Parallel Visualization Paths (14-22)
- `14_struggle.jpg` / `14_acceptance.jpg`
- `15_struggle.jpg` / `15_acceptance.jpg`
- `16_struggle.jpg` / `16_acceptance.jpg`
- `17_struggle.jpg` / `17_acceptance.jpg`
- `18.jpg` (Struggle ending - absolute)
- `19_struggle.jpg` / `19_acceptance.jpg` (shown as small/dark)
- `20_struggle.jpg` / `20_acceptance.jpg` (shown as small/dark)
- `21_struggle.jpg` / `21_acceptance.jpg` (shown as small/dark)
- `22_struggle.jpg` / `22_acceptance.jpg` (shown as small/dark)

### Endings
- `18.jpg` - Struggle ending (absolute)
- `23.jpg` - Acceptance ending (absolute)

## Setup Instructions

1. **Add Your Images**
   - Place all comic images in the `images/` folder
   - Follow the naming convention above
   - Recommended formats: JPG, PNG
   - Recommended size: 1200px-1920px width for optimal viewing

2. **Serve the Application**
   ```bash
   # Using Python 3
   python3 -m http.server 8000

   # Or using Node.js
   npx http-server -p 8000

   # Or using PHP
   php -S localhost:8000
   ```

3. **Open in Browser**
   - Navigate to `http://localhost:8000`
   - The comic will load automatically

## Technical Details

### JSON Schema
The story structure is defined in `story_complete.json` with:
- **metadata**: Story information and features
- **scenes**: All scene definitions with:
  - `type`: linear, decision, parallel, parallel_shadow, or ending
  - `emotionalTone`: struggle or acceptance
  - `parallelPath`: Reference to alternative path for parallel visualization
  - `emotionalState`: Detailed emotional state for endings

### Scene Types
- **linear**: Standard progression scene
- **decision**: Choice point for the reader
- **parallel**: Main path shown with alternative visible
- **parallel_shadow**: Alternative path shown small and dark
- **ending**: Final scene (absolute, no return)

### Navigation
- **Next/Previous buttons**: Navigate through linear scenes
- **Keyboard shortcuts**:
  - Arrow Right → Next scene
  - Arrow Left → Previous scene
- **Choice buttons**: Select emotional path at decision points
- **Progress bar**: Visual indication of story progress

### Styling Features
- Responsive design (mobile and desktop)
- Smooth animations and transitions
- Gradient backgrounds
- Parallel scene appears darker and smaller (40% opacity, reduced brightness)
- Hover effects on choice buttons
- RTL layout support

## Emotional Design

The story explores two emotional approaches to the same life situations:

**Struggle Path**
- Resistance to circumstances
- Emotional disconnection
- Lack of enjoyment
- Same external events, painful internal experience

**Acceptance Path**
- Presence and awareness
- Connection to the moment
- Ability to find enjoyment
- Same external events, peaceful internal experience

Both endings show the **same place and events**, but with completely different emotional interpretations.

## Browser Compatibility

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Optimized responsive design

## Future Enhancements

Possible additions (not yet implemented):
- Save/load progress to localStorage
- Multiple language support
- Sound effects and music
- Animation between scenes
- Analytics tracking for path choices
- Share endings on social media

## License

[Your License Here]

## Credits

Developed with Claude Code for an interactive storytelling experience.
