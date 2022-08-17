/* eslint-disable prettier/prettier */
import * as THREE from 'three';
import * as d3 from 'd3-force-3d';
import chroma from 'chroma-js';
import data1 from './data1.json';
import NodeControls from './NodeControls';
import tubeVert from './tube.vert';
import tubeFrag from './tube.frag';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
// import nodeVert from './node.vert';
// import nodeFrag from './node.frag';

const colorScales = [
  chroma
    .scale(['#F3E5F5', '#E1BEE7', '#CE93D8', '#BA68C8', '#AB47BC', '#9C27B0', '#8E24AA', '#7B1FA2', '#6A1B9A', '#4A148C'])
    .domain([0, 10]),
  chroma
    .scale(['#F9FBE7', '#F0F4C3', '#E6EE9C', '#DCE775', '#D4E157', '#CDDC39', '#C0CA33', '#AFB42B', '#9E9D24', '#827717'])
    .domain([0, 10]),
  chroma
    .scale(['#E8F5E9', '#C8E6C9', '#A5D6A7', '#81C784', '#66BB6A', '#4CAF50', '#43A047', '#388E3C', '#2E7D32', '#1B5E20'])
    .domain([0, 10]),
  chroma
    .scale(['#E1F5FE', '#B3E5FC', '#81D4FA', '#4FC3F7', '#29B6F6', '#03A9F4', '#039BE5', '#0288D1', '#0277BD', '#01579B'])
    .domain([0, 10]),
];
const data = {
  links: data1.group.map((d) => ({
    source: d.node[0],
    target: d.node[1],
    type: d.type,
  })),
  nodes: data1.node_info,
};
treeData();
function treeData() {
  const { nodes, links } = data;
  const nodesMap = nodes.reduce((pre, cur) => {
    pre[cur.node_id] = cur;
    cur.count = 0; // 子孙节点数量
    cur.level = 0; // 节点数层级
    return pre;
  }, {});
  for (let i = 0; i < links.length; i++) {
    const { source, target } = links[i];
    const sourceNode = nodesMap[source];
    const targetNode = nodesMap[target];
    sourceNode.__child = sourceNode.__child || [];
    sourceNode.__child.push(targetNode);
    targetNode.__parent = sourceNode;
  }
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    let parent = node.__parent;
    while (parent) {
      parent.count += 1;
      node.level += 1;
      parent = parent.__parent;
    }
  }
  const topNodes = nodes.filter((d) => !d.__parent);
  topNodes.forEach(addType);
  function addType(node, type) {
    if (!node) {
      return;
    }
    node.type = type;
    if (node.__child) {
      node.__child.forEach((n) => addType(n, type));
    }
  }
}

export default class {
  constructor() {
    this.group = new THREE.Group();
    // this.group.position.x = 20;
    this.createForce();
    this.addHighlight();
  }
  createForce() {
    this.nodes = this.createNodes(data.nodes);
    this.lines = this.createLine(data.links.length);
    const link = d3
      .forceLink(data.links) // a
      .id((d) => d.node_id) // eslint-disable-line
      .distance((d) => 10);  // eslint-disable-line

    this.simulation = d3
      .forceSimulation(data.nodes, 3)
      // .alphaDecay(0.01)
      .force('link', link)
      .force('center', d3.forceCenter())
      .force('charge', d3.forceManyBody().strength(-4).distanceMax(1e4))
      .force('x', d3.forceX())
      .force('y', d3.forceY())
      .force('z', d3.forceZ())
      .on('tick', () => {
        const mat4 = new THREE.Matrix4();
        for (let i = 0; i < data.nodes.length; i++) {
          const node = data.nodes[i];
          mat4.makeTranslation(node.x, node.y, node.z);
          this.nodes.setMatrixAt(i, mat4);
        }
        this.nodes.instanceMatrix.needsUpdate = true;
        for (let i = 0; i < data.links.length; i++) {
          const { source, target } = data.links[i];
          const targetVector = new THREE.Vector3().copy(target).sub(source);
          const rotateDir = new THREE.Vector3(1).cross(targetVector).normalize();
          const rotateDeg = new THREE.Vector3(1).angleTo(targetVector);
          const quaternion = new THREE.Quaternion().setFromAxisAngle(rotateDir, rotateDeg);
          const scale = new THREE.Vector3(targetVector.length(), 1, 1);
          mat4.compose(source, quaternion, scale);
          this.lines.setMatrixAt(i, mat4);
        }
        this.lines.instanceMatrix.needsUpdate = true;
      });
  }
  createNodes(nodes) {
    const geometry = new THREE.SphereGeometry(1, 20, 20);
    const material = new THREE.MeshPhongMaterial();
    const mesh = new THREE.InstancedMesh(geometry, material, nodes.length);
    const mat4 = new THREE.Matrix4();
    for (let i = 0; i < nodes.length; i++) {
      const { level, type } = nodes[i];
      const color = colorScales[type](level * 1.5 + 1).css();
      mesh.setColorAt(i, new THREE.Color(color));
      mesh.setMatrixAt(i, mat4);
    }

    this.group.add(mesh);
    return mesh;
  }

