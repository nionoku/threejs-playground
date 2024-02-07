import { Meta, Story } from '@storybook/html';
import { useScene } from './utils/scene';
import { AmbientLight, BoxGeometry, BufferAttribute, BufferGeometry, Mesh, MeshNormalMaterial, PointLight, Vec2, Vector3 } from 'three';

import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils';

// https://tympanus.net/codrops/2023/01/25/crafting-a-dice-roller-with-three-js-and-cannon-es/

type Args = {
  wireframe: boolean,
  segments: number,
  edgeRadius: number,
  notchRadius: number,
  notchDepth: number
  notchOffset: number
};

const meta: Meta<Args> = {
  title: 'Primitive/Dice 6',
  args: {
    wireframe: false,
    segments: 50,
    edgeRadius: 0.07,
    notchRadius: 0.1,
    notchDepth: 0.12,
    notchOffset: 0.28,
  },
  argTypes: {
    segments: {
      control: {
        type: 'range',
        min: 1,
        max: 200,
        step: 10,
      },
    },
    edgeRadius: {
      control: {
        type: 'range',
        min: 0.01,
        max: 1,
        step: 0.01,
      },
    },
    notchRadius: {
      control: {
        type: 'range',
        min: 0.01,
        max: 1,
        step: 0.01,
      },
    },
    notchDepth: {
      control: {
        type: 'range',
        min: 0.01,
        max: 3,
        step: 0.01,
      },
    },
    notchOffset: {
      control: {
        type: 'range',
        min: 0.1,
        max: 1,
        step: 0.01,
      },
    },
  },
};

