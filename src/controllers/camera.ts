import { PerspectiveCamera } from 'three';

export class CameraController extends PerspectiveCamera {
  constructor() {
    super(50, window.innerWidth / window.innerHeight, 0.1, 1000);
  }
}