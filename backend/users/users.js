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

port = 4001

app.post("/login", (req, res) => { // Authentication route
});

app.listen(port, () => {
    console.log(`Users microservice listening on http://localhost:${port}`);
});