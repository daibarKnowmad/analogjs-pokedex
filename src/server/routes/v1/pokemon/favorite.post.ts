// /server/routes/v1/pokemon/[name].get.ts
import { defineEventHandler, readBody } from 'h3';
import prisma from '../../../prisma';

export default defineEventHandler(async (event) => {
  try {
    // Leer el cuerpo de la solicitud
    const body = await readBody(event);

    if (!body || !body.pokemonId || !body.name) {
      return {
        error: 'Faltan parámetros',
      };
    }

    // Añadir el Pokémon favorito a la base de datos
    const favorite = await prisma.favoritePokemon.create({
      data: {
        pokemonId: body.pokemonId,
        name: body.name,
      },
    });

    return {
      message: 'Pokémon añadido a favoritos',
      favorite,
    };
  } catch (error) {
    return {
      error: 'No se pudo añadir el Pokémon a favoritos',
    };
  }
});
