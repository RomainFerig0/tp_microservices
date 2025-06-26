const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const app = express();
const secretKey = "your-very-secure-secret";
const cors = require('cors');
const userSchema = require('../models/users');
const mongoose = require('mongoose');

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const conn = mongoose.createConnection('mongodb://127.0.0.1:27017/auctiondb');

conn.on('connected', () => {
  console.log('MongoDB connection established');
});
conn.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

port = 4000

const User = conn.model('User', userSchema);

app.post("/login", async (req, res) => { // Authentification (log-in) route
    const { username, password } = req.body;

    const user = await User.findOne({ name : username }, {password: password});

    if (user) {
        const token = jwt.sign({ id: user._id, email: user.email }, secretKey, {expiresIn: "1h",});
        res.json({ token });
    } else if (!user) {
        res.status(401).json({ message: "Invalid credentials." });
    }
});

app.post("/register", async (req, res) => { // Register/sign-in route

  try {

    const user = new User({name : req.body.name, email : req.body.email, password_hash : req.body.password_hash})
    await user.save();

    const token = jwt.sign({ id: user._id, email: user.email }, secretKey, {expiresIn: "1h",});
    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: "Error during registration." });
  }

});

function verifyToken(req, res, next) { // Middleware function to check the JWT
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
        return res.status(403).json({ message: "Forbidden." });
    }
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Unauthorized."});
        }
        req.user = decoded;
        next();
    });
}

module.exports = {verifyToken};

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Auth microservice listening on http://localhost:${port}`);
  });
}