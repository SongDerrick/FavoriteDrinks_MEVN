var express = require('express');
var router = express.Router();
const fs = require('fs')
const path = require('path');
//const likesData = require('../data/data.json');
//const drinksData = require('../data/drinks.json');
let likesData = [];
let drinksData = [];
const mongoose = require('mongoose');

const drinkSchema = new mongoose.Schema({
  _id: Number,
  name: String,
  link: String,
  likes: Number
});

const Drink = mongoose.model("Drink", drinkSchema);

mongoose.connect("mongodb+srv://admin-derrick:test-123@cluster0.ucfbjgj.mongodb.net/?retryWrites=true&w=majority");

//db

const p = path.join(
  __dirname,
  '../',
  'data',
  'data.json' 
); // path configuration

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/drink', (req, res, next) => {

  // const updatedData = JSON.stringify(req.body);
  // console.log(updatedData)
  // console.log(req.body)
  const drinklist = req.body;
  //console.log(drinklist)
  //const freshdrinklistJSON = JSON.stringify(drinklist); //JSON.stringify
  //console.log(freshdrinklistJSON);
  //fs.writeFileSync(p,freshdrinklistJSON);//wrote on file system as JSON file

  for( let i = 0; i< 12; i++){
    Drink.updateOne({_id : i}, {likes: drinklist[i]}, function(err){
      if(err){
        console.log(err);
      } else {
       //console.log("Successfully Updated!");
       //mongoose.connection.close();
      }
    });
  }

  

  
});

router.get('/drink', (req, res, next) => {
  Drink.find(function(err, drinks){
    if(err){
      console.log(err);
    } else {
  
      
      //console.log(drinks)
      drinksData = drinks;
      //console.log(drinksData);
      
      for (let i = 0; i<11; i++){
        likesData[i] = drinks[i].likes;
      }
      //console.log(likesData);
      //mongoose.connection.close();
   
    }
  });
  res.send(likesData);
})

router.get('/getdrinks', (req, res, next)=>{
  //mongoose.connect("mongodb://localhost:27017/drinksDB");
  Drink.find(function(err, drinks){
    if(err){
      console.log(err);
    } else {
  
      //mongoose.connection.close();
      //console.log(drinks)
      drinksData = drinks;
      //console.log(drinksData);
      
      for (let i = 0; i <12; i++){
        likesData[i] = drinks[i].likes;
      }
      //console.log(likesData);
   
    }
  });
  res.send(drinksData);
})

module.exports = router;
