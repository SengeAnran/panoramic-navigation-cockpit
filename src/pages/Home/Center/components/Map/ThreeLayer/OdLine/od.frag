#extension GL_OES_standard_derivatives : enable

#ifdef GL_ES
precision highp float;
#endif

uniform float uTimeCounter;
uniform float uTrailLength;
uniform vec3 uColor;
varying vec2 vUv;
varying float vDelay;

float calculateTimeContrlOpacity(float timeCounter, vec2 vUv) {
  float uvGap = uTrailLength;
  float uvTail = timeCounter - uvGap;

  if((vUv.x < timeCounter) && (vUv.x > uvTail)) {
    float opacity = (1.0 - (timeCounter - vUv.x) / uvGap);
    opacity *= opacity;
    opacity /= 1.3;

    return opacity;
  } else {
    return 0.0;
  }
}

void main() {
  float time = fract(uTimeCounter / 3.0 + vDelay) * 1.5;
  float currentOpacity = calculateTimeContrlOpacity(time, vUv);
  // vec3 color = vec3(vDelay, 0.0, 0.0);
  // gl_FragColor = vec4(color, 1.0);
  gl_FragColor = vec4(uColor, currentOpacity * 0.95 + 0.05);
}
