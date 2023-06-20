/* eslint-disable prettier/prettier */
import * as THREE from 'three';
import * as d3 from 'd3-force-3d';
import chroma from 'chroma-js';
import Event from 'eventemitter3';
import NodeControls from './NodeControls';
import tubeVert from './tube.vert';
import tubeFrag from './tube.frag';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import './tip.css';
// import nodeVert from './node.vert';
// import nodeFrag from './node.frag';

const colorScales = [
  chroma.scale(['#f44336', '#ffcdd2']).domain([0, 10]),
  chroma.scale(['#e91e63', '#f8bbd0']).domain([0, 10]),
  chroma.scale(['#9c27b0', '#e1bee7']).domain([0, 10]),
  chroma.scale(['#673ab7', '#d1c4e9']).domain([0, 10]),
  chroma.scale(['#3f51b5', '#c5cae9']).domain([0, 10]),
  chroma.scale(['#2196f3', '#bbdefb']).domain([0, 10]),
  chroma.scale(['#03a9f4', '#b3e5fc']).domain([0, 10]),
  chroma.scale(['#00bcd4', '#b2ebf2']).domain([0, 10]),
  chroma.scale(['#009688', '#b2dfdb']).domain([0, 10]),
  chroma.scale(['#4caf50', '#c8e6c9']).domain([0, 10]),
  chroma.scale(['#8bc34a', '#dcedc8']).domain([0, 10]),
  chroma.scale(['#cddc39', '#f0f4c3']).domain([0, 10]),
  chroma.scale(['#ffeb3b', '#fff9c4']).domain([0, 10]),
  chroma.scale(['#ffc107', '#ffecb3']).domain([0, 10]),
  chroma.scale(['#ff9800', '#ffe0b2']).domain([0, 10]),
  chroma.scale(['#ff5722', '#ffccbc']).domain([0, 10]),
  chroma.scale(['#795548', '#d7ccc8']).domain([0, 10]),
  chroma.scale(['#9e9e9e', '#f5f5f5']).domain([0, 10]),
  chroma.scale(['#607d8b', '#cfd8dc']).domain([0, 10]),
];
function getPair(data) {
  const pairs = data
    .filter((d) => d.children?.length)
    .map((d) => {
      const current = d.children.map((c) => [d.node_id, c.node_id]);
      const child = getPair(d.children);
      return [...current, ...child];
    })
    .flat();
  return pairs;
}
function getNodes(data) {
  function addLevel(data, level = 0) {
    for (const item of data) {
      item.level = level;
      if (item.children?.length) {
        addLevel(item.children, level + 1);
      }
    }
  }
  function addType(data, type = 0) {
    data.type = type;
    if (data.children?.length) {
      data.children.forEach((item) => addType(item, type));
    }
  }
  addLevel(data);
  data.forEach(addType);
  function getNodeMap(data, map = {}) {
    data.forEach((d) => {
      map[d.node_id] = d;
      if (d.children?.length) {
        getNodeMap(d.children, map);
      }
    });
    return map;
  }
  return Object.values(getNodeMap(data));
}
export default class extends Event {
  constructor(data) {
    super();
    this.formatData(data);
    this.group = new THREE.Group();
    // this.group.position.x = 20;
    this.createForce();
    this.addHighlight();
  }
  formatData(data) {
    const links = getPair(data).map((d) => ({
      source: d[0],
      target: d[1],
    }));
    const nodes = getNodes(data);
    this.data = { links, nodes };
    // this.data = {
    //   links: [
    //     { source: '1', target: '2' },
    //     { source: '1', target: '3' },
    //   ],
    //   nodes: [
    //     {
    //       node_id: '1',
    //       node_name: '1',
    //       type: 0,
    //       level: 0,
    //     },
    //     {
    //       node_id: '2',
    //       node_name: '2',
    //       type: 0,
    //       level: 0,
    //     },
    //     {
    //       node_id: '3',
    //       node_name: '3',
    //       type: 0,
    //       level: 0,
    //     },
    //   ],
    // };
  }
  createForce() {
    this.nodes = this.createNodes(this.data.nodes);
    this.lines = this.createLine(this.data.links.length);
    const link = d3
      .forceLink(this.data.links) // a
      .id((d) => d.node_id) // eslint-disable-line
      .distance((d) => 10);  // eslint-disable-line

    this.simulation = d3
      .forceSimulation(this.data.nodes, 3)
      // .alphaDecay(0.01)
      .force('link', link)
      .force('center', d3.forceCenter())
      .force('charge', d3.forceManyBody().strength(-4).distanceMax(1e4))
      .force('x', d3.forceX())
      .force('y', d3.forceY())
      .force('z', d3.forceZ())
      .on('tick', () => {
        const mat4 = new THREE.Matrix4();
        for (let i = 0; i < this.data.nodes.length; i++) {
          const node = this.data.nodes[i];
          mat4.makeTranslation(node.x, node.y, node.z);
          this.nodes.setMatrixAt(i, mat4);
        }
        this.nodes.instanceMatrix.needsUpdate = true;
        for (let i = 0; i < this.data.links.length; i++) {
          const { source, target } = this.data.links[i];
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
      const colorIndex = type % colorScales.length;
      const color = colorScales[colorIndex](level * 1.5 + 1).css();
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
    tipDOM.classList.add('node-tip');
    const cssObj = (this.cssObj = new CSS2DObject(tipDOM));
    cssObj.position.set(0, 0, 0);
    cssObj.matrixAutoUpdate = false;

    const cssRender = (this.cssRender = new CSS2DRenderer());
    // console.log(this.cssRender);
    cssRender.domElement.style.position = 'absolute';
    cssRender.domElement.style.top = '0px';
    cssRender.domElement.style.left = '0px';
    cssRender.domElement.style.width = '100%';
    cssRender.domElement.style.height = '100%';
    cssRender.domElement.style.pointerEvents = 'none';
  }

  orbitControl = () => {
    this.globe.orbitControls.autoRotate = false;
    clearTimeout(this.resumeOrbit);
    this.resumeOrbit = setTimeout(this.resumeControl, 1000);
  }

  resumeControl = () => {
    this.globe.orbitControls.autoRotate = true;
    clearTimeout(this.resumeOrbit);
    this.resumeOrbit = null;
  }

  addTo(globe) {
    this.globe = globe;
    globe.scene.add(this.group);
    globe.container.appendChild(this.cssRender.domElement);
    this.globe.renderer.domElement.addEventListener('mousemove', this.orbitControl);
    const container = this.globe.container;
    this.cssRender.setSize(container.clientWidth, container.clientHeight);


    const controls = new NodeControls(this.nodes, globe.camera, globe.renderer.domElement);
    this.controls = controls;
    controls.addEventListener('click', (event) => {
      const { object } = event;
      // console.log('click', this.data.nodes[object]);
      this.emit('click', this.data.nodes[object]);
    });

    controls.addEventListener('mouseover', (event) => {
      // console.log('mouseover', event.object, this.cssObj);
      const { object } = event;
      this.hoverId = object;
      this.cssObj.element.innerHTML = this.data.nodes[object].node_name;
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
      this.data.nodes[object].fx = position.x;
      this.data.nodes[object].fy = position.y;
      this.data.nodes[object].fz = position.z;
      this.globe.orbitControls.enabled = false;
    });

    controls.addEventListener('drag', (event) => {
      // console.log('drag', event);
      const { object, position } = event;
      this.data.nodes[object].fx = position.x;
      this.data.nodes[object].fy = position.y;
      this.data.nodes[object].fz = position.z;
    });

    controls.addEventListener('dragend', (event) => {
      // console.log('dragend', event);
      this.simulation.alphaTarget(0).restart();
      const { object } = event;
      this.data.nodes[object].fx = null;
      this.data.nodes[object].fy = null;
      this.data.nodes[object].fz = null;
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
    // this.globe.container.remove(this.cssRender.domElement);
    this.globe.renderer.domElement.removeEventListener('mousemove', this.orbitControl);
    this.cssRender = null;
  }
}
