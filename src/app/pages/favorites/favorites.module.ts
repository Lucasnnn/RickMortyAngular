import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesComponent } from './favorites.component';
import { FavoritesRoutingModule } from './favorites-routing.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';

@NgModule({
  declarations: [FavoritesComponent],
  imports: [FavoritesRoutingModule, CommonModule, ComponentsModule],
})
export class FavoritesModule {}
