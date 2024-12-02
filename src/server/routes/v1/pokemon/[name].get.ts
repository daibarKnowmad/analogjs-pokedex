// /server/routes/v1/pokemon/[name].get.ts
import { defineEventHandler } from 'h3';

export default defineEventHandler(async (event) => {
  const name = event.context.params?.['name'];
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`, {
      method: 'GET',
      headers: {},
    });
    if (!response.ok) {
      throw new Error('Error al obtener el token');
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
