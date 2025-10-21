import { createHouse } from './house.js';
import { Character } from './character.js';
import { createInteractiveObjects } from './objects.js';
import { NeedsManager } from './needsManager.js';
import { InputHandler } from './input.js';

export class Game {
  constructor(scene, camera, renderer) {
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;

    // Create house
    this.house = createHouse();
    this.scene.add(this.house);

    // Create character
    this.character = new Character();
    this.scene.add(this.character.mesh);

    // Create interactive objects
    this.objects = createInteractiveObjects();
    this.objects.forEach(obj => this.scene.add(obj.mesh));

    // Initialize needs manager
    this.needsManager = new NeedsManager();

    // Initialize input handler
    this.inputHandler = new InputHandler(this.character, this.camera);

    // Setup interaction system
    this.setupInteractionSystem();

    // Track time for needs decay
    this.timeAccumulator = 0;
  }

  setupInteractionSystem() {
    const interactionPrompt = document.getElementById('interaction-prompt');

    // Check for nearby objects
    this.checkNearbyObjects = () => {
      const characterPos = this.character.mesh.position;
      let nearbyObject = null;
      let minDistance = Infinity;

      this.objects.forEach(obj => {
        const distance = characterPos.distanceTo(obj.mesh.position);
        if (distance < 2.5 && distance < minDistance) {
          minDistance = distance;
          nearbyObject = obj;
        }
      });

      if (nearbyObject) {
        interactionPrompt.style.display = 'block';
        this.currentInteractableObject = nearbyObject;
      } else {
        interactionPrompt.style.display = 'none';
        this.currentInteractableObject = null;
      }
    };

    // Handle interaction key (E)
    window.addEventListener('keydown', (e) => {
      if (e.key === 'e' || e.key === 'E') {
        if (this.currentInteractableObject) {
          this.interact(this.currentInteractableObject);
        }
      }
    });
  }

  interact(object) {
    console.log(`Interacting with ${object.name}`);

    // Apply needs changes based on object type
    const needsChanges = object.needsEffect;
    Object.keys(needsChanges).forEach(needName => {
      this.needsManager.modifyNeed(needName, needsChanges[needName]);
    });

    // Visual feedback
    this.showInteractionFeedback(object);
  }

  showInteractionFeedback(object) {
    // Simple color flash
    const originalColor = object.mesh.material.color.clone();
    object.mesh.material.color.setHex(0xffff00);

    setTimeout(() => {
      object.mesh.material.color.copy(originalColor);
    }, 200);
  }

  update(deltaTime) {
    // Update character movement
    this.inputHandler.update(deltaTime);

    // Check for nearby interactive objects
    this.checkNearbyObjects();

    // Decay needs over time (every 5 seconds)
    this.timeAccumulator += deltaTime;
    if (this.timeAccumulator >= 5) {
      this.needsManager.decayNeeds();
      this.timeAccumulator = 0;
    }

    // Update UI
    this.needsManager.updateUI();
  }
}
