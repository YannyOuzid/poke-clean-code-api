const { ObjectId } = require("mongodb");

export const deletePokemon = async(req: any, res: any, pokeCollection: any) => {
    pokeCollection.deleteOne({"_id": ObjectId(req.body.id)})
    const foundPokemon = await pokeCollection.findOne({"_id": ObjectId(req.body.id)})
    if(foundPokemon !== null){
        res.send("The entry was not deleted")
    }
    res.send("The entry was deleted")
}