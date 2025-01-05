const express = require('express');
const path = require('path');
const fs = require('fs');
const routes = require('./routes/route');

const app = express();
const PORT = 3000;

app.set("json spaces",2);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', routes);

app.get('/lol/routes', (req, res) => {
  fs.readFile(path.join(__dirname, 'rute.json'), 'utf8', (err, data) => {
    if (err) return res.status(500).json({ msg: "Error reading routes file" });
    res.json(JSON.parse(data)); // mengirimkan data endpoint dalam format JSON
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});