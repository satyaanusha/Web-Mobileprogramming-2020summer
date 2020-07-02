
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var bodyParser = require("body-parser");
var express = require('express');
var cors = require('cors');
var app = express();

var url='mongodb+srv://Satya:Satya@cluster0.r1qbs.gcp.mongodb.net/Book';
//1.Modify this url with the credentials of your db name and password.
var ObjectID = require('mongodb').ObjectID;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/create', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        var dbase = db.db('Book');
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        insertDocument(dbase, req.body, function() {
            res.write("Successfully inserted");
            res.end();
        });
    });
});

app.get('/get', function (req, res) {
    MongoClient.connect(url, function(err, db) {

        var dbase = db.db('Book');
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }

        dbase.collection('Books').find().toArray(function(err, result){
            if(err)
            {
                res.write("get Failed");
                res.end();
            }else
            {

                res.send(JSON.stringify(result));
            }
            console.log("Got All Documents");

        });
    });

});

app.get('/delete/:toBeDeleted_id', function (req, res) {
    // 2.Connect to MongoDB . Handle the error and write the logic for deleting the desired book
    MongoClient.connect(url, function(err, db) {

        var dbase = db.db('Book');
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }

        dbase.collection('Books').deleteOne({_id: ObjectID(req.params.toBeDeleted_id)}, function(err, result){
            if(err)
            {
                res.write("Delete Failed");
                res.end();
            }else
            {

                res.send('Successfully removed');
            }

        });
    });
});


app.post('/update/:toBeUpdated_id', function (req, res) {
    //3.connect to MongoDB. Handle the error and write the logic for updating the selected field
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbase = db.db("Book");
        var myquery = {_id: ObjectID(req.params.toBeUpdated_id)};
        console.log(req.body);
        console.log(req.params.toBeUpdated_id)
        var newvalues = {$set: req.body};
        dbase.collection("Books").updateMany(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log(res.result.nModified + " record(s) updated");
            db.close();
        });
    });
});


var insertDocument = function(db, data, callback) {
    db.collection('Books').insertOne( data, function(err, result) {
        if(err)
        {
            res.write("Registration Failed, Error While Registering");
            res.end();
        }
        console.log("Inserted a document into the books collection.");
        callback();
    });
};

var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)
});
