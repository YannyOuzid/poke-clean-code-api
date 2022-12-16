const { ObjectId } = require("mongodb");

export const updatePokemon = async(req: any, res: any, pokeCollection: any) => {
    const foundPokemon = await  pokeCollection.findOne({"_id": ObjectId(req.body.id)})
    if(foundPokemon !== null){
        let pokemon = {
            name: foundPokemon.name,
            number: foundPokemon.number,
            type: foundPokemon.type,
            attacks: foundPokemon.attacks
        }
        pokemon.name = req.body.name;
        pokemon.number = req.body.number;
        pokemon.type = req.body.type;
        pokemon.attacks = req.body.attacks;
        await pokeCollection.updateOne({"_id": ObjectId(req.body.id)},{$set:pokemon});
        res.send("The entry has been updated");
    } else {
        res.send("The entries has not been updated");
    }
    res.send("Object id is invalid")
}