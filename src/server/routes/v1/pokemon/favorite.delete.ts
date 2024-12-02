// /server/routes/v1/pokemon/[name].get.ts
import { defineEventHandler, readBody } from 'h3';
import prisma from '../../../../lib/prisma';

export default defineEventHandler(async (event) => {
  try {
    // Leer el cuerpo de la solicitud
    const body = await readBody(event);

    if (!body || !body.pokemonId || !body.name) {
      return {
        error: 'Faltan parámetros',
      };
    }

    console.warn(body);

    // Añadir el Pokémon favorito a la base de datos
    const favorite = await prisma.favoritePokemon.deleteMany({
      where: {
        pokemonId: body.pokemonId,
        name: body.name,
      },
    });

    console.warn('asdasd', favorite);

    return {
      message: 'Pokémon eliminado de favoritos',
      favorite,
    };
  } catch (error) {
    console.warn(error);

    return {
      error: 'No se pudo eliminar el Pokémon de favoritos',
    };
  }
});
