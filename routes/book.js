const express = require('express');
const router = express.Router();

//Models
const BookModel = require('../models/Books');
//getAll
router.get('/', (req, res, next) => {
  const promise = BookModel.aggregate([
    {
      $lookup: {
        from: 'authors',
        localField: 'author_id',
        foreignField: '_id',
        as: '_author'
      }
    },
    {
      $unwind: {
        path: '$_author',
        preserveNullAndEmptyArrays: true
      }
    }
  ]);
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});
//top10scorelist
router.get('/top10', (req, res, next) => {
  const promise = BookModel.find({ }).limit(10).sort({ scoring: -1 });
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});
//betweenPublishedDate
router.get('/between/:start_year/:end_year', (req, res, next) => {
  const { start_year, end_year } = req.params;
  const promise = BookModel.find(
    { 
      published_date: { "$gte": parseInt(start_year), "$lte": parseInt(end_year) }
    }
  );
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});
//getbyId
router.get('/:book_id', (req, res, next) => {
  const promise = BookModel.findById(req.params.book_id);
  promise.then((data) => {
    if(!data)
      next({ message: 'The book was not found' });
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});
//postBody
router.post('/', (req, res, next) => {
  const book = new BookModel(req.body);
  const promise = book.save();
  
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});
//updateById
router.put('/:book_id', (req, res, next) => {
  const promise = BookModel.findByIdAndUpdate(
      req.params.book_id,
      req.body,
      {
        new: true  //guncellenen datanın son halini alır 
      }
    );
  promise.then((data) => {
    if(!data)
      next({ message: 'The book was not found' });
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});
//deletebyId
router.delete('/:book_id', (req, res, next) => {
  const promise = BookModel.findByIdAndRemove(req.params.book_id);
  promise.then((data) => {
    if(!data)
      next({ message: 'The book was not found' });
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

module.exports = router;
