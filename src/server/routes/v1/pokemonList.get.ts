// /server/routes/v1/pokemonList.get.ts
import { defineEventHandler } from 'h3';

export default defineEventHandler(async (event) => {
  const limit = 150;
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}`,
      {
        method: 'GET',
        headers: {},
      }
    );
    if (!response.ok) {
      throw new Error('Error al obtener el listado');
    }

    const data = await response.json();

    return {
      ...data,
    };
  } catch (error) {
    return {
      error: 'No se pudo obtener el la lista',
    };
  }
});
