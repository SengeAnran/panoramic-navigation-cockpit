/* eslint-disable no-unused-vars */
import * as THREE from 'three';
import { project } from '@/utils/math';

export default class {
  constructor() {
    this.createPoints();
  }

  createPoints() {
    const lngSample = 30;
    const latSample = 30;
    const matrix = [];
    const o = new THREE.Object3D();
    for (let i = 0; i < lngSample; i++) {
      const lng = (i / lngSample) * Math.PI * 2;
      for (let j = 0; j <= latSample; j++) {
        const lat = (j / latSample) * Math.PI - Math.PI / 2;
        const pos = project(lng, lat, 45);
        o.position.set(pos.x, pos.y, pos.z);
        const target = project(lng, lat, 55);
        o.lookAt(target.x, target.y, target.z);
        matrix.push(o.matrix.clone());
      }
    }
    const circleGeometry = new THREE.CircleGeometry(0.6, 16);
    const circleMaterial = new THREE.MeshBasicMaterial({
      color: 0x2b3aab,
      opacity: 0.6,
      transparent: true,
      // side: THREE.DoubleSide,
    });
    const circleMeshInstance = new THREE.InstancedMesh(circleGeometry, circleMaterial, matrix.length);
    for (let i = 0; i < matrix.length; i++) {
      circleMeshInstance.setMatrixAt(i, matrix[i]);
    }
    this.sphereMesh = circleMeshInstance;
    // this.group.add(circleMeshInstance);
  }

  addTo(globe) {
    this.globe = globe;
    globe.scene.add(this.sphereMesh);
  }

  remove() {
    this.sphereMesh.material.dispose();
    this.sphereMesh.geometry.dispose();
    this.globe?.scene.remove(this.sphereMesh);
  }
}
