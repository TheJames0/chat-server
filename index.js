
const express = require('express');
const {Router} = require('express');
const app = express();

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
try {
  // Connect the client to the server	(optional starting in v4.7)
  client.connect();
} finally {
  console.log("Connected to database");
}


//const test_entry = { name: 'cody', message: 'yge'};

const cors = require('cors');
app.use(cors());

app.use(express.json()) 

const chatRouterGet = require('./routes/chatget.cjs')
app.use('/chat',chatRouterGet)

const chatRouterUpdate = require('./routes/chatupdate.cjs')
app.use('/chat/update_status',chatRouterUpdate)

const chatRouterPost = require('./routes/chatpost.cjs')
app.use('/chat/post',chatRouterPost)

app.listen(1234);