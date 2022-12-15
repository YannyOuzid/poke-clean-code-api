import { PokemonGateway } from "../../gateways/pokemonGateway";

export const deletePokemon = async (pokemonGateway: PokemonGateway, pokemonId: string) => {
    return await pokemonGateway.deletePokemon(pokemonId)
}