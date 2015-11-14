'use strict';

let express = require('express');
let router = express.Router();

let Item = require('../models/item');

router.get('/', (req, res) => {
  Item.find({}, function(err, items){
    res.status(err ? 400 : 200).send(err || items);
  });
});

router.get('/:id', (req, res) => {
  Item.findById(req.params.id, function(err, item){
    res.status(err ? 400 : 200).send(err ? 'item not found' : item);
  });
});

router.put('/:id', (req, res) => {
  Item.findByIdAndUpdate(req.params.id, { $set: req.body }, function(err, item) {
    res.status(err ? 400 : 200).send(err ? 'item update failed' : item);
  });
});

router.delete('/', (req, res) => {
  Item.findByIdAndRemove(req.params.id, function(err, item) {
    res.status(err ? 400 : 200).send(err ? 'item delete failed' : 'item deleted.');
  });
});

router.post('/', (req, res) => {
  let item = new Item(req.body);
  item.save(err => {
    res.status(err ? 400 : 200).send(err ||  item );
  });
});

module.exports = router;
