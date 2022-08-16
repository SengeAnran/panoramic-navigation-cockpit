varying vec2 vUv;
attribute float delay;
varying float vDelay;


void main() {
  vUv = uv;
  vDelay = delay;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
