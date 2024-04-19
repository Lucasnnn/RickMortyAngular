import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { Character } from 'src/app/shared/models/character.type';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  //
  // ==== Behaviors
  //

  private _favorites: BehaviorSubject<Character[]> = new BehaviorSubject<
    Character[]
  >([]);
  private _ids: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);

  constructor(private _storage: StorageService) {}

  //
  // ==== Getters Setters
  //

  get favorites$(): Observable<Character[]> {
    return this._favorites.asObservable();
  }

  get ids$(): Observable<number[]> {
    return this._ids.asObservable();
  }

  //
  // ==== Methods
  //

  async addToFavorites(idChar: number): Promise<void> {
    let currentIds = this._ids.getValue();

    if (!currentIds.includes(idChar)) {
      currentIds = [...currentIds, idChar];

      this._ids.next(currentIds);
    }

    await this.saveFavorites(currentIds);
  }

  async removeFromFavorites(idChar: number): Promise<void> {
    const currentIds = this._ids.getValue();
    const currentFavorites = this._favorites.getValue();

    const newFavorites = currentFavorites.filter(
      (fav: Character) => fav.id !== idChar
    );

    const newIds = currentIds.filter((id: number) => id !== idChar);

    this._ids.next(newIds);
    this._favorites.next(newFavorites);

    await this.saveFavorites(newIds);
  }

  async getFavoriteIds(): Promise<void> {
    const ids = await this._storage.get('favorites');

    this._ids.next(ids);
  }

  //
  // ==== Private methods
  //

  private async saveFavorites(ids: number[]): Promise<void> {
    try {
      await this._storage.set('favorites', ids);
    } catch (error) {
      console.error('Erro ao salvar os favoritos:', error);
    }
  }
}
