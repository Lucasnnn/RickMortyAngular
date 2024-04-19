import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EmptyListComponent } from './empty-list/empty-list.component';
import { ListHeaderComponent } from './list-header/list-header.component';
import { CharacterListComponent } from './character-list/character-list.component';
import { CharacterCardComponent } from './character-card/character-card.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FavoriteButtonComponent } from './favorite-button/favorite-button.component';

@NgModule({
  declarations: [
    EmptyListComponent,
    ListHeaderComponent,
    CharacterListComponent,
    CharacterCardComponent,
    FavoriteButtonComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonToggleModule,
    MatIconModule,
    InfiniteScrollModule,
    MatButtonModule,
  ],
  exports: [
    EmptyListComponent,
    ListHeaderComponent,
    CharacterListComponent,
    FavoriteButtonComponent,
  ],
})
export class ComponentsModule {}
