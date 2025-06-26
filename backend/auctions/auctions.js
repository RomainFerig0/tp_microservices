const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const app = express();
const secretKey = "your-very-secure-secret";
app.use(bodyParser.json());
const cors = require('cors');
const mongoose = require('mongoose');
const auctionSchema = require('../models/auctions');

app.use(cors());
app.use(express.json());

const conn = mongoose.createConnection('mongodb://127.0.0.1:27017/auctiondb');

conn.on('connected', () => {
  console.log('MongoDB connection established');
});

conn.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

const Auction = conn.model('Auction', auctionSchema)

port = 4002

app.post('/auctions', async (req, res) => {
  try {
    const auction = new Auction({title : req.body.title, starting_price : req.body.starting_price, current_price : req.body.starting_price, ends_at : req.body.ends_at, owner_id : req.body.owner_id});
    await auction.save();

    res.json(auction);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create an auction.' });
  }
});

app.get("/auctions", async (req, res) => { // List all auctions
  try {
    const auctions = await Auction.find()

    if (auctions){
      res.json(auctions);
    }
    else if (!auctions){
      res.status(404).json({ error: 'There is no auction yet.' });
    }
  } catch (err) {
    res.status(400).json({ error: 'Error during research.' });
  }
});

app.get("/auctions/:id", async (req, res) => { // Search auctions by id
  try{
    const auctionId = req.params.id;
    const auction = await Auction.findById(auctionId)
    if (auction){
      res.json(auction);
    } else if (!auction){
      res.status(404).json({error: "This auction does not exist."})
    }
  }catch(err){
    res.status(404).json({error: "Error while getting the auction."})
  }
});

app.delete("/auctions/:id", async (req, res) => { // Delete auctions
  try{
    const auctionId = req.params.id;
    const auction = await Auction.findByIdAndDelete(auctionId);
    if (auction){
      res.json(auction)
    } else if (!auction){
      res.status(404).json({error: "Could not find the auction to delete."})
    }
  }catch(err){
    res.status(400).json({error: "Error while deleting the auction."})
  }
});

app.listen(port, () => {
    console.log(`Auctions microservice listening on http://localhost:${port}`);
});