if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY

console.log(stripeSecretKey, stripePublicKey)





const express = require('express');
const path = require('path');
const ejsMate = require('ejs-mate');


const app = express();
const fs = require('fs')

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

app.get('/shop', function(req, res) {
    fs.readFile('items.json', function(error, data) {
        if (error) {
            res.status(500).end()
        } else {
        res.render('shop') , {
            items: JSON.parse(data)
        }
    }
  })
})

        

app.get('/contact', (req, res) => {
    res.render('contact')
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serving on port ${port}`)
})


