// /server/routes/v1/pokemon/[name].get.ts
import { defineEventHandler } from 'h3';
import prisma from '../../../../lib/prisma';

export default defineEventHandler(async (event) => {
  try {
    // Obtener todos los Pokémon favoritos de la base de datos
    const favorites = await prisma.favoritePokemon.findMany();

    return {
      favorites,
    };
  } catch (error) {
    return {
      error: 'No se pudieron obtener los Pokémon favoritos',
    };
  }
});
