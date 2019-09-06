const mongoose = require('mongoose');
const Celeb = require('../models/celebrity');

const dbName = 'celebrity-movies-lab';
mongoose.connect(`mongodb://localhost/${dbName}`);

const celebList = [
  {
    name: "Elvis",
    occupation: "Singer",
    catchPhrase: "Hello"
  },
  {
    name: "Elton John",
    occupation: "Singer",
    catchPhrase: "Rocketman"
  }
]

Celeb.create(celebList, (err) => {
    if (err) { throw(err) }
    console.log(`Created ${celebList.length} entries`)
    mongoose.connection.close();
  });