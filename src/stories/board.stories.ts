import { Meta, Story } from '@storybook/html';
import { Box3, LineBasicMaterial, Mesh, MeshBasicMaterial, PlaneGeometry, Texture, TextureLoader } from 'three';
import { RaycasterController } from '../controllers/raycaster';
import { HexagonalFlat, HexagonalFlatWireframe } from '../models/hexagonal';
import { HexagridFlat } from '../models/hexagrid';
import { useScene } from './utils/scene';

type Args = {
  columns: number,
  rows: number,
};

const meta: Meta<Args> = {
  title: 'Game/c&c map',
  args: {
    columns: 12,
    rows: 11,
  },
  argTypes: {
  },
};

const Template: Story<Args> = (args) => {
  const { scene, camera, canvas } = useScene(document.querySelector('#root') as HTMLElement);
  camera.position.z = 55;

  const grid = new HexagridFlat(args.columns, args.rows, new HexagonalFlatWireframe());
  const gridInvisible = new HexagridFlat(args.columns, args.rows, new HexagonalFlat());
  gridInvisible.visible = false;
  const bbox = new Box3().setFromObject(grid);

  const planeTexture = new TextureLoader().load('./board.png');
  const plane = new Mesh(
    new PlaneGeometry(bbox.max.x * 2.093, bbox.max.y * 2.077),
    new MeshBasicMaterial({ map: planeTexture }),
  );
  const raycaster = new RaycasterController();
  
  canvas.addEventListener('click', (event) => {
    grid.children.map(it => (it.material as LineBasicMaterial).setValues({ color: 'cadetblue' }));
    const [{ object }] = raycaster.intersects(gridInvisible.children, camera, event, canvas);
    const indexOfObject = gridInvisible.children.indexOf(object as Mesh);
    grid.children[indexOfObject].material = new LineBasicMaterial({ color: 'red' });
  });

  grid.position.z += 0.001;
  scene.add(grid, gridInvisible, plane);

  return canvas;
};

export const Default = Template.bind({});
Default.args = {};

export default meta;
