import { z } from 'zod';
import { prisma, PrismaClientKnownRequestError } from '../lib/prisma';

export const PokemonSchema = z.object({
  tipo: z.string(),
  treinador: z.string(),
});

export type PokemonInput = z.infer<typeof PokemonSchema>;

export async function listarPokemons() {
  return await prisma.pokemon.findMany();
}

export async function criarPokemon(pokemon: PokemonInput) {
  try {
    const novoPokemon = prisma.pokemon.create({
      data: {
        ...pokemon,
        nivel: 1,
      },
    });
    return novoPokemon;
  } catch (error) {
    console.error(error)
    throw new Error("Erro ao criar pokemon");
  }
}

export async function atualizarPokemon(id: number, novoTreinador: string) {
  try {
    return await prisma.pokemon.update({
      where: { id },
      data: { treinador: novoTreinador },
    });
  } catch (error: any) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === 'P2025'
    ) {
      throw new Error(`Pokémon com id ${id} não encontrado.`);
    }

    throw error;
  }
}

export async function deletarPokemon(id: number) {
  try {
    return await prisma.pokemon.delete({
      where: { id },
    });
  } catch (error: any) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === 'P2025'
    ) {
      throw new Error(`Pokémon com id ${id} não encontrado para exclusão.`);
    }
    throw error;
  }
}

export async function buscarPokemonById(id: number) {
  try {
    const pokemon = await prisma.pokemon.findUnique({
      where: { id },
    });

    return pokemon;
  } catch (error) {
    throw new Error(`Pokémon com id ${id} não encontrado.`);
  }
}