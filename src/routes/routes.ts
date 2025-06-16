import z from "zod";
import { FastifyTypedInstance } from "../types";

import { batalharPokemon1v1 } from "../controllers/batalhaController";
import { atualizarPokemonById, carregarPokemon, criaNovoPokemon, excluirPokemon, listarPokemon } from "../controllers/pokemonController";

export async function routes(app: FastifyTypedInstance) {
  app.get('/pokemons', {
    schema: {
      tags: ['pokemons'],
      description: 'Listar pokemons',
      response: {
        200: z.array(z.object({
          id: z.number(),
          tipo: z.string(),
          treinador: z.string(),
          nivel: z.number()
        }))
      }
    }
  }, listarPokemon)

  app.get('/pokemons/:id', {
    schema: {
      tags: ['pokemons'],
      description: 'Carregar pokemons',
      response: {
        200: z.object({
          id: z.number(),
          tipo: z.string(),
          treinador: z.string(),
          nivel: z.number()
        })
      }
    }
  }, carregarPokemon)

  app.post('/pokemons', {
    schema: {
      tags: ['pokemons'],
      description: 'Criar um novo pokemon',
      body: z.object({
        tipo: z.string(),
        treinador: z.string()
      }),
      response: {
        201: z.object({
          id: z.number(),
          tipo: z.string(),
          treinador: z.string(),
          nivel: z.number()
        }),
      }

    }
  }, criaNovoPokemon)

  app.put('/pokemons/:id', {
    schema: {
      tags: ['pokemons'],
      description: 'Atualizar um pokemon',
      params: z.object({
        id: z.string().describe('ID do Pokémon'),
      }),
      body: z.object({
        treinador: z.string()
      }),
      response: {
        204: z.null(),
      }
    }
  }, atualizarPokemonById)

  app.delete('/pokemons/:id', {
    schema: {
      tags: ['pokemons'],
      description: 'Deletar um pokemon',
      params: z.object({
        id: z.string().describe('ID do Pokémon'),
      }),
      response: {
        204: z.null(),
      }
    }
  }, excluirPokemon)

  app.post('/batalhar/:pokemonAId/:pokemonBId', {
    schema: {
      tags: ['batalhar'],
      description: 'Batalha entre 2 pokemon',
      params: z.object({
        pokemonAId: z.string().describe('ID do Pokémon A'),
        pokemonBId: z.string().describe('ID do Pokémon B'),
      }),
      response: {
        200: z.object({
          "vencedor": z.object({
            id: z.number(),
            tipo: z.string(),
            treinador: z.string(),
            nivel: z.number()
          }),
          "perdedor": z.object({
            id: z.number(),
            tipo: z.string(),
            treinador: z.string(),
            nivel: z.number()
          })
        }),
      }
    }
  }, batalharPokemon1v1)
}