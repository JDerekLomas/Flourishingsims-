import * as THREE from 'three';
import { createHouse } from './house.js';
import { createInteractiveObjects } from './objects.js';

export class World {
  constructor(scene) {
    this.scene = scene;
    this.houses = [];
    this.allObjects = [];
    this.createStreet();
  }

  createStreet() {
    // Create a street with 4 houses
    const housePositions = [
      { x: -20, z: -15 },
      { x: 20, z: -15 },
      { x: -20, z: 15 },
      { x: 20, z: 15 }
    ];

    const houseColors = [
      0xf5deb3, // wheat
      0xffe4b5, // moccasin
      0xffefd5, // papayawhip
      0xfaf0e6  // linen
    ];

    housePositions.forEach((pos, index) => {
      const house = createHouse();
      house.position.set(pos.x, 0, pos.z);

      // Vary house colors
      house.traverse((child) => {
        if (child.isMesh && child.material.color) {
          child.material.color.setHex(houseColors[index]);
        }
      });

      this.scene.add(house);
      this.houses.push({ mesh: house, position: new THREE.Vector3(pos.x, 0, pos.z) });

      // Add objects to each house
      const objects = createInteractiveObjects();
      objects.forEach(obj => {
        obj.mesh.position.x += pos.x;
        obj.mesh.position.z += pos.z;
        this.scene.add(obj.mesh);
        this.allObjects.push(obj);
      });
    });

    // Create road/path
    this.createRoad();

    // Add street decorations
    this.addStreetLamps();
    this.addTrees();
  }

  createRoad() {
    const roadMaterial = new THREE.MeshStandardMaterial({
      color: 0x505050,
      roughness: 0.9
    });

    // Horizontal road
    const horizontalRoad = new THREE.Mesh(
      new THREE.PlaneGeometry(100, 8),
      roadMaterial
    );
    horizontalRoad.rotation.x = -Math.PI / 2;
    horizontalRoad.position.y = 0.05;
    horizontalRoad.receiveShadow = true;
    this.scene.add(horizontalRoad);

    // Vertical road
    const verticalRoad = new THREE.Mesh(
      new THREE.PlaneGeometry(8, 100),
      roadMaterial
    );
    verticalRoad.rotation.x = -Math.PI / 2;
    verticalRoad.position.y = 0.05;
    verticalRoad.receiveShadow = true;
    this.scene.add(verticalRoad);

    // Road markings
    const markingMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    for (let i = -40; i < 40; i += 8) {
      const marking = new THREE.Mesh(
        new THREE.PlaneGeometry(3, 0.3),
        markingMaterial
      );
      marking.rotation.x = -Math.PI / 2;
      marking.position.set(i, 0.06, 0);
      this.scene.add(marking);

      const marking2 = new THREE.Mesh(
        new THREE.PlaneGeometry(0.3, 3),
        markingMaterial
      );
      marking2.rotation.x = -Math.PI / 2;
      marking2.position.set(0, 0.06, i);
      this.scene.add(marking2);
    }
  }

  addStreetLamps() {
    const lampPositions = [
      { x: -15, z: -5 },
      { x: 15, z: -5 },
      { x: -15, z: 5 },
      { x: 15, z: 5 }
    ];

    lampPositions.forEach(pos => {
      const lamp = this.createStreetLamp();
      lamp.position.set(pos.x, 0, pos.z);
      this.scene.add(lamp);
    });
  }

  createStreetLamp() {
    const group = new THREE.Group();

    // Pole
    const poleMaterial = new THREE.MeshStandardMaterial({
      color: 0x333333,
      metalness: 0.8,
      roughness: 0.3
    });

    const pole = new THREE.Mesh(
      new THREE.CylinderGeometry(0.1, 0.1, 5, 8),
      poleMaterial
    );
    pole.position.y = 2.5;
    pole.castShadow = true;
    group.add(pole);

    // Light bulb
    const bulb = new THREE.Mesh(
      new THREE.SphereGeometry(0.3, 16, 16),
      new THREE.MeshStandardMaterial({
        color: 0xffffdd,
        emissive: 0xffffaa,
        emissiveIntensity: 0.5
      })
    );
    bulb.position.y = 5;
    group.add(bulb);

    // Point light
    const light = new THREE.PointLight(0xffffdd, 0.5, 20);
    light.position.y = 5;
    light.castShadow = true;
    group.add(light);

    return group;
  }

  addTrees() {
    const treePositions = [
      { x: -30, z: -25 },
      { x: 30, z: -25 },
      { x: -30, z: 25 },
      { x: 30, z: 25 },
      { x: -10, z: -25 },
      { x: 10, z: 25 }
    ];

    treePositions.forEach(pos => {
      const tree = this.createTree();
      tree.position.set(pos.x, 0, pos.z);
      this.scene.add(tree);
    });
  }

  createTree() {
    const group = new THREE.Group();

    // Trunk
    const trunk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.3, 0.4, 3, 8),
      new THREE.MeshStandardMaterial({
        color: 0x8b4513,
        roughness: 0.9
      })
    );
    trunk.position.y = 1.5;
    trunk.castShadow = true;
    group.add(trunk);

    // Leaves
    const leaves = new THREE.Mesh(
      new THREE.SphereGeometry(2, 8, 8),
      new THREE.MeshStandardMaterial({
        color: 0x228b22,
        roughness: 0.8
      })
    );
    leaves.position.y = 4;
    leaves.castShadow = true;
    group.add(leaves);

    return group;
  }

  getHousePosition(index) {
    if (index < this.houses.length) {
      return this.houses[index].position.clone();
    }
    return new THREE.Vector3(0, 0, 0);
  }

  getAllObjects() {
    return this.allObjects;
  }
}
