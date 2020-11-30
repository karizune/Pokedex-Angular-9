import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PokemonDetailsComponent } from './components/pokemon-details/pokemon-details.component';
import { PokemonComponent } from './components/pokemon-page/pokemon.component';

const routes: Routes = [
  {path:"", component: PokemonComponent},
  {path:"Pokemon", component: PokemonComponent},
  {path:"Pokemon/:PokemonName",  component: PokemonDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
