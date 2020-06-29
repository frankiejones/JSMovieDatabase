const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express(); // initialising express to be used as a function

require('dotenv').config(); // create a .env file and .gitignore

mongoose.connect(process.env.databaseURL, {
    useNewUrlParser:true, useUnifiedTopology: true
});

const movieModel = require('./models/movieModel');

app.use(bodyParser.urlencoded({extended: false}));
// form that accepts urls - take everything as a string
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.engine('.hbs', hbs({
    defaultLayout: 'layout',
    extname: 'hbs'
}));

app.set('view engine', '.hbs');
//view that I'm rendering plus the engine ext name

app.get('/', async (req, res) => {
    res.render('index');
});

app.get('/movieForm', async (req, res) => {
    res.render('movieForm');
});

app.post('/movieForm', async (req, res) => {
    let { title, genre, rating, releaseDate } = req.body;
    if (!title || !genre || !rating || !releaseDate) {
		res.render('MovieForm', {err: "Please provide all credentials"});
		return; // this stops the execution of any of the code below if any of the if statement is not met.
    };
    const movie = new movieModel({
        title, 
        genre,
        rating, 
        releaseDate 
    })
    await movie.save()
    res.render('movieForm');
});

app.get('/movies', (req,res) => {
    res.render('movies');
});
   
app.post('/movies', async (req,res) => {
    let movieName = req.body.findMovie
    console.log(movieName);
    const findMovie = await movieModel.findOne({movieName});
    //console.log(findMovie);
    res.render('movies', {findMovie});
});

app.listen(process.env.PORT || 3005, () => {
    console.log('Server is running on 3005. Chase it.');
})