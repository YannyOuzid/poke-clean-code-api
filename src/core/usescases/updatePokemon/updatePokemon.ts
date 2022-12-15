import { Pokemon } from "../../entities/pokemon";
import { PokemonGateway } from "../../gateways/pokemonGateway";

export const updatePokemon = async (pokemonGateway:PokemonGateway, body: Pokemon) => {
    return await pokemonGateway.updatePokemon(body)
    
}