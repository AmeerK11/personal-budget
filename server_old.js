// Budget API
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.get('/budget', (req, res) => {
    fs.readFile(path.join(__dirname, 'budget.json'), 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading budget.json:", err);
            res.status(500).json({ error: "Failed to read budget data" });
            return;
        }
        res.json(JSON.parse(data));
    });
});
app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});