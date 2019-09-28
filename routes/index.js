const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
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

})

module.exports = router;
