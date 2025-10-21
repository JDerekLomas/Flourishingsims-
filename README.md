# Flourishing Sims

A Sims-like game based on the 13 fundamental psychological needs by Pieter Desmet and Steven Fokkinga.

## 🚀 Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/JDerekLomas/Flourishingsims-)

Click the button above to deploy your own instance instantly!

## The 13 Fundamental Psychological Needs

1. **Autonomy** - Self-determination and freedom
2. **Beauty** - Aesthetic appreciation
3. **Comfort** - Physical and psychological ease
4. **Community** - Belonging to a group
5. **Competence** - Effectiveness and mastery
6. **Fitness** - Physical health and vitality
7. **Impact** - Influence on the world
8. **Morality** - Living by ethical principles
9. **Purpose** - Meaning and direction
10. **Recognition** - Being acknowledged
11. **Relatedness** - Close connections with others
12. **Security** - Safety and stability
13. **Stimulation** - Novelty and challenge

## Features

- 3D bungalow house without a roof (top-down view into the interior)
- Character with movement controls
- Interactive objects that affect different psychological needs
- Real-time needs tracking and visualization
- Needs decay over time, requiring regular interaction

## Controls

### Desktop
- **Arrow Keys or WASD**: Move character
- **Mouse Drag**: Rotate camera
- **Mouse Wheel**: Zoom in/out
- **E**: Interact with nearby objects

### Mobile
- **Virtual Joystick** (bottom-left): Move character
- **Drag right side of screen**: Rotate camera
- **E Button** (bottom-right): Interact with nearby objects

## Interactive Objects

- **Bed**: Comfort, Fitness, Security
- **Bookshelf**: Competence, Stimulation, Purpose
- **Sofa**: Comfort, Relatedness, Community
- **Plant**: Beauty, Morality, Purpose
- **Desk**: Competence, Autonomy, Impact
- **Exercise Mat**: Fitness, Competence
- **Mirror**: Recognition, Beauty
- **Painting**: Beauty, Stimulation, Purpose
- **Guitar**: Stimulation, Competence, Purpose
- **Meditation Cushion**: Morality, Purpose, Security

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

This project is configured for deployment on Vercel:

1. Push to GitHub
2. Import project in Vercel
3. Deploy automatically

## Technologies

- Three.js - 3D graphics
- Vite - Build tool
- Vanilla JavaScript

## About the Framework

This game is based on the research by Pieter Desmet and Steven Fokkinga from TU Delft, who developed a typology of 13 fundamental psychological needs for human-centered design. The framework expands on earlier work (like Self-Determination Theory) to provide a more comprehensive understanding of human needs.

Learn more at [needtypology.com](https://needtypology.com/)
