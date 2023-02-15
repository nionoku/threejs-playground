import { Meta, Story } from '@storybook/html';
import { HexagonalFlat, HexagonalFlatWireframe } from '../models/hexagonal';
import { Hexagrid, HexagridFlat } from '../models/hexagrid';
import { useScene } from './utils/scene';

type Args = {
  columns: number,
  rows: number,
  wireframe: boolean
};

const meta: Meta<Args> = {
  title: 'Grid/Hexagonal grid flat',
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

  camera.position.z = 20;

  const hexagonal = args.wireframe 
    ? new HexagonalFlatWireframe() 
    : new HexagonalFlat();
  const grid = new HexagridFlat(args.columns, args.rows, hexagonal);

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
