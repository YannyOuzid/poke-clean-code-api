import { InMemoryPokemonGateway } from "../../../adapteurs/secondary/inMemoryPokemonGateway"
import { Pokemon } from '../../entities/pokemon'
import { updatePokemon} from "./updatePokemon"
import { FakeUUIDGenerator} from '../../../adapteurs/secondary/fakeUUIDGenerator'

describe('update Pokemon', () => {
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
    const update: Pokemon = {
        'id': '1',
        'name': "testsddscdsvsd",
        'number': 24,
        'type': ["ouisdvdsv"],
        'attacks': ['ouuqsi']
    }

    const failUpdateName: Pokemon = {
        'id': '1',
        'name': "",
        'number': 24,
        'type': ["ouisdvdsv"],
        'attacks': ['ouuqsi']
    }

    const failUpdateNumber: Pokemon = {
        'id': '1',
        'name': "",
        'number': 0,
        'type': ["ouisdvdsv"],
        'attacks': ['ouuqsi']
    }

    const failUpdateId: Pokemon = {
        'id': '',
        'name': "",
        'number': 24,
        'type': ["ouisdvdsv"],
        'attacks': ['ouuqsi']
    }

    const failUpdateType: Pokemon = {
        'id': '1',
        'name': "",
        'number': 24,
        'type': [],
        'attacks': ['ouuqsi']
    }
    let pokemonGateway: InMemoryPokemonGateway
    beforeEach(() => {
        pokemonGateway = new InMemoryPokemonGateway(new FakeUUIDGenerator());
    })
    it('should update One Pokemon', async () => {
        pokemonGateway.feedWith(inject, secondInject);
        const updateOne = await updatePokemon(pokemonGateway , update);
        expect(updateOne).toEqual([update, secondInject])  
    })

    it('should throw an error when name is missing', async () => {
        await expect(updatePokemon(pokemonGateway, failUpdateName)).rejects.toThrow('Missing informations to UPDATE Pokemon')
    })

    it('should throw an error when number is missing', async () => {
        await expect(updatePokemon(pokemonGateway ,failUpdateNumber)).rejects.toThrow('Missing informations to UPDATE Pokemon')
    })

    it('should throw an error when type is missing', async () => {
        await expect(updatePokemon(pokemonGateway ,failUpdateType)).rejects.toThrow('Missing informations to UPDATE Pokemon')
    })

    it('should throw an error when id is missing', async () => {
        await expect(updatePokemon(pokemonGateway ,failUpdateId)).rejects.toThrow('Missing informations to UPDATE Pokemon')
    })

    it('should throw an error the pokemon doesnt exist', async () => {
        await expect(updatePokemon(pokemonGateway, update)).rejects.toThrow('There is no pokemon with that ID ' + update.id)
    })
})