import { update } from '@tweenjs/tween.js';
import { Color, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';

export function useScene(root: HTMLElement): {
  canvas: HTMLCanvasElement,
  scene: Scene,
  camera: PerspectiveCamera,
  controls: OrbitControls
} {
  const renderer = new WebGLRenderer({
    antialias: true,
  });
  
  renderer.setSize(root.clientWidth, root.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  const scene = new Scene();
  const camera = new PerspectiveCamera(20, renderer.domElement.width / renderer.domElement.height, 0.1, 1000);
  const controls = new OrbitControls(camera, renderer.domElement);
  const composer = new EffectComposer(renderer);
  const renderPass = new RenderPass(scene, camera);

  // scene
  scene.background = new Color('#E0E0E0');

  // camera
  camera.position.z = 2.5;
  camera.lookAt(0, 0, 0);

  // composer
  composer.addPass(renderPass);

  const animate: XRFrameRequestCallback = (time: number) => {
    composer.render();
    controls.update();
    update(time);
  };

  renderer.setAnimationLoop(animate);

  return {
    canvas: renderer.domElement,
    camera,
    scene,
    controls,
  };
}