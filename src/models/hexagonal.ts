import { CircleGeometry, CylinderGeometry, EdgesGeometry, LineBasicMaterial, LineSegments, Mesh, MeshBasicMaterial } from 'three';

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

export class HexagonalFlat extends Mesh {
  constructor() {
    super(
      new CircleGeometry(1, 6),
      new MeshBasicMaterial(),
    );
  }
}

export class HexagonalFlatWireframe extends LineSegments {
  constructor() {
    super(
      new EdgesGeometry(new HexagonalFlat().geometry),
      new LineBasicMaterial(),
    );
  }
}