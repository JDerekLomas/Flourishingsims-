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

### World & Environment
- **4-house neighborhood** with streets, street lamps, and trees
- **Roofless bungalow houses** for perfect top-down view
- **Road system** with markings connecting all houses
- **Day/night cycle** with time progression (1 real second = 1 game minute)
- Beautiful street decorations and ambient lighting

### Characters & AI
- **Play as your Sim** with full movement control
- **3 autonomous NPCs** (Alice, Bob, and Carol) with unique personalities
- **AI-driven behaviors** - NPCs autonomously satisfy their needs
- **Social interactions** - Talk to NPCs to build relationships
- **Need-based AI** - NPCs seek objects when their needs are low

### Social Systems
- **Relationship tracking** with all NPCs
- **Relationship levels**: From "Enemies" to "Best Friends"
- **Social interactions**: Chat, joke, compliment with NPCs
- **Relationship UI** showing all your friendships
- Relationships improve through positive interactions

### Needs System
- **13 psychological needs** for player and all NPCs
- **Real-time tracking** with visual progress bars
- **Needs decay** over time requiring regular maintenance
- **40+ interactive objects** spread across 4 houses
- Each object affects specific psychological needs

### UI & Controls
- **Minimizable panels** - Click 📊 or 👥 to collapse/expand
- **Time display** showing current day and time
- **Dynamic prompts** for objects and NPCs
- **Mobile-optimized** with touch controls
- **Responsive design** for all screen sizes

## Controls

### Desktop
- **Arrow Keys or WASD**: Move your character
- **Mouse Drag**: Rotate camera around the neighborhood
- **Mouse Wheel**: Zoom in/out
- **E**: Interact with objects or talk to NPCs
- **Click 📊**: Toggle needs panel
- **Click 👥**: Toggle relationships panel

### Mobile
- **Virtual Joystick** (bottom-left): Move character
- **Drag right side of screen**: Rotate camera
- **E Button** (bottom-right): Interact with objects/NPCs
- **Tap panels**: Toggle needs and relationships

## How to Play

1. **Explore the neighborhood** - Visit all 4 houses
2. **Meet the neighbors** - Talk to Alice, Bob, and Carol
3. **Build relationships** - Chat and interact to become friends
4. **Manage your needs** - Use objects to keep all 13 needs high
5. **Watch the NPCs** - They autonomously go about their day
6. **Keep an eye on time** - Days pass as you play

## NPCs

- **Alice** (Red) - Lives in House 2
- **Bob** (Blue) - Lives in House 3
- **Carol** (Green) - Lives in House 4

Each NPC has their own needs, daily routines, and will interact with objects and other Sims autonomously!

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
