import { InMemoryPokemonGateway } from "../../../adapteurs/secondary/inMemoryPokemonGateway"
import { Pokemon } from '../../entities/pokemon'
import { updatePokemon} from "./updatePokemon"

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

    const failUpdate: Pokemon = {
        'id': '',
        'name': "",
        'number': 24,
        'type': ["ouisdvdsv"],
        'attacks': ['ouuqsi']
    }
    let pokemonGateway: InMemoryPokemonGateway
    beforeEach(() => {
        pokemonGateway = new InMemoryPokemonGateway();
    })
    it('should update One Pokemon', async () => {
        pokemonGateway.feedWith(inject, secondInject);
        const updateOne = await updatePokemon(pokemonGateway , update);
        expect(updateOne).toEqual([update, secondInject])  
    })

    it('should throw an error when some informations ar missing', async () => {
        await expect(updatePokemon(pokemonGateway, failUpdate)).rejects.toThrow('Missing informations to UPDATE Pokemon')
    })

    it('should throw an error the pokemon doesnt exist', async () => {
        await expect(updatePokemon(pokemonGateway, update)).rejects.toThrow('There is no pokemon with that ID' + update.id)
    })
})