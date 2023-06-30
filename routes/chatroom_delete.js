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
  const collection = client.db('chat');

    async function tryDeleteCollection(name) {
        try {
            
            collection.drop()
          console.log("Deleting Collection");
        }
        catch (e)
        {
            console.error("Error :", e)
        }
        finally {
          // Ensures data is ready to be sent
          
      }
    }

//Create 1 Chat
router.post('/', async function(req, res) {
    try
    {
        await tryDeleteCollection(req.body.name);
        console.log(req.body.name);
    }
    catch
    {
      res.sendStatus(500);
    }
    finally
    {
      res.sendStatus(200);
    }
});

module.exports = router;