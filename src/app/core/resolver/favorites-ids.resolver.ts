import { Observable } from 'rxjs';
import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { FavoritesService } from '../services/favorites.service';

@Injectable({
  providedIn: 'root',
})
export class FavoritesIdsResolver implements Resolve<boolean> {
  constructor(private _favService: FavoritesService) {}

  resolve(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this._favService
        .getFavoritesIds()
        .then(() => {
          observer.next(true);

          observer.complete();
        })
        .catch((error) => {
          console.error('Erro ao carregar o Favorites ids :', error);

          observer.next(false);

          observer.complete();
        });
    });
  }
}
