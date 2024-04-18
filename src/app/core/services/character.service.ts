import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { ApiHttpClient } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Character } from 'src/app/shared/models/character.type';
import { CharacterResponse } from 'src/app/shared/models/character-response.type';

@Injectable({
  providedIn: 'root',
})
export class CharacterService extends ApiHttpClient {
  constructor(http: HttpClient) {
    super(http, 'character');
  }

  private _character: BehaviorSubject<Character | null> =
    new BehaviorSubject<Character | null>(null);

  get character$() {
    return this._character.asObservable();
  }

  set character(value: Character) {
    this._character.next(value);
  }

  private _characters: BehaviorSubject<Character[]> = new BehaviorSubject<
    Character[]
  >([]);

  get characters$() {
    return this._characters.asObservable();
  }

  set characters(value: Character[]) {
    this._characters.next(value);
  }

  getAllCharacters() {
    return this.get<CharacterResponse>().pipe(
      tap((response) => {
        this._characters.next(response.results || []);
      })
    );
  }

  getMultipleCharacters(ids: number[]) {
    return this.get<Character[]>('/' + ids?.join(',')).pipe(
      tap((response) => {
        this._characters.next(response || []);
      })
    );
  }

  filterCharacters(name: string) {
    return this.get<CharacterResponse>('/?name=' + name?.toLowerCase()).pipe(
      tap((response) => {
        this._characters.next(response.results || []);
      })
    );
  }

  getSingleCharacter(id: number) {
    return this.get<Character>('/' + id).pipe(
      tap((response) => {
        this._character.next(response || null);
      })
    );
  }
}
