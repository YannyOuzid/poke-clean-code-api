import { PokemonGateway } from "../../gateways/pokemonGateway";

export const getOnePokemon = async(pokemonGateway: PokemonGateway, pokemonId: string) => {
    return await pokemonGateway.getPokemonByID(pokemonId)
}