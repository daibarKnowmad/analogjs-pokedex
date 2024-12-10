import { computed, inject, Injectable, signal } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { catchError, first, of, tap } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';

interface AppState {
  list: any[];
  loading: boolean;
  error: boolean;
  favorites: any[];
  pokemon: any | null;
}

@Injectable({ providedIn: 'root' })
export class StateService {
  private service = inject(PokemonService);
  private meta = inject(Meta);
  private title = inject(Title);

  private _state = signal<AppState>({
    list: [],
    loading: false,
    error: false,
    favorites: [],
    pokemon: null,
  });

  readonly list$ = computed(() => this._state().list);
  readonly loading$ = computed(() => this._state().loading);
  readonly error$ = computed(() => this._state().error);
  readonly favorites$ = computed(() => this._state().favorites);
  readonly pokemon$ = computed(() => this._state().pokemon);

  // /////////////////////////////////////////
  // Pokemon List
  // /////////////////////////////////////////

  getListAction() {
    this.getListEffect();
  }

  private getListEffect() {
    this.service
      .getPokemonList()
      .pipe(
        first(),
        catchError(() => of({ results: [] })),
        tap((list: any) => this.setListReducer(list))
      )
      .subscribe();
  }

  private setListReducer(list: any[]) {
    this._state.update((state) => ({
      ...state,
      list,
      pokemon: null,
    }));
  }

  // /////////////////////////////////////////
  // Pokemon Favorites
  // /////////////////////////////////////////

  getFavoritesAction() {
    this.getFavoritesEffect();
  }

  addFavoritesAction(pokemonId: number, name: string) {
    this.addFavoritesEffect(pokemonId, name);
  }

  deleteFavoritesAction(pokemonId: number, name: string) {
    this.deleteFavoritesEffect(pokemonId, name);
  }

  private getFavoritesEffect() {
    this.service
      .getFavorites()
      .pipe(
        first(),
        catchError(() => of([])),
        tap((favorites: any) => this.setFavoritesReducer(favorites))
      )
      .subscribe();
  }

  private addFavoritesEffect(pokemonId: number, name: string) {
    this.service
      .addFavorite(pokemonId, name)
      .pipe(
        first(),
        catchError(() => of([])),
        tap(() => this.addFavoritesReducer(pokemonId, name))
      )
      .subscribe();
  }

  private deleteFavoritesEffect(pokemonId: number, name: string) {
    this.service
      .deleteFavorite(pokemonId, name)
      .pipe(
        first(),
        catchError(() => of([])),
        tap(() => this.deleteFavoritesReducer(pokemonId, name))
      )
      .subscribe();
  }

  private setFavoritesReducer(favorites: any[]) {
    this._state.update((state) => ({
      ...state,
      favorites,
    }));
  }

  private addFavoritesReducer(pokemonId: number, name: string) {
    this._state.update((state) => ({
      ...state,
      favorites: [...state.favorites, { pokemonId, name }],
    }));
  }

  private deleteFavoritesReducer(pokemonId: number, name: string) {
    this._state.update((state) => ({
      ...state,
      favorites: [
        ...state.favorites.filter((pokemon) => pokemon.pokemonId !== pokemonId),
      ],
    }));
  }

  // /////////////////////////////////////////
  // Pokemon Info
  // /////////////////////////////////////////

  getPokemonAction(name: string) {
    this.getPokemonEffect(name);
  }

  getPokemonDetail(name: string) {
    return this.service.getPokemon(name).pipe(
      first(),
      catchError(() => of(null)),
      tap((pokemon: any | null) => pokemon)
    );
  }

  private getPokemonEffect(name: string) {
    this.service
      .getPokemon(name)
      .pipe(
        first(),
        catchError(() => of(null)),
        tap((pokemon: any | null) => this.setPokemonReducer(pokemon))
      )
      .subscribe();
  }

  private setPokemonReducer(pokemon: any | null) {
    this.title.setTitle(`Pokédex - ${pokemon.name}`);
    this.meta.addTags([
      { name: 'description', content: `Details about ${pokemon.name}` },
      { name: 'keywords', content: `pokemon, pokedex, ${pokemon.name}` },
    ]);

    this._state.update((state) => ({
      ...state,
      pokemon,
    }));
  }
}
