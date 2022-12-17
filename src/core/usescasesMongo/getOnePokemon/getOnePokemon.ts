const { ObjectId } = require("mongodb");

export const getOnePokemon = async(req: any, res: any, pokeCollection: any) => {
    const foundOnePokemon = await pokeCollection.findOne({"_id": ObjectId(req.params.id)})
    if(foundOnePokemon == null) {
        res.send('No pokemon have been founds')
    }
    res.json(foundOnePokemon);
}