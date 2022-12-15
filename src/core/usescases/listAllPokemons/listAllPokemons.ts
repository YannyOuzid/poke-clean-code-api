import { Pokemon } from "../../entities/pokemon";
import { PokemonGateway } from "../../gateways/pokemonGateway";

export const listAllPokemons = async(pokemonGateway: PokemonGateway): Promise<Array<Pokemon>> => {
    return await pokemonGateway.listAll();
}