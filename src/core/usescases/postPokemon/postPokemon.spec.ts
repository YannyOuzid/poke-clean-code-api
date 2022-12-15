import { InMemoryPokemonGateway } from "../../../adapteurs/secondary/inMemoryPokemonGateway"
import { Pokemon } from "../../entities/pokemon"
import { postPokemon } from './postPokemon'
import { FakeUUIDGenerator} from '../../../adapteurs/secondary/fakeUUIDGenerator'

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

    const bodyWithoutNumber: Pokemon = { 
        'id': '2',
        'name': "test",
        'number': 0,
        'type': ["ouidfq"],
        'attacks': ['ouuiqddq']
    }

    const bodyWithoutType: Pokemon = { 
        'id': '2',
        'name': "test",
        'number': 29,
        'type': [],
        'attacks': ['ouuiqddq']
    }

    const bodyWithoutId: Pokemon = { 
        'id': '',
        'name': "test",
        'number': 29,
        'type': ["ouidfq"],
        'attacks': ['ouuiqddq']
    }

    let pokemonGateway: InMemoryPokemonGateway
    let UUIDGenerator: FakeUUIDGenerator
    beforeEach(() => {
        UUIDGenerator = new FakeUUIDGenerator();
        pokemonGateway = new InMemoryPokemonGateway(UUIDGenerator);
        UUIDGenerator.setNextUuid('2')
    })

    it('should post one pokemon', async () => {
        pokemonGateway.feedWith(inject)
        const post = await postPokemon(pokemonGateway ,body)
        expect(post).toEqual([inject, body])
    })

    it('should throw an error when name is missing', async () => {
        await expect(postPokemon(pokemonGateway ,bodyWithoutName)).rejects.toThrow('Missing informations to POST Pokemon')
    })

    it('should throw an error when number is missing', async () => {
        await expect(postPokemon(pokemonGateway ,bodyWithoutNumber)).rejects.toThrow('Missing informations to POST Pokemon')
    })

    it('should throw an error when type is missing', async () => {
        await expect(postPokemon(pokemonGateway ,bodyWithoutType)).rejects.toThrow('Missing informations to POST Pokemon')
    })

    it('should throw an error when id is missing', async () => {
        await expect(postPokemon(pokemonGateway ,bodyWithoutId)).rejects.toThrow('Missing informations to POST Pokemon')
    })
})