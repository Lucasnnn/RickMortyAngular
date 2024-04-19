import { Injectable } from '@angular/core';
import { ApiHttpClient } from './api.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { Character } from 'src/app/shared/models/character.type';
import { CharacterResponse } from 'src/app/shared/models/character-response.type';

@Injectable({
  providedIn: 'root',
})
export class CharacterService extends ApiHttpClient {
  nextUrl: string = null;

  //
  // ==== Behaviors
  //

  private _character: BehaviorSubject<Character | null> =
    new BehaviorSubject<Character | null>(null);
  private _characters: BehaviorSubject<Character[]> = new BehaviorSubject<
    Character[]
  >([]);

  constructor(http: HttpClient) {
    super(http, 'character');
  }

  //
  // ==== Getters Setters
  //

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

  //
  // ==== Methods
  //

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

  getAllCharacters(): Observable<CharacterResponse> {
    return this.get<CharacterResponse>().pipe(
      tap((response) => {
        this.setResponse(response);
      })
    );
  }

  filterCharacters(name: string): Observable<CharacterResponse> {
    return this.get<CharacterResponse>('/?name=' + name?.toLowerCase()).pipe(
      tap((response) => {
        this.setResponse(response);
      })
    );
  }

  nextPage(): Observable<CharacterResponse> {
    if (!this.nextUrl) {
      return of(null);
    }

    return this.get<CharacterResponse>(this.nextUrl).pipe(
      tap((response) => {
        this.setResponse(response, true);
      })
    );
  }

  //
  // ==== Private methods
  //

  private setResponse(response: CharacterResponse, preserv?: boolean): void {
    this.nextUrl = response.info.next;

    const currentCharacters = this._characters.getValue();

    const newCharacters = response.results;

    if (!this.nextUrl) {
      const last: Character = {
        id: 0,
        name: 'FIM DA LISTA',
        status: 'unknown',
        species: '',
        type: '',
        gender: 'Genderless',
        origin: {
          name: '',
          url: '',
        },
        location: {
          name: '',
          url: '',
        },
        image: '',
        episode: [],
        url: '',
        created: '',
      };

      newCharacters.push(last);
    }

    this._characters.next(
      preserv ? [...currentCharacters, ...newCharacters] : newCharacters || []
    );
  }
}
