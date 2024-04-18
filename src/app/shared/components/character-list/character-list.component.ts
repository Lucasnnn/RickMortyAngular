import { Component, Input } from '@angular/core';
import { Character } from '../../models/character.type';

@Component({
  selector: 'app-character-list',
  styleUrls: ['./character-list.component.scss'],
})
export class CharacterListComponent {
  @Input() characters: Character[];
}
