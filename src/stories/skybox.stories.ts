import { Meta, Story } from '@storybook/html';
import { useScene } from './utils/scene';
import { CubeRefractionMapping, CubeTextureLoader, EquirectangularReflectionMapping, EquirectangularRefractionMapping, sRGBEncoding } from 'three';

type Args = unknown;

const meta: Meta<Args> = {
  title: 'Skybox/Some backgrounds',
  args: {

  },
  argTypes: {

  },
};


const Template: Story<Args> = (args) => {
  const { scene, camera, canvas, renderer } = useScene(document.querySelector('#root') as HTMLElement);

  new CubeTextureLoader().load([
    // '/cube/day/6.png',
    // '/cube/day/2.png',
    // '/cube/day/4.png',
    // '/cube/day/3.png',
    // '/cube/day/1.png',
    // '/cube/day/5.png',
    // '/cube/4.png',
    // '/cube/2.png',
    // '/cube/1.png',
    // '/cube/6.png',
    // '/cube/3.png',
    // '/cube/5.png',
    '/water-2/4.png',
    '/water-2/2.png',
    '/water-2/1.png',
    '/water-2/6.png',
    '/water-2/3.png',
    '/water-2/5.png',
  ], (texture) => {
    texture.encoding = sRGBEncoding;
    // texture.mapping = EquirectangularRefractionMapping;
    scene.background = texture;
  });

  return canvas;
};

export const Default = Template.bind({});
Default.args = {};

export default meta;
