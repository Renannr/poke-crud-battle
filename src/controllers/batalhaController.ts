import { FastifyReply, FastifyRequest } from "fastify";
import { batalharPokemon } from "../services/batalharService";

type Params = {
  pokemonAId: string;
  pokemonBId: string;
};

export const batalharPokemon1v1 = async (
  req: FastifyRequest<{ Params: Params }>,
  res: FastifyReply
) => {
  try {
    const pokemonAId = Number(req.params.pokemonAId);
    const pokemonBId = Number(req.params.pokemonBId);

    const resultado = await batalharPokemon(pokemonAId, pokemonBId)

    return res.status(204).send(resultado);
  } catch (error: any) {
    return res
      .status(400)
      .send({ erro: error.message || 'Erro ao batalhar entre pokémons' });
  }
};