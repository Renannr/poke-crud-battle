import z from "zod";
import { FastifyTypedInstance } from "../types";

import { atualizarPokemonById, carregarPokemon, criaNovoPokemon, excluirPokemon, listarPokemon } from "../controllers/pokemonController";

export async function routes(app: FastifyTypedInstance) {
  app.get('/pokemons', {
    schema: {
      tags: ['pokemons'],
      description: 'List pokemons',
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
      description: 'Create a new pokemon',
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
      description: 'Update a pokemon',
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
      description: 'Delete a pokemon',
      params: z.object({
        id: z.string().describe('ID do Pokémon'),
      }),
      response: {
        204: z.null(),
      }
    }
  }, excluirPokemon)
}