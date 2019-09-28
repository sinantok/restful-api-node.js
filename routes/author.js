const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

//Models
const AuthorModel = require('../models/Authors');

//getAllJoin
router.get('/', (req, res, next) => {
  const promise = AuthorModel.aggregate([
    {
      $lookup: {
        from: 'books',
        localField: '_id',
        foreignField: 'author_id',
        as: '_books'
      }
    },
    {
      $unwind: {
        path: '$_books',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      '$group': {
        _id: {
          _id: '$_id',
          name: '$name',
          surname: '$surname',
          bio: '$bio'
        },
        book:{
          $push: '$_books'
        }
      }
    },
    {
      '$project': {
        _id: '$_id._id',
        name: '$_id.name',
        surname: '$_id.surname',
        bio: '$_id.bio',
        books: '$book'
      }
    }
  ]);

  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});
//getbyId
router.get('/:author_id', (req, res, next) => {
  const promise = AuthorModel.aggregate([
    {
      '$match': {
        '_id': mongoose.Types.ObjectId(req.params.author_id)
      }
    },
    {
      $lookup: {
        from: 'books',
        localField: '_id',
        foreignField: 'author_id',
        as: '_books'
      }
    },
    {
      $unwind: {
        path: '$_books',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      '$group': {
        _id: {
          _id: '$_id',
          name: '$name',
          surname: '$surname',
          bio: '$bio'
        },
        book:{
          $push: '$_books'
        }
      }
    },
    {
      '$project': {
        _id: '$_id._id',
        name: '$_id.name',
        surname: '$_id.surname',
        bio: '$_id.bio',
        books: '$book'
      }
    }
  ]);

  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});
//postBody
router.post('/', (req, res, next) => {
  const author = new AuthorModel(req.body);
  const promise = author.save();
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});
//updateById
router.put('/:author_id', (req, res, next) => {
  const promise = AuthorModel.findByIdAndUpdate(
      req.params.author_id,
      req.body,
      {
        new: true  //guncellenen datanın son halini alır 
      }
    );
  promise.then((data) => {
    if(!data)
      next({ message: 'The author was not found' });
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});
//deletebyId
router.delete('/:author_id', (req, res, next) => {
  const promise = AuthorModel.findByIdAndRemove(req.params.author_id);
  promise.then((data) => {
    if(!data)
      next({ message: 'The author was not found' });
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

module.exports = router;
