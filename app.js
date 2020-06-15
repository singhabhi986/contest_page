const express = require('express')
const app = express()
var sequelize = require('sequelize');
var connection = new sequelize('contest_page', 'root', 'Energisfail@000', {
  dialect: 'mysql'
});
var connectionProblemPage = new sequelize('problem_page', 'root', 'Energisfail@000', {
  dialect: 'mysql'
});
app.use(express.static('./public'));
//to parse from form.html
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: false
}));

//CREATING CONTEST TABLE IF NOT FORMED
var Contests = connection.define('contests', {
    contestId: {
      type: sequelize.INTEGER,
      //primaryKey: true //"remmember to use correct notation as no error is generated for wrong query"
      unique: true
    },
    title: {
      type: sequelize.STRING,
      //making it a unique key
      //unique: true,
      //making it required
      //allowNull: false, //if this is set to be true length validation will not work "only for null"
    },

    dateTime: {
      type: sequelize.DATE,
    },
    duration: {
      type: sequelize.INTEGER
    }
  }

);
connection.sync({
  //force: true, //actually all it does is drop the table if it already exists so "dont use it casually"
})

//CREATING PROBLEM TABLE IF NOT FORMED
var Problems = connectionProblemPage.define('problems', {
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
connectionProblemPage.sync();

//POSTING NEW CONTEST
app.post('/contest_create', (req, res) => {
  console.log('creating a new contest...');
  console.log('title: ' + req.body.Title);
  const id = req.body.Id;
  const title = req.body.Title;
  const date = req.body.Date;
  const duration = req.body.Duration;
  //const link = req.body.Link;
  connection.sync().then(function () {
    Contests.create({
      contestId: id,
      title: title,
      dateTime: date,
      duration: duration
    });
  }).catch(function (error) {
    console.log(error);
  });
  res.send("NEW CONTEST ADDED");
  res.end;
});

//POSTING NEW PROBLEM
app.post('/problem_create', (req, res) => {
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

  connectionProblemPage.sync({}).then(function () {
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
app.get('/contest/problems', (req, res) => {
  console.log("Fetching problems");

  connectionProblemPage.sync().then(function () {
    Problems.findAll().then(function (problems) {
      console.log(problems.length);
      res.json(problems);
    });
  });

  console.log('i think we fetched problems successfully');
  res.end;
});

//SHOWING CONTEST LIST
app.get('/contests', (req, res) => {
  console.log("Fetching CONTESTS");
  connection.sync().then(function () {
    Contests.findAll().then(function (contests) {
      console.log(contests.length);
      res.json(contests);
    });
  });

  console.log('i think we fetched contests successfully');
  res.end;
});

app.listen(3002, () => {
  console.log('server is up and running at 3002');
});