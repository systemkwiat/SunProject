var express = require("express");
var app = express();
var bodyParser = require("body-parser")
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/sunDB")
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs')



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
            console.log(allSuns);
            res.render('sun_gallery', {sun: allSuns});
        }
    });
});

app.get('/suns/new', function(req, res){
   res.render('newSun');
});


app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Sun is running :) Good job "); 
});