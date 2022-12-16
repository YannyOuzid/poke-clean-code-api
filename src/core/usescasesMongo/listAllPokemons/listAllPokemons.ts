export const listAllFromMongo = async(req: any, res: any, pokeCollection: any) => {
    const foundPokemon = await pokeCollection.find().toArray();
    res.json(foundPokemon);
}