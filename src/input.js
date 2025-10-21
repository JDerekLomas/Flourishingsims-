import * as THREE from 'three';

export class InputHandler {
  constructor(character, camera) {
    this.character = character;
    this.camera = camera;
    this.keys = {};
    this.mouseDown = false;
    this.lastMouseX = 0;
    this.cameraAngle = 0;
    this.cameraDistance = 28;
    this.cameraHeight = 20;

    this.setupEventListeners();
  }

  setupEventListeners() {
    // Keyboard
    window.addEventListener('keydown', (e) => {
      this.keys[e.key.toLowerCase()] = true;
    });

    window.addEventListener('keyup', (e) => {
      this.keys[e.key.toLowerCase()] = false;
    });

    // Mouse for camera rotation
    window.addEventListener('mousedown', (e) => {
      if (e.button === 0) { // Left click
        this.mouseDown = true;
        this.lastMouseX = e.clientX;
      }
    });

    window.addEventListener('mouseup', () => {
      this.mouseDown = false;
    });

    window.addEventListener('mousemove', (e) => {
      if (this.mouseDown) {
        const deltaX = e.clientX - this.lastMouseX;
        this.cameraAngle -= deltaX * 0.005;
        this.lastMouseX = e.clientX;
      }
    });

    // Mouse wheel for zoom
    window.addEventListener('wheel', (e) => {
      this.cameraDistance += e.deltaY * 0.01;
      this.cameraDistance = Math.max(10, Math.min(40, this.cameraDistance));
    });
  }

  update(deltaTime) {
    // Movement direction
    const moveDirection = new THREE.Vector3();

    if (this.keys['w'] || this.keys['arrowup']) {
      moveDirection.z -= 1;
    }
    if (this.keys['s'] || this.keys['arrowdown']) {
      moveDirection.z += 1;
    }
    if (this.keys['a'] || this.keys['arrowleft']) {
      moveDirection.x -= 1;
    }
    if (this.keys['d'] || this.keys['arrowright']) {
      moveDirection.x += 1;
    }

    // Normalize and move character
    if (moveDirection.length() > 0) {
      moveDirection.normalize();
      this.character.move(moveDirection, deltaTime);
    }

    // Update camera to follow character
    const characterPos = this.character.getPosition();
    const cameraX = characterPos.x + Math.sin(this.cameraAngle) * this.cameraDistance;
    const cameraZ = characterPos.z + Math.cos(this.cameraAngle) * this.cameraDistance;

    this.camera.position.x = cameraX;
    this.camera.position.y = this.cameraHeight;
    this.camera.position.z = cameraZ;
    this.camera.lookAt(characterPos);
  }
}
