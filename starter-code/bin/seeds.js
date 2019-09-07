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
    plot: "A family, a hotel.",
    image: "https://39m9vk1z5i3x15rspj43y7k8-wpengine.netdna-ssl.com/wp-content/uploads/2017/10/the-shining-film-1300x720.jpg"
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