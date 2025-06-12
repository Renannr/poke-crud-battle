import { z } from 'zod';
import { prisma } from '../lib/prisma';

export const PokemonSchema = z.object({
  tipo: z.string(),
  treinador: z.string(),
});

export type PokemonInput = z.infer<typeof PokemonSchema>;

export async function listarPokemons() {
  return await prisma.pokemon.findMany();
}

export async function criarPokemon(pokemon: PokemonInput) {
  const novoPokemon = prisma.pokemon.create({
    data: {
      ...pokemon,
      nivel: 1,
    },
  });

  return novoPokemon;
}
