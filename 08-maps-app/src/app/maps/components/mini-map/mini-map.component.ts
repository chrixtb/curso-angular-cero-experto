import { Component, ElementRef, input, signal, viewChild } from '@angular/core';

import maplibregl, { LngLat, LngLatLike } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

@Component({
  selector: 'app-mini-map',
  imports: [],
  templateUrl: './mini-map.component.html',
})
export class MiniMapComponent {

  divElement = viewChild<ElementRef>('map');
  map = signal<maplibregl.Map | null>(null);

  coordinates = input.required<{ lng: number; lat: number }>();
  zoom = input<number>(14);

  async ngAfterViewInit() {
    if( !this.divElement()) return;

    const element = this.divElement()!.nativeElement;
    const {lat, lng} = this.coordinates();

    const map = new maplibregl.Map({
      container: element, // container id
      style: 'https://tiles.openfreemap.org/styles/bright', // style URL
      center: [lng, lat], // starting position [lng, lat]
      zoom: this.zoom(), // starting zoom
      interactive: false,
    });

    this.map.set(map);
  }

}
