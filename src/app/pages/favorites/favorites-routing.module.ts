import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritesComponent } from './favorites.component';
import { AllFavoritesResolver } from 'src/app/core/resolver/all-favorites.resolver';

const routes: Routes = [
  {
    path: '',
    component: FavoritesComponent,
    resolve: {
      favorites: AllFavoritesResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavoritesRoutingModule {}
