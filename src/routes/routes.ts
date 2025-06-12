import z from "zod";
import { FastifyTypedInstance } from "../types";

import { criaNovoPokemon, listarPokemon } from "../controllers/pokemonController";

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
}