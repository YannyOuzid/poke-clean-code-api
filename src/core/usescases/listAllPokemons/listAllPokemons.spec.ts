import { InMemoryPokemonGateway } from '../../../adapteurs/secondary/inMemoryPokemonGateway';
import { Pokemon } from '../../entities/pokemon';
import { listAllPokemons } from './listAllPokemons';

describe('List All Pokemons', () => {
    const inject: Pokemon = { 
        'id': '1',
        'name': "test",
        'number': 24,
        'type': ["oui"],
        'attacks': ['ouui']
    }
    const secondInject: Pokemon = { 
        'id': '2',
        'name': "test",
        'number': 24,
        'type': ["oui"],
        'attacks': ['ouui']
    }
    let pokemonGateway: InMemoryPokemonGateway
    beforeEach(() => {
        pokemonGateway = new InMemoryPokemonGateway()
    })

    it('should list all pokemons', async () => {
        pokemonGateway.feedWith(inject, secondInject);
        const listAll = await listAllPokemons(pokemonGateway);
        expect(listAll).toEqual([inject, secondInject])
    })

    it('should throw an error when there is no Pokemon', async () => {
        await expect(listAllPokemons(pokemonGateway)).rejects.toThrow('There is no Pokemon')
    })
})