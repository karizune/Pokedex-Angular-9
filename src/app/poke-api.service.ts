import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import {environment} from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {
  env : string = environment.apiUrl;
  constructor(
    private http: HttpClient) { }

    getPokemons(){
      return this.http.get(`${this.env}/pokemon`);
    }

    getAllPokemons(limit?:number,offset?:number) {
      return this.http.get(`${this.env}/pokemon/?limit=${limit}&offset=${offset}`);
    }

    getPokemonById(PokemonId:number){
      return this.http.get(`${this.env}/pokemon/${PokemonId}`);
    }

    getPokeApiUrl(url:string){
      return this.http.get(url)
    }

    getPokeSpritebyUrl(url:string){
      return this.http.get(url).pipe(
        map((poke_info: object[]) => poke_info['sprites'])
      );
    }
    getPokemonByName(name:string){
      return this.http.get(`${this.env}/pokemon/${name}`);
    }

    getPokemonSpeciesByName(name:string){
      return this.http.get(`${this.env}/pokemon-species/${name}`);
    }
    
    getCharacteristicsById(id:number){
      return this.http.get(`${this.env}/characteristic/${id}`) == undefined ? "sem dados" : this.http.get(`${this.env}/characteristic/${id}`);
    }
}