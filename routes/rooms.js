'use strict';

let express = require('express');
let router = express.Router();
let Item = require('../models/item')
let Room = require('../models/room');

router.get('/', (req, res) => {
  Room.find({}, function(err, rooms){
    Item.find({}, function(err, items){
      console.log(rooms)
      res.render('index', {rooms : rooms, items: items});
    });
  }).populate('items');
});

router.get('/:id', (req, res) => {
  Room.findById(req.params.id, function(err, room){
    res.status(err ? 400 : 200).send(err ? 'room not found' : room);
  });
});

router.put('/:roomId/addItem/:itemId', function(req,res){
  console.log(req.params.roomId, req.params.itemId)
  Room.findOne({name: req.params.roomId}, function(err, room){
    console.log(room)
    if(err){return res.send(err)}

    Item.findOne({name : req.params.itemId}, function(err, item){
      console.log(room.items)
      console.log(item)
      if(err){return res.send(err)}
      // if (room.items === undefined){
      //   room.items = []
      // }
      if (room.items.indexOf(item._id) !==-1) {
        return res.send('Item already in room')
      }
      
      room.items.push(item._id);
      room.save(function(err){
        res.redirect('/')
      })
      
    });
  })
})

router.delete('/itemdelete', (req, res) => {
  Room.findById(req.body.roomId, function(err, room){
    console.log(room.items)
    room.items.splice(req.body.rowId, 1)
    room.save(err => {
    res.status(err ? 400 : 200).send(err || ` removed`);
    });
  })
    // ({'_id': req.body.rowId}, function(err, item){
    //   if(err){return console.log('Error deleting:', err)}
    //   res.send('item deleted')
})

router.put('/:id', (req, res) => {
  Room.findByIdAndUpdate(req.params.id, { $set: req.body }, function(err, room) {
    res.status(err ? 400 : 200).send(err ? 'room update failed' : room);
  });
});

router.delete('/', (req, res) => {
  Room.findByIdAndRemove(req.body.id, function(err, room) {
    res.status(err ? 400 : 200).send(err ? 'room delete failed' : 'room deleted.');
  });
});

router.post('/', (req, res) => {
  var room = new Room(req.body);
  room.save(err => {
    res.status(err ? 400 : 200).send(err || `${req.body.name} added.`);
  });
});

module.exports = router;
