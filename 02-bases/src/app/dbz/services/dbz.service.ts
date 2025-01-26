import { Injectable } from "@angular/core";
import { Character } from "../interfaces/character.interface";
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class DbzService {

   public characters: Character[] = [
      {
        id: uuid(),
        name: 'Krilling',
        power: 1000
      },
      {
        id: uuid(),
        name: 'Goku',
        power: 9900
      },
      {
        id: uuid(),
        name: 'Vegeta',
        power: 7900
      }
    ];

    onNewCharacter(character: Character): void {
      const onNewCharacter: Character = { ...character, id: uuid() };
      this.characters.push(onNewCharacter);
    }

    onDeleteCharacter(index: number) {
      this.characters.splice(index,1)
    }

    deleteCharacterById( id: string){
      this.characters = this.characters.filter( character => character.id != id);
    }
}
