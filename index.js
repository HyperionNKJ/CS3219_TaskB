let express = require('express')
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let apiRoutes = require("./api-routes")


let app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Connect to Mongoose and set connection variable
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/ModTrack', { useNewUrlParser: true});
var db = mongoose.connection;

// Added check for DB connection
if(!db) {
  console.log("Error connecting db")
}
else {
  console.log("Db connected successfully")
}

app.use('/api', apiRoutes) // whenever user visits /api path, use the routes defined in api-routes

app.get('/', (req, res) => res.send('Welcome to ModTrack by Neo Kai Jun for CS3219 Task B'));

var port = process.env.PORT || 8080;
app.listen(port, function () {
     console.log("ModTrack running on port " + port);
});

module.exports = app
