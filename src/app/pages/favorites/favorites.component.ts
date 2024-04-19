import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { FavoritesService } from 'src/app/core/services/favorites.service';
import { Character } from 'src/app/shared/models/character.type';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit, OnDestroy {
  favorites: Character[];

  private unsubscribe$ = new Subject<void>();

  constructor(private _favService: FavoritesService) {}

  ngOnInit(): void {
    this._favService.favorites$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((favorites) => {
        this.favorites = favorites;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
