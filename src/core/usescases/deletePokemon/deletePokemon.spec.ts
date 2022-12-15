import { InMemoryPokemonGateway } from '../../../adapteurs/secondary/inMemoryPokemonGateway';
import { Pokemon } from '../../entities/pokemon'
import {deletePokemon} from './deletePokemon'
import { FakeUUIDGenerator} from '../../../adapteurs/secondary/fakeUUIDGenerator'

describe('Delete Pokemon', () => {
    let ID: string;
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
        pokemonGateway = new InMemoryPokemonGateway(new FakeUUIDGenerator());
        ID = Math.floor(Math.random() * 101).toString();
    })
    it('should remove one Pokemon By its id', async () => {
        let arg = createManyPokemon();
        pokemonGateway.feedArray(arg)
        const deleteOne = await deletePokemon(pokemonGateway, ID)
        expect(deleteOne).toEqual(arrayResponse(arg, ID))
    })

    it('should throw an error when we send an empty id', async () => {
        pokemonGateway.feedWith(inject, secondInject)
        await expect(deletePokemon(pokemonGateway, '')).rejects.toThrow('There is no ID to DELETE Pokemon')
    })

    it('should throw an error the pokemon doesnt exist', async () => {
        await expect(deletePokemon(pokemonGateway, ID)).rejects.toThrow('There is no pokemon with that ID ' + ID)
    })

    const createManyPokemon = (): Pokemon[] => {
        let array: Pokemon[] = [];
        for(let i = 0; i <= 100; i++) {
            let inject: Pokemon = { 
                'id': i.toString(),
                'name': "test",
                'number': 24,
                'type': ["oui"],
                'attacks': ['ouui']
            }
            array.push(inject);
        }
        return array
    }

    const arrayResponse = (arrayPokemon: Pokemon[], id: string): Pokemon[] => {
        const pokemonIndex = arrayPokemon.findIndex(element => element.id === id)
        arrayPokemon.splice(pokemonIndex, 1)
        return arrayPokemon
    }
})