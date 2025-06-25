const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const app = express();
const secretKey = "your-very-secure-secret";
app.use(bodyParser.json());
const cors = require('cors');
const { checkRole, verifyToken } = require('../auth/auth');

app.use(cors()); // ← autorise les requêtes crossorigin
app.use(express.json());

port = 4002

app.post("/bids", (req, res) => { // Authentication route
    const { auction_id, amount } = req.body;
});

app.get("/bids/auction/:auction_id", (req, res) => { // Authentication route
    const auctionId = req.params.id;
});

app.get("/bids/user/:user_id", (req, res) => { // Authentication route
    const userId = req.params.id;
});

app.listen(port, () => {
    console.log(`Bids microservice listening on http://localhost:${port}`);
});