import * as THREE from 'three';
import { Game } from './game.js';

// Error display function
function showError(message) {
  const errorDiv = document.createElement('div');
  errorDiv.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(255, 0, 0, 0.9);
    color: white;
    padding: 20px;
    border-radius: 10px;
    max-width: 80%;
    text-align: center;
    z-index: 10000;
    font-size: 16px;
  `;
  errorDiv.innerHTML = `
    <h2>Error Loading Game</h2>
    <p>${message}</p>
    <p style="font-size: 12px; margin-top: 10px;">Try refreshing the page or using a different browser.</p>
  `;
  document.body.appendChild(errorDiv);
  console.error('Game Error:', message);
}

// Check WebGL support
function checkWebGLSupport() {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return !!gl;
  } catch (e) {
    return false;
  }
}

try {
  // Check WebGL support first
  if (!checkWebGLSupport()) {
    showError('Your device does not support WebGL, which is required for 3D graphics. Please try a different browser or device.');
    throw new Error('WebGL not supported');
  }

  // Initialize Three.js scene
  const canvas = document.getElementById('game-canvas');
  if (!canvas) {
    showError('Game canvas element not found. Please refresh the page.');
    throw new Error('Canvas not found');
  }

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x87ceeb); // Sky blue

  // Camera setup - top-down angled view
  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 20, 20);
  camera.lookAt(0, 0, 0);

  // Renderer
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio for performance
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(10, 20, 10);
  directionalLight.castShadow = true;
  directionalLight.shadow.camera.left = -20;
  directionalLight.shadow.camera.right = 20;
  directionalLight.shadow.camera.top = 20;
  directionalLight.shadow.camera.bottom = -20;
  directionalLight.shadow.mapSize.width = 2048;
  directionalLight.shadow.mapSize.height = 2048;
  scene.add(directionalLight);

  // Ground
  const groundGeometry = new THREE.PlaneGeometry(100, 100);
  const groundMaterial = new THREE.MeshStandardMaterial({
    color: 0x90EE90,
    roughness: 0.8
  });
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  console.log('Scene initialized successfully');

  // Initialize game
  const game = new Game(scene, camera, renderer);
  console.log('Game initialized successfully');

  // Handle window resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Animation loop
  let lastTime = performance.now();

  function animate() {
    requestAnimationFrame(animate);

    const currentTime = performance.now();
    const deltaTime = (currentTime - lastTime) / 1000; // Convert to seconds
    lastTime = currentTime;

    game.update(deltaTime);
    renderer.render(scene, camera);
  }

  animate();
  console.log('Game started successfully!');

} catch (error) {
  console.error('Fatal error initializing game:', error);
  if (!document.querySelector('div[style*="background: rgba(255, 0, 0"]')) {
    showError(`Failed to initialize game: ${error.message}`);
  }
}
