import {app} from './app'
const { MongoClient, ObjectId } = require("mongodb");
import { Pokemon } from '../../../core/entities/pokemon';
import { pokemonGateway } from '../dependencies';
const url = "mongodb+srv://admin:admin@cluster0.vfeta.mongodb.net/data?retryWrites=true&w=majority";
const client = new MongoClient(url, { useUnifiedTopology: true });
const dbName = "pokedex";
let db;
let pokeCollection: any;
let port = 3001

app.get('/', function (req, res) {
    res.send('API Pokemon')
})

app.get('/pokemonMongo', (req, res) => {
    async function findPokemons() {
        const foundPokemon = await pokeCollection.find().toArray();
        res.json(foundPokemon);
    }
    findPokemons();
})

app.get('/pokemonMongo/:id', (req, res) => {
    async function findOnePokemon() {
        const foundOnePokemon = await pokeCollection.findOne({"_id": ObjectId(req.params.id)})
        res.json(foundOnePokemon);
    }
    findOnePokemon();
})

app.post('/pokeMongo', (req, res) => {
    let pokemon = {
        name: req.body.name,
        number: req.body.number,
        type: req.body.type,
        attacks: req.body.attacks
    }
    pokeCollection.insertOne(pokemon)
    res.sendStatus(200)
})

app.delete('/pokemonMongo', (req, res) =>{
    pokeCollection.deleteOne({"_id": ObjectId(req.body.id)})
    async function findPokemon() {
        const foundPokemon = await pokeCollection.findOne({"_id": ObjectId(req.body.id)})
        if(foundPokemon !== null){
            res.send("The entry was not deleted")
        }
        res.send("The entry was deleted")
    }
    findPokemon();
})

app.put('/pokemonMongo', (req, res) => {
    async function findPokemon() {
        try{
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

                try{
                    await pokeCollection.updateOne(
                        {"_id": ObjectId(req.body.id)},
                        {$set:pokemon});
                } catch(err){
                    console.log(err)
                }
                res.send("The entries were updated");
            } else {
                res.send("The entries were not updated");
            }}catch(err){
            res.send("Object id is invalid")
        }
    }
    findPokemon();
})


async function run() {
    try {
        await client.connect();
        console.log("Connected correctly to server");
        db = client.db(dbName);
  
        pokeCollection = db.collection("pokemon");
        app.listen(port, () => {
          console.log('Listen to port 3001')
        });
    } catch (err) {
        console.log(err);
    }
  }
  
  run().catch(console.dir)

