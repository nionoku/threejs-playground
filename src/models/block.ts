import { BoxGeometry, Mesh, MeshBasicMaterial, Texture } from 'three';

export class Block extends Mesh {
  constructor(face: Texture) {
    super(
      new BoxGeometry(1, 1, 0.5),
      [
        new MeshBasicMaterial(),
        new MeshBasicMaterial(),
        new MeshBasicMaterial(),
        new MeshBasicMaterial(),
        new MeshBasicMaterial(),
        new MeshBasicMaterial({ map: face }),
      ],
    );
  }
}

export class Block2 extends Mesh {
  constructor(face: Texture) {
    super(
      new BoxGeometry(0.76, 1, 0.3),
      [
        new MeshBasicMaterial(),
        new MeshBasicMaterial(),
        new MeshBasicMaterial(),
        new MeshBasicMaterial(),
        new MeshBasicMaterial(),
        new MeshBasicMaterial({ map: face }),
      ],
    );
  }
}