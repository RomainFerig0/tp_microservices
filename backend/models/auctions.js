const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({title: {type:String, required:[true, 'The auction needs a title']}, description: String, starting_price: {type:Number, required:[true, 'The auction needs a starting price']}, current_price: Number, status: {type: String, enum: ['pending', 'live', 'ended'], default: 'live'}, ends_at:  Date, owner_id : { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: [true, 'The owner of the auction must be specified.'] }});

module.exports = auctionSchema