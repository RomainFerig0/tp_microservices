const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({ user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required : [true, 'The author is required.'] }, auction_id : { type: mongoose.Schema.Types.ObjectId, ref: 'Auction', required:[true, 'The original auction is required.'] }, amount: {type:Number, required:[true, 'The amount of the bid is required.']}, timestamp : { type: Date, default: Date.now }});

module.exports = bidSchema