const mongoose = require('mongoose');
const Celeb = require('../models/celebrity');

const dbName = 'celebrity-movies-lab';
mongoose.connect(`mongodb://localhost/${dbName}`);

const celebList = [
//   {
//     name: "Elvis",
//     occupation: "Singer",
//     catchPhrase: "Hello"
//   },
//   {
//     name: "Elton John",
//     occupation: "Singer",
//     catchPhrase: "Rocketman"
//   }
]

// Celeb.create(celebList, (err) => {
//     if (err) { throw(err) }
//     console.log(`Created ${celebList.length} entries`)
//     mongoose.connection.close();
//   });

const Movie = require('../models/movie');

const movieList = [
  {
    title: "Shining",
    genre: "Horror",
    plot: "A family, a hotel."
  },
  {
    title: "ES",
    genre: "Horror",
    plot: "A clown, some kids."
  }
]

Movie.create(movieList, (err) => {
    if (err) { throw(err) }
    console.log(`Created ${movieList.length} entries`)
    mongoose.connection.close();
  });