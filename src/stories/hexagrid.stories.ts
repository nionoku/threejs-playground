import { Meta, Story } from '@storybook/html';
import { Hexagonal, HexagonalWireframe } from '../models/hexagonal';
import { Hexagrid } from '../models/hexagrid';
import { useScene } from './utils/scene';

type Args = {
  columns: number,
  rows: number,
  wireframe: boolean
};

const meta: Meta<Args> = {
  title: 'Grid/Hexagonal grid',
  args: {
    columns: 5,
    rows: 3,
    wireframe: false,
  },
  argTypes: {
  },
};


const Template: Story<Args> = (args) => {
  const { scene, camera, canvas } = useScene(document.querySelector('#root') as HTMLElement);

  camera.position.z = 0;
  camera.position.x = 0;
  camera.position.y = 20;

  const hexagonal = args.wireframe 
    ? new HexagonalWireframe() 
    : new Hexagonal();
  const grid = new Hexagrid(args.columns, args.rows, 0.4, hexagonal);

  scene.add(grid);

  return canvas;
};

export const Default = Template.bind({});
Default.args = {};

export const Wireframe = Template.bind({});
Wireframe.args = {
  wireframe: true,
};

export default meta;
