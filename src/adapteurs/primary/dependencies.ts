import { JsonServerPokemonGateway } from '../secondary/JsonServerPokemonGateway'

export const pokemonGateway = () => {
  const pokemonGateway = new JsonServerPokemonGateway()
  return pokemonGateway
}
