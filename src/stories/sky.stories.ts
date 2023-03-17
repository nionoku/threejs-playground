import { Meta, Story } from '@storybook/html';
import { useScene } from './utils/scene';
import { Sky } from 'three/examples/jsm/objects/Sky';
import { ACESFilmicToneMapping, MathUtils, Vector3 } from 'three';

type Args = {
  turbidity: number
  rayleigh: number
  exposure: number
  elevation: number
  azimuth: number
};

const meta: Meta<Args> = {
  title: 'Skybox/Sky',
  args: {
    turbidity: 10,
    rayleigh: 3,
    exposure: 0.5,
    elevation: 0,
    azimuth: 0,
  },
  argTypes: {
    turbidity: {
      control: {
        type: 'range',
        min: 0,
        max: 50,
        step: 0.01,
      },
    },
    rayleigh: {
      control: {
        type: 'range',
        min: 0,
        max: 10,
        step: 0.01,
      },
    },
    exposure: {
      control: {
        type: 'range',
        min: 0,
        max: 5,
        step: 0.01,
      },
    },
    elevation: {
      control: {
        type: 'range',
        min: -180,
        max: 180,
        step: 0.1,
      },
    },
    azimuth: {
      control: {
        type: 'range',
        min: -180,
        max: 180,
        step: 0.1,
      },
    },
  },
};


const Template: Story<Args> = (args) => {
  const { scene, camera, canvas, renderer } = useScene(document.querySelector('#root') as HTMLElement);

  camera.position.set(0, 0, 0.1);

  const sky = new Sky();
  const sun = new Vector3();
  
  const uniforms = sky.material.uniforms;
  uniforms.turbidity.value = args.turbidity;
  uniforms.rayleigh.value = args.rayleigh;
  uniforms.mieCoefficient.value = 0.005;
  uniforms.mieDirectionalG.value = 0.07;

  const phi = MathUtils.degToRad(args.elevation);
  const theta = MathUtils.degToRad(args.azimuth);

  sun.setFromSphericalCoords( 1, phi, theta );

  uniforms.sunPosition.value.copy( sun );

  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = args.exposure;

  scene.add(sky);

  return canvas;
};

export const Default = Template.bind({});
Default.args = {};

export default meta;
