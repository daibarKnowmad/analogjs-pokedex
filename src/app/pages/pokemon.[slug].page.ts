import { CommonModule } from '@angular/common';
import { Component, computed, inject, Input, OnInit } from '@angular/core';
import { StateService } from '../core/state.service';
import { Router } from '@angular/router';

// Función para definir los slugs estáticos
export const generateStaticParams = async () => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
  if (!response.ok) {
    throw new Error('Error al obtener la lista de Pokémon');
  }

  const data = await response.json();
  return data.results.map((pokemon: { name: string }) => ({
    slug: pokemon.name, // Este slug debe coincidir con `params['slug']` en el loader
  }));
};

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [CommonModule],
  template: `
    @let pokemon = pokemon$();
    <div *ngIf="pokemon">
      <button (click)="goBack()"><- Go back</button>
      <div class="pokemon-detail-container" *ngIf="pokemon">
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
      </div>

      <button
        *ngIf="isFavorite$()"
        (click)="deleteFavorite(pokemon.id, pokemon.name)"
      >
        Remove favorite
      </button>

      <button
        *ngIf="!isFavorite$()"
        (click)="addFavorite(pokemon.id, pokemon.name)"
      >
        Add favorite
      </button>
    </div>
  `,
  styles: [
    `
      .pokemon-detail-container {
        max-width: 600px;
        margin: 40px auto;
        padding: 20px;
        background-color: #f4f4f4;
        border-radius: 10px;
        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
        text-align: center;
      }

      .pokemon-name {
        font-size: 3rem;
        color: #ff0000; /* Rojo clásico */
        margin-bottom: 20px;
      }

      .pokemon-info {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .pokemon-image {
        width: 150px;
        height: 150px;
        margin-bottom: 20px;
      }

      .pokemon-stats {
        font-size: 1.2rem;
        color: #333;
      }

      .pokemon-stats p {
        margin: 10px 0;
      }

      .pokemon-type {
        display: inline-block;
        background-color: #2a75bb; /* Azul */
        color: white;
        padding: 5px 10px;
        margin: 0 5px;
        border-radius: 20px;
        font-size: 1rem;
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

  ngOnInit() {
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
