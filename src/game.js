import { Character } from './character.js';
import { NPC } from './npc.js';
import { World } from './world.js';
import { NeedsManager } from './needsManager.js';
import { InputHandler } from './input.js';
import { TimeSystem } from './timeSystem.js';
import { RelationshipManager } from './relationshipManager.js';

export class Game {
  constructor(scene, camera, renderer) {
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;

    try {
      console.log('Step 1: Creating world...');
      this.world = new World(scene);
      console.log('✓ World created');
    } catch (error) {
      console.error('Failed at: Creating world', error);
      throw new Error(`World creation failed: ${error.message}`);
    }

    try {
      console.log('Step 2: Creating player...');
      this.player = new Character();
      this.player.id = 'player';
      this.player.name = 'You';
      this.player.mesh.position.copy(this.world.getHousePosition(0));
      this.scene.add(this.player.mesh);
      console.log('✓ Player created');
    } catch (error) {
      console.error('Failed at: Creating player', error);
      throw new Error(`Player creation failed: ${error.message}`);
    }

    try {
      console.log('Step 3: Getting objects...');
      this.objects = this.world.getAllObjects();
      console.log(`✓ Found ${this.objects.length} objects`);
    } catch (error) {
      console.error('Failed at: Getting objects', error);
      throw new Error(`Getting objects failed: ${error.message}`);
    }

    try {
      console.log('Step 4: Creating NeedsManager...');
      this.needsManager = new NeedsManager();
      console.log('✓ NeedsManager created');
    } catch (error) {
      console.error('Failed at: Creating NeedsManager', error);
      throw new Error(`NeedsManager creation failed: ${error.message}`);
    }

    try {
      console.log('Step 5: Creating TimeSystem...');
      this.timeSystem = new TimeSystem();
      console.log('✓ TimeSystem created');
    } catch (error) {
      console.error('Failed at: Creating TimeSystem', error);
      throw new Error(`TimeSystem creation failed: ${error.message}`);
    }

    try {
      console.log('Step 6: Creating RelationshipManager...');
      this.relationshipManager = new RelationshipManager();
      console.log('✓ RelationshipManager created');

      this.relationshipManager.initializeCharacter('player');
      console.log('✓ Player relationship initialized');
    } catch (error) {
      console.error('Failed at: Creating RelationshipManager', error);
      throw new Error(`RelationshipManager creation failed: ${error.message}`);
    }

    try {
      console.log('Step 7: Creating NPCs...');
      this.npcs = [];
      this.createNPCs();
      console.log('✓ NPCs created');
    } catch (error) {
      console.error('Failed at: Creating NPCs', error);
      throw new Error(`NPC creation failed: ${error.message}`);
    }

    try {
      console.log('Step 8: Creating InputHandler...');
      this.inputHandler = new InputHandler(this.player, this.camera);
      console.log('✓ InputHandler created');
    } catch (error) {
      console.error('Failed at: Creating InputHandler', error);
      throw new Error(`InputHandler creation failed: ${error.message}`);
    }

    // Setup interaction system
    this.setupInteractionSystem();

    // Setup UI toggles
    this.setupUIToggles();

    // Track time for needs decay
    this.timeAccumulator = 0;
  }

  createNPCs() {
    const npcData = [
      { name: 'Alice', house: 1, color: 0xe74c3c },
      { name: 'Bob', house: 2, color: 0x3498db },
      { name: 'Carol', house: 3, color: 0x2ecc71 }
    ];

    npcData.forEach(data => {
      const npc = new NPC(
        data.name,
        this.world.getHousePosition(data.house),
        data.color
      );
      this.npcs.push(npc);
      this.scene.add(npc.mesh);

      // Initialize relationship for this NPC
      this.relationshipManager.initializeCharacter(npc.id);
    });
  }

  setupUIToggles() {
    const toggleNeeds = document.getElementById('toggle-needs');
    const needsPanel = document.getElementById('needs-panel');

    const toggleRelationships = document.getElementById('toggle-relationships');
    const relationshipsPanel = document.getElementById('relationships-panel');

    toggleNeeds.addEventListener('click', () => {
      needsPanel.classList.toggle('minimized');
    });

    toggleRelationships.addEventListener('click', () => {
      relationshipsPanel.classList.toggle('minimized');
    });
  }

