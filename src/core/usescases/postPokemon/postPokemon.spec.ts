import { InMemoryPokemonGateway } from "../../../adapteurs/secondary/inMemoryPokemonGateway"
import { Pokemon } from "../../entities/pokemon"
import { postPokemon } from './postPokemon'

describe('Post pokemon', () => {
    const inject: Pokemon = { 
        'id': '1',
        'name': "test",
        'number': 24,
        'type': ["oui"],
        'attacks': ['ouui']
    }

    const body: Pokemon = { 
        'id': '2',
        'name': "qdfvqfv",
        'number': 29,
        'type': ["ouidfq"],
        'attacks': ['ouuiqddq']
    }

    const bodyWithoutName: Pokemon = { 
        'id': '2',
        'name': "",
        'number': 29,
        'type': ["ouidfq"],
        'attacks': ['ouuiqddq']
    }

    let pokemonGateway: InMemoryPokemonGateway
    beforeEach(() => {
        pokemonGateway = new InMemoryPokemonGateway();
    })
    it('should post one pokemon', async () => {
        pokemonGateway.feedWith(inject)
        const post = await postPokemon(pokemonGateway ,body)
        expect(post).toEqual([inject, body])
    })

    it('should throw an error when some informations are missing', async () => {
        await expect(postPokemon(pokemonGateway ,bodyWithoutName)).rejects.toThrow('Missing informations to POST Pokemon')
    })
})