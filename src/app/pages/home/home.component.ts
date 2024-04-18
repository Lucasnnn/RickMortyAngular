import {
  catchError,
  debounce,
  debounceTime,
  filter,
  of,
  switchMap,
} from 'rxjs';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CharacterService } from 'src/app/core/services/character.service';
import { Character } from 'src/app/shared/models/character.type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private _character: CharacterService) {}

  characters: Character[];

  inputSearch = new FormControl('');

  ngOnInit(): void {
    this._character.characters$.subscribe((characters) => {
      console.log(characters);

      this.characters = characters;
    });

    this.searchSubscribe();
  }

  searchSubscribe() {
    this.inputSearch.valueChanges
      .pipe(
        debounceTime(500),
        filter((value) => value !== null),
        switchMap((value) => {
          if (value) {
            return this._character
              .filterCharacters(value)
              .pipe(this.resetError());
          } else {
            return this._character.getAllCharacters().pipe(this.resetError());
          }
        })
      )
      .subscribe();
  }

  resetError() {
    return catchError(() => {
      this._character.characters = [];

      return of([]);
    });
  }
}