  createLine(count) {
    const linePath = new THREE.LineCurve(new THREE.Vector3(0, 0, 0), new THREE.Vector3(1, 0, 0));
    const tubeGeometry = new THREE.TubeGeometry(linePath, 10, 1e-1, 8, false);
    const instancedGeometry = new THREE.InstancedBufferGeometry();
    instancedGeometry.index = tubeGeometry.index;
    instancedGeometry.attributes = tubeGeometry.attributes;
    const delay = [];
    for (let i = 0; i < count; i++) {
      delay.push(Math.random());
    }
    instancedGeometry.setAttribute('delay', new THREE.InstancedBufferAttribute(new Float32Array(delay), 1));
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Vector3(0, 1, 1) },
        uTrailLength: { value: 0.5 },
        uTimeCounter: { value: 1 },
      },
      vertexShader: tubeVert,
      fragmentShader: tubeFrag,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthTest: true,
      depthWrite: false,
      transparent: true,
    });
    this.lineMaterial = material;
    const lineMesh = new THREE.InstancedMesh(instancedGeometry, material, count);
    for (let i = 0; i < count; i++) {
      lineMesh.setColorAt(i, new THREE.Color(Math.random() * 0xffffff));
    }
    this.group.add(lineMesh);
    return lineMesh;
  }

  tick(t) {
    // console.log(t);
    this.lineMaterial.uniforms.uTimeCounter.value = t * 1e-3;
    if (this.hoverId) {
      this.nodes.getMatrixAt(this.hoverId, this.cssObj.matrix);
      this.cssRender.render(this.globe.scene, this.globe.camera);
    }
  }

  addHighlight() {
    const tipDOM = document.createElement('div');
    tipDOM.style.color = '#fff';
    tipDOM.innerHTML = 'tip';
    const cssObj = (this.cssObj = new CSS2DObject(tipDOM));
    cssObj.position.set(0, 0, 0);
    cssObj.matrixAutoUpdate = false;

    const cssRender = (this.cssRender = new CSS2DRenderer());
    // console.log(this.cssRender);

    cssRender.setSize(window.innerWidth, window.innerHeight);
    cssRender.domElement.style.position = 'absolute';
    cssRender.domElement.style.top = '0px';
    cssRender.domElement.style.left = '0px';
    cssRender.domElement.style.width = '100%';
    cssRender.domElement.style.height = '100%';
    cssRender.domElement.style.pointerEvents = 'none';
  }

  addTo(globe) {
    this.globe = globe;
    globe.scene.add(this.group);
    globe.container.appendChild(this.cssRender.domElement);

    const controls = new NodeControls(this.nodes, globe.camera, globe.renderer.domElement);
    this.controls = controls;
    // controls.addEventListener('click', (event) => {
    //   console.log('click', event);
    // });

    controls.addEventListener('mouseover', (event) => {
      // console.log('mouseover', event.object, this.cssObj);
      const { object } = event;
      this.hoverId = object;
      this.cssObj.element.innerHTML = data.nodes[object].node_name;
      this.nodes.add(this.cssObj);
    });

    // eslint-disable-next-line no-unused-vars
    controls.addEventListener('mouseout', (event) => {
      // console.log('mouseout', event.object, this.cssObj);
      this.hoverId = null;
      this.nodes.remove(this.cssObj);
    });

    controls.addEventListener('dragstart', (event) => {
      // console.log('dragstart', event);
      this.simulation.alphaTarget(0.3).restart();
      const { object, position } = event;
      data.nodes[object].fx = position.x;
      data.nodes[object].fy = position.y;
      data.nodes[object].fz = position.z;
      this.globe.orbitControls.enabled = false;
    });

    controls.addEventListener('drag', (event) => {
      // console.log('drag', event);
      const { object, position } = event;
      data.nodes[object].fx = position.x;
      data.nodes[object].fy = position.y;
      data.nodes[object].fz = position.z;
    });

    controls.addEventListener('dragend', (event) => {
      // console.log('dragend', event);
      this.simulation.alphaTarget(0).restart();
      const { object } = event;
      data.nodes[object].fx = null;
      data.nodes[object].fy = null;
      data.nodes[object].fz = null;
      this.globe.orbitControls.enabled = true;
    });
  }

  remove() {
    this.simulation = null;
    this.controls.dispose();
    this.group.traverse((o) => {
      if (o.geometry) {
        o.geometry.dispose();
        o.material.dispose();
      }
    });
    this.globe?.scene.remove(this.group);
    this.globe.container.remove(this.cssRender.domElement);
    this.cssRender = null;
  }
}
