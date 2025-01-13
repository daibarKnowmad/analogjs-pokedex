import { CommonModule } from '@angular/common';
import { Component, computed, inject, Input, OnInit } from '@angular/core';
import { StateService } from '../core/state.service';
import { Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { PokedexComponent } from '../shared/components/pokedex/pokedex.component';
import { LoaderComponent } from '../shared/components/loader/loader.component';

// // Función para definir los slugs estáticos
// export const generateStaticParams = async () => {
//   const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
//   if (!response.ok) {
//     throw new Error('Error al obtener la lista de Pokémon');
//   }

//   const data = await response.json();
//   console.warn(data);

//   return data.results.map((pokemon: { name: string }) => ({
//     slug: pokemon.name, // Este slug debe coincidir con `params['slug']` en el loader
//   }));
// };

export interface PokemonAttributes {
  title: string;
  slug: string;
  description: string;
  coverImage: string;
}

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [CommonModule, PokedexComponent, LoaderComponent],
  template: `
    @let pokemon = pokemon$(); @if (pokemon) {
    <div style="width: 590px;">
      <!-- <div class="pokemon-detail-container" *ngIf="pokemon">
        <h1 class="pokemon-name">{{ pokemon.name | titlecase }}</h1>
        <div class="pokemon-info">
          <img
            [src]="pokemon.sprites.front_default"
            alt="{{ pokemon.name }} image"
            class="pokemon-image"
          />
          <div class="pokemon-stats">
            <p><strong>Height:</strong> {{ pokemon.height }} dm</p>
            <p><strong>Weight:</strong> {{ pokemon.weight }} hg</p>
            <p>
              <strong>Types:</strong>
              <span *ngFor="let type of pokemon.types" class="pokemon-type">{{
                type.type.name | titlecase
              }}</span>
            </p>
          </div>
        </div>
      </div> -->

      <div class="buttons-container-data">
        <button (click)="goBack()"><- Go back</button>

        @if (isFavorite$()) {
        <button (click)="deleteFavorite(pokemon.id, pokemon.name)">
          Remove favorite</button
        >} @else {
        <button (click)="addFavorite(pokemon.id, pokemon.name)">
          Add favorite
        </button>
        }
      </div>

      <div>
        <app-pokedex [pokemon]="pokemon" />
      </div>
    </div>
    } @else {
    <app-loader />
    }
  `,
  styles: [
    `
      .buttons-container-data {
        display: flex;
        justify-content: space-between;
      }
    `,
  ],
})
export default class PokemonPageComponent implements OnInit {
  @Input() slug!: string;

  state = inject(StateService);
  router = inject(Router);

  pokemon$ = this.state.pokemon$;
  favorites$ = this.state.favorites$;

  isFavorite$ = computed(() =>
    this.favorites$().some((favorite) => favorite.name === this.slug)
  );
  constructor(private meta: Meta, private title: Title) {}

  ngOnInit() {
    this.title.setTitle(`Pokédex`);

    this.state.getFavoritesAction();
    this.state.getPokemonAction(this.slug);
  }

  addFavorite(pokemonId: number, name: string) {
    this.state.addFavoritesAction(pokemonId, name);
  }

  deleteFavorite(pokemonId: number, name: string) {
    this.state.deleteFavoritesAction(pokemonId, name);
  }

  goBack(): void {
    this.router.navigateByUrl('');
  }
}

// Generar contenido estático para las páginas de detalles
// export const generateStaticParams = async () => {
//   const stateService = new StateService();
//   await stateService.getListAction(); // Asegura que la lista ya esté cargada
//   return stateService.list$().map((pokemon: any) => ({
//     slug: pokemon.name,
//   }));
// };

// Metadatos para SEO dinámicos
// export const generateMetadata = async ({ params }: { params: { slug: string } }) => {
//   const stateService = new StateService();
//   const pokemon = await stateService.getPokemonDetail(params.slug).subscribe(map((pokemon) => pokemon ));

//   return {
//     title: `${pokemon.name} - Pokédex`,
//     description: `Conoce más sobre ${pokemon.name}: altura ${pokemon.height}, peso ${pokemon.weight}.`,
//   };
// };
