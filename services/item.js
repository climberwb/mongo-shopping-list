var Item = require('../models/item');

exports.save = function(name, callback, errback) {
    Item.create({ name: name }, function(err, item) {
        if (err) {
            errback(err);
            return;
        }
        callback(item);
    });
};

exports.list = function(callback, errback) {
    Item.find(function(err, items) {
        if (err) {
            errback(err);
            return;
        }
        console.log(items);
        callback(items);
    });
};

exports.update = function(name,id,callback,errback){
    console.log('inside services update'+' '+name+' '+id);
    Item.findOneAndUpdate({_id:id},{name:name},{new: true},function(err,item){
       //console.log(err);
        if(err){
             console.log('inside services update fail');
             console.log(errback(err));
            // errback(err);
             return;
        }
         console.log('inside services update success');
        callback(item);
    });
}

exports.destroy = function(id,callback,errback){
    console.log('inside services destroy',id);
    Item.findOneAndRemove({_id:id}, function(err,item){
       //console.log(err);
        if(err){
             console.log('inside services destroy fail');
            console.log(errback(err));
            // errback(err);
            return;
        }
         console.log('inside services destroy success');
        callback(item);
    });
}