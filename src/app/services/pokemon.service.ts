import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PokemonService {
  constructor(private httpClient: HttpClient) {}

  getPokemonList(): any {
    return this.httpClient
      .get('/api/v1/pokemonList')
      .pipe(map((response: any) => response.results));
  }

  getPokemon(name: string) {
    return this.httpClient.get(`/api/v1/pokemon/${name}`);
  }

  // Añadir un Pokémon a favoritos
  addFavorite(pokemonId: number, name: string): Observable<any> {
    return this.httpClient.post('/api/v1/pokemon/favorite', {
      pokemonId,
      name,
    });
  }

  // Eliminar un Pokémon de favoritos
  deleteFavorite(pokemonId: number, name: string): Observable<any> {
    return this.httpClient.delete('/api/v1/pokemon/favorite', {
      body: { pokemonId, name },
    });
  }

  // Obtener la lista de favoritos
  getFavorites() {
    return this.httpClient
      .get('/api/v1/pokemon/favorites')
      .pipe(map((response: any) => response.favorites));
  }
}
