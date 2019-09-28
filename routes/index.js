const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.post('/register', (req, res, next) => {

  const { userName, password } = req.body;
  const user = new UserModel({userName, password});
  const promise = user.save();
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });  

})

module.exports = router;
