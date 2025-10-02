import { JsonPipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, signal, viewChild } from '@angular/core';

import maplibregl, { LngLatLike } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { v4 as UUIDv4 } from 'uuid'


interface Marker {
  id: string;
  mapMaker: maplibregl.Marker;
}

@Component({
  selector: 'app-marker-page',
  imports: [JsonPipe],
  templateUrl: './marker-page.component.html',
})
export class MarkerPageComponent implements AfterViewInit{
  
  divElement = viewChild<ElementRef>('map');
  map = signal<maplibregl.Map | null>(null);
  markers = signal<Marker[]>([]);

  async ngAfterViewInit() {
    if( !this.divElement()) return;
    
      const element = this.divElement()!.nativeElement;
      //const {lat, lng} = this.coordinates();
      
      const map = new maplibregl.Map({
        container: element, // container id
        style: 'https://tiles.openfreemap.org/styles/bright', // style URL
        center: [-8.394589, 43.350191], // starting position [lng, lat]
        zoom: 16 // starting zoom
      }); 
  
      this.mapListeners( map );
  } 

  mapListeners( map: maplibregl.Map ) {
    console.log('bject')

    map.on('click', (event) => this.mapClick(event))

    this.map.set(map);
  }

  mapClick(event: maplibregl.MapMouseEvent){
    if( !this.map()) return;

    const map = this.map()!;
    const coords = event.lngLat;
    const color = '#xxxxxx'.replace(/x/g, (y) => 
      ((Math.random() * 16) | 0).toString(16)
    );

    const mapMarker = new maplibregl.Marker({
      color: color,
    })
    .setLngLat(event.lngLat)
    .addTo(map);

    const newMarker: Marker = {
      id:  UUIDv4(),
      mapMaker: mapMarker
    }

    this.markers.set([... this.markers(), newMarker])
  
    console.log(this.markers())
  }

  flyToMarker( lngLat: LngLatLike){
    if( !this.map()) return;

    this.map()?.flyTo({
      center: lngLat
    })
  }

  deleteMarker(marker: Marker){
    if(!this.map()) return;

    const map = this.map()!;

    // eliminamos del mapa.
    marker.mapMaker.remove();

    this.markers.update(markers => markers.filter( m => m.id !== marker.id));
  }
}
