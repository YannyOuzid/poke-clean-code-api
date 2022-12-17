import {app} from './app'
const { MongoClient } = require("mongodb");
const url = "mongodb+srv://admin:admin@cluster0.vfeta.mongodb.net/data?retryWrites=true&w=majority";
const client = new MongoClient(url, { useUnifiedTopology: true });
const dbName = "pokedex";
let db;
let pokeCollection: any;
let port = 3001
import { listAllFromMongo } from '../../../core/usescasesMongo/listAllPokemons/listAllPokemons'
import { getOnePokemon } from '../../../core/usescasesMongo/getOnePokemon/getOnePokemon'
import { postPokemon } from '../../../core/usescasesMongo/postPokemon/postPokemon'
import { deletePokemon } from '../../../core/usescasesMongo/deletePokemon/deletePokemon'
import { updatePokemon } from '../../../core/usescasesMongo/updatePokemon/updatePokemon'

app.get('/', function (req, res) {
    res.send('API Pokemon')
})

app.get('/pokemonMongo', async (req, res) => {
    listAllFromMongo(req, res, pokeCollection)
})

app.get('/pokemonMongo/:id', async (req, res) => {
    getOnePokemon(req, res, pokeCollection)
})

app.post('/pokeMongo', (req, res) => {
    postPokemon(req, res, pokeCollection)
})

app.delete('/pokemonMongo', async (req, res) =>{
    deletePokemon(req, res, pokeCollection)
})

app.put('/pokemonMongo', async (req, res) => {
    updatePokemon(req, res, pokeCollection)
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

