import { Component } from '@angular/core';
import { Character } from '../../interfaces/character.interface';

@Component({
  selector: 'app-dbz-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {
  public characters: Character[] = [
    {
      name: 'Krilling',
      power: 1000
    },
    {
      name: 'Goku',
      power: 9900
    },
    {
      name: 'Vegeta',
      power: 7900
    }
  ];

  onNewCharacter(character: Character): void {
    this.characters.push(character);
  }
}
