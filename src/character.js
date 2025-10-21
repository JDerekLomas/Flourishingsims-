import * as THREE from 'three';

export class Character {
  constructor() {
    this.mesh = this.createCharacterMesh();
    this.mesh.position.set(0, 0, 0);
    this.velocity = new THREE.Vector3();
    this.speed = 5;
  }

  createCharacterMesh() {
    const group = new THREE.Group();

    // Body
    const bodyGeometry = new THREE.CapsuleGeometry(0.3, 1.2, 8, 16);
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0x4a90e2,
      roughness: 0.5
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 1.2;
    body.castShadow = true;
    group.add(body);

    // Head
    const headGeometry = new THREE.SphereGeometry(0.35, 16, 16);
    const headMaterial = new THREE.MeshStandardMaterial({
      color: 0xffdbac,
      roughness: 0.6
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 2.3;
    head.castShadow = true;
    group.add(head);

    // Eyes
    const eyeGeometry = new THREE.SphereGeometry(0.08, 8, 8);
    const eyeMaterial = new THREE.MeshStandardMaterial({
      color: 0x000000
    });

    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.12, 2.4, 0.3);
    group.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.12, 2.4, 0.3);
    group.add(rightEye);

    // Arms
    const armGeometry = new THREE.CapsuleGeometry(0.1, 0.8, 4, 8);
    const armMaterial = new THREE.MeshStandardMaterial({
      color: 0xffdbac,
      roughness: 0.6
    });

    const leftArm = new THREE.Mesh(armGeometry, armMaterial);
    leftArm.position.set(-0.45, 1.5, 0);
    leftArm.rotation.z = 0.3;
    leftArm.castShadow = true;
    group.add(leftArm);

    const rightArm = new THREE.Mesh(armGeometry, armMaterial);
    rightArm.position.set(0.45, 1.5, 0);
    rightArm.rotation.z = -0.3;
    rightArm.castShadow = true;
    group.add(rightArm);

    return group;
  }

  move(direction, deltaTime) {
    const movement = direction.clone().multiplyScalar(this.speed * deltaTime);
    this.mesh.position.add(movement);

    // Rotate character to face movement direction
    if (direction.length() > 0) {
      const angle = Math.atan2(direction.x, direction.z);
      this.mesh.rotation.y = angle;
    }
  }

  getPosition() {
    return this.mesh.position.clone();
  }
}
