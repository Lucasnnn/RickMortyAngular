import { NgModule } from '@angular/core';
import { PagesRouting } from './pages/routing';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/components/layout/layout.component';
import { FavoritesIdsResolver } from './core/resolver/favorites-ids.resolver';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: '',
    component: LayoutComponent,
    resolve: {
      favoritesIds: FavoritesIdsResolver,
    },
    children: PagesRouting,
  },
  //
  { path: '**', pathMatch: 'full', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
