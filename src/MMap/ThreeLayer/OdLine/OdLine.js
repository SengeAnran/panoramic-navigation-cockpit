import BaseLayer from '../BaseLayer';

import {
  Vector3,
  TubeBufferGeometry,
  BufferAttribute,
  Mesh,
  ShaderMaterial,
  DoubleSide,
  QuadraticBezierCurve3,
  BufferGeometry,
  NormalBlending,
  // Float32BufferAttribute,
} from 'three';
import odVert from './od.vert';
import odFrag from './od.frag';

export default class OdLine extends BaseLayer {
  constructor(options) {
    super();
    this.options = options;
  }

  addTo(parent) {
    this.parent = parent;
  }

  async render(data) {
    this.data = data;
    if (!this.parent) {
      return;
    }
    await this.parent.loaded.promise;
    this.renderScene();
  }

  renderScene() {
    this.remove(false);
    if (!this.data?.length) {
      return;
    }
    this.material = this.material || this.createMaterial();
    this.geometry = this.createGeometry(this.data, this.parent.map.transform.scale);
    this.mesh = new Mesh(this.geometry, this.material);
    this.parent.scene.add(this.mesh);
    this.parent.map.on('zoom', this.onZoom);
  }

  onZoom = () => {
    const scale = this.parent.map.transform.scale;
    const geometry = this.createGeometry(this.data, scale);
    this.mesh.geometry = geometry;
  };

  createGeometry(data, radius = 1) {
    const positions = [];
    const normals = [];
    const uvs = [];
    const delays = [];
    const indices = [];
    data.forEach((line) => {
      const [from, to] = line;
      // debugger;
      const start = new Vector3(...this.project(from));
      const end = new Vector3(...this.project(to));
      const center = new Vector3().addVectors(start, end).divideScalar(2);
      center.z = new Vector3().subVectors(start, end).length() / 2;
      const curve = new QuadraticBezierCurve3(start, center, end);
      const geometry = new TubeBufferGeometry(curve, 50, 1.5e-3 / radius, 6, false);
      const count = geometry.attributes.position.count;
      const delay = Math.random();
      for (let i = 0; i < count; i++) {
        delays.push(delay);
      }
      const length = positions.length / 3;
      positions.push(...geometry.attributes.position.array);
      normals.push(...geometry.attributes.normal.array);
      uvs.push(...geometry.attributes.uv.array);
      indices.push(...Array.from(geometry.index.array).map((i) => i + length));
    });
    const geometry = new BufferGeometry();
    geometry.setIndex(new BufferAttribute(new Uint32Array(indices), 1));
    geometry.setAttribute('position', new BufferAttribute(new Float32Array(positions), 3));
    geometry.setAttribute('normal', new BufferAttribute(new Float32Array(normals), 3));
    geometry.setAttribute('uv', new BufferAttribute(new Float32Array(uvs), 2));
    geometry.setAttribute('delay', new BufferAttribute(new Float32Array(delays), 1));
    geometry.computeBoundingBox();
    geometry.computeVertexNormals();
    return geometry;
  }

  createMaterial() {
    return new ShaderMaterial({
      uniforms: {
        uColor: {
          value: new Vector3(70 / 255, 233 / 255, 254 / 255),
        },
        uTrailLength: {
          value: 1,
        },
        uTimeCounter: {
          value: 0,
        },
      },
      vertexShader: odVert,
      fragmentShader: odFrag,
      side: DoubleSide,
      blending: NormalBlending,
      depthTest: false,
      depthWrite: false,
      transparent: true,
    });
  }

  tick(t) {
    if (this.material) {
      this.material.uniforms.uTimeCounter.value = t * 1e-3;
    }
  }

  remove(force = true) {
    // console.log('remove', force);
    if (this.mesh) {
      this.mesh.geometry.dispose();
      this.geometry = null;
      if (force) {
        this.mesh.material.dispose();
        this.material = null;
      }
      this.parent?.scene.remove(this.mesh);
      this.parent?.map.off('zoom', this.onZoom);
      this.mesh = null;
    }
  }
}
