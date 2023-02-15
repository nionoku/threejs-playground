import { Meta, Story } from '@storybook/html';
import { useScene } from './utils/scene';
import { HexagonalFlat, HexagonalFlatWireframe } from '../models/hexagonal';

type Args = {
  wireframe: boolean,
};

const meta: Meta<Args> = {
  title: 'Primitive/Hexagonal flat',
  args: {
    wireframe: false,
  },
  argTypes: {
  },
};


const Template: Story<Args> = (args) => {
  const { scene, camera, canvas } = useScene(document.querySelector('#root') as HTMLElement);

  camera.position.z = 10;
  camera.position.x = 0;
  camera.position.y = 0;

  const hexagonal = args.wireframe 
    ? new HexagonalFlatWireframe()
    : new HexagonalFlat();

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
