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

    // Touch controls
    this.touchJoystick = { x: 0, y: 0, active: false };
    this.touchCamera = { active: false, lastX: 0, lastY: 0 };
    this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    this.setupEventListeners();
    if (this.isMobile) {
      this.setupMobileControls();
    }
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

    // Touch events for mobile
    window.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: false });
    window.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: false });
    window.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: false });
  }

  setupMobileControls() {
    // Create virtual joystick
    const joystickContainer = document.createElement('div');
    joystickContainer.id = 'joystick-container';
    joystickContainer.innerHTML = `
      <div id="joystick-base">
        <div id="joystick-stick"></div>
      </div>
    `;
    document.body.appendChild(joystickContainer);

    // Create interaction button
    const interactBtn = document.createElement('button');
    interactBtn.id = 'interact-button';
    interactBtn.textContent = 'E';
    interactBtn.onclick = () => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'e' }));
    };
    document.body.appendChild(interactBtn);

    // Setup joystick touch handlers
    const joystickBase = document.getElementById('joystick-base');
    const joystickStick = document.getElementById('joystick-stick');

    let joystickTouch = null;

    joystickBase.addEventListener('touchstart', (e) => {
      e.preventDefault();
      joystickTouch = e.touches[0].identifier;
      this.touchJoystick.active = true;
      this.updateJoystick(e.touches[0], joystickBase, joystickStick);
    });

    joystickBase.addEventListener('touchmove', (e) => {
      e.preventDefault();
      if (this.touchJoystick.active) {
        this.updateJoystick(e.touches[0], joystickBase, joystickStick);
      }
    });

    joystickBase.addEventListener('touchend', (e) => {
      e.preventDefault();
      this.touchJoystick.active = false;
      this.touchJoystick.x = 0;
      this.touchJoystick.y = 0;
      joystickStick.style.transform = 'translate(-50%, -50%)';
    });
  }

  updateJoystick(touch, base, stick) {
    const rect = base.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = touch.clientX - centerX;
    const deltaY = touch.clientY - centerY;

    const distance = Math.min(Math.sqrt(deltaX * deltaX + deltaY * deltaY), 40);
    const angle = Math.atan2(deltaY, deltaX);

    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    stick.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;

    // Normalize joystick input
    this.touchJoystick.x = x / 40;
    this.touchJoystick.y = y / 40;
  }

  handleTouchStart(e) {
    // Handle camera rotation (touches outside joystick area)
    const joystickBase = document.getElementById('joystick-base');
    if (!joystickBase || !this.isTouchOnElement(e.touches[0], joystickBase)) {
      const touch = e.touches[0];
      if (touch.clientX > window.innerWidth / 2) { // Right side of screen for camera
        this.touchCamera.active = true;
        this.touchCamera.lastX = touch.clientX;
        this.touchCamera.lastY = touch.clientY;
      }
    }
  }

  handleTouchMove(e) {
    if (this.touchCamera.active) {
      const touch = Array.from(e.touches).find(t => t.clientX > window.innerWidth / 2);
      if (touch) {
        const deltaX = touch.clientX - this.touchCamera.lastX;
        this.cameraAngle -= deltaX * 0.01;
        this.touchCamera.lastX = touch.clientX;
        this.touchCamera.lastY = touch.clientY;
        e.preventDefault();
      }
    }
  }

  handleTouchEnd(e) {
    this.touchCamera.active = false;
  }

  isTouchOnElement(touch, element) {
    const rect = element.getBoundingClientRect();
    return touch.clientX >= rect.left && touch.clientX <= rect.right &&
           touch.clientY >= rect.top && touch.clientY <= rect.bottom;
  }

  update(deltaTime) {
    // Movement direction
    const moveDirection = new THREE.Vector3();

    // Keyboard controls
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

    // Touch joystick controls
    if (this.touchJoystick.active) {
      moveDirection.x += this.touchJoystick.x;
      moveDirection.z += this.touchJoystick.y;
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
