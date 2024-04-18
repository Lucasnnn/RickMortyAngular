import { Component, Input } from '@angular/core';
import { Character } from '../../models/character.type';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
})
export class CharacterListComponent {
  @Input() characters: Character[];
}
