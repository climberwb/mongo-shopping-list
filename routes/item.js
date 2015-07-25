var express = require('express');
var Item = require('../services/item');
var router = express.Router();

router.get('/items', function(req, res) {
    Item.list(function(items) {
        res.status(201).json(items);
    }, function(err) {
        console.log(err);
        res.status(400).json(err);
    });
});

router.post('/items', function(req, res) {
    Item.save(req.body.name, function(item) {
        res.status(201).json(item);
    }, function(err) {
        console.log(err);
        res.status(400).json(err);
    });
});

router.put('/items/:id',function(req,res){
  console.log('inside put routes',req.body.name,req.body.id);
  Item.update(req.body.name,req.body.id,function(item){
        res.status(201).json(item);
        
  }, function(err){
      console.log('inside put routes fail');
       res.status(400).json(err);
  });
});

router.delete('/items/:id',function(req,res){
  console.log('inside destroy routes',req.params);
  Item.destroy(req.params.id,function(item){
    console.log('inside destroy routes fail');
        res.status(201).json(item);
  }, function(err){
      console.log('inside destroy routes fail');
       res.status(400).json(err);
  });
});



module.exports = router; //QUESTION: are you tacking on router.get and router.post onto router module? 