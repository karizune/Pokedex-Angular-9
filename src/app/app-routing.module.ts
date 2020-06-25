import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { PokemonComponent } from './pokemon-page/pokemon.component'

const routes: Routes = [
  {path:"", component: AppComponent},
  {path:"pokemon/:PokemonName",  component: PokemonComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
