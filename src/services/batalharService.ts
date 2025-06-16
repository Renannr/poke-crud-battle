import { prisma } from "../lib/prisma";

export async function batalharPokemon(pokemonAId: number, pokemonBId: number) {
  try {
    const pokemonA = await prisma.pokemon.findUnique({
      where: { id: pokemonAId },
    });

    if (!pokemonA) {
      throw new Error(`Pokémon com id ${pokemonAId} não encontrado.`);
    }

    const pokemonB = await prisma.pokemon.findUnique({
      where: { id: pokemonBId },
    });

    if (!pokemonB) {
      throw new Error(`Pokémon com id ${pokemonBId} não encontrado.`);
    }

    const total = pokemonA.nivel + pokemonB.nivel;
    const random = Math.random() * total;

    const vencedor = random < pokemonA.nivel ? pokemonA : pokemonB;
    const perdedor = vencedor.id === pokemonA.id ? pokemonB : pokemonA;

    // Atualizar vencedor (+1 nível)
    const vencedorAtualizado = await prisma.pokemon.update({
      where: { id: vencedor.id },
      data: { nivel: vencedor.nivel + 1 },
    });
    // Atualizar perdedor (-1 nível)
    let perdedorFinal: any = { ...perdedor };
    const novoNivelPerdedor = perdedor.nivel - 1;

    if (novoNivelPerdedor <= 0) {
      await prisma.pokemon.delete({
        where: { id: perdedor.id },
      });
      perdedorFinal.nivel = 0;
    } else {
      const atualizado = await prisma.pokemon.update({
        where: { id: perdedor.id },
        data: { nivel: novoNivelPerdedor },
      });
      perdedorFinal = atualizado;
    }

    return {
      vencedor: vencedorAtualizado,
      perdedor: perdedorFinal,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao realizar batalha entre pokémons.");
  }
}
