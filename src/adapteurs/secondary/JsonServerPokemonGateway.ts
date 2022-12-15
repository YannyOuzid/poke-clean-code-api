import { PokemonGateway } from '../../core/gateways/pokemonGateway'
import { Pokemon } from '../../core/entities/pokemon'
import axios from 'axios'

export class JsonServerPokemonGateway implements PokemonGateway {
  async listAll(): Promise<Array<Pokemon>> {
    const res = await axios.get('http://localhost:3000/pokemons')
    const pokemons = await res.data
    return pokemons
  }

  async getPokemonByID(pokemonId: any): Promise<Pokemon> {
    const res = await axios.get('http://localhost:3000/pokemons/' + pokemonId )
    const pokemons = await res.data
    return pokemons
  }

  async deletePokemon(pokemonId: any): Promise<Pokemon[]> {
    const res = await axios.delete('http://localhost:3000/pokemons/' + pokemonId )
    const pokemons = await res.data
    return pokemons
  }

  async updatePokemon(body: any): Promise<Pokemon[]> {
    const res = await axios.patch('http://localhost:3000/pokemons/' + body.id )
    const pokemons = await res.data
    return pokemons
  }

  async postPokemon(body: any): Promise<Pokemon[]> {
    const res = await axios.post('http://localhost:3000/pokemons')
    const pokemons = await res.data
    return pokemons
  }
}
