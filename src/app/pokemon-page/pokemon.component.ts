import { Component, OnInit } from '@angular/core';
import { PokeApiService } from '../poke-api.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {

  constructor(private PokeApi : PokeApiService) { }
  pokemons : object[];

  ngOnInit(): void {
    this.PokeApi.getPokemons().subscribe((data: object) => {
      this.pokemons = data['results'];
      this.pokemons.forEach(element => {
        var urlPokemon = element['url'];
        this.PokeApi.getPokeSpritebyUrl(urlPokemon).subscribe((data:object) =>{
          console.log(data);
          element['sprites'] = data;
    }) 
      });
    })
  }
}
