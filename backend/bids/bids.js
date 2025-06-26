const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const app = express();
const secretKey = "your-very-secure-secret";
app.use(bodyParser.json());
const cors = require('cors');
const mongoose = require('mongoose');
const bidSchema = require('../models/bids');
const auctionSchema = require('../models/bids');

app.use(cors());
app.use(express.json());

const conn = mongoose.createConnection('mongodb://127.0.0.1:27017/auctiondb');

conn.on('connected', () => {
  console.log('MongoDB connection established');
});

conn.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

const Bid = conn.model('Bid', bidSchema)
const Auction = conn.model('Auction', auctionSchema)

port = 4001

app.post('/bids', async (req, res) => { // Create a new bid
  try {
    const bid = new Bid({auction_id : req.body.auction_id, user_id : req.body.user_id, amount : req.body.amount});
    await bid.save();

    const auction = await Auction.findByIdAndUpdate(bid.auction_id,{ $max: { current_price: bid.amount } });
    res.json(bid);
    res.json(auction)
  } catch (err) {
    res.status(400).json({ error: 'Error while creating the bid.' });
  }
});

app.get("/bids/auction/:auction_id", async (req, res) => { // Search bids per auction
  try{
    const bidAuctionId = req.params.auction_id;
    const bids = await Bid.find({auction_id : bidAuctionId})
    if (bids.length > 0){
      res.json(bid);
    } else {
      res.status(404).json({error:"This auction doesn't have any bid yet."})
    }
  }catch(err){
    res.status(404).json({error: "This auction doesn't exist."})
  }
});

app.get("/bids/user/:user_id", async (req, res) => { // Search bids per user
  try{
    const bidUserId = req.params.user_id;
    const bids = await Bid.find({user_id : bidUserId})
    if (bids.length > 0){
      res.json(bids);
    } else{
      res.status(404).json({error:"This user didn't submit any bid yet."})
    }
  }catch(err){
    res.status(404).json({error: "This user doesn't exist."})
  }
});


app.listen(port, () => {
    console.log(`Bids microservice listening on http://localhost:${port}`);
});