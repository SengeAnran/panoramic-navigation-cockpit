#extension GL_OES_standard_derivatives : enable
#define GLSLIFY 1
uniform vec4 uColor;

varying vec2 vUv;
void main() {
  float opacity = (1.0 - vUv.y) * 0.6;
  opacity *= opacity;
  if (fract(vUv.y) < fwidth(vUv.y) * 2.0) {
    opacity = 1.0;
  }
  gl_FragColor = vec4(uColor.rgb, opacity);
}
