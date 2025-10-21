import * as THREE from 'three';

export function createInteractiveObjects() {
  const objects = [];

  // BED - affects Comfort, Fitness, Security
  const bed = createBed();
  bed.mesh.position.set(-5.5, 0.2, 3);
  bed.name = 'Bed';
  bed.needsEffect = {
    comfort: 15,
    fitness: 10,
    security: 8
  };
  objects.push(bed);

  // BOOKSHELF - affects Competence, Stimulation, Purpose
  const bookshelf = createBookshelf();
  bookshelf.mesh.position.set(6, 0.2, -4);
  bookshelf.name = 'Bookshelf';
  bookshelf.needsEffect = {
    competence: 12,
    stimulation: 10,
    purpose: 8
  };
  objects.push(bookshelf);

  // SOFA - affects Comfort, Relatedness, Community
  const sofa = createSofa();
  sofa.mesh.position.set(3, 0.2, -3);
  sofa.name = 'Sofa';
  sofa.needsEffect = {
    comfort: 10,
    relatedness: 8,
    community: 6
  };
  objects.push(sofa);

  // PLANT - affects Beauty, Morality, Purpose
  const plant = createPlant();
  plant.mesh.position.set(-6, 0.2, -4);
  plant.name = 'Plant';
  plant.needsEffect = {
    beauty: 12,
    morality: 5,
    purpose: 5
  };
  objects.push(plant);

  // DESK - affects Competence, Autonomy, Impact
  const desk = createDesk();
  desk.mesh.position.set(-5, 0.2, -3);
  desk.name = 'Desk';
  desk.needsEffect = {
    competence: 10,
    autonomy: 8,
    impact: 7
  };
  objects.push(desk);

  // EXERCISE MAT - affects Fitness, Competence
  const mat = createExerciseMat();
  mat.mesh.position.set(5, 0.2, 3);
  mat.name = 'Exercise Mat';
  mat.needsEffect = {
    fitness: 15,
    competence: 5
  };
  objects.push(mat);

  // MIRROR - affects Recognition, Beauty, Self-esteem
  const mirror = createMirror();
  mirror.mesh.position.set(-7.7, 1.5, 0);
  mirror.name = 'Mirror';
  mirror.needsEffect = {
    recognition: 8,
    beauty: 6
  };
  objects.push(mirror);

  // PAINTING - affects Beauty, Stimulation, Purpose
  const painting = createPainting();
  painting.mesh.position.set(0, 1.5, 5.85);
  painting.name = 'Painting';
  painting.needsEffect = {
    beauty: 12,
    stimulation: 8,
    purpose: 5
  };
  objects.push(painting);

  // GUITAR - affects Stimulation, Competence, Purpose
  const guitar = createGuitar();
  guitar.mesh.position.set(1, 0.2, 4);
  guitar.name = 'Guitar';
  guitar.needsEffect = {
    stimulation: 12,
    competence: 10,
    purpose: 8
  };
  objects.push(guitar);

  // MEDITATION CUSHION - affects Morality, Purpose, Security
  const cushion = createCushion();
  cushion.mesh.position.set(-1, 0.2, 4);
  cushion.name = 'Meditation Cushion';
  cushion.needsEffect = {
    morality: 10,
    purpose: 10,
    security: 8
  };
  objects.push(cushion);

  return objects;
}

function createBed() {
  const group = new THREE.Group();

  // Mattress
  const mattressGeometry = new THREE.BoxGeometry(2, 0.4, 3);
  const mattressMaterial = new THREE.MeshStandardMaterial({
    color: 0x8b4513,
    roughness: 0.7
  });
  const mattress = new THREE.Mesh(mattressGeometry, mattressMaterial);
  mattress.position.y = 0.4;
  mattress.castShadow = true;
  group.add(mattress);

  // Pillow
  const pillowGeometry = new THREE.BoxGeometry(1.5, 0.2, 0.5);
  const pillowMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.8
  });
  const pillow = new THREE.Mesh(pillowGeometry, pillowMaterial);
  pillow.position.set(0, 0.7, -1);
  pillow.castShadow = true;
  group.add(pillow);

  return { mesh: group };
}

function createBookshelf() {
  const group = new THREE.Group();

  // Frame
  const frameGeometry = new THREE.BoxGeometry(2, 3, 0.5);
  const frameMaterial = new THREE.MeshStandardMaterial({
    color: 0x654321,
    roughness: 0.6
  });
  const frame = new THREE.Mesh(frameGeometry, frameMaterial);
  frame.position.y = 1.5;
  frame.castShadow = true;
  group.add(frame);

  // Books
  const bookMaterial = new THREE.MeshStandardMaterial({
    color: 0x2e8b57,
    roughness: 0.5
  });
  for (let i = 0; i < 5; i++) {
    const book = new THREE.Mesh(
      new THREE.BoxGeometry(0.15, 0.4, 0.3),
      bookMaterial
    );
    book.position.set(-0.7 + i * 0.35, 1 + Math.random() * 0.5, 0);
    group.add(book);
  }

  return { mesh: group };
}

