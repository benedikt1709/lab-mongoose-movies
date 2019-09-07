const express = require('express');
const router = express.Router();

const Movie = require('../models/movie')

// GET Movies

router.get('/index', (req, res, next) => {
    Movie.find()
        .then(allTheMoviesFromDB => {
            console.log('Retrieved movies from DB:', allTheMoviesFromDB.length);
            res.render('movies/index', { Movie: allTheMoviesFromDB });
        })
        .catch(error => {
            console.log('Error while getting the data from the DB: ', error);
        })
});

// ADD Movies

router.get('/new', (req, res, next) => {
    res.render('movies/new');
});

router.post('/index', (req, res, next) => {
    const { title, genre, plot, image } = req.body;
    const newMovie = new Movie({ title, genre, plot, image })
    newMovie.save()
        .then(() => {
            res.redirect('/movies/index');
        })
        .catch((error) => {
            res.render("movies/new");
        })
});

// EDIT Movies

router.get('/:movie_id/edit', (req, res, next) =>   {
    Movie.findById(req.params.movie_id)
        .then((movie) => {
            res.render('movies/edit', {movie: movie});
        })
        .catch((error) =>   {
            console.log(error);
        })
})

router.post("/edit", (req, res, next) => {
    const { title, genre, plot, image, movie_id } = req.body;
    Movie.update(
      { _id: movie_id },
      { $set: { title, genre, plot, image }}
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
