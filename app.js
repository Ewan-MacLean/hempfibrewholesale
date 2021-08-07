const express = require('express');
const path = require('path');
// const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');


// mongoose.connect('mongodb://localhost:27017/yelp-camp', {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true
// });

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", () => {
//     console.log("Database connected");
// });

const app = express();

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static('public'));

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('home')
});

app.get('/aboutus', (req, res) => {
    res.render('aboutus')
});

app.get('/shop', (req, res) => {
    res.render('shop')
});

app.get('/contact', (req, res) => {
    res.render('contact')
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serving on port ${port}`)
})


