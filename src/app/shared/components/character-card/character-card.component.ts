import { Component, Input } from '@angular/core';
import { Character } from '../../models/character.type';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss'],
})
export class CharacterCardComponent {
  @Input() character: Character;

  default = './assets/images/ico.png';

  getImage(character: Character): string {
    const image = character.image ?? this.default;

    return image;
  }
}
