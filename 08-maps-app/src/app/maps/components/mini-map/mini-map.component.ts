import { Component, ElementRef, input, signal, viewChild } from '@angular/core';

import maplibregl, { LngLatLike } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

@Component({
  selector: 'app-mini-map',
  imports: [],
  templateUrl: './mini-map.component.html',
})
export class MiniMapComponent { 

  divElement = viewChild<ElementRef>('map');
  map = signal<maplibregl.Map | null>(null);

  //c = input.required<string>();

  coordinates = signal({
    lng: -74.5,
    lat: 40
  })


  // width: 
  // height: 260

   async ngAfterViewInit() {
      if( !this.divElement()) return;
  
      const element = this.divElement()!.nativeElement;
      const {lat, lng} = this.coordinates();
      
      const map = new maplibregl.Map({
        container: element, // container id
        style: 'https://tiles.openfreemap.org/styles/bright', // style URL
        center: [lng, lat], // starting position [lng, lat]
        zoom: 14 // starting zoom
      }); 

      this.map.set(map);
    }

}
