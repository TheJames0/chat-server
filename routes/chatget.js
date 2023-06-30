const express = require('express');
router = express.Router();


//Connect MongoDB
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://user:dbpass@cluster0.x2av7jf.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
var collection;


async function getData()
    {
        var documents;
        try 
        {

            documents = await collection.find().toArray();
        }
        catch (error) 
        {
            console.error('Error',error);
            return;
        }
        finally
        {
            return documents;
        }
    }

//Get All Chat
router.get('/', async (req,res) => 
{
    try {
        collection = client.db('chat').collection(await req.query.collection);
        const messages = await getData()
        res.json(messages);
    }
    catch
    {
        res.status(500)
    }
    
})
module.exports = router;