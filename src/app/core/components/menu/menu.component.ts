import { Component } from '@angular/core';
import { FavoritesService } from '../../services/favorites.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  idsLength$: Observable<number>;

  constructor(private _favSerivce: FavoritesService) {
    this.idsLength$ = this._favSerivce.ids$.pipe(map((array) => array.length));
  }
}
