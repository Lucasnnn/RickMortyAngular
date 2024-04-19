import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { AllCharactersResolver } from 'src/app/core/resolver/all-characters.resolver';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: {
      characters: AllCharactersResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
