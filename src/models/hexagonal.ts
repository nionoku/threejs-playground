import { CircleGeometry, Color, CylinderGeometry, EdgesGeometry, LineBasicMaterial, LineSegments, Mesh, MeshBasicMaterial } from 'three';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial';
import { LineSegments2 } from 'three/examples/jsm/lines/LineSegments2';
import { LineSegmentsGeometry } from 'three/examples/jsm/lines/LineSegmentsGeometry';

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
      new EdgesGeometry(new HexagonalFlat().geometry, 2),
      new LineBasicMaterial({ color: 'red' }),
    );
  }
}

export class HexagonalFlatWireframe2 extends LineSegments2 {
  constructor() {
    super(
      new LineSegmentsGeometry().fromEdgesGeometry(new EdgesGeometry(new HexagonalFlat().geometry, 2)),
      new LineMaterial({ color: new Color('red').getHex(), linewidth: 0.001 }),
    );
  }
}