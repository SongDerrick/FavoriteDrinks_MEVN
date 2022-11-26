var express = require('express');
var router = express.Router();
const fs = require('fs')
const path = require('path');
const likesData = require('../data/data.json');
const drinksData = require('../data/drinks.json');


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
  const drinklist = req.body
  //console.log(drinklist)
  const freshdrinklistJSON = JSON.stringify(drinklist); //JSON.stringify
  //console.log(freshdrinklistJSON);
  fs.writeFileSync(p,freshdrinklistJSON);//wrote on file system as JSON file
  
});

router.get('/drink', (req, res, next) => {
  res.send(likesData);
})

router.get('/getdrinks', (req, res, next)=>{
  res.send(drinksData);
})

module.exports = router;
