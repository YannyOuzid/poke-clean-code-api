import { InMemoryPokemonGateway } from '../../../adapteurs/secondary/inMemoryPokemonGateway'
import { getOnePokemon } from './getOnePokemon'
import { Pokemon } from '../../entities/pokemon'

describe('Get One Pokemon', () => {
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
    it('should get One Pokemon by his Id number', async () => {
        pokemonGateway.feedWith(inject, secondInject)
        const getOne =  await getOnePokemon(pokemonGateway, '2')
        expect(getOne).toEqual(secondInject);
    })

    it('should throw an error when there is not pokemon found', async () => {
        await expect(getOnePokemon(pokemonGateway, "")).rejects.toThrow('No pokemon has been GET')
    })
})