uniform vec2 offset;
attribute float delay;

varying vec2 vUv;

varying float vDelay;
void main() {
  vUv = uv;
  vDelay = delay;
  vec4 mvPosition = vec4(position, 1.);

#ifdef USE_INSTANCING
  mvPosition = instanceMatrix * mvPosition;
#endif
  gl_Position = projectionMatrix * modelViewMatrix * mvPosition;
}
