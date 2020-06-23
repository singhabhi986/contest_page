const express = require('express')
var sequelize = require('sequelize');
const router = express.Router()

//creating connection for problem_page database
var connection = new sequelize('problem_page', 'root', 'Energisfail@000', {
    dialect: 'mysql'
  });

//CREATING PROBLEM TABLE IF NOT FORMED
var Problems = connection.define('problems', {
    problemId: {
      type: sequelize.INTEGER,
      //primaryKey: true //"remmember to use correct notation as no error is generated for wrong query"
      unique: true
    },
    title: {
      type: sequelize.STRING,
    },
  
    description: {
      type: sequelize.TEXT,
      //defaultValue:'coming soon' a kind  of problem in windows
    },
    constraint: {
      type: sequelize.TEXT
    },
    sampleTestCase: {
      type: sequelize.TEXT
    },
    difficulty: {
      type: sequelize.INTEGER
    },
    points: {
      type: sequelize.INTEGER
    },
    contestId: {
      type: sequelize.INTEGER,
      foreignkey: true
    }
  });
  connection.sync();

//POSTING NEW PROBLEM
router.post('/problem_create', (req, res) => {
    console.log('creating a new problem...');
    console.log('title: ' + req.body.Title);
    const id = req.body.Id;
    const title = req.body.Title;
    const description = req.body.Description;
    const constraint = req.body.Constraint;
    const sampletestcase = req.body.SampleTestCase;
    const difficulty = req.body.Difficulty;
    const points = req.body.Points;
    const contestid = req.body.ContestId;
  
    connection.sync({}).then(function () {
      Problems.create({
        problemId: id,
        title: title,
        description: description,
        constraint: constraint,
        sampleTestCase: sampletestcase,
        difficulty: difficulty,
        points: points,
        contestId: contestid,
      });
    }).catch(function (error) {
      console.log(error);
    });
    res.send("NEW PROBLEM ADDED");
    res.end;
  });

//SHOWING PROBLEM LIST
router.get('/contest/problems', (req, res) => {
    console.log("Fetching problems");
  
    connection.sync().then(function () {
      Problems.findAll().then(function (problems) {
        console.log(problems.length);
        res.json(problems);
      });
    });
  
    //console.log('i think we fetched problems successfully');
    res.end;
  });

  module.exports = router;