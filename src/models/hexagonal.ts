import { CylinderGeometry, EdgesGeometry, LineBasicMaterial, LineSegments, Mesh, MeshBasicMaterial } from 'three';

export class Hexagonal extends Mesh {
  constructor() {
    super(
      new CylinderGeometry(1, 1, 1, 6, 1),
      new MeshBasicMaterial(),
    );
  }
}

export class HexagonalWireframe extends LineSegments {
  constructor() {
    super(
      new EdgesGeometry(new Hexagonal().geometry),
      new LineBasicMaterial(),
    );
  }
}