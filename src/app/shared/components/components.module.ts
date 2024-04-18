import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { EmptyListComponent } from './empty-list/empty-list.component';
import { ListHeaderComponent } from './list-header/list-header.component';
import { CharacterListComponent } from './character-list/character-list.component';
import { CharacterCardComponent } from './character-card/character-card.component';

@NgModule({
  declarations: [
    EmptyListComponent,
    ListHeaderComponent,
    CharacterListComponent,
    CharacterCardComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonToggleModule,
    MatIconModule,
  ],
  exports: [EmptyListComponent, ListHeaderComponent, CharacterListComponent],
})
export class ComponentsModule {}
