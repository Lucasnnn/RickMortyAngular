import {
  catchError,
  debounceTime,
  filter,
  of,
  OperatorFunction,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';
import { FormControl } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Character } from 'src/app/shared/models/character.type';
import { CharacterService } from 'src/app/core/services/character.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  characters: Character[];
  inputSearch = new FormControl('');

  private unsubscribe$ = new Subject<void>();

  constructor(private _charService: CharacterService) {}

  ngOnInit(): void {
    this._charService.characters$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((characters) => {
        this.characters = characters;
      });

    this.searchSubscribe();
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

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
