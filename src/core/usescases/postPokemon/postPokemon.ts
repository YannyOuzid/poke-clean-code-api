import { Pokemon } from "../../entities/pokemon";
import { PokemonGateway } from "../../gateways/pokemonGateway";

export const postPokemon = async (pokemonGateway: PokemonGateway, body: Pokemon) => {
    return pokemonGateway.postPokemon(body)
}