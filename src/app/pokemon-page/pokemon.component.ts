import { Component, OnInit } from '@angular/core';
import { PokeApiService } from '../poke-api.service';
import { ExportService } from '../services/export.service';

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
  pokemon:object = {
    id:'',
    name:'',
    Tipo:'',
    Peso:'',
    Altura:'',
    Habilidade_1:'',
    Habilidade_2:'',
    Habilidade_3:'',
    Habilidade_4:'',
    Movimento_1:'',
    Movimento_2:'',
    Movimento_3:'',
    Movimento_4:'',
    Experiencia_Base:'',
    Url:''
  }

  ngOnInit(): void {
    this.PokeApi.getAllPokemons(1100).subscribe((data: object) => {
      this.pokemons = data['results'];
      this.pokemons.forEach(element => {
        var namePokemon = element['name'];
        this.PokeApi.getPokemonByName(namePokemon).subscribe((data:object)=>{
          element['id'] = data['id'];
          element['weight'] = (data['weight'] / 10);
          element['height'] = data['height'];
          element['baseExp'] = data['base_experience'];
          element['type'] = data['types']['0']['type']['name'];
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
          if(data['abilities']['2'] && data['abilities']['2']['ability'] && data['abilities']['2']['ability']['name']){
            element['ability3'] = data['abilities']['2']['ability']['name'];
          }
          else{
            element['ability3'] = "Vazio";
          }
          if(data['abilities']['3'] && data['abilities']['3']['ability'] && data['abilities']['3']['ability']['name']){
            element['ability4'] = data['abilities']['3']['ability']['name'];
          }
          else{
            element['ability4'] = "Vazio";
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
          this.pokemon = {
            id:element['id'],
            name:element['name'],
            Tipo:element['type'],
            Peso:element['weight'],
            Altura:element['height'],
            Habilidade_1:element['ability1'],
            Habilidade_2:element['ability2'],
            Habilidade_3:element['ability3'],
            Habilidade_4:element['ability4'],
            Movimento_1:element['move1'],
            Movimento_2:element['move2'],
            Movimento_3:element['move3'],
            Movimento_4:element['move4'],
            Experiencia_Base:element['baseExp'],
            Url:`https://pokeapi.co/api/v2/${element['id']}`
          }
          this.exportPokemons.push(this.pokemon);
        });
      });
    });
  }
  export() {
    this.Excel.exportExcel(this.pokemons, 'Pokemons');
  }
  
}

