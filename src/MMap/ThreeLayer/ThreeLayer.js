import mapboxgl from 'mapbox-gl';
import {
  AmbientLight, // a
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  Color,
  Matrix4,
  Vector3,
} from 'three';
import { uid } from '@/utils/string';
import { merge } from '@/utils/object';
import { defer } from '@/utils/promise';

const defaultOptions = {
  ambientLightColor: '#fff',
  ambientLightIntensity: 1,
};

export default class ThreeLayer {
  type = 'custom';
  layers = [];
  createAt = Date.now();
  renderingMode = '3d';
  colorIndex = 1;

  constructor(map, options) {
    this.options = merge(defaultOptions, options);
    this.id = 'three-layer' + uid();
    this.loaded = defer();
  }

  onAdd(map, gl) {
    this.map = map;
    this.gl = gl;
    this.center = map.getCenter();
    const centerCoord = (this.centerCoord = mapboxgl.MercatorCoordinate.fromLngLat(this.center));
    this.centerMatrix = new Matrix4()
      .makeTranslation(centerCoord.x, centerCoord.y, centerCoord.z)
      .scale(new Vector3(1, -1, 1));
    this.initLayer(map);
    this.loaded.resolve();
  }

  initLayer() {
    this.camera = new PerspectiveCamera();
    this.scene = new Scene();

    this.renderer = new WebGLRenderer({
      canvas: this.map.getCanvas(),
      context: this.gl,
      antialias: true,
    });
    this.renderer.autoClear = false;
    const { ambientLightColor, ambientLightIntensity } = this.options;
    this.ambientLight = new AmbientLight(new Color(ambientLightColor), ambientLightIntensity);
    this.scene.add(this.ambientLight);
  }

  render(gl, matrix) {
    this.camera.projectionMatrix = new Matrix4().fromArray(matrix).multiply(this.centerMatrix);
    this.renderer.resetState();
    this.layers.forEach((layer) => layer.tick?.(Date.now() - this.createAt));
    this.renderer.render(this.scene, this.camera);
    this.map.triggerRepaint();
  }

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

  onRemove() {
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
    this.scene.clear();
    this.renderer.dispose();
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.map = null;
    this.gl = null;
  }
}