  setupInteractionSystem() {
    const interactionPrompt = document.getElementById('interaction-prompt');

    // Check for nearby objects and NPCs
    this.checkNearbyInteractables = () => {
      const playerPos = this.player.mesh.position;
      let nearbyObject = null;
      let nearbyNPC = null;
      let minObjectDist = Infinity;
      let minNPCDist = Infinity;

      // Check objects
      this.objects.forEach(obj => {
        const distance = playerPos.distanceTo(obj.mesh.position);
        if (distance < 2.5 && distance < minObjectDist) {
          minObjectDist = distance;
          nearbyObject = obj;
        }
      });

      // Check NPCs
      this.npcs.forEach(npc => {
        const distance = playerPos.distanceTo(npc.mesh.position);
        if (distance < 3 && distance < minNPCDist) {
          minNPCDist = distance;
          nearbyNPC = npc;
        }
      });

      // Priority: NPCs over objects
      if (nearbyNPC) {
        interactionPrompt.style.display = 'block';
        interactionPrompt.textContent = `Press E to talk to ${nearbyNPC.name}`;
        this.currentInteractable = nearbyNPC;
        this.currentInteractableType = 'npc';
      } else if (nearbyObject) {
        interactionPrompt.style.display = 'block';
        interactionPrompt.textContent = `Press E to use ${nearbyObject.name}`;
        this.currentInteractable = nearbyObject;
        this.currentInteractableType = 'object';
      } else {
        interactionPrompt.style.display = 'none';
        this.currentInteractable = null;
        this.currentInteractableType = null;
      }
    };

    // Handle interaction key (E)
    window.addEventListener('keydown', (e) => {
      if (e.key === 'e' || e.key === 'E') {
        if (this.currentInteractable) {
          if (this.currentInteractableType === 'object') {
            this.interactWithObject(this.currentInteractable);
          } else if (this.currentInteractableType === 'npc') {
            this.interactWithNPC(this.currentInteractable);
          }
        }
      }
    });
  }

  interactWithObject(object) {
    console.log(`Using ${object.name}`);

    // Apply needs changes
    const needsChanges = object.needsEffect;
    Object.keys(needsChanges).forEach(needName => {
      this.needsManager.modifyNeed(needName, needsChanges[needName]);
    });

    // Visual feedback
    this.showInteractionFeedback(object.mesh);
  }

  interactWithNPC(npc) {
    console.log(`Talking to ${npc.name}`);

    // Random interaction types
    const interactions = ['chat', 'joke', 'compliment'];
    const interactionType = interactions[Math.floor(Math.random() * interactions.length)];

    // Update relationship
    this.relationshipManager.interact(
      'player',
      npc.id,
      'You',
      npc.name,
      interactionType
    );

    // Update player needs
    this.needsManager.modifyNeed('community', 8);
    this.needsManager.modifyNeed('relatedness', 10);
    this.needsManager.modifyNeed('stimulation', 5);

    // Update NPC needs
    npc.satisfyNeeds({
      community: 8,
      relatedness: 10,
      stimulation: 5
    });

    // Visual feedback
    this.showInteractionFeedback(npc.mesh);

    // Update relationships UI
    this.relationshipManager.updateUI('player');
  }

  showInteractionFeedback(mesh) {
    // Find a child mesh with a material
    const findMeshWithMaterial = (obj) => {
      if (obj.material && obj.material.color) {
        return obj;
      }
      for (let child of obj.children) {
        const result = findMeshWithMaterial(child);
        if (result) return result;
      }
      return null;
    };

    const targetMesh = findMeshWithMaterial(mesh);
    if (!targetMesh) return;

    const originalColor = targetMesh.material.color.clone();
    targetMesh.material.color.setHex(0xffff00);

    setTimeout(() => {
      targetMesh.material.color.copy(originalColor);
    }, 200);
  }

  update(deltaTime) {
    // Update time system
    this.timeSystem.update(deltaTime);

    // Update player movement
    this.inputHandler.update(deltaTime);

    // Update NPCs
    this.npcs.forEach(npc => {
      npc.update(deltaTime, this.timeSystem.getTimeOfDay(), this.objects, [this.player, ...this.npcs.filter(n => n !== npc)]);
    });

    // Check for nearby interactables
    this.checkNearbyInteractables();

    // Decay needs over time (every 5 seconds)
    this.timeAccumulator += deltaTime;
    if (this.timeAccumulator >= 5) {
      this.needsManager.decayNeeds();

      // NPCs also decay needs
      this.npcs.forEach(npc => npc.decayNeeds());

      this.timeAccumulator = 0;
    }

    // Update UI
    this.needsManager.updateUI();
  }
}
