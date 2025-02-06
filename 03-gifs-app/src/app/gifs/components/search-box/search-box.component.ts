import { GifsService } from './../../services/gifs.service';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'gifs-search-box',
  template: `
    <h5>Buscar:</h5>
    <input #txtTagInput
      type="text" class="form-control" 
      placeholder="Buscar gifs..."
      (keyup.enter)="searchTag()"
    >
  `
})
export class SearchBoxComponent {

  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  constructor(private gifService: GifsService){  }

  searchTag() {
    const newTag = this.tagInput.nativeElement.value;
    this.gifService.searchTag(newTag);
    
    // Inicializamos input busqueda a vacio
    this.tagInput.nativeElement.value = "";
  }
}
