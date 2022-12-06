var express = require('express');
var router = express.Router();
const fs = require('fs')
const path = require('path');
// Requiring various modules

let likesData = []; // array to hold likes data given by user
let drinksData = []; // array to hold drink data
const mongoose = require('mongoose');

const drinkSchema = new mongoose.Schema({
  _id: Number,
  name: String,
  link: String,
  likes: Number
});

const Drink = mongoose.model("Drink", drinkSchema);

mongoose.connect("mongodb+srv://admin-derrick:test-123@cluster0.ucfbjgj.mongodb.net/?retryWrites=true&w=majority");

// db configuration => connecting to cloud mongo db with mongoose framework

const p = path.join(
  __dirname,
  '../',
  'data',
  'data.json' 
); // path configuration

// GET METHOD '/' -> Getting home page!!
router.get('/', function(req, res, next) {
  res.render('index');
});

// POST METHOD '/drink' -> User data posted to server. It updates the DB!!
router.post('/drink', (req, res, next) => {

  const drinklist = req.body; // saves user request(user data) to given array
  for( let i = 0; i< 12; i++){ // for given 12 drinks update its likes
    Drink.updateOne({_id : i}, {likes: drinklist[i]}, function(err){
      if(err){
        console.log(err);
      } else {

      }
    });
  }  
});

// GET METHOD '/drink' -> send likes data for each drinks, get likes data from the DB!!
router.get('/drink', (req, res, next) => {
  Drink.find(function(err, drinks){
    if(err){
      console.log(err);
    } else {
      drinksData = drinks;
      for (let i = 0; i<12; i++){
        likesData[i] = drinks[i].likes;
      }
   
    }
  });
  res.send(likesData); // send array which contains likes for each drinks
})

// GET METHOD '/getdrinks' -> send drink data for each drinks, get drink data from the DB!!
router.get('/getdrinks', (req, res, next)=>{
  Drink.find(function(err, drinks){
    if(err){
      console.log(err);
    } else {
  
      drinksData = drinks;
      for (let i = 0; i <12; i++){
        likesData[i] = drinks[i].likes;
      }
   
    }
  });
  res.send(drinksData);
})

module.exports = router;
