import { Meta, Story } from '@storybook/html';
import { useScene } from './utils/scene';
import { AmbientLight, BoxGeometry, CineonToneMapping, CircleGeometry, Color, DirectionalLight, Mesh, MeshStandardMaterial, MeshToonMaterial, PCFSoftShadowMap, ShaderMaterial, SphereGeometry, sRGBEncoding, TorusKnotGeometry, UniformsLib } from 'three';

type Args = unknown;

const meta: Meta<Args> = {
  title: 'Shader/Toon Material (Zelda like shader)',
  args: {

  },
  argTypes: {

  },
};


const Template: Story<Args> = (args) => {
  const { scene, camera, canvas, renderer } = useScene(document.querySelector('#root') as HTMLElement);

  renderer.outputEncoding = sRGBEncoding;
  renderer.toneMapping = CineonToneMapping;
  renderer.toneMappingExposure = 1.75;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFSoftShadowMap;
  renderer.physicallyCorrectLights = true;

  camera.position.z = 7;

  const geometry = new TorusKnotGeometry();
  const material = new ShaderMaterial({
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vViewDir;

      void main() {
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);
        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 clipPosition = projectionMatrix * viewPosition;
        
        vNormal = normalize(normalMatrix * normal);
        vViewDir = normalize(-viewPosition.xyz);

        gl_Position = clipPosition;
      }
    `,
    fragmentShader: `
      #include <common>
      #include <lights_pars_begin>
      
      uniform vec3 uColor;
      uniform float uGlossiness;
      
      varying vec3 vViewDir;
      varying vec3 vNormal;

      void main() {
        float NdotL = dot(vNormal, directionalLights[0].direction);
        float lightIntensity = smoothstep(0.0, 0.01, NdotL);
        vec3 directionalLight = directionalLights[0].color * lightIntensity;

        vec3 halfLight = normalize(directionalLights[0].direction + vViewDir);
        float NdotH = dot(vNormal, halfLight);
        float specularIntensity = pow(NdotH * lightIntensity, 1000.0 / uGlossiness);
        float specularIntensitySmooth = smoothstep(0.05, 0.1, specularIntensity);

        vec3 specular = specularIntensitySmooth * directionalLights[0].color;

        float rimDot = 1.0 - dot(vViewDir, vNormal);
        float rimAmount = 0.8;

        float rimThreshold = 0.5;
        float rimIntensity = rimDot * pow(NdotL, rimThreshold);
        rimIntensity = smoothstep(rimAmount - 0.01, rimAmount + 0.01, rimIntensity);

        vec3 rim = rimIntensity * directionalLights[0].color;

        gl_FragColor = vec4(uColor * (directionalLight + ambientLightColor + specular + rim), 1.0);
      }
    `,
    uniforms: {
      ...UniformsLib.lights,
      uColor: {
        value: new Color('#6495ED'),
      },
      uGlossiness: {
        value: 4,
      },
    },
    lights: true,
  });
  const mesh = new Mesh(geometry, material);
  
  const directionalLight = new DirectionalLight(new Color('#f8f1e6'), 0.5);
  directionalLight.position.set(5, 4, 0);
  const ambientLight = new AmbientLight('#ffffff', 1);

  scene.add(mesh, directionalLight, ambientLight);

  return canvas;
};

export const Default = Template.bind({});
Default.args = {};

export default meta;
