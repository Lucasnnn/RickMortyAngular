import { Character } from '../../models/character.class';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
})
export class CharacterListComponent {
  @Input() characters: Character[];

  @Output() nextPage = new EventEmitter<boolean>();

  onScroll(): void {
    this.nextPage.emit(true);
  }
}
