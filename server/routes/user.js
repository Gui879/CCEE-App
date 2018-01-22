var express = require('express');
var router = express.Router();
var db =require('../database/database.js');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));
router.use(function(req,res,next){
    var token = req.headers['auth-token'];
    jwt.verify(token, process.env.SECRET, function(err,decoded){
        if(err){
            res.status(400).send("The Token is Invalid");
        } else {
            console.log("Users id: " + decoded.id);
            req.user_id=decoded.id;
            next();
        }
    })
});
/*
//get endpoints

router.get('/get_friends',function(req,res){
    var query="select friend.friend_id,friend.date_friended, u.username, u.display_name from user_friends friend INNER JOIN users u ON(u.id = friend.friend_id) where user_id =" + req.user_id;
    db.query(query).spread(function(result,metadata){
        res.json({
            data:result
        })
    }).catch(function(err){
        res.status(500).send(err);
    })
});
router.get('/get_friend_requests',function(req,res){
    console.log("this is user id: " + req.user_id)
    var query ="select (a.id) reqId , a.sender_id,a.received_id,a.status,u.username from user_friend_requests a inner join users u on (u.id = a.sender_id) where a.received_id = " + req.user_id + " and a.status = 'pending'";
    
    db.query(query).spread(function(result,metadata){
        res.json({
            data:result
        });
    }).catch(function(err){
        res.status(500).send(err);
    });
});router.get('/get_users',function(req,res){
    var query = "SELECT id,username,first_name,last_name FROM users WHERE id != "+req.user_id;
    
    db.query(query).spread(function(result,metadata){
        res.json({
            data:result
        })
    }).catch(function(err){
        res.status(500).send("Unable to query DB at this time");
    })
});
router.get('/get_users_toadd',function(req,res){
    var query="select users.id,users.username,friends.user_id,friends.friend_id from users left join (select * from user_friends u where u.user_id = " + req.user_id + ") friends on friends.friend_id = users.id where friends.user_id is null and users.id != " + req.user_id;
    
    db.query(query).spread(function(result,metadata){
        res.json({
            data:result
        })
    }).catch(function(err){
        res.status(500).send("Unable to query DB at this time");
    })
});//post endpoints
router.post('/request_friend', function(req,res){
    //Check if request has already been sent
    var query="SELECT * FROM user_friend_requests WHERE sender_id ="+req.user_id + " AND received_id =" + req.body.received_id;
    
    db.query(query).spread(function(result,metadata){
        if(result.length == 0){
            insertRequest();
            
        } else {
            res.status(200).send("Relation already exists");
        }
    }).catch(function(err){
        res.status(500).send(err);
    });
    
    function insertRequest(){
        var query = "INSERT INTO user_friend_requests (sender_id, received_id, status) VALUES (" +req.user_id +","+req.body.received_id+",'pending')";
        
        db.query(query).spread(function(result,metadata){
            res.status(200).send("Request created sucessfully");
        }).catch(function(err){
            res.status(500).send(err);
        });
    }
});
router.post('/request_response', function(req,res){
    //Check if request exists
    var query = "SELECT * FROM user_friend_requests WHERE id ="+ req.body.request_id;
    var senderId;
    var receivedId;
    
    db.query(query).spread(function(result,metadata){
        if(result.length >0){
            //Update accordingly
            senderId = result[0].sender_id;
            receivedId = result[0].received_id;
            console.log('HEHRERERER::: ' +  req.body.response +" " + req.body.request_id);
            updateRequest();
        } else {
            res.status(400).send("request doenst exist");
        }
    });
    
    function updateRequest(){
        
        var isAccepted = req.body.response ==='accepted';
        var query;
        if(isAccepted){
            query ="UPDATE user_friend_requests SET status ='accepted' WHERE id="+req.body.request_id;
        } else {
           query = "DELETE FROM user_friend_requests WHERE id="+req.body.request_id;
        }
        db.query(query).spread(function(result, metadata){
            if(isAccepted){
                performSenderInsert();
            } else {
                res.status(200).send("Request deleted!");
            }
                
            }).catch(function(err){
                res.status(500).send(err);
            });
    }
    
    function performSenderInsert(){
        var query = "INSERT INTO user_friends (user_id,friend_id,date_friended) VALUES (" + senderId + "," + receivedId + ",now())";
        
        db.query(query).spread(function(result,metadata){
           performReceiverInsert();
        }).catch(function(){
            res.status(500).send("Cant do shitt");
        });
    }
    
    function performReceiverInsert(){
        var query = "INSERT INTO user_friends (user_id,friend_id,date_friended) VALUES (" + receivedId + "," + senderId + ",now())";
        
        db.query(query).spread(function(result,metadata){
            res.status(200).send("The user was sucessfuly confirmed");
        }).catch(function(){
            res.status(500).send("Cant do shitt");
        });
    }
                     
});
*/

//get endpoints
router.get('/get_conferences',function(req,res){
    var query="select id,title_it  from meeting";
    db.ccee.query(query).spread(function(result,metadata){
        res.json({
            data:result
        })
    }).catch(function(err){
        console.log(err);
        res.status(500).send(err);
    })
});



//post endpoints
router.post('/add_conference',function(req,res){
    var query = "insert into conferences (name) VALUES ('" + req.body.name +"' ) ";

    db.local.query(query).spread(function(result,metadata){
        res.status(200).send("Conference Created");     
    }).catch(function(err){
        res.status(500).send("Failed!");
    });
    
});

router.post('/delete_conference', function(req,res){
    var query= "delete from conent where conference_id = " + req.body.conference_id;
    
    db.local.query(query).spread(function(result,metadata){
        console.log("deleted conferences from relational table");
        deleteConference();
    }).catch(function(err){
        res.status(500).send("Failed on relational");
    });
    
    function deleteConference(){
        var query = "delete from conferences where id = " + req.body.conference_id;
        
        db.local.query(query).spread(function(result,metadata){
            res.status(200).send("Sucess");
        }).catch(function(err){
            res.status(500).send("Failure");
        });
    };
});

router.post('/conference_details', function(req,res){
    var query="select m.id,m.end_date,m.start_date,m.last_change,m.last_user,m.title_de,m.title_en,m.title_fr,m.title_it,c.name as city,b.name_it as country_it,b.name_de as country_de,b.name_fr as country_fr,b.name_en as country_en  from city c, country b, meeting m where c.id = m.city_id and c.country_id = b.id and m.id="+ req.body.id;
    
    db.ccee.query(query).spread(function(result,metadata){
        res.json({
            data:result
        })
    }).catch(function(err){
        console.error(err);
        res.status(500).send(err);
    });
});

router.post('/conference_participants',function(req,res){
    var query="select b.id, c.forename,b.arrival_date,b.arrival_hour,b.arrival_transportation from attendance_group a inner join attendance b  on a.id = b. attendance_group_id inner join person c on b.person_id = c.id where a.meeting_id = "+req.body.id;
    
    db.ccee.query(query).spread(function(result,metadata){
        res.json({
            data:result
        })
    }).catch(function(err){
        console.error(err);
        res.status(500).send(err);
    });
});

router.post('/edit_conference',function(req,res){
    var query = "update attendance set arrival_date ='" + req.body.arrival_date + "' , arrival_hour = '" + req.body.arrival_hour + "', arrival_transportation = '" + req.body.arrival_transportation + "' where id =" + req.body.id;
    
    db.ccee.query(query).spread(function(result,metadata){
        res.status(200).send("Worked");
    }).catch(function(err){
        res.status(500).send(err);
    });
});


module.exports = router;