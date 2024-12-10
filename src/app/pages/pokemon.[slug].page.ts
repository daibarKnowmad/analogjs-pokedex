import { CommonModule } from '@angular/common';
import { Component, computed, inject, Input, OnInit } from '@angular/core';
import { StateService } from '../core/state.service';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';
import { MarkdownComponent } from '@analogjs/content';

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
  imports: [CommonModule],
  template: `
    @let pokemon = pokemon$();

    <div *ngIf="pokemon" style="width: 590px;">
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

      <div>
        <div class="mention">
          <div id="pokedex">
            <!-- Left Panel -->
            <div id="left-panel">
              <!-- Top lights -->
              <div class="left-top-container">
                <svg height="100" width="225" class="left-svg">
                  <polyline
                    points="0,75 70,75 90,38 224,38"
                    style="fill: none; stroke: black; stroke-width: 3"
                  />
                </svg>
                <div class="lights-container">
                  <div class="big-light-boarder">
                    <div class="big-light blue">
                      <div class="big-dot light-blue"></div>
                    </div>
                  </div>
                  <div class="small-lights-container">
                    <div class="small-light red">
                      <div class="dot light-red"></div>
                    </div>
                    <div class="small-light yellow">
                      <div class="dot light-yellow"></div>
                    </div>
                    <div class="small-light green">
                      <div class="dot light-green"></div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Center Screen -->
              <div class="screen-container">
                <div class="screen">
                  <div class="top-screen-lights">
                    <div class="mini-light red"></div>
                    <div class="mini-light red"></div>
                  </div>
                  <div id="main-screen">
                    <img
                      [src]="pokemon.sprites.front_default"
                      alt="{{ pokemon.name }} image"
                      class="pokemon-image"
                    />
                  </div>
                  <div class="bottom-screen-lights">
                    <div class="small-light red">
                      <div class="dot light-red"></div>
                    </div>
                    <div class="burger">
                      <div class="line"></div>
                      <div class="line"></div>
                      <div class="line"></div>
                      <div class="line"></div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Bottom Buttons -->
              <div class="buttons-container">
                <div class="upper-buttons-container">
                  <div class="big-button"></div>
                  <div class="long-buttons-container">
                    <div class="long-button red"></div>
                    <div class="long-button light-blue"></div>
                  </div>
                </div>
                <div class="nav-buttons-container">
                  <div class="dots-container">
                    <div>.</div>
                    <div>.</div>
                  </div>
                  <div class="green-screen">
                    <span id="name-screen">{{ pokemon.name | titlecase }}</span>
                  </div>
                  <div class="right-nav-container">
                    <div class="nav-button">
                      <div class="nav-center-circle"></div>
                      <div class="nav-button-vertical"></div>
                      <div class="nav-button-horizontal">
                        <div class="border-top"></div>
                        <div class="border-bottom"></div>
                      </div>
                    </div>
                    <div class="bottom-right-nav-container">
                      <div class="small-light red">
                        <div class="dot light-red"></div>
                      </div>
                      <div class="dots-container">
                        <div class="black-dot">.</div>
                        <div class="black-dot">.</div>
                        <div class="black-dot">.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- End of Left panel -->

            <!-- Right-panel -->
            <div id="right-panel">
              <!-- Blank container -->
              <div class="empty-container">
                <svg height="100%" width="100%">
                  <polyline
                    points="0,0 0,40 138,40 158,75 350,75 350,0 0,0"
                    style="fill: #242424; stroke: none; stroke-width: 3"
                  />
                  <polyline
                    points="0,40 138,40 158,75 350,75"
                    style="fill: none; stroke: black; stroke-width: 3"
                  />
                </svg>
              </div>
              <!-- Top screen -->
              <div class="top-screen-container">
                <div id="about-screen" class="right-panel-screen">
                  Height: {{ pokemon.height }} Weight: {{ pokemon.weight }}
                </div>
              </div>
              <!-- Blue Buttons -->
              <div class="square-buttons-container">
                <div class="blue-squares-container">
                  <div class="blue-square"></div>
                  <div class="blue-square"></div>
                  <div class="blue-square"></div>
                  <div class="blue-square"></div>
                  <div class="blue-square"></div>
                  <div class="blue-square"></div>
                  <div class="blue-square"></div>
                  <div class="blue-square"></div>
                  <div class="blue-square"></div>
                  <div class="blue-square"></div>
                </div>
              </div>
              <!-- Center Buttons -->
              <div class="center-buttons-container">
                <div class="center-left-container">
                  <div class="small-reds-container">
                    <div class="small-light red">
                      <div class="dot light-red"></div>
                    </div>
                    <div class="small-light red">
                      <div class="dot light-red"></div>
                    </div>
                  </div>
                  <div class="white-squares-container">
                    <div class="white-square"></div>
                    <div class="white-square"></div>
                  </div>
                </div>
                <div class="center-right-container">
                  <div class="thin-buttons-container">
                    <div class="thin-button"></div>
                    <div class="thin-button"></div>
                  </div>
                  <div class="yellow-button yellow">
                    <div class="big-dot light-yellow"></div>
                  </div>
                </div>
              </div>
              <!-- Bottom screens -->
              <div class="bottom-screens-container">
                <div id="type-screen" class="right-panel-screen">
                  {{ pokemon.types[0].type.name | titlecase }}
                </div>
                <div id="id-screen" class="right-panel-screen">
                  #{{ pokemon.id }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .buttons-container-data {
        display: flex;
        justify-content: space-between;
      }
      .pokemon-image {
        width: 100%;
        margin-bottom: 20px;
      }

      .red {
        background-color: #ff0000;
      }
      .yellow {
        background-color: #fecb65;
      }
      .green {
        background-color: #32cb65;
      }
      .blue {
        background-color: #3298cb;
      }

      .light-blue {
        background-color: #85bdfe;
      }
      .light-red {
        background-color: #fe98cb;
      }
      .light-yellow {
        background-color: #fefecb;
      }
      .light-green {
        background-color: #98fe00;
      }

      .ball-container:hover {
        cursor: pointer;
        animation-play-state: running;
      }
      .upper-half-ball {
        position: absolute;
        width: 100%;
        height: 42%;
        background-color: var(--main-bg-color);
      }

      .bottom-half-ball {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 42%;
        background-color: var(--secondary-bg-color);
      }

      .center-ball {
        background-color: white;
        width: 20%;
        height: 20%;
        border: 2px solid black;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      .center-line {
        background: black;
        height: 100%;
        width: 100%;
      }

      input {
        text-align: center;
        height: 40px;
        border-radius: 4px;
        margin-right: 10px;
      }
      /* poke-dex */
      #pokedex {
        height: 450px;
        width: calc(300px * 2);
        display: flex;
        border-radius: 10px;
        background: red;
      }

      @media only screen and (max-width: 600px) {
        #pokedex {
          width: 90%;
        }
      }

      /* LEFT PANEL */
      #left-panel {
        background-color: var(--main-bg-color);
        box-sizing: border-box;
        height: 100%;
        width: 50%;
        display: grid;
        grid-template-rows: 23% 50% 27%;
        border: solid black 3px;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        border-top-right-radius: 7px;
      }
      /* Top Lights */

      .lights-container {
        position: relative;
        display: flex;
        justify-content: start;
        align-items: center;
      }

      .left-svg {
        position: absolute;
        z-index: +5;
      }

      .big-light-boarder {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 5px;
        height: 60px;
        width: 60px;
        border: solid black;
        border-radius: 50%;
        background-color: white;
      }

      .big-light {
        height: 50px;
        width: 50px;
        border-radius: 50%;
        border: solid black;
      }

      .big-dot {
        height: 15px;
        width: 15px;
        position: relative;
        top: 7px;
        left: 10px;
        border-radius: 50%;
      }

      .small-lights-container {
        margin-left: 15px;
        margin-top: 10px;
        width: 70px;
        height: 100%;
        display: flex;
        align-self: start;
        justify-content: space-around;
      }

      .small-light {
        border: solid black;
        width: 16px;
        height: 16px;
        border-radius: 50%;
      }
      .dot {
        height: 5px;
        width: 5px;
        position: relative;
        top: 3px;
        left: 3px;
        border-radius: 50%;
      }

      /* Center Screen */

      .screen-container {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .screen {
        width: 200px;
        height: 200px;
        border: solid black;
        border-radius: 0 0 0 17%;
        display: grid;
        grid-template-rows: 10% 72% 18%;
        background-color: white;
      }

      .top-screen-lights {
        width: 50%;
        margin-top: 2px;
        display: flex;
        justify-self: center;
        justify-content: center;
        align-items: center;
      }

      .mini-light {
        border: solid black 1px;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        margin-right: 7px;
      }

      #main-screen {
        height: 100%;
        width: 80%;
        justify-self: center;
        background-color: var(--main-screen-bg-color);
        border: solid black 2px;
        border-radius: 5%;

        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
      }

      .bottom-screen-lights {
        display: flex;
        margin-top: 5px;
        width: 75%;
        justify-self: center;
        justify-content: space-between;
        align-items: center;
      }

      .bottom-screen-lights .small-light {
        border: solid black 2px;
        width: 12px;
        height: 12px;
      }

      .bottom-screen-lights .dot {
        height: 4px;
        width: 4px;
        top: 2.5px;
        left: 2px;
      }

      .line {
        width: 18px;
        height: 2px;
        background-color: black;
        margin-top: 2px;
      }

      /*Bottom buttons  */

      .buttons-container {
        display: grid;
        grid-template-rows: 40% 60%;
      }

      .big-button {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        border: solid 2px black;
        background-color: var(--main-buttons-color);
        margin-left: 7px;
      }

      .long-button {
        width: 35px;
        height: 2px;
        border-radius: 50px;
        border: 2px solid black;
      }

      .green-screen {
        width: 115px;
        height: 30px;
        border-radius: 5px;
        border: solid black 2px;
        background-color: #3ab47d;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      #name-screen {
        width: 100%;

        text-align: center;
        font-size: 14px;
        overflow-wrap: break-word;
      }

      .circle {
        width: 4px;
        height: 4px;
        border-radius: 50%;
        border: 1px solid black;
      }

      .upper-buttons-container {
        display: flex;
        align-items: top;
        justify-content: start;
      }

      .long-buttons-container {
        display: flex;
        width: 100px;
        justify-content: space-around;
        margin-left: 7px;
      }

      .nav-buttons-container {
        display: grid;
        grid-template-columns: 27% 35% 38%;
      }

      .dots-container {
        height: 100%;
        width: 50%;
        display: flex;
        justify-self: center;
        justify-content: space-between;
        font-size: x-large;
      }

      .right-nav-container {
        position: relative;
        top: -30px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      .nav-button {
        height: 52px;
        width: 52px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .nav-button-vertical {
        position: absolute;
        transform: rotate(90deg);
        background-color: var(--main-buttons-color);
        border-radius: 5px;
        height: 12px;
        width: 52px;
        border: 2px solid black;
      }

      .nav-button-horizontal {
        position: absolute;
        background-color: var(--main-buttons-color);
        border-radius: 5px;
        height: 12px;
        width: 52px;
        border: 2px solid black;
      }

      .nav-center-circle {
        height: 5px;
        width: 5px;
        border-radius: 50%;
        border: solid black 2px;
        z-index: +2;
      }

      .border-top {
        border-top: 3.5px solid var(--main-buttons-color);
        position: absolute;
        top: -3px;
        left: 20px;
        right: 19.5px;
      }
      .border-bottom {
        border-top: 3.5px solid var(--main-buttons-color);
        position: absolute;
        top: 11px;
        left: 20px;
        right: 19.5px;
      }

      .bottom-right-nav-container {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
      }

      .bottom-right-nav-container .dots-container {
        align-items: center;
        justify-content: center;
      }

      .bottom-right-nav-container .small-light {
        border: solid black 2px;
        width: 7px;
        height: 7px;
        margin-right: 3px;
        margin-top: 10px;
      }

      .bottom-right-nav-container .dot {
        height: 2.5px;
        width: 2.5px;
        top: 1.5px;
        left: 1.5px;
      }

      /* RIGHT PANEL */

      #right-panel {
        background-color: var(--main-bg-color);
        box-sizing: border-box;
        position: relative;
        height: 100%;
        width: 50%;
        display: grid;
        grid-template-rows: 24% repeat(4, 19%);
        border-bottom: solid black 3px;
        border-bottom-right-radius: 10px;
      }
      #right-panel::before {
        content: '';
        position: absolute;
        left: -3px;
        bottom: 0;
        width: 100%;
        height: 265px;
        border-right: solid black 3px;
        border-bottom-right-radius: 7px;
      }
      /* top screen */
      .top-screen-container {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .right-panel-screen {
        width: 146px;
        height: 64px;
        background-color: var(--secondary-screen-bg-color);
        border: solid black 2px;
        border-radius: 4px;
        font-size: 18px;
        padding-left: 2px;
        padding-right: 2px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: left;
        padding-left: 8px;
        line-height: 1.5;
      }

      /* square buttons grid */
      .square-buttons-container {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .blue-squares-container {
        width: 146px;
        height: 60px;
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: repeat(2, 1fr);
      }
      .blue-square {
        border-radius: 2px;
        border: black 1.5px solid;
        background-color: #3298cb;
        box-shadow: inset -2px -2px #3298cb;
      }

      /* center buttons */
      .center-buttons-container {
        display: flex;
        justify-content: space-around;
      }

      .center-left-container {
        display: grid;
      }

      .small-reds-container {
        display: flex;
        align-items: center;
        justify-content: start;
      }
      .small-reds-container .small-light {
        border: solid black 2px;
        width: 7px;
        height: 7px;
        margin-right: 10px;
        margin-top: 10px;
      }
      .small-reds-container .dot {
        height: 2.5px;
        width: 2.5px;
        top: 1px;
        left: 1px;
      }

      .white-squares-container {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .white-square {
        width: 25px;
        height: 25px;
        border-radius: 5px;
        border: black 2px solid;
        background-color: #ffffff;
        box-shadow: inset -2px -2px gray;
      }

      .center-right-container {
        display: grid;
      }

      .thin-buttons-container {
        display: flex;
        justify-content: space-between;
      }

      .thin-button {
        width: 35px;
        height: 2px;
        border: 2px solid black;
        background-color: var(--main-buttons-color);
        margin-left: 10px;
      }
      .yellow-button {
        justify-self: end;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        border: solid 2px black;
        margin-left: 7px;
      }

      .yellow-button .big-dot {
        height: 7px;
        width: 7px;
        position: relative;
        top: 3px;
        left: 5px;
        border-radius: 50%;
      }

      /* bottom screens */

      .bottom-screens-container {
        display: flex;
        justify-content: space-around;
        align-items: center;
      }

      .bottom-screens-container .right-panel-screen {
        width: 100px;
        height: 25px;
      }

      .mention {
        margin-top: 10px;
        width: 450px;
        display: grid;
        text-align: center;
        font-size: x-large;
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
