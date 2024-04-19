import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CharacterService } from 'src/app/core/services/character.service';
import { CharacterResponse } from 'src/app/shared/models/character-response.type';

@Injectable({
  providedIn: 'root',
})
export class AllCharactersResolver implements Resolve<CharacterResponse> {
  constructor(private _character: CharacterService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<CharacterResponse> {
    return this._character.getAllCharacters();
  }
}
