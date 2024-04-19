import { Observable, takeUntil } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FavoritesService } from 'src/app/core/services/favorites.service';
import { Character } from 'src/app/shared/models/character.type';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  favorites$: Observable<Character[]>;

  constructor(private _favService: FavoritesService) {}

  ngOnInit(): void {
    this.favorites$ = this._favService.favorites$;
  }
}
