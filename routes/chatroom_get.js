const express = require('express');
router = express.Router();
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://user:dbpass@cluster0.x2av7jf.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  const collection = client.db('chat')
  async function getRooms()
  {
    var chat_rooms;
    try {
        chat_rooms = collection.listCollections().toArray();
    } catch (error) {
        console.error("Error occured: ",error)
    }
    finally
    {
        return chat_rooms;
    }
  }

router.get('/', async (req,res) => 
{
    try {
        console.log("Attempt to get rooms")
        const messages = await getRooms()
        res.json(messages);
    }
    catch
    {
        res.status(500)
    }
    
})
module.exports = router;