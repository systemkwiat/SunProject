var express = require("express");
var app = express();
var bodyParser = require("body-parser")
var mongoose = require("mongoose");
var methodOverride = require("method-override");
var passport = require("passport");
var LocalStrategy = require("passport-local")
var User = require("./models/user.js")



// mongoose.connect("mongodb://localhost:27017/sunDB");
mongoose.connect("mongodb://sunadmin:sunroot01@ds235732.mlab.com:35732/sunproject");

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(methodOverride("_method"));

//PASSPORT CONFIG
app.use(require('express-session')({
    secret: "This is system secret",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// User.create({
//     name: 'Kamil',
//     username: "system",
//     password: '1234'
// }, function(err, newUser){
//     if (err){
//         console.log(err);
//         console.log("not working");
//     } else {
//         console.log('\n WE DID IT \n');
//         console.log(newUser);
//     }
// });


var sunSchema = new mongoose.Schema({
   title: String,
   img: String,
   data: {type: Date, default: Date.now},
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

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});


// HOME PAGE
app.get('/', function(req, res){
   res.render('home');
});


app.get('/suns', function(req, res){
    Sun.find({}, function(err, allSuns){
        if(err){
            console.log(err);
        } else {
            res.render('sun_gallery', {sun: allSuns, currentUser: req.user});
        }
    });
});

app.get('/suns/new', isLoggedIn, function(req, res){
   res.render('newSun');
});

// Create and add new SunRise
app.post('/suns', function(req, res){
    
    Sun.create(req.body.sun, function(err, newSun){
        if(err){
            res.render('home');
        } else {
            res.redirect('/suns');
        }
    });
});

// DELETE sunrise
app.delete('/suns/:id', isLoggedIn, function(req, res){
    //delete form db
    Sun.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect('/');
        } else {
            res.redirect('/suns');
        }
    });
});








// =============
// AUTH ROUTES
//==============

app.get('/registration', function(req, res){
    res.render('registration');
});

app.post('/registration', function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
           return  res.render('registration')
        } 
        passport.authenticate('local')(req, res, function(){
            res.redirect('/suns');
        });
    });
});
// ======== LOG IN 
app.get('/signin', function(req, res){
    res.render('signIn');
});

app.post('/signin', passport.authenticate('local', 
    {
        successRedirect: '/suns',
        failureRedirect: '/'
    
}), function(req, res){
    
});

// LOG OUT
app.get('/logout', function(req, res){
   req.logout();
   res.redirect('/suns')
});



function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/signin');
}


app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Sun is running :) Good job "); 
});