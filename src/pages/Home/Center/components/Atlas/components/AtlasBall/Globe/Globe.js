import {
  WebGLRenderer,
  PerspectiveCamera,
  Color,
  Scene,
  PointLight,
  DirectionalLight,
  HemisphereLight,
  AmbientLight,
  AxesHelper,
  // Mesh,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
export default class Globe {
  constructor(container) {
    this.container = container;
    this.layers = [];
    this.initThree();
    this.addLight();
    this.addAxes();
    this.addModel();
    this.render();
    this.addEvent();
  }

  initThree() {
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    this.camera = new PerspectiveCamera(20, width / height, 1, 2000);
    this.camera.position.set(0, 0, 300);
    this.scene = new Scene();
    this.camera.lookAt(this.scene.position);
    this.renderer = new WebGLRenderer({
      antialias: true,
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(new Color(0x0));
    this.renderer.setClearAlpha(0);
    this.container.appendChild(this.renderer.domElement);
    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.minDistance = 1.5;
    controls.maxDistance = 1000;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.2;
    controls.enableDamping = true;
    this.orbitControls = controls;
  }

  addModel() {
    const scene = this.scene;
    const loader = new GLTFLoader();
    loader.load('/model/tupu/tupuqiu5.gltf', (gltf) => {
      gltf.scene.scale.set(20, 20, 20);
      scene.add(gltf.scene);
    });
  }

  addLight() {
    let light = new DirectionalLight(0xffffff, 1);
    light.position.set(40, 20, 30);
    this.scene.add(light);
    light = new DirectionalLight(0xffffff, 0.1);
    light.position.set(-40, -20, -30);
    this.scene.add(light);
    light = new AmbientLight(0xffffff, 0.1);
    this.scene.add(light);
    light = new PointLight(0xffffff, 1);
    this.scene.add(light);
    light = new HemisphereLight(0xffffff, 0x666666);
    light.position.set(0, 1, 0);
    this.scene.add(light);
  }

  addAxes() {
    const axesHelper = new AxesHelper(50);
    this.scene.add(axesHelper);
  }

  resize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  };

  add(layer) {
    if (!layer) {
      return;
    }
    layer.addTo(this);
    this.layers.push(layer);
  }

  remove(layer) {
    if (!layer) {
      return;
    }
    const index = this.layers.indexOf(layer);
    if (index > -1) {
      const layer = this.layers[index];
      layer.remove?.();
      this.layers.splice(index, 1);
    }
  }

  render = (t) => {
    this.layers.forEach((layer) => layer.tick?.(t));
    this.orbitControls?.update();
    this.renderer.render(this.scene, this.camera);
    this.animateID = requestAnimationFrame(this.render);
  };

  addEvent() {
    window.addEventListener('resize', this.resize);
  }

  destroy() {
    window.removeEventListener('resize', this.resize);
    while (this.layers.length) {
      this.remove(this.layers[0]);
    }
    this.scene.traverse((child) => {
      if (child.material) {
        child.material.dispose();
      }
      if (child.geometry) {
        child.geometry.dispose();
      }
    });
    cancelAnimationFrame(this.animateID);
    this.scene.clear();
    this.renderer.dispose();
    this.orbitControls.dispose();
    this.orbitControls = null;
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.container = null;
  }
}
