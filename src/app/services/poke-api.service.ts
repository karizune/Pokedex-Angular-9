import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {
  PokeApiUrl : string = environment.apiUrl;
  constructor(
    private http: HttpClient) { }

    getPokemons(){
      try{
        return this.http.get(`${this.PokeApiUrl}/pokemon`);
      }catch{
        return null;
      }
    }

    getAllPokemons(limit?:number,offset?:number) {
      try{
        return this.http.get(`${this.PokeApiUrl}/pokemon/?limit=${limit}&offset=${offset}`);
      }catch{
        return null;
      }
    }

    getPokemonById(PokemonId:number){
      try{
        return this.http.get(`${this.PokeApiUrl}/pokemon/${PokemonId}`);
      }catch{
        return null;
      }
    }

    getPokeApiUrl(url:string){
      try{
        return this.http.get(url)
      }catch{
        return null;
      }
    }

    getPokeSpritebyUrl(url:string){
      try{
        return this.http.get(url).pipe(
          map((poke_info: object[]) => poke_info['sprites'])
          );
        }catch{
          return null;
        }
    }
    getPokemonByName(name:string){
      try{
        return this.http.get(`${this.PokeApiUrl}/pokemon/${name}`);
      }catch{
        return null;
      }
    }

    getPokemonSpeciesByName(name:string)
    { 
      return this.http.get(`${this.PokeApiUrl}/pokemon-species/${name}`);
    }
    
    getCharacteristicsById(id:number){
      try{
        return this.http.get(`${this.PokeApiUrl}/characteristic/${id}`) == undefined ? "sem dados" : this.http.get(`${this.PokeApiUrl}/characteristic/${id}`);
      }catch{
        return null;
      }
    }

    getPokemonSpeciesByUrl(url:string){
      return this.http.get(url);
    }
}