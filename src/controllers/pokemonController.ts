import { FastifyReply, FastifyRequest } from 'fastify';
import { criarPokemon, listarPokemons, PokemonSchema } from '../services/pokemonService';

export const listarPokemon = async (
  req: FastifyRequest,
  res: FastifyReply
) => {
  const lista = await listarPokemons();
  return res.status(200).send(lista);
};

export const criaNovoPokemon = async (
  req: FastifyRequest,
  res: FastifyReply
) => {
  try {
    const body = PokemonSchema.parse(req.body);
    const novoPokemon = await criarPokemon(body);
    return res.status(201).send(novoPokemon);
  } catch (error: any) {
    return res
      .status(400)
      .send({ erro: error.message || 'Erro ao criar novo pokemon' });
  }
};
