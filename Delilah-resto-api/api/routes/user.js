const express = require ('express');
const router = express.Router();
const mongoose = require ('mongoose');
const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');


const User = require('../models/user');

router.get('/',checkAuth,(req, res, next)=>{
  User.find()
  .select('_id fullname email address role')
  .exec()
  .then(docs =>{
      const response ={
        count: docs.length,
        products: docs.map( doc =>{
          return{
              _id:doc._id,
            fullname:doc.fullname,
            email:doc.email,
            adress:doc._adress,
            role:doc._role,
            request: {
                type: 'GET',
                url:'http://localhost:8080/users/' 
            }
          }
        })
      };

      console.log(docs);
      res.status(200).json(docs);

  })

  .catch (err=> {
      console.log(err);
      res.status(500).json({
          error:err
      })
  })
});

router.post('/signup', (req, res, next) => {
    User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Mail exists"
        });
      } else {
    bcrypt.hash (req.body.password,10,(err,hash) =>{
            if (err){
                return res.status(500).json({
                    error:err
                });
            } else {
                const user = new User({
                    _id: new mongoose.Types.ObjectId(),
                    fullname: req.body.fullname,
                    adress:req.body.adress,
                    email:req.body.email,
                    password:hash,
                    role: req.body.role

                });
                    user.save()
                    .then( result =>{
                        res.status(201).json({
                            message: 'User Created'
                        });
                    })
                    .catch( err =>{
                        console.log(err);
                        res.status(500).json({
                            error:err
                        })
                    });
            }
        });
    }
});
});

router.post("/login", (req, res, next) => {
    User.find({ email: req.body.email })
      .exec()
      .then(user => {
        if (user.length < 1) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            return res.status(401).json({
              message: "Auth failed"
            });
          }
          if (result) {
            const token = jwt.sign(
              {
                email: user[0].email,
                userId: user[0]._id,
                role: user[0].role
              },
              "secret",
              {
                  expiresIn: "1h"
              }
            );
            return res.status(200).json({
              message: "Auth successful",
              token: token
            });
          }
          res.status(401).json({
            message: "Auth failed"
          });
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });

router.delete("/:userId",checkAuth, (req, res, next) => {
    User.remove({ _id: req.params.userId })
      .exec()
      .then(result => {
        res.status(200).json({
          message: "User deleted"
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });
  


module.exports = router;