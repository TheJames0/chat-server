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
const collection = client.db('chat').collection('chat1');

// Create a change stream
const changeStream = collection.watch();
var message = false;
var success = true;
// Listen to change events
changeStream.on('change', async (change) => {message = true})
    router.get('/', async (req,res) => 
    {
        success = true;
        try {
            await res.send(message);
        }
        catch
        {
            res.status(500);
            success = false;
        } 
        finally
        {
            if(success)
            {
            message = false
            res.status(200)
            }
        }
    })
module.exports = router;