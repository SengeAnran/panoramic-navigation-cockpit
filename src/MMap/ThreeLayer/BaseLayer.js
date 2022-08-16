import mapboxgl from 'mapbox-gl';

export default class BaseLayer {
  parent;

  addTo(parent) {
    this.parent = parent;
  }

  get center() {
    return this.parent.centerCoord;
  }

  project = (lngLat, alt) => {
    const point = mapboxgl.MercatorCoordinate.fromLngLat(lngLat, alt);
    const x = point.x - this.center.x;
    const y = this.center.y - point.y;
    return [x, y, point.z - this.center.z];
  };
}
