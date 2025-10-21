import { Character } from './character.js';
import * as THREE from 'three';

export class NPC extends Character {
  constructor(name, housePosition, color = 0x4a90e2) {
    super();
    this.name = name;
    this.id = Math.random().toString(36).substr(2, 9);
    this.home = housePosition.clone();
    this.mesh.position.copy(this.home);

    // Different color for NPC
    this.mesh.children[0].material.color.setHex(color);

    // AI state
    this.state = 'idle';
    this.stateTimer = 0;
    this.targetPosition = null;
    this.currentActivity = null;

    // Needs (NPCs also have needs)
    this.needs = {
      autonomy: 50,
      beauty: 50,
      comfort: 50,
      community: 50,
      competence: 50,
      fitness: 50,
      impact: 50,
      morality: 50,
      purpose: 50,
      recognition: 50,
      relatedness: 50,
      security: 50,
      stimulation: 50
    };

    // Schedule
    this.schedule = this.createSchedule();
  }

  createSchedule() {
    return {
      6: 'wake_up',
      8: 'work',
      12: 'lunch',
      13: 'work',
      18: 'home',
      19: 'socialize',
      22: 'sleep'
    };
  }

  update(deltaTime, timeOfDay, objects, otherCharacters) {
    this.stateTimer += deltaTime;

    // Autonomous behavior based on needs
    if (this.state === 'idle' && this.stateTimer > 3) {
      this.chooseNextAction(objects, otherCharacters);
    }

    // Move towards target if we have one
    if (this.targetPosition && this.state === 'moving') {
      const direction = new THREE.Vector3()
        .subVectors(this.targetPosition, this.mesh.position)
        .normalize();

      const distance = this.mesh.position.distanceTo(this.targetPosition);

      if (distance < 0.5) {
        // Reached destination
        this.state = 'idle';
        this.targetPosition = null;
        this.stateTimer = 0;
      } else {
        this.move(direction, deltaTime);
      }
    }

    // Idle wandering
    if (this.state === 'idle' && this.stateTimer > 5) {
      this.wander();
    }
  }

  chooseNextAction(objects, otherCharacters) {
    // Find lowest need
    let lowestNeed = null;
    let lowestValue = 100;

    Object.keys(this.needs).forEach(need => {
      if (this.needs[need] < lowestValue) {
        lowestValue = this.needs[need];
        lowestNeed = need;
      }
    });

    // If a need is below 30, seek object to fulfill it
    if (lowestValue < 30) {
      const suitableObject = this.findObjectForNeed(lowestNeed, objects);
      if (suitableObject) {
        this.targetPosition = suitableObject.mesh.position.clone();
        this.state = 'moving';
        this.stateTimer = 0;
      }
    } else {
      // Otherwise, socialize or wander
      const shouldSocialize = Math.random() < 0.3;
      if (shouldSocialize && otherCharacters.length > 0) {
        const randomChar = otherCharacters[Math.floor(Math.random() * otherCharacters.length)];
        this.targetPosition = randomChar.mesh.position.clone();
        this.state = 'moving';
        this.stateTimer = 0;
      } else {
        this.wander();
      }
    }
  }

  findObjectForNeed(need, objects) {
    // Find objects that satisfy this need
    const suitableObjects = objects.filter(obj => {
      return obj.needsEffect && obj.needsEffect[need] && obj.needsEffect[need] > 0;
    });

    if (suitableObjects.length > 0) {
      return suitableObjects[Math.floor(Math.random() * suitableObjects.length)];
    }

    return null;
  }

  wander() {
    // Random wander around home
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 10 + 5;

    this.targetPosition = new THREE.Vector3(
      this.home.x + Math.cos(angle) * distance,
      0,
      this.home.z + Math.sin(angle) * distance
    );

    this.state = 'moving';
    this.stateTimer = 0;
  }

  satisfyNeeds(needsEffect) {
    Object.keys(needsEffect).forEach(need => {
      if (this.needs[need] !== undefined) {
        this.needs[need] = Math.min(100, this.needs[need] + needsEffect[need]);
      }
    });
  }

  decayNeeds() {
    Object.keys(this.needs).forEach(need => {
      this.needs[need] = Math.max(0, this.needs[need] - 2);
    });
  }
}
