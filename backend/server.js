const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const { MongoClient } = require("mongodb");
const bodyparser=require('body-parser')
const cors=require('cors')
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

// Database Name
const dbName = "passop";
const app = express();
const port = 3000;
client.connect();
app.use(bodyparser.json())
app.use(cors())
const db = client.db(dbName);
//Get all the password
app.get("/", async (req, res) => {
  const collection = db.collection("passwords");
  const findResult = await collection.find({}).toArray();
  res.json(findResult);
});
//Save a password
app.post("/", async (req, res) => {
    const password =req.body
    
    const collection = db.collection("passwords");
    const findResult = await collection.insertOne(password)
    res.send({success:true,result:findResult});
  });
//Delete a password
app.delete("/", async (req, res) => {
    const password =req.body
    const collection = db.collection("passwords");
    const findResult = await collection.deleteOne(password)
    res.send({success:true,result:findResult});
  });
app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
