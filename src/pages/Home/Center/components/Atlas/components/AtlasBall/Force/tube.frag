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
    opacity *= opacity;
    opacity *= opacity;

    return opacity;
  } else {
    return 0.0;
  }
}

void main() {
  float currentOpacity = calculateTimeContrlOpacity(fract(uTimeCounter + vDelay), vUv);
  gl_FragColor = vec4(uColor, currentOpacity + 0.1);
}
