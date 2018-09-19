var express = require("express");
var app = express();
var bodyParser = require("body-parser")


app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs')

// HOME PAGE
app.get('/', function(req, res){
   res.render('home');
});


app.get('/suns', function(req, res){
    res.render('sun_gallery');
});



app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Sun is running :) Good job "); 
});