import { Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom, Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { CharacterService } from './character.service';
import { Character } from 'src/app/shared/models/character.class';

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

  constructor(
    private _storage: StorageService,
    private _charService: CharacterService
  ) {}

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

  async getFavoritesIds(): Promise<void> {
    const ids = await this._storage.get<number[]>('favorites');

    this._ids.next(ids);
  }

  async getAllFavorites(): Promise<void> {
    const ids = await this._storage.get<number[]>('favorites');

    const favorites = await lastValueFrom(
      this._charService.getMultipleCharacters(ids)
    );

    this._favorites.next(favorites);
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
