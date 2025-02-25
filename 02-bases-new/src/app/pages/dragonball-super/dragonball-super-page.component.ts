import { DragonBallService } from './../../services/dragonball.services';
import { Component, inject, signal } from '@angular/core';
import { CharacterListComponent } from "../../components/dragonball/character-list/character-list.component";
import { CharacterAddComponent } from "../../components/dragonball/character-add/character-add.component";
import { Character } from '../../interfaces/character.interface';


@Component({
  templateUrl: './dragonball-super-page.component.html',
  imports: [CharacterListComponent, CharacterAddComponent],
})
export class DragonballSuperPageComponent {
  name = signal('');
  power = signal(0);

  public dragonBallService = inject(DragonBallService);
  
}
