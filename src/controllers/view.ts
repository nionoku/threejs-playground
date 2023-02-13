import { LoadingManager } from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { CameraController } from './camera';
import { RaycasterController } from './raycaster';
import { SceneController } from './scene';
import Tween from '@tweenjs/tween.js';
import { RendererController } from './renderer';

export class ViewController {
  private readonly scene = new SceneController();
  private readonly camera = new CameraController();
  private readonly renderer = new RendererController();
  private readonly composer = new EffectComposer(this.renderer);
  private readonly renderPass = new RenderPass(this.scene, this.camera);
  private readonly raycaster = new RaycasterController();
  private readonly loadingManager = new LoadingManager();

  async make(): Promise<this> {
    return this;
  }

  startRendering() {
    const animate: XRFrameRequestCallback = (time: number) => {
      this.composer.render();
      Tween.update(time);
    };
    
    // dom
    document.body.append(this.renderer.domElement);
    // start rendering
    this.renderer.setAnimationLoop(animate);
  }
}