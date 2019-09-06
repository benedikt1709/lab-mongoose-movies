const express = require('express');
const router = express.Router();

const Movie = require('../models/movie')

// GET Movie

router.get('/movies/index', (req, res, next) => {
    Movie.find()
        .then(allTheMoviesFromDB => {
            console.log('Retrieved movies from DB:', allTheMoviesFromDB.length);
            res.render('movies/index', { Movie: allTheMoviesFromDB });
        })
        .catch(error => {
            console.log('Error while getting the data from the DB: ', error);
        })
});

// ADD Movie

router.get('/new', (req, res, next) => {
    res.render('movies/new');
});

router.post('/index', (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body;
    const newMovie = new Movie({ name, occupation, catchPhrase })
    newMovie.save()
        .then(() => {
            res.redirect('/movies/index');
        })
        .catch((error) => {
            res.render("movies/new");
        })
});

// EDIT Movie

router.get('/:movie_id/edit', (req, res, next) =>   {
    Movie.findById(req.params.movie_id)
        .then((movie) => {
            res.render('movies/edit', {movie: movie});
        })
        .catch((error) =>   {
            console.log(error);
        })
})

router.post("/:movie_id", (req, res, next) => {
    const { title, genre, plot } = req.body;
    Movie.update(
      { movie_id: req.query.movie_id },
      { $set: { title, genre, plot }}
    )
    .then(() => {
      res.redirect('/movies/index');
    })
    .catch((error) => {
      console.log(error);
    })
  });


// DELETE Movies

router.post('/:movie_id/delete', (req, res, next) => {
    Movie.findByIdAndDelete(req.params.movie_id)
        .then(() => {
            res.redirect('/movies/index');
        })
        .catch((error) => {
            console.log(error);
        })
});

// DETAILS for each movie

router.get(`/:movie_id`, (req, res, next) => {
    Movie.findById(req.params.movie_id)
        .then((oneMovie) => {
            res.render("movies/show", { movie: oneMovie });
        })
        .catch((error) => {
            console.log(error);
        })
});



module.exports = router;
