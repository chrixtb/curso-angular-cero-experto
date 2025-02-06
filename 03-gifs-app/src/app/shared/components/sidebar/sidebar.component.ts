import { Component } from '@angular/core';

import { GifsService } from './../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  public tagsHistory: string[];


  constructor(private gifsService: GifsService){ 
    this.tagsHistory = this.gifsService.tagsHistory; 
  }

  get tags(): string[]{
    return this.gifsService.tagsHistory;
  }

  searchTag(tag: string){
    console.log(`Seleccionado tag: ${tag}`)
    this.gifsService.searchTag(tag);
  }

}
