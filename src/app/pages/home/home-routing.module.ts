import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { GetAllCharactersResolver } from 'src/app/core/resolver/get-all-characters.resolver';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: {
      characters: GetAllCharactersResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
