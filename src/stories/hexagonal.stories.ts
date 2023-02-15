import { Meta, Story } from '@storybook/html';
import { useScene } from './utils/scene';
import { Hexagonal, HexagonalWireframe } from '../models/hexagonal';

type Args = {
  wireframe: boolean,
};

const meta: Meta<Args> = {
  title: 'Primitive/Hexagonal',
  args: {
    wireframe: false,
  },
  argTypes: {
  },
};


const Template: Story<Args> = (args) => {
  const { scene, camera, canvas } = useScene(document.querySelector('#root') as HTMLElement);

  camera.position.z = 0;
  camera.position.x = 0;
  camera.position.y = 10;

  const hexagonal = args.wireframe 
    ? new HexagonalWireframe()
    : new Hexagonal();

  scene.add(hexagonal);

  return canvas;
};

export const Default = Template.bind({});
Default.args = {};

export const Wireframe = Template.bind({});
Wireframe.args = {
  wireframe: true,
};

export default meta;
