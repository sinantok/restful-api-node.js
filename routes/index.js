const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
//Models
const UserModel = require('../models/Users');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Book-Api' });
});

router.post('/register', (req, res, next) => {

  const { userName, password } = req.body;

  if( password.length > 15 || password.length < 6 ){
    res.json("password must be greater than 6 character or less than 15 character");
    return false;
  }
  bcrypt.hash(password, 10).then((hash) => {
    const user = new UserModel({
      userName, 
      password: hash
    });

    const promise = user.save();
    promise.then((data) => {
      res.json(data);
    }).catch((err) => {
      res.json(err);
    });  
  });

});

router.post('/login', (req, res, next) => {
  const { userName, password } = req.body;

  UserModel.findOne({ userName: userName }, (err, user) => {
    if(err)
      throw err;
    if(user){
      bcrypt.compare(password, user.password).then((result) => {
        if(result){
          const payload = {
             userName
          };
          const token = jwt.sign(payload, req.app.get('api_secret_key'), {
            expiresIn: 720 //720dklık bir aut suresi veriliyor
          });

          res.json({
            status: true,
            token: token
          })

        }else{
          res.json({
            status: false,
            message: 'Wrong Password!'
          });
        }
      });
    }else{
      res.json({
        status: false,
        message: 'User not found!'
      });
    }
  });
});

module.exports = router;
