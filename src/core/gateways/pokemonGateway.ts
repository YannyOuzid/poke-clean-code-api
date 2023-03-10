import { Pokemon } from "../entities/pokemon";
export interface PokemonGateway {
    listAll(): Promise<Array<Pokemon>>
    getPokemonByID(pokemonId): Promise<Pokemon>
    deletePokemon(pokemonId): Promise<Array<Pokemon>>
    postPokemon(body): Promise<Array<Pokemon>>
    updatePokemon(body): Promise<Array<Pokemon>>
}