import {
  catchError,
  debounceTime,
  filter,
  firstValueFrom,
  Observable,
  of,
  OperatorFunction,
  switchMap,
} from 'rxjs';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CharacterService } from 'src/app/core/services/character.service';
import { Character } from 'src/app/shared/models/character.class';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  inputSearch = new FormControl('');
  characters$: Observable<Character[]>;

  constructor(private _charService: CharacterService) {}

  ngOnInit(): void {
    this.characters$ = this._charService.characters$;

    this.searchSubscribe();
  }

  nextPage(event: any): void {
    if (event) {
      firstValueFrom(this._charService.nextPage()).then().catch();
    }
  }

  searchSubscribe(): void {
    this.inputSearch.valueChanges
      .pipe(
        debounceTime(500),
        filter((value: string) => value !== null),
        switchMap((value) => {
          if (value) {
            return this._charService
              .filterCharacters(value)
              .pipe(this.resetError());
          } else {
            return this._charService.getAllCharacters().pipe(this.resetError());
          }
        })
      )
      .subscribe();
  }

  resetError(): OperatorFunction<unknown, unknown> {
    return catchError(() => {
      this._charService.characters = [];

      return of([]);
    });
  }
}
