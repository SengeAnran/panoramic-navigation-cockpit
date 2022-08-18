import { Matrix4, Vector3, Vector2 } from 'three';
import { Plane, Raycaster, EventDispatcher } from 'three';

const raycaster = new Raycaster();
const CLICK_THRESHOLD = 5;

export default class NodeControls extends EventDispatcher {
  enabled = true;
  clickThreshold = 0;
  pointer = new Vector2();
  offset = new Vector3();
  dragPlane = new Plane();
  worldPosition = new Vector3();
  intersectPoint = new Vector3();
  inverseMatrix = new Matrix4();

  constructor(nodes, camera, domElement) {
    super();
    this.nodes = nodes;
    this.camera = camera;
    this.domElement = domElement;
    this.dragObject = undefined;
    this.hoverObject = undefined;
    this.pointerdown = false;
    this.addEvent();
  }

  addEvent() {
    const domElement = this.domElement;
    domElement.addEventListener('pointermove', this.onPointerMove);
    domElement.addEventListener('pointerdown', this.onPointerDown);
    domElement.addEventListener('pointerup', this.onPointerup);
    domElement.addEventListener('pointerleave', this.onPointerleave);
  }

  removeEvent() {
    const domElement = this.domElement;
    domElement.removeEventListener('pointermove', this.onPointerMove);
    domElement.removeEventListener('pointerdown', this.onPointerDown);
    domElement.removeEventListener('pointerup', this.onPointerup);
    domElement.removeEventListener('pointerleave', this.onPointerleave);
    domElement.style.cursor = '';
  }

  resetRaycaster(ev) {
    const rect = this.domElement.getBoundingClientRect();
    this.pointer.x = ((ev.clientX - rect.left) / rect.width) * 2 - 1;
    this.pointer.y = -((ev.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(this.pointer, this.camera);
  }

  getIntersectObject(ev) {
    this.resetRaycaster(ev);
    const intersects = raycaster.intersectObject(this.nodes);
    return intersects[0]?.instanceId;
  }

  onPointerDown = (ev) => {
    if (!this.enabled) {
      return;
    }
    this.pointerdown = true;
    const dragObject = this.getIntersectObject(ev);
    // console.log('pointerDown', dragObject);
    if (!dragObject) {
      return;
    }
    this.domElement.setPointerCapture(ev.pointerId);

    this.clickThreshold = 0;
    const { dragPlane, camera, worldPosition } = this;
    const matrixWorld = new Matrix4();
    this.nodes.getMatrixAt(dragObject, matrixWorld);
    matrixWorld.premultiply(this.nodes.matrixWorld);

    dragPlane.setFromNormalAndCoplanarPoint(
      camera.getWorldDirection(dragPlane.normal),
      worldPosition.setFromMatrixPosition(matrixWorld), // a
    );
    if (raycaster.ray.intersectPlane(dragPlane, this.intersectPoint)) {
      this.inverseMatrix.copy(this.nodes.matrixWorld).invert();
      this.offset.copy(this.intersectPoint).sub(worldPosition);
    }
    this.domElement.style.cursor = 'move';
    this.dragObject = dragObject;
    const position = worldPosition.applyMatrix4(this.inverseMatrix);
    this.dispatchEvent({ type: 'dragstart', object: dragObject, position });
  };

  onPointerMove = (ev) => {
    if (!this.enabled) {
      return;
    }
    if (this.dragObject) {
      // 拖拽事件
      this.clickThreshold++; // 移动次数小于阈值，则触发点击事件
      this.resetRaycaster(ev);
      raycaster.ray.intersectPlane(this.dragPlane, this.intersectPoint);
      const position = this.intersectPoint.sub(this.offset).applyMatrix4(this.inverseMatrix);
      this.dispatchEvent({ type: 'drag', object: this.dragObject, position });
    } else if (!this.pointerdown) {
      // hover检测
      // console.log('hover check');
      this.hoverCheck(ev);
    }
  };

  hoverCheck = (ev) => {
    const hoverObject = this.getIntersectObject(ev);
    if (this.hoverObject == hoverObject) {
      return;
    }
    if (!this.hoverObject && hoverObject) {
      this.hoverObject = hoverObject;
      this.dispatchEvent({ type: 'mouseover', object: this.hoverObject });
      return;
    }
    if (this.hoverObject && !hoverObject) {
      this.dispatchEvent({ type: 'mouseout', object: this.hoverObject });
      this.hoverObject = undefined;
      return;
    }
    if (this.hoverObject && hoverObject) {
      this.dispatchEvent({ type: 'mouseout', object: this.hoverObject });
      this.hoverObject = hoverObject;
      this.dispatchEvent({ type: 'mouseover', object: this.hoverObject });
      return;
    }
  };

  onPointerup = (ev) => {
    if (!this.enabled) {
      return;
    }
    this.onPointerCancel(ev);
    if (this.clickThreshold < CLICK_THRESHOLD && this.dragObject) {
      this.clickThreshold = 0;
      this.dispatchEvent({ type: 'click', object: this.dragObject });
    }
    this.dragObject = null;
  };

  onPointerleave = (ev) => {
    if (!this.enabled) {
      return;
    }
    this.onPointerCancel(ev);
    this.dragObject = null;
  };

  onPointerCancel(ev) {
    this.domElement.releasePointerCapture(ev.pointerId);

    this.pointerdown = false;
    if (!this.dragObject) {
      return;
    }
    this.dispatchEvent({ type: 'dragend', object: this.dragObject });
    this.domElement.style.cursor = 'auto';
  }

  dispose() {
    this.removeEvent();
  }
}
