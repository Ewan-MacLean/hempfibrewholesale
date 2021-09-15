// Force SSL

var express1 = require('express');
var forceSSL = require('express-force-ssl');
var fs = require('fs');
var http = require('http');
var https = require('https');
 
var ssl_options = {
  key: fs.readFileSync('./keys/private.key'),
  cert: fs.readFileSync('./keys/cert.crt'),
  ca: fs.readFileSync('./keys/intermediate.crt')
};
 
var app1 = express1();
var server = http.createServer(app);
var secureServer = https.createServer(ssl_options, app1);
 
app1.use(express1.bodyParser());
app1.use(forceSSL);
app1.use(app1.router);
 
secureServer.listen(443)
server.listen(80)

// end force ssl


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


