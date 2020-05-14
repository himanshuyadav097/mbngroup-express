var mongoose = require('mongoose');
var express = require('express');
var jsonwebtoken = require('jsonwebtoken');
var router = express.Router();
var User = require("../model/user");
import Config from '../config/config';
import { resolve } from 'url';
import { rejects } from 'assert';
const {
  port,
  secretKey,
  expiredAfter
} = Config;

router.post('/api/signup', function (req, res) {
  
  var newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    permission: req.body.permission,
    status:req.body.status,
    created: new Date().getTime(),
    deleted: req.body.deleted
  });

/*   newUser.save(function (err,user ){
    if(err){
        return res.status(401).json({
        success: false,
        msg: 'Some thing is wrong.'
      });
    }else{
      return res.status(201).json({
        success: true,
        msg: req.body.name + ' created successfully.'
      }
      
      );
    }
  }
  ) */

  // function findUser() { return new promeise}

  userinsert()
  .then(function() {
    res.status(200).json({
      success: true,
      msg: name + " created successfully."
    })
  })
  .catch(function(err) {
    res.status(401).json({
      success: false,
      msg: err.message
    })
  })

  function userinsert(){

    return new Promise(function (resolve,rejects){
if(newUser){
  newUser.save(function (err,user ){
if(err){
  return res.status(401).json({
    success: false,
    msg: 'Some thing is wrong.'
  });
  rejects();
}else{
  return res.status(201).json({
    success: true,
    msg: req.body.name + ' created successfully.'
  }
  
  );
  resolve();
}

})
}else{
  return res.status(401).json({
    success: false,
    msg: 'Some thing is wrong.'
  });
  rejects();
}

    })
  }

/* const mypromise= new Promise(function(resolve,reject){
if(newUser){
  newUser.save(function (err,user ){
    if(err){
        return res.status(401).json({
        success: false,
        msg: 'Some thing is wrong.'
      });
    }else{
      return res.status(201).json({
        success: true,
        msg: req.body.name + ' created successfully.'
      }
      
      );
    }
  })
        resolve(newUser); 
}else{

  const errorObject = {
    msg: 'An error occured',
    }
 reject(errorObject);
}
  }) */
  });



router.post('/api/login', (req, res) => {

const response = {};
User.findOne({
  email:req.body.email
},function(err,user){

  if(err){
    response.error = 'Internal Server Error.';
    res.json(response);

  }if (!user || user.deleted == 1) {
    response.error = 'Authentication failed. User not found.';
    res.json(response);
    
  } else {
        user.comparePassword(req.body.password, function (err, isMatch) {

console.log("ismatch========================",isMatch);
// ismatch true and false 

     })

  }
console.log("user login",user);

})
/* User.findOne({
  email: req.body.email,
  deleted: 0
}, function (err, user) {
  if (err) {
    // console.log(err);
    response.error = 'Internal Server Error.';
    res.json(response);
    //  res.status(500).send({success: false, msg: 'Internal Server Error.'});
  }
  if (!user || user.deleted == 1) {
    response.error = 'Authentication failed. User not found.';
    res.json(response);
    // res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
  } else {
    // check if password matches
    //console.log(user);
    user.comparePassword(req.body.password, function (err, isMatch) {
      // console.log(isMatch);
      if (isMatch && !err) {
        // if user is found and password is right create a token
        response.token = jsonwebtoken.sign({
            expiredAt: Date.now() + expiredAfter,
            email: user.email,
            name: user.name,
            id: user._id,
            role: user.permission[0]
          },
          secretKey
        );

        User.findByIdAndUpdate(user._id, update_login_date, function (err, user) {
          if (err) {
            response.error = 'Authentication failed. Wrong creditinals.';
            res.json(response);
          }
          res.json(response);
        });

      } else {
        response.error = 'Authentication failed. Wrong Password.';
        res.json(response);
      }
    });
  }

}); */ 

  });


router.get('/api/user/list', function (req,res)  {

  console.log("helo");

 var dbquery={};
User.find(dbquery).count().exec(function (err, totalCount) {

if(err){

}else{

  User.find(dbquery, {
    name: 1,
    email: 1,
    _id: 1,
    deleted: 1,
    created: 1,
    permission: 1,
   
  })
  .exec(function (err, userInformation){
console.log("userInformation",userInformation);
if (err) {
  res.json({
    success: false,
    result: 'error'
  });
} else {
  res.json({
    success: true,
    result: userInformation,
    totalRecCount: totalCount
  });
}

  })

}
}) 
  
  });

  

  
  module.exports = router;