import express from 'express'
import { listAllPokemons } from '../../../core/usescases/listAllPokemons/listAllPokemons'
import { pokemonGateway } from '../dependencies'

export const app = express()


app.use(express.json())

app.get('/pokemons', async (req: any, res: any) => {
  const pokemons = await listAllPokemons(pokemonGateway())
  res.send(JSON.stringify(pokemons))
})
