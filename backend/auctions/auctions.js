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

port = 4003

app.post("/auctions", (req, res) => { // Authentication route
});

app.get("/auctions", (req, res) => { // Authentication route
});

app.get("/auctions/:id", (req, res) => { // Authentication route
    const userId = req.params.id;
});

app.delete("/auctions/:id", (req, res) => { // Authentication route
    const userId = req.params.id;
});

app.listen(port, () => {
    console.log(`Auctions microservice listening on http://localhost:${port}`);
});