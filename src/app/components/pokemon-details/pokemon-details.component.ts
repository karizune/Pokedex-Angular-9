import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent implements OnInit {

  pokemons:object[] = [];
  pokemon:object;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.pokemons = JSON.parse(localStorage.getItem("PokemonDataBase_Angular"));
    this.route.paramMap.subscribe(params => {
      this.pokemon = this.pokemons[+params.get('name')];
    });
  }



}
