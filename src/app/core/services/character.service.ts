import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ApiHttpClient } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Character } from 'src/app/shared/models/character.type';
import { CharacterResponse } from 'src/app/shared/models/character-response.type';

@Injectable({
  providedIn: 'root',
})
export class CharacterService extends ApiHttpClient {
  private _character: BehaviorSubject<Character | null> =
    new BehaviorSubject<Character | null>(null);

  private _characters: BehaviorSubject<Character[]> = new BehaviorSubject<
    Character[]
  >([]);

  constructor(http: HttpClient) {
    super(http, 'character');
  }

  get characters$(): Observable<Character[]> {
    return this._characters.asObservable();
  }

  get character$(): Observable<Character> {
    return this._character.asObservable();
  }

  set characters(value: Character[]) {
    this._characters.next(value);
  }

  set character(value: Character) {
    this._character.next(value);
  }

  getAllCharacters(): Observable<CharacterResponse> {
    return this.get<CharacterResponse>().pipe(
      tap((response) => {
        this._characters.next(response.results || []);
      })
    );
  }

  filterCharacters(name: string): Observable<CharacterResponse> {
    return this.get<CharacterResponse>('/?name=' + name?.toLowerCase()).pipe(
      tap((response) => {
        this._characters.next(response.results || []);
      })
    );
  }

  getMultipleCharacters(ids: number[]): Observable<Character[]> {
    return this.get<Character[]>('/' + ids?.join(',')).pipe(
      tap((response) => {
        this._characters.next(response || []);
      })
    );
  }

  getSingleCharacter(id: number): Observable<Character> {
    return this.get<Character>('/' + id).pipe(
      tap((response) => {
        this._character.next(response || null);
      })
    );
  }
}
