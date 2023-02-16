import { Hexagonal, HexagonalFlat } from './hexagonal';
import { Box3, Event, Group, Mesh, Object3D } from 'three';

/** By default created pointy orientation */
export class Hexagrid extends Group {
  constructor(columns: number, rows: number, height = 1, tile: Object3D = new Hexagonal()) {
    super();

    const bbox = new Box3().setFromObject(tile);

    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < columns; i++) {
        const item = tile.clone();
        item.position.x = bbox.max.x * 2 * i + bbox.max.x * (j & 1);
        item.position.z = bbox.max.z * 2 * (3 / 4) * j;

        this.add(item);
      }
    }

    this.scale.y = height;

    // centring
    new Box3()
      .setFromObject(this)
      .getCenter(this.position)
      .multiplyScalar(-1);
  }
}

/** By default created pointy orientation */
export class HexagridFlat extends Group {
  declare children: Mesh[];
  
  constructor(columns: number, rows: number, tile: Object3D = new HexagonalFlat()) {
    super();

    const bbox = new Box3().setFromObject(tile);

    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < columns; i++) {
        const item = tile.clone();
        item.position.x = bbox.max.x * 2 * (3 / 4) * i;
        item.position.y = bbox.max.y * 2 * j + bbox.max.y * (i & 1);

        this.add(item);
      }
    }

    // centring
    new Box3()
      .setFromObject(this)
      .getCenter(this.position)
      .multiplyScalar(-1);
  }
}