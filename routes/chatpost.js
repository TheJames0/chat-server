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


    async function tryInsertData(data) {
        try {
            
          // Send a ping to confirm a successful connection
          await client.db("admin").command({ ping: 1 });
          console.log("Data Inserting");
        } finally {
          // Ensures data is ready to be sent
          collection.insertOne(data, (err, result) => {
            if (err) {
              console.error('Error inserting document:', err);
              return;
            }
        });
      }
    }

//Create 1 Chat
router.post('/', async function(req, res) {
    try
    {
        await tryInsertData(req.body);
        console.log(req.body.name);
        console.log(req.body.message);
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