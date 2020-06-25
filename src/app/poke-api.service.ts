import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
      return this.http.get(`${this.env}pokemon/?limit=${limit}&offset=${offset}`);
    }
}
