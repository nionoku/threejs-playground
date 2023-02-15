import { Meta, Story } from '@storybook/html';
import { HexagridWireframe, Hexagrid } from '../models/hexagrid';
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

  const grid = args.wireframe 
    ? new HexagridWireframe(args.columns, args.rows)
    : new Hexagrid(args.columns, args.rows);

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
