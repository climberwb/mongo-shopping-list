var chai = require('chai');
var chaiHttp = require('chai-http');

global.environment = 'test';
var server = require('../server.js');
var Item = require('../models/item');
var seed = require('../db/seed.js');
//var request = require('request');
var should = chai.should();
var app = server.app;


chai.use(chaiHttp);
beforeEach(function(done) {
        seed.run(function(items) {
            done();
        });
        console.log('df');
    });
     afterEach(function(done) {
        Item.remove(function() {
            done();
        });
    });
  

describe('Shopping List', function() {
    
    
    it('should respond with a newly created item on post', function(done){
        chai.request(app)
            .post('/items')
            .send({'name':'Kale'})
            .end(function(err,res){
              // err.should.equal(err, null);
                res.should.have.status(201);
                //res.should.be.json;
                //res.body.should.be.a('object');
              //  res.body.should.have.property('name');
                res.body.should.have.property('_id');
            //    res.body.name.should.be.a('string');
              //  res.body._id.should.be.a('string');
                res.body.name.should.equal('Kale');
                // storage.items.should.be.a('array'); What should I do with these tests?
                // storage.items.should.have.length(4);
                // storage.items[3].should.be.a('object');
                // storage.items[3].should.have.property('_id');
                // storage.items[3].should.have.property('name');
                // storage.items[3].id.should.be.a('number');
                // storage.items[3].name.should.be.a('string');
                // storage.items[3].name.should.equal('Kale');
                done();
            });
    });
    
      it('should append item to list', function(done){
        chai.request(app)
            .post('/items')
            .send({'name':'Kale'})
            .end(function(err,res){
              Item.find(function(err, items) {
                  items[3].name.should.equal('Kale');
                  done();
              });
        });
    });
    
    it('should edit an item on put', function(done){
         //TODO 
         // I convert the Item.find into a get request. and save original value
         // look up multiple calls in one test.
  
        Item.find(function(err, items) {
            chai.request(app)
            .put('/items/'+items[0]['_id'])
            .send({'name':'Kale','id':items[0]['_id']})
            .end(function(err,res){
              res.body['_id'].should.equal(items[0]['_id'].toString());
              res.body['name'].should.equal('Kale');
                done();
            });
        });
    });
    
     it('should delete an item on delete', function(done){
        //TODO 
         // I convert the Item.find into a get request. and save original value
         // look up multiple calls in one test.
  
        Item.find(function(err, items) {
            chai.request(app)
            .delete('/items/'+items[0]['_id'])
            .end(function(err,res){
              res.body['_id'].should.equal(items[0]['_id'].toString());
              res.body['name'].should.equal(items[0]['name']);
              done();
            });
        });
    });
    
     
});