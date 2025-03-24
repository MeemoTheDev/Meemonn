
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Database setup
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run("CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)");
    db.run("CREATE TABLE posts (id INTEGER PRIMARY KEY AUTOINCREMENT, user TEXT, content TEXT)");
    db.run("INSERT INTO posts (user, content) VALUES ('User1', 'Hello, this is my first post on Meemon!')");
    db.run("INSERT INTO posts (user, content) VALUES ('User2', 'Meemon is awesome!')");
});

// Routes
app.get('/api/posts', (req, res) => {
    db.all("SELECT * FROM posts", [], (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.json(rows);
        }
    });
});

app.post('/api/posts', (req, res) => {
    const { user, content } = req.body;
    db.run("INSERT INTO posts (user, content) VALUES (?, ?)", [user, content], function (err) {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.status(201).json({ id: this.lastID, user, content });
        }
    });
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    db.get("SELECT * FROM users WHERE username = ? AND password = ?", [username, password], (err, row) => {
        if (err) {
            res.status(500).send(err.message);
        } else if (row) {
            res.json({ message: "Login successful", user: row });
        } else {
            res.status(401).send("Invalid credentials");
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
