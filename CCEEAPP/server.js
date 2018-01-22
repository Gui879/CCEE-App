var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('./server/database/database.js');
var jwt =require('jsonwebtoken');

process.env.SECRET ="A SECRET";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/client',express.static(__dirname + '/client'));
//Controllers
var userController =require('./server/controllers/user-controller.js');

//Routers
var secureUserRouter = require('./server/routes/user.js');


app.use('/secure/api/user', secureUserRouter);


//Routes
app.get('/',function(req,res){
    res.sendFile(__dirname + '/client/index.html');
})

app.post('/api/user/create',userController.createUser);
app.post('/api/user/login',userController.logIn);


//sync to db first then listen to server
db.ccee.sync().then(function(){
    app.listen(3000, function(){
        console.log("ccee working!");
    })
})