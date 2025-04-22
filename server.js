const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;

let votes = { Alice: 0, Bob: 0, Charlie: 0 };
let blockchain = [];

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

function generateHash(data) {
  return require('crypto').createHash('sha256').update(data).digest('hex');
}

function createBlock(username, candidate) {
  const prevHash = blockchain.length ? blockchain[blockchain.length - 1].hash : "0";
  const block = {
    index: blockchain.length + 1,
    timestamp: new Date().toISOString(),
    user: username,
    candidate,
    prevHash
  };
  block.hash = generateHash(JSON.stringify(block));
  return block;
}

app.post("/vote", (req, res) => {
  const { candidate, username } = req.body;
  if (!votes[candidate]) return res.status(400).send("Invalid vote");

  votes[candidate]++;
  const newBlock = createBlock(username, candidate);
  blockchain.push(newBlock);

  res.json({ votes, blockchain });
});

app.get("/votes", (req, res) => {
  res.json({ votes });
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory vote storage (this resets when server restarts)
let votes = {
  A: 2,
  B: 0,
  C: 0
};

// POST /vote
app.post('/vote', (req, res) => {
  const { candidate, username } = req.body;
  if (votes.hasOwnProperty(candidate)) {
    votes[candidate]++;
    console.log(`${username} voted for ${candidate}`);
    res.json({ message: "Vote recorded!", votes });
  } else {
    res.status(400).json({ message: "Invalid candidate!" });
  }
});

// GET /votes
app.get('/votes', (req, res) => {
  res.json({ votes });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
app.post('/vote', (req, res) => {
    const { candidate } = req.body;
    if (!candidate) {
        return res.status(400).json({ message: "Candidate name required" });
    }

    const newVote = {
        candidate,
        timestamp: Date.now()
    };

    blockchain.addBlock(newVote);
    res.json({ message: `Vote for ${candidate} added.` });
});
