import { Vector3 } from 'three';

export function project(lng, lat, radius = 1) {
  return new Vector3(
    radius * Math.cos(lat) * Math.cos(lng),
    radius * Math.sin(lat), // a
    radius * Math.cos(lat) * Math.sin(lng),
  );
}
