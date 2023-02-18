import { Meta, Story } from '@storybook/html';
import { useScene } from './utils/scene';
import { AmbientLight, BoxGeometry, Mesh, MeshStandardMaterial, TextureLoader } from 'three';
import { Block, Block2 } from '../models/block';

type Args = unknown;

const meta: Meta<Args> = {
  title: 'Block/Cavalery',
  args: {

  },
  argTypes: {

  },
};


const Template: Story<Args> = (args) => {
  const { scene, camera, canvas } = useScene(document.querySelector('#root') as HTMLElement);

  camera.position.z = -10;
  camera.position.x = -3;
  camera.position.y = 4;

  const cavalery = new Block(new TextureLoader().load('/tokens-v2/SSPC.png'));

  scene.add(cavalery);

  return canvas;
};

export const Default = Template.bind({});
Default.args = {};

export default meta;