function createSofa() {
  const group = new THREE.Group();

  // Seat
  const seatGeometry = new THREE.BoxGeometry(2.5, 0.5, 1.2);
  const sofaMaterial = new THREE.MeshStandardMaterial({
    color: 0x708090,
    roughness: 0.6
  });
  const seat = new THREE.Mesh(seatGeometry, sofaMaterial);
  seat.position.y = 0.5;
  seat.castShadow = true;
  group.add(seat);

  // Back
  const back = new THREE.Mesh(
    new THREE.BoxGeometry(2.5, 1, 0.3),
    sofaMaterial
  );
  back.position.set(0, 1, -0.45);
  back.castShadow = true;
  group.add(back);

  // Arms
  const arm1 = new THREE.Mesh(
    new THREE.BoxGeometry(0.3, 0.8, 1.2),
    sofaMaterial
  );
  arm1.position.set(-1.1, 0.7, 0);
  arm1.castShadow = true;
  group.add(arm1);

  const arm2 = new THREE.Mesh(
    new THREE.BoxGeometry(0.3, 0.8, 1.2),
    sofaMaterial
  );
  arm2.position.set(1.1, 0.7, 0);
  arm2.castShadow = true;
  group.add(arm2);

  return { mesh: group };
}

function createPlant() {
  const group = new THREE.Group();

  // Pot
  const potGeometry = new THREE.CylinderGeometry(0.3, 0.2, 0.5, 16);
  const potMaterial = new THREE.MeshStandardMaterial({
    color: 0x8b4513,
    roughness: 0.7
  });
  const pot = new THREE.Mesh(potGeometry, potMaterial);
  pot.position.y = 0.25;
  pot.castShadow = true;
  group.add(pot);

  // Plant leaves
  const leafMaterial = new THREE.MeshStandardMaterial({
    color: 0x228b22,
    roughness: 0.5
  });

  for (let i = 0; i < 5; i++) {
    const leaf = new THREE.Mesh(
      new THREE.SphereGeometry(0.2, 8, 8),
      leafMaterial
    );
    const angle = (i / 5) * Math.PI * 2;
    leaf.position.set(
      Math.cos(angle) * 0.2,
      0.6 + Math.random() * 0.3,
      Math.sin(angle) * 0.2
    );
    leaf.castShadow = true;
    group.add(leaf);
  }

  return { mesh: group };
}

function createDesk() {
  const group = new THREE.Group();

  // Desktop
  const desktopGeometry = new THREE.BoxGeometry(2, 0.1, 1.2);
  const deskMaterial = new THREE.MeshStandardMaterial({
    color: 0x8b7355,
    roughness: 0.5
  });
  const desktop = new THREE.Mesh(desktopGeometry, deskMaterial);
  desktop.position.y = 1;
  desktop.castShadow = true;
  group.add(desktop);

  // Legs
  const legGeometry = new THREE.BoxGeometry(0.1, 1, 0.1);
  const positions = [
    [-0.9, 0.5, -0.5],
    [0.9, 0.5, -0.5],
    [-0.9, 0.5, 0.5],
    [0.9, 0.5, 0.5]
  ];

  positions.forEach(pos => {
    const leg = new THREE.Mesh(legGeometry, deskMaterial);
    leg.position.set(...pos);
    leg.castShadow = true;
    group.add(leg);
  });

  return { mesh: group };
}

function createExerciseMat() {
  const matGeometry = new THREE.BoxGeometry(1.5, 0.05, 2.5);
  const matMaterial = new THREE.MeshStandardMaterial({
    color: 0x9370db,
    roughness: 0.9
  });
  const mat = new THREE.Mesh(matGeometry, matMaterial);
  mat.castShadow = true;

  return { mesh: mat };
}

function createMirror() {
  const mirrorGeometry = new THREE.BoxGeometry(0.1, 1.5, 1);
  const mirrorMaterial = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.9,
    roughness: 0.1
  });
  const mirror = new THREE.Mesh(mirrorGeometry, mirrorMaterial);
  mirror.castShadow = true;

  return { mesh: mirror };
}

function createPainting() {
  const group = new THREE.Group();

  // Frame
  const frameGeometry = new THREE.BoxGeometry(1.5, 1, 0.1);
  const frameMaterial = new THREE.MeshStandardMaterial({
    color: 0xdaa520,
    roughness: 0.3
  });
  const frame = new THREE.Mesh(frameGeometry, frameMaterial);
  frame.castShadow = true;
  group.add(frame);

  // Canvas
  const canvasGeometry = new THREE.BoxGeometry(1.3, 0.8, 0.05);
  const canvasMaterial = new THREE.MeshStandardMaterial({
    color: 0x4169e1,
    roughness: 0.7
  });
  const canvas = new THREE.Mesh(canvasGeometry, canvasMaterial);
  canvas.position.z = 0.075;
  group.add(canvas);

  return { mesh: group };
}

function createGuitar() {
  const group = new THREE.Group();

  // Body
  const bodyGeometry = new THREE.SphereGeometry(0.4, 16, 16);
  bodyGeometry.scale(1, 1.2, 0.3);
  const bodyMaterial = new THREE.MeshStandardMaterial({
    color: 0xcd853f,
    roughness: 0.4
  });
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  body.rotation.x = Math.PI / 2;
  body.position.y = 0.3;
  body.castShadow = true;
  group.add(body);

  // Neck
  const neckGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1, 8);
  const neckMaterial = new THREE.MeshStandardMaterial({
    color: 0x8b4513,
    roughness: 0.5
  });
  const neck = new THREE.Mesh(neckGeometry, neckMaterial);
  neck.position.set(0, 0.3, -0.7);
  neck.rotation.x = Math.PI / 2;
  neck.castShadow = true;
  group.add(neck);

  return { mesh: group };
}

function createCushion() {
  const cushionGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.2, 16);
  const cushionMaterial = new THREE.MeshStandardMaterial({
    color: 0x800080,
    roughness: 0.8
  });
  const cushion = new THREE.Mesh(cushionGeometry, cushionMaterial);
  cushion.position.y = 0.1;
  cushion.castShadow = true;

  return { mesh: cushion };
}
