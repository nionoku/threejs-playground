import { Meta, Story } from '@storybook/html';
import { Box3, Color, Group, LineBasicMaterial, Mesh, MeshBasicMaterial, PlaneGeometry, Texture, TextureLoader } from 'three';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial';
import { RaycasterController } from '../controllers/raycaster';
import { HexagonalFlat, HexagonalFlatWireframe, HexagonalFlatWireframe2 } from '../models/hexagonal';
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
  const { scene, camera, canvas, controls } = useScene(document.querySelector('#root') as HTMLElement);
  camera.position.y = 15;
  camera.position.z = 40;

  const grid = new HexagridFlat(args.columns, args.rows, new HexagonalFlatWireframe());
  grid.children.forEach(it => (it.material as LineMaterial).setValues({ transparent: true, opacity: 0 }));
  grid.position.z = 0.002;
  const gridInvisible = new HexagridFlat(args.columns, args.rows, new HexagonalFlat());
  gridInvisible.visible = false;
  const bbox = new Box3().setFromObject(grid);

  const planeTexture = new TextureLoader().load('./board.png');
  const plane = new Mesh(
    new PlaneGeometry(bbox.max.x * 2.093, bbox.max.y * 2.077),
    new MeshBasicMaterial({ map: planeTexture }),
  );
  const raycaster = new RaycasterController();

  canvas.addEventListener('mousedown', (event) => {
    const hasTarget = raycaster.intersects(gridInvisible.children, camera, event, canvas).length > 0;

    if (hasTarget) {
      controls.enabled = false;
    }
  });

  canvas.addEventListener('mouseup', () => {
    controls.enabled = true;
  });
  
  canvas.addEventListener('click', (event) => {
    grid.children.forEach(it => (it.material as LineMaterial).setValues({ opacity: 0 }));

    const [{ object }] = raycaster.intersects(gridInvisible.children, camera, event, canvas);
    const indexOfObject = gridInvisible.children.indexOf(object as Mesh);
    grid.children[indexOfObject].material = (grid.children[indexOfObject].material as LineMaterial).clone();
    (grid.children[indexOfObject].material as LineMaterial).setValues({ opacity: 1 });
  });

  const group = new Group();
  group.add(grid, gridInvisible, plane);
  group.rotation.x = -Math.PI / 2;

  scene.add(group);

  return canvas;
};

export const Default = Template.bind({});
Default.args = {};

export default meta;
