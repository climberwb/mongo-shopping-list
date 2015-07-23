var express = require('express');
var Item = require('../services/item');
var router = express.Router();

router.get('/items', function(req, res) {
    Item.list(function(items) {
        res.json(items);
    }, function(err) {
        res.status(400).json(err);
    });
});

router.post('/items', function(req, res) {
    Item.save(req.body.name, function(item) {
        res.status(201).json(item);
    }, function(err) {
        res.status(400).json(err);
    });
});

router.put('/items/:id',function(req,res){
  console.log('inside put routes',req.body.name,req.body.id);
  Item.update(req.body.name,req.body.id,function(item){
       console.log('inside put routes success');
      res.status(201).json(item);
  }, function(err){
      console.log('inside put routes fail');
      res.status(400).json(err);
  });
});

module.exports = router; //QUESTION: are you tacking on router.get and router.post onto router module? 