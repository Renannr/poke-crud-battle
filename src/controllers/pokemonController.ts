import { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';
import { atualizarPokemon, buscarPokemonById, criarPokemon, deletarPokemon, listarPokemons, PokemonSchema } from '../services/pokemonService';

const atualizarSchema = z.object({
  treinador: z.string(),
});

type Params = {
  id: string;
};

export const criaNovoPokemon = async (
  req: FastifyRequest,
  res: FastifyReply
) => {
  try {
    const body = PokemonSchema.parse(req.body);
    const novoPokemon = await criarPokemon(body);
    return res.status(200).send(novoPokemon);
  } catch (error: any) {
    return res
      .status(400)
      .send({ erro: error.message || 'Erro ao criar novo pokemon' });
  }
};

export const atualizarPokemonById = async (
  req: FastifyRequest<{ Params: Params }>,
  res: FastifyReply
) => {
  try {
    const { treinador } = atualizarSchema.parse(req.body);
    const id = Number(req.params.id);

    const atualizado = await atualizarPokemon(id, treinador);

    return res.status(204).send();
  } catch (error: any) {
    return res
      .status(400)
      .send({ erro: error.message || 'Erro ao atualizar o pokémon' });
  }
};

export const excluirPokemon = async (
  req: FastifyRequest<{ Params: Params }>,
  res: FastifyReply
) => {
  try {
    const id = Number(req.params.id);
    const excluido = await deletarPokemon(id);

    return res.status(204).send();
  } catch (error: any) {
    return res
      .status(400)
      .send({ erro: error.message || 'Erro ao excluir o pokémon' });
  }
};

export const carregarPokemon = async (
  req: FastifyRequest<{ Params: { id: string } }>,
  res: FastifyReply
) => {
  try {
    const id = Number(req.params.id);
    const pokemon = await buscarPokemonById(id);

    if (!pokemon) {
      return res.status(404).send({ erro: 'Pokémon não encontrado' });
    }

    return res.status(200).send(pokemon);
  } catch (error: any) {
    return res
      .status(400)
      .send({ erro: error.message || 'Erro ao buscar o pokemon' });
  }
};

export const listarPokemon = async (
  req: FastifyRequest,
  res: FastifyReply
) => {
  const lista = await listarPokemons();
  return res.status(200).send(lista);
};
