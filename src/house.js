import * as THREE from 'three';

export function createHouse() {
  const house = new THREE.Group();

  // House dimensions
  const width = 16;
  const depth = 12;
  const wallHeight = 3;
  const wallThickness = 0.3;

  // Materials
  const wallMaterial = new THREE.MeshStandardMaterial({
    color: 0xf5deb3, // Wheat color
    roughness: 0.8
  });

  const floorMaterial = new THREE.MeshStandardMaterial({
    color: 0x8b7355, // Wood color
    roughness: 0.6
  });

  // Floor
  const floorGeometry = new THREE.BoxGeometry(width, 0.2, depth);
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.position.y = 0.1;
  floor.receiveShadow = true;
  house.add(floor);

  // Walls (no roof - open top view)

  // Front wall (with door opening)
  const frontWallLeft = new THREE.Mesh(
    new THREE.BoxGeometry(5, wallHeight, wallThickness),
    wallMaterial
  );
  frontWallLeft.position.set(-5.5, wallHeight / 2, -depth / 2);
  frontWallLeft.castShadow = true;
  house.add(frontWallLeft);

  const frontWallRight = new THREE.Mesh(
    new THREE.BoxGeometry(5, wallHeight, wallThickness),
    wallMaterial
  );
  frontWallRight.position.set(5.5, wallHeight / 2, -depth / 2);
  frontWallRight.castShadow = true;
  house.add(frontWallRight);

  // Door frame
  const doorTop = new THREE.Mesh(
    new THREE.BoxGeometry(2, 0.3, wallThickness),
    wallMaterial
  );
  doorTop.position.set(0, 2.35, -depth / 2);
  doorTop.castShadow = true;
  house.add(doorTop);

  // Back wall
  const backWall = new THREE.Mesh(
    new THREE.BoxGeometry(width, wallHeight, wallThickness),
    wallMaterial
  );
  backWall.position.set(0, wallHeight / 2, depth / 2);
  backWall.castShadow = true;
  house.add(backWall);

  // Left wall
  const leftWall = new THREE.Mesh(
    new THREE.BoxGeometry(wallThickness, wallHeight, depth),
    wallMaterial
  );
  leftWall.position.set(-width / 2, wallHeight / 2, 0);
  leftWall.castShadow = true;
  house.add(leftWall);

  // Right wall (with window opening)
  const rightWallFront = new THREE.Mesh(
    new THREE.BoxGeometry(wallThickness, wallHeight, 4),
    wallMaterial
  );
  rightWallFront.position.set(width / 2, wallHeight / 2, -4);
  rightWallFront.castShadow = true;
  house.add(rightWallFront);

  const rightWallBack = new THREE.Mesh(
    new THREE.BoxGeometry(wallThickness, wallHeight, 4),
    wallMaterial
  );
  rightWallBack.position.set(width / 2, wallHeight / 2, 4);
  rightWallBack.castShadow = true;
  house.add(rightWallBack);

  // Window sill
  const windowSill = new THREE.Mesh(
    new THREE.BoxGeometry(wallThickness, 0.2, 3),
    wallMaterial
  );
  windowSill.position.set(width / 2, 1.2, 0);
  windowSill.castShadow = true;
  house.add(windowSill);

  // Interior walls to create rooms
  const interiorWallMaterial = new THREE.MeshStandardMaterial({
    color: 0xfaf0e6,
    roughness: 0.7
  });

  // Dividing wall (creates bedroom and living area)
  const dividerWallLeft = new THREE.Mesh(
    new THREE.BoxGeometry(wallThickness, wallHeight, 5),
    interiorWallMaterial
  );
  dividerWallLeft.position.set(-3, wallHeight / 2, 3.5);
  dividerWallLeft.castShadow = true;
  house.add(dividerWallLeft);

  const dividerWallRight = new THREE.Mesh(
    new THREE.BoxGeometry(wallThickness, wallHeight, 4),
    interiorWallMaterial
  );
  dividerWallRight.position.set(-3, wallHeight / 2, -4);
  dividerWallRight.castShadow = true;
  house.add(dividerWallRight);

  // Door frame in interior wall
  const interiorDoorTop = new THREE.Mesh(
    new THREE.BoxGeometry(wallThickness, 0.3, 2),
    interiorWallMaterial
  );
  interiorDoorTop.position.set(-3, 2.35, 0);
  house.add(interiorDoorTop);

  return house;
}
