import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { CharacterService } from 'src/app/core/services/character.service';
import { CharacterResponse } from 'src/app/shared/models/character-response.type';

@Injectable({
  providedIn: 'root',
})
export class GetAllCharactersResolver implements Resolve<CharacterResponse> {
  constructor(private _character: CharacterService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<CharacterResponse> {
    return this._character.getAllCharacters();
  }
}
