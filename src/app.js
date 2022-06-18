const path = require('path');
const express = require('express');

const app = express();

const PUBLIC_FOLDER = path.join(__dirname, '../public');
app.use(express.static(PUBLIC_FOLDER));

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.listen(8080, () => {
  console.log("Running on port 8080");
});
