import { InMemoryPokemonGateway } from '../../../adapteurs/secondary/inMemoryPokemonGateway';
import { Pokemon } from '../../entities/pokemon'
import {deletePokemon} from './deletePokemon'

describe('Delete Pokemon', () => {
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
    let pokemonGateway: InMemoryPokemonGateway;
    beforeEach(() => {
        pokemonGateway = new InMemoryPokemonGateway();
    })
    it('should remove one Pokemon By its id', async () => {
        pokemonGateway.feedWith(inject, secondInject)
        const deleteOne = await deletePokemon(pokemonGateway, '2')
        expect(deleteOne).toEqual([inject])
    })

    it('should throw an error when we send an empty id', async () => {
        pokemonGateway.feedWith(inject, secondInject)
        await expect(deletePokemon(pokemonGateway, '')).rejects.toThrow('There is no ID to DELETE Pokemon')
    })
})