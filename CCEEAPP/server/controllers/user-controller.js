var db = require('../database/database.js');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(5);//create the salt
var jwt = require('jsonwebtoken');

module.exports.createUser =function(req,res){
    var password =bcrypt.hashSync(req.body.user_password, salt);//use the salt on password
    var query="INSERT INTO users(username, user_password, email) VALUES ('" + req.body.username + "', '" + password + "' , '" + req.body.email + "')";
    
    db.local.query(query).spread(function(result,metadata){
        res.status(200).send("User was sucessfully created");
    }).catch(function(err){
        res.status(500).send("User was not created");
    });
}

module.exports.logIn = function(req,res){
    var submittedPassword = req.body.password;
    var query ="Select * from users where username = '" + req.body.name +"' OR email = '" + req.body.name + "'";
   
    db.local.query(query).spread(function(result,metadata){
        if(result.length>0){
            var userData=result[0];
            var isVerified = bcrypt.compareSync(submittedPassword,userData.user_password);
            
            
            if(isVerified){
                //user authenticated give token
                console.log(userData);
                var token = jwt.sign(userData, process.env.SECRET, {expiresIn: 60*60*24});
                delete userData.user_password;
                res.json({
                    userData:userData,
                    token:token
                });
            } else {
                res.status(400).send("Incorrect Password");
            }
            
        }
     
    }).catch(function(err){
        res.status(500).send("Unable to process query");
        console.log(err);
    })
}