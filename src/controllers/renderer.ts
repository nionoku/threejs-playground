import { WebGLRenderer } from 'three';

export class RendererController extends WebGLRenderer {
  constructor() {
    super({
      antialias: true,
    });

    this.domElement.id = 'scene';
    this.setSize(window.innerWidth, window.innerHeight);
    this.setPixelRatio(window.devicePixelRatio);
  }
}