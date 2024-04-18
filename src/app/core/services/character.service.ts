import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiHttpClient } from './api.service';
import { HttpClient } from '@angular/common/http';
import { CharacterResponse } from 'src/app/shared/models/character-response.type';
import { Character } from 'src/app/shared/models/character.type';

@Injectable({
  providedIn: 'root',
})
export class CharacterService extends ApiHttpClient {
  constructor(http: HttpClient) {
    super(http, 'character');
  }

  getAllCharacters(): Observable<CharacterResponse> {
    return this.get<CharacterResponse>();
  }

  getSingleCharacter(id: number): Observable<Character> {
    return this.get<Character>('/' + id);
  }

  getMultipleCharacters(ids: number[]): Observable<Character[]> {
    return this.get<Character[]>('/' + ids?.join(','));
  }

  filterCharacters(name: string): Observable<CharacterResponse> {
    return this.get<CharacterResponse>('/?name' + name?.toLowerCase());
  }
}
