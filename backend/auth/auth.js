const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const app = express();
const secretKey = "your-very-secure-secret";
app.use(bodyParser.json());
const cors = require('cors');

app.use(cors()); // ← autorise les requêtes crossorigin
app.use(express.json());

port = 4000

const users = [
{ id: 1, username: "user1", password: "password1"},
{ id: 2, username: "user2", password: "password2"},
];

app.post("/login", (req, res) => { // Authentication route
    const { username, password } = req.body;

    const user = users.find(
        (u) => u.username === username && u.password === password
    );
    if (user) {
        const token = jwt.sign({ id: user.id, role: user.role }, secretKey, {
            expiresIn: "1h",
        });
        res.json({ token });
    } else if (!user) {
        res.status(401).json({ message: "Unauthorized." });
    }
});

app.post("/register", (req, res) => { // Register/sign-in route
    const { username, password } = req.body;


});

function checkRole(role) { // First middleware function to check the user's role
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).json({ message: "Forbidden." });
            }
        next();
    };
}

function verifyToken(req, res, next) { // Second middleware function to check the JWT
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

module.exports = { checkRole, verifyToken };

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Auth microservice listening on http://localhost:${port}`);
  });
}