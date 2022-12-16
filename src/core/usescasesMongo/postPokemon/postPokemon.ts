export const postPokemon = async(req: any, res: any, pokeCollection: any) => {
    let pokemon = {
        name: req.body.name,
        number: req.body.number,
        type: req.body.type,
        attacks: req.body.attacks
    }
    pokeCollection.insertOne(pokemon)
    res.sendStatus(200)
}