import {
  Mesh,
  // Color,
  Vector4,
  BufferGeometry,
  DoubleSide,
  BufferAttribute,
  // TextureLoader,
  ShaderMaterial,
  // Shape,
  // Vector2,
  // ShapeGeometry,
  // MeshPhongMaterial,
  // AdditiveBlending,
  // test
} from 'three';
import { flattenEach, getCoords, area } from '@turf/turf';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import BaseLayer from '../BaseLayer';
import wallVert from './wall.vert';
import wallFrag from './wall.frag';

export default class Wall extends BaseLayer {
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
    if (!this.data) {
      return;
    }
    this.material = this.material || this.createMaterial();
    this.geometry = this.createGeometry(this.data);
    this.mesh = new Mesh(this.geometry, this.material);
    this.parent.scene.add(this.mesh);
  }

  tick(t) {
    if (this.material) {
      this.material.uniforms.time.value = t * 1e-3;
    }
  }

  createGeometry(data) {
    const geometries = [];
    const height = area(data) * 1e-15;
    flattenEach(data, (feature) => {
      const position = [];
      const uvs = [];
      const indexes = [];
      const coords = getCoords(feature);
      coords.forEach((polygon) => {
        const offset = position.length / 3;
        polygon.forEach((coord, i) => {
          const [x, y] = this.project(coord);
          position.push(x, y, 0, x, y, height);
          uvs.push(0, 0, 0, 1);
          const n = 2 * i + offset;
          indexes.push(n, n + 2, n + 1, n + 1, n + 2, n + 3);
        });
        indexes.length = indexes.length - 6;
      });
      const geometry = new BufferGeometry();
      geometry.setIndex(new BufferAttribute(new Uint32Array(indexes), 1));
      geometry.setAttribute('position', new BufferAttribute(new Float32Array(position), 3));
      geometry.setAttribute('uv', new BufferAttribute(new Float32Array(uvs), 2));
      geometry.computeBoundingBox();
      geometry.computeVertexNormals();
      geometries.push(geometry);
    });
    const mergedGeometry = BufferGeometryUtils.mergeBufferGeometries(geometries);
    geometries.forEach((geometry) => geometry.dispose());
    return mergedGeometry;
  }

  createMaterial() {
    return new ShaderMaterial({
      uniforms: {
        uColor: {
          value: new Vector4(65 / 255, 229 / 255, 1, 1),
        },
        time: {
          value: 0,
        },
      },
      vertexShader: wallVert,
      fragmentShader: wallFrag,
      side: DoubleSide,
      // blending: AdditiveBlending,
      depthTest: true,
      // depthWrite: true,
      transparent: true,
    });
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
      this.mesh = null;
    }
  }
}
