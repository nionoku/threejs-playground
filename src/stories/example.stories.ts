import { Meta, Story } from '@storybook/html';
import { useScene } from './utils/scene';
import { AmbientLight, BoxGeometry, Mesh, MeshStandardMaterial } from 'three';

type Args = unknown;

const meta: Meta<Args> = {
  title: 'Example/Cube',
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

  const materials = [
    new MeshStandardMaterial({ color: '#14a085' }),
    new MeshStandardMaterial({ color: '#14a085' }),
    new MeshStandardMaterial({ color: '#84929e' }),
    new MeshStandardMaterial({ color: '#84929e' }),
    new MeshStandardMaterial({ color: '#76448a' }),
    new MeshStandardMaterial({ color: '#76448a' }),
  ];
  const geometry = new BoxGeometry();
  const mesh = new Mesh(geometry, materials);

  const light = new AmbientLight('white', 1);

  scene.add(mesh, light);

  return canvas;
};

export const Default = Template.bind({});
Default.args = {};

export default meta;
