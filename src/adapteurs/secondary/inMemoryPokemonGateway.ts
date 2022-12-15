import { Pokemon } from "../../core/entities/pokemon";
import { PokemonGateway } from "../../core/gateways/pokemonGateway";

export class InMemoryPokemonGateway implements PokemonGateway {
    private pokemons: Array<Pokemon> = [];

    feedWith(...pokemons: Array<Pokemon>) {
        this.pokemons = pokemons
      }

    listAll(): Promise<Array<Pokemon>> {
        this.verification(this.pokemons.length === 0, 'There is no Pokemon')
        return Promise.resolve(this.pokemons);
    }

    getPokemonByID(pokemonID: string): Promise<Pokemon> {
        const pokemon = this.pokemons.find(element => element.id === pokemonID)
        this.verification(!pokemon, 'No pokemon has been GET')
        return Promise.resolve(pokemon)
    }

    deletePokemon(pokemonId: string): Promise<Pokemon[]> {
        this.verification(!pokemonId, 'There is no ID to DELETE Pokemon');

        const pokemonIndex = this.findPokemonIndex(pokemonId)

        if(pokemonIndex > -1) {
            this.pokemons.splice(pokemonIndex, 1)
        }

        return Promise.resolve(this.pokemons)
    }

    postPokemon(body: Pokemon): Promise<Pokemon[]> {
        this.verification(!body.name || !body.number || !body.type || !body.id, 'Missing informations to POST Pokemon');
        this.pokemons.push(body);
        return Promise.resolve(this.pokemons);
    }

    updatePokemon(body: Pokemon): Promise<Pokemon[]> {
        this.verification(!body.name || !body.number || !body.type || !body.id, 'Missing informations to UPDATE Pokemon');

        const pokemonIndex = this.findPokemonIndex(body.id)

        this.verification(pokemonIndex === -1, 'There is no pokemon with that ID' + body.id)

        if(pokemonIndex > -1) {
            this.pokemons[pokemonIndex] = body
        }

        return Promise.resolve(this.pokemons)
    }

    private verification(verification, message: string) {
        if(verification) {
            throw new Error(message)
        }
    }

    private findPokemonIndex(pokemonId: string) {
        return this.pokemons.findIndex(element => element.id === pokemonId)
    }
}