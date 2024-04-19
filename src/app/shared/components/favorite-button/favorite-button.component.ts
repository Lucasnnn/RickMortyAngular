import { FavoritesService } from 'src/app/core/services/favorites.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.component.html',
})
export class FavoriteButtonComponent implements OnInit {
  @Input() id: number;

  @Output() favorited = new EventEmitter<boolean>(false);

  favorite: boolean = false;

  constructor(private _favService: FavoritesService) {}

  ngOnInit(): void {
    this._favService.ids$.subscribe((ids) => {
      setTimeout(() => {
        this.favorite = ids.includes(this.id);

        this.favorited.emit(this.favorite);
      });
    });
  }

  toggle(): void {
    this.favorite = !this.favorite;

    if (this.favorite) {
      this.addToFavorites();
    } else {
      this.removeFromFavorites();
    }

    this.favorited.emit(this.favorite);
  }

  addToFavorites(): void {
    this._favService.addToFavorites(this.id);
  }

  removeFromFavorites(): void {
    this._favService.removeFromFavorites(this.id);
  }
}
