import { Character } from './../../interfaces/character.interface';
import { Component } from '@angular/core';
import { DbzService } from '../../services/dbz.service';

@Component({
  selector: 'app-dbz-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {

  constructor(private dbzService: DbzService){}

  get characters() : Character[] {
    return [...this.dbzService.characters];
  }

  onDeletCharacter(id: string): void {
    this.dbzService.deleteCharacterById(id)
  }

  onNewCharacter(character: Character):void {
    this.dbzService.addCharacter(character);
  }
}