const boxGeometry = ({ segments, edgeRadius, notchRadius, notchDepth, notchOffset }: Args): BufferGeometry => {
  const notchWave = (v: number) => {
    v = (1 / notchRadius) * v;
    v = Math.PI * Math.max(-1, Math.min(1, v));
    return notchDepth * (Math.cos(v) + 1);
  };
  const notch = (vec: Vec2) => notchWave(vec.x) * notchWave(vec.y);
  
  let geometry: BufferGeometry = new BoxGeometry(1, 1, 1, segments, segments, segments);
  const positionAttribute = geometry.attributes.position as BufferAttribute;

  // original cube side from -0.5 to 0.5
  const innerCubeHalfSide = 0.5 - edgeRadius;

  for (let i = 0; i < positionAttribute.count; i++) {
    let position = new Vector3().fromBufferAttribute(positionAttribute, i);

    // vector from center cube to vertex of inner cube
    const subCubeVector = new Vector3(Math.sign(position.x), Math.sign(position.y), Math.sign(position.z)).multiplyScalar(innerCubeHalfSide);
    // vector from nearest vertex to center to side
    const additionalVector = new Vector3().subVectors(position, subCubeVector);

    if (position.toArray().every(it => Math.abs(it) > innerCubeHalfSide)) {
      // is close to box vertex

      additionalVector
        // normalize for getting sphere with radius 1
        .normalize()
        // multiply for edge radius for scale down
        .multiplyScalar(edgeRadius);

      // add vectors for create new vector from end subCubeVector to end additionalVector
      position = subCubeVector.add(additionalVector);
    } else if ([position.y, position.z].every(it => Math.abs(it) > innerCubeHalfSide)) {
      // is close edge parallel to X axis

      // similarly with vertex, but set X is 0
      additionalVector.x = 0;
      additionalVector
        // normalize for getting sphere with radius 1
        .normalize()
        // multiply for edge radius for scale down
        .multiplyScalar(edgeRadius);
      position.y = subCubeVector.y + additionalVector.y;
      position.z = subCubeVector.z + additionalVector.z;
    } else if ([position.x, position.z].every(it => Math.abs(it) > innerCubeHalfSide)) {
      // is close edge parallel to Y axis

      // similarly with vertex, but set Y is 0
      additionalVector.y = 0;
      additionalVector
        // normalize for getting sphere with radius 1
        .normalize()
        // multiply for edge radius for scale down
        .multiplyScalar(edgeRadius);
      
      position.x = subCubeVector.x + additionalVector.x;
      position.z = subCubeVector.z + additionalVector.z;
    } else if ([position.x, position.y].every(it => Math.abs(it) > innerCubeHalfSide)) {
      // is close edge parallel to Z axis

      // similarly with vertex, but set Z is 0
      additionalVector.z = 0;
      additionalVector
        // normalize for getting sphere with radius 1
        .normalize()
        // multiply for edge radius for scale down
        .multiplyScalar(edgeRadius);
      position.x = subCubeVector.x + additionalVector.x;
      position.y = subCubeVector.y + additionalVector.y;
    } 

    // notch
    if (position.y === 0.5) {
      // side with 1 dot
      position.y = position.y - notch({ x: position.x, y: position.z });
    } else if (position.x === 0.5) {
      // side with 2 dots
      position.x = position.x - notch({ x: position.y + notchOffset, y: position.z + notchOffset });
      position.x = position.x - notch({ x: position.y - notchOffset, y: position.z - notchOffset });
    } else if (position.z === 0.5) {
      // side with 3 dots
      position.z = position.z - notch({ x: position.x + notchOffset, y: position.y + notchOffset });
      position.z = position.z - notch({ x: position.x, y: position.y });
      position.z = position.z - notch({ x: position.x - notchOffset, y: position.y - notchOffset });
    } else if (position.y === -0.5) {
      // side with 4 dots
      position.y = position.y + notch({ x: position.x + notchOffset, y: position.z - notchOffset });
      position.y = position.y + notch({ x: position.x - notchOffset, y: position.z + notchOffset });
      position.y = position.y + notch({ x: position.x - notchOffset, y: position.z - notchOffset });
      position.y = position.y + notch({ x: position.x + notchOffset, y: position.z + notchOffset });
    } else if (position.x === -0.5) {
      // side with 5 dots
      position.x = position.x + notch({ x: position.y + notchOffset, y: position.z + notchOffset });
      position.x = position.x + notch({ x: position.y + notchOffset, y: position.z - notchOffset });
      position.x = position.x + notch({ x: position.y, y: position.z });
      position.x = position.x + notch({ x: position.y - notchOffset, y: position.z + notchOffset });
      position.x = position.x + notch({ x: position.y - notchOffset, y: position.z - notchOffset });
    } else if (position.z === -0.5) {
      // side with 6 dots
      position.z = position.z + notch({ x: position.x + notchOffset, y: position.y + notchOffset });
      position.z = position.z + notch({ x: position.x + notchOffset, y: position.y - notchOffset });
      position.z = position.z + notch({ x: position.x, y: position.y + notchOffset });
      position.z = position.z + notch({ x: position.x, y: position.y - notchOffset });
      position.z = position.z + notch({ x: position.x - notchOffset, y: position.y + notchOffset });
      position.z = position.z + notch({ x: position.x - notchOffset, y: position.y - notchOffset });
    }

    positionAttribute.setXYZ(i, position.x, position.y, position.z);
  }

  // next code for "rounding" axises. It remove all duplicated vectors
  // but it need remove if you use textures
  geometry.deleteAttribute('normal');
  geometry.deleteAttribute('uv');
  geometry = BufferGeometryUtils.mergeVertices(geometry);
  geometry.computeVertexNormals();

  return geometry;
};


const Template: Story<Args> = (args) => {
  const { scene, camera, canvas } = useScene(document.querySelector('#root') as HTMLElement);

  camera.position.z = -1.8;
  camera.position.x = -2.6;
  camera.position.y = 2;

  const material = new MeshNormalMaterial({
    wireframe: args.wireframe,
  });
  const geometry = boxGeometry(args);
  const mesh = new Mesh(geometry, material);

  const ambientLight = new AmbientLight(0xffffff, .5);
  const topLight = new PointLight(0xffffff, .5);
  topLight.position.set(10, 15, 0);
  topLight.castShadow = true;
  topLight.shadow.mapSize.width = 2048;
  topLight.shadow.mapSize.height = 2048;
  topLight.shadow.camera.near = 5;
  topLight.shadow.camera.far = 400;

  scene.add(mesh, ambientLight, topLight);

  return canvas;
};

export const Default = Template.bind({});
Default.args = {};

export default meta;
