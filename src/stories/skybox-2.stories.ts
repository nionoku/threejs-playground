import { Meta, Story } from '@storybook/html';
import { useScene } from './utils/scene';
import { AmbientLight, BoxGeometry, CubeReflectionMapping, CubeRefractionMapping, EquirectangularReflectionMapping, EquirectangularRefractionMapping, Mesh, MeshStandardMaterial, TextureLoader } from 'three';

type Args = unknown;

const meta: Meta<Args> = {
  title: 'Skybox/Anime',
  args: {

  },
  argTypes: {

  },
};


const Template: Story<Args> = (args) => {
  const { scene, camera, canvas } = useScene(document.querySelector('#root') as HTMLElement);

  const texture = new TextureLoader().load('/skybox/anime/2.webp');
  texture.mapping = EquirectangularRefractionMapping;

  scene.background = texture;

  return canvas;
};

export const Default = Template.bind({});
Default.args = {};

export default meta;
