var express = require("express");
var app = express();
var bodyParser = require("body-parser")
var mongoose = require("mongoose");
var methodOverride = require("method-override");





mongoose.connect("mongodb://localhost:27017/sunDB");
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(methodOverride("_method"));



var sunSchema = new mongoose.Schema({
   title: String,
   img: String,
   data: String,
   content: String
});

var Sun = mongoose.model("Sun", sunSchema);

// Sun.create({
//     title: 'Last',
//     img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Anatomy_of_a_Sunset-2.jpg/300px-Anatomy_of_a_Sunset-2.jpg",
//     data: "21 monday 2013",
//     content: "dkasmdkanfjnkamsdlkfnsdjfnm sdsadasd as     asd sdas ds ad fklns amdfskadfks adfknsa fns adfnlkm dsflmnassdasdkamsf koanfjksd nfkjnsdk gjdfkg kdsfjn kf kjgnsdfg kjdfkg nsdfjn g ldmfla dksnf"
// }, function(err, sun){
//   if(err){
//       console.log(err);
//       console.log("\n not working bro :/");
//   } else {
//       console.log(sun);
//   }
// });



// HOME PAGE
app.get('/', function(req, res){
   res.render('home');
});


app.get('/suns', function(req, res){
    Sun.find({}, function(err, allSuns){
        if(err){
            console.log(err);
        } else {
            res.render('sun_gallery', {sun: allSuns});
        }
    });
});

app.get('/suns/new', function(req, res){
   res.render('newSun');
});

// Create and add new SunRise
app.post('/suns', function(req, res){
    
    Sun.create(req.body.sun, function(err, newSun){
        if(err){
            res.render('home');
        } else {
            console.log(newSun)
            res.redirect('/suns');
        }
    });
});

// DELETE sunrise
app.delete('/suns/:id', function(req, res){
    //delete form db
    Sun.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect('/');
        } else {
            res.redirect('/suns');
        }
    });
});


app.get('/registration', function(req, res){
    res.render('registration');
});

app.get('/signin', function(req, res){
    res.render('signIn');
});



app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Sun is running :) Good job "); 
});