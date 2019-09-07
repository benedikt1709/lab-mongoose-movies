const express = require('express');
const router = express.Router();

const Celeb = require('../models/celebrity')

// GET Celebs

router.get('/index', (req, res, next) => {
    Celeb.find()
        .then(allTheCelebsFromDB => {
            console.log('Retrieved celebs from DB:', allTheCelebsFromDB.length);
            res.render('celebrities/index', { Celeb: allTheCelebsFromDB });
        })
        .catch(error => {
            console.log('Error while getting the data from the DB: ', error);
        })
});

// ADD Celebs

router.get('/new', (req, res, next) => {
    res.render('celebrities/new');
});

router.post('/index', (req, res, next) => {
    const { name, occupation, catchPhrase, image } = req.body;
    const newCeleb = new Celeb({ name, occupation, catchPhrase, image })
    newCeleb.save()
        .then(() => {
            res.redirect('/celebrities/index');
        })
        .catch((error) => {
            res.render("celebrities/new");
        })
});

// EDIT Celebs

router.get('/:celeb_id/edit', (req, res, next) =>   {
    Celeb.findById(req.params.celeb_id)
        .then((celeb) => {
            res.render('celebrities/edit', {celeb: celeb});
        })
        .catch((error) =>   {
            console.log(error);
        })
})

router.post("/edit", (req, res, next) => {
    const { name, occupation, catchPhrase, image, celeb_id } = req.body;
    Celeb.update(
      { _id: celeb_id },
      { $set: { name, occupation, catchPhrase, image }}
    )
    .then(() => {
      res.redirect('/celebrities/index');
    })
    .catch((error) => {
      console.log(error);
    })
  });


// DELETE Celebs

router.post('/:celeb_id/delete', (req, res, next) => {
    Celeb.findByIdAndDelete(req.params.celeb_id)
        .then(() => {
            res.redirect('/celebrities/index');
        })
        .catch((error) => {
            console.log(error);
        })
});

// DETAILS for each celeb

router.get(`/:celeb_id`, (req, res, next) => {
    Celeb.findById(req.params.celeb_id)
        .then((oneCeleb) => {
            res.render("celebrities/show", { celeb: oneCeleb });
        })
        .catch((error) => {
            console.log(error);
        })
});



module.exports = router;
