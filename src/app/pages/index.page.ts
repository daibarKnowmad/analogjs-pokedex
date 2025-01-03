import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StateService } from '../core/state.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="pokedex-container">
      <h1 class="pokedex-title">Pokedex with Analog</h1>
      @if (loading$()) { Loading... } @if (error$()) { An error has occurred:
      {{ 'Error al cargar el listado' }}
      } @if (list$(); as data) {

      <ul class="pokemon-list">
        @for (pokemon of data; track pokemon.name) {
        <li class="pokemon-item">
          <a [routerLink]="['/pokemon', pokemon.name]" class="pokemon-link">{{
            pokemon.name | titlecase
          }}</a>
        </li>
        } @empty {
        <li>No Pokemons found</li>
        }
      </ul>
      }
    </div>
  `,
  styles: [
    `
      .logo {
        will-change: filter;
      }
      .logo:hover {
        filter: drop-shadow(0 0 2em #646cffaa);
      }
      .read-the-docs > * {
        color: #fff;
      }

      @media (prefers-color-scheme: light) {
        .read-the-docs > * {
          color: #213547;
        }
      }

      .pokedex-container {
        max-width: 800px;
        margin: 0 auto;
        text-align: center;
        padding: 20px;
        background-color: #f4f4f4;
        border-radius: 10px;
        box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
      }

      .pokedex-title {
        font-size: 3rem;
        color: #ff0000; /* Rojo clásico de la Pokédex */
        margin-bottom: 20px;
      }

      .pokemon-list {
        list-style: none;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        gap: 15px;
      }

      .pokemon-item {
        background-color: white;
        border: 2px solid #ffcb05; /* Amarillo clásico */
        border-radius: 10px;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease;
      }

      .pokemon-item:hover {
        transform: scale(1.05);
      }

      .pokemon-link {
        display: block;
        padding: 15px;
        text-decoration: none;
        font-weight: bold;
        color: #2a75bb; /* Azul de la Pokédex */
        text-align: center;
      }

      .pokemon-link:hover {
        color: #ff0000; /* Rojo en hover */
      }
    `,
  ],
})
export default class HomeComponent implements OnInit {
  state = inject(StateService);

  list$ = this.state.list$;
  loading$ = this.state.loading$;
  error$ = this.state.error$;

  ngOnInit(): void {
    if (!this.list$().length) {
      // Solo se ejecuta si no hay datos prerenderizados
      this.state.getListAction();
    }
    this.state.getFavoritesAction();
  }
}

// Función para definir los slugs estáticos
// export const generateStaticParams = async () => {
//   const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
//   if (!response.ok) {
//     throw new Error('Error al obtener la lista de Pokémon');
//   }

//   const data = await response.json();

//   return data.results.map((pokemon: { name: string }) => ({
//     slug: pokemon.name, // Este slug debe coincidir con `params['slug']` en el loader
//   }));
// };

// // Generar contenido estático para la página principal
// export const generateStaticParams = async () => {
//   const stateService = new StateService();
//   await stateService.getListAction(); // Llama a la API y cachea los datos
//   return []; // No necesita parámetros dinámicos
// };

// Metadatos para SEO
export const generateMetadata = async () => ({
  title: 'Pokédex - Home',
  description: 'Explora la lista de Pokémon con esta Pokédex interactiva.',
});
