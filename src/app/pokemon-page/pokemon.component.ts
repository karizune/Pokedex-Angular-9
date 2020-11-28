import { Component, OnInit } from '@angular/core';
import { ExportService } from '../services/export.service';
import { PokeApiService } from '../services/poke-api.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {

  constructor(
    private PokeApi : PokeApiService,
    private Excel: ExportService
    ) { }

  pokemons : object[];
  exportPokemons: object[] = [];
  pokemon:object
  a:string;
  b:string;
  
  
  ngOnInit(): void {
    if(!localStorage.getItem("PokemonDataBase_Angular")){
      this.loadPokemonsDataBase();
    }
    else{
      this.pokemons = JSON.parse(localStorage.getItem("PokemonDataBase_Angular"));
    }
}

loadPokemonsDataBase(){
  this.PokeApi.getAllPokemons(2000).subscribe((data: object) => {
    this.pokemons = data['results'];
    this.pokemons.forEach(element => {
      var namePokemon = element['name'];
      this.PokeApi.getPokemonByName(namePokemon).subscribe(
        (data:object)=>{
          element['id'] = data['id'];
          element['weight'] = (data['weight'] / 10);
          element['height'] = data['height'];
          element['baseExp'] = data['base_experience'];
          if(data['sprites'] && data['sprites']['front_default']){
            element['sprite_front_url'] = data['sprites']['front_default'];
          }
          else{
            element['sprite_front_url'] = "Sem sprite";
          }
          if(data['types'] && data['types']['0']['type'] && data['types']['0']['type']['name']){
            element['type0'] = data['types']['0']['type']['name'];
          }
          else{
            element['type0'] = "Sem tipo primário"
          }
          if(data['types'] && data['types']['1'] && data['types']['1']['type'] && data['types']['1']['type']['name']){
            element['type1'] = data['types']['1']['type']['name'];
          }
          else{
            element['type1'] = "Sem tipo secundário"
          }
          //abilities
          if(data['abilities']['0'] && data['abilities']['0']['ability'] && data['abilities']['0']['ability']['name']){
            element['ability1'] = data['abilities']['0']['ability']['name'];
          }
          else{
            element['ability1'] = "Vazio";
          }
          if(data['abilities']['1'] && data['abilities']['1']['ability'] && data['abilities']['1']['ability']['name']){
            element['ability2'] = data['abilities']['1']['ability']['name'];
          }
          else{
            element['ability2'] = "Vazio";
          }
          //moves
          if(data['moves']['0'] && data['moves']['0']['move'] && data['moves']['0']['move']['name']){
            element['move1'] = data['moves']['0']['move']['name'];
          }
          else{
            element['move1'] = "Vazio";
          }
          if(data['moves']['1'] && data['moves']['1']['move'] && data['moves']['1']['move']['name']){
            element['move2'] = data['moves']['1']['move']['name'];
          }
          else{
            element['move2'] = "Vazio";
          }
          if(data['moves']['2'] && data['moves']['2']['move'] && data['moves']['2']['move']['name']){
            element['move3'] = data['moves']['2']['move']['name'];
          }
          else{
            element['move3'] = "Vazio";
          }
          if(data['moves']['3'] && data['moves']['3']['move'] && data['moves']['3']['move']['name']){
            element['move4'] = data['moves']['3']['move']['name'];
          }
          else{
            element['move4'] = "Vazio";
          }
          //pokemon species
          if(data['species'] && data['species']['url']){
            this.PokeApi.getPokemonSpeciesByUrl(data['species']['url']).subscribe(
              (species:object)=>{
                species['flavor_text_entries'].forEach(text_entry => {
                  if(text_entry['language']['name'] == "en"){
                    element['description'] = text_entry['flavor_text'];
                    this.a = text_entry['flavor_text'];
                  }
                });
                species['genera'].forEach(category => {
                  if(category['language']['name'] == "en"){
                    element['category'] = category['genus'];
                    this.b = category['genus'];
                  }
                });
                this.pokemon = {
                  Id:element['id'],
                  Nome:element['name'],
                  Descricao:element['description'],
                  Categoria:element['category'],
                  Experiencia_Base:element['baseExp'],
                  Peso:element['weight'],
                  Altura:element['height'],
                  Tipo_1:element['type0'],
                  Tipo_2:element['type1'],
                  Habilidade_1:element['ability1'],
                  Habilidade_2:element['ability2'],
                  Movimento_1:element['move1'],
                  Movimento_2:element['move2'],
                  Movimento_3:element['move3'],
                  Movimento_4:element['move4'],
                  Url_Pokemon:`https://pokeapi.co/api/v2/pokemon/${element['id']}`,
                  Url_Sprite: element['sprite_front_url']
                }
                this.exportPokemons.push(this.pokemon);
              });
            }
        });
    });
  });
}

export() {
  this.Excel.exportExcel(this.exportPokemons, 'Pokemons');
}

savelocal(){
  window.localStorage.setItem("PokemonDataBase_Angular", JSON.stringify(this.pokemons));
  alert("A lista foi salva em LocalStorage para recarregamento rápido");
}

atualizar(){
  localStorage.clear();
  this.loadPokemonsDataBase();
}

}