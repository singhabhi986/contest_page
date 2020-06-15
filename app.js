const express = require('express')
const app = express()
var sequelize = require('sequelize');
var connection = new sequelize('contest_page', 'root', 'Energisfail@000', {
  dialect: 'mysql'
});
var connectionProblemPage = new sequelize('problem_page', 'root', 'Energisfail@000', {
  dialect: 'mysql'
});
//const morgan = require('morgan')
//connecting mysql to server;
//const mysql = require('mysql')
//connecting public folder
app.use(express.static('./public'));
//app.use(morgan('short'));
//to parse from form.html
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: false
}));




/*function getconnection() {
  return mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "Energisfail@000",
    database: 'sql_invoicing'
  });
};
*/


app.post('/contest_create', (req, res) => {
  console.log('creating a new contest...');
  console.log('title: ' + req.body.Title);
  const id = req.body.Id;
  const title = req.body.Title;
  const date = req.body.Date;
  const duration = req.body.Duration;
  //const link = req.body.Link;
  var Contests = connection.define('contests', {
      contestId: { //converting id to a string id so that newarticle elements can be found easily "Id column will be replaced by slug"
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
        //defaultValue:'coming soon' a kind  of problem in windows
        //creating a custom validation defination just the name should not match with any already defined validation defination
      },
      duration: {
        type: sequelize.INTEGER
      }
    }

  );
  //wrinting a query to insert form data
  /*const queryString = "INSERT INTO contests (id,title,date,duration, link) VALUES(?,?,?,?,?)";
  getconnection().query(queryString, [id, title, date, duration, link], (err, result, field) => {
    if (err) {
      console.log("inserting failed" + err);
      res.sendStatus(500); //internal server error
      return; //important
    }
    console.log("inserted with id:" + id);
    res.end();
  });
  */
  connection.sync({
    //force: true, //actually all it does is drop the table if it already exists so "dont use it casually"
    //logging: console.log
  }).then(function () {
    Contests.create({
      contestId: id,
      title: title,
      dateTime: date,
      duration: duration
    });
  }).catch(function (error) {
    console.log(error);
  });
  res.send("done");
  res.end;
});

//post problems
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

  //const link = req.body.Link;
  var Problems = connectionProblemPage.define('problems', {
      problemId: { //converting id to a string id so that newarticle elements can be found easily "Id column will be replaced by slug"
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

      description: {
        type: sequelize.TEXT,
        //defaultValue:'coming soon' a kind  of problem in windows
        //creating a custom validation defination just the name should not match with any already defined validation defination
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
    }

  );
  //wrinting a query to insert form data
  /*const queryString = "INSERT INTO contests (id,title,date,duration, link) VALUES(?,?,?,?,?)";
  getconnection().query(queryString, [id, title, date, duration, link], (err, result, field) => {
    if (err) {
      console.log("inserting failed" + err);
      res.sendStatus(500); //internal server error
      return; //important
    }
    console.log("inserted with id:" + id);
    res.end();
  });
  */
  connectionProblemPage.sync({
    //force: true, //actually all it does is drop the table if it already exists so "dont use it casually"
    //logging: console.log
  }).then(function () {
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
  res.send("done");
  res.end;
});


app.get('/contests', (req, res) => {
  //const id = req.params.id;
  //console.log("Fetching user with id: "+ id)
  console.log("Fetching CONTESTS");
  //const connection = getconnection();

  //const queryString = "SELECT * FROM contests";
  //connection.query(queryString, (err, rows, fields) => {

  //writing for err
  //strictly for query syntax
  var Contests = connection.define('contests', {
      contestId: { //converting id to a string id so that newarticle elements can be found easily "Id column will be replaced by slug"
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
        //defaultValue:'coming soon' a kind  of problem in windows
        //creating a custom validation defination just the name should not match with any already defined validation defination
      },
      duration: {
        type: sequelize.INTEGER
      }
    }

  );
  connection.sync().then(function () {
    Contests.findAll().then(function (contests) {
      console.log(contests.length);
      res.json(contests);
    });
  });
  /*if (err) {
    console.log('failed to log query for users: ' + err);
    res.sendStatus(404);
    res.end;
    return;
  }
  */

  console.log('i think we fetched contests successfully');

  //query to change in database
  //const users = rows.map((row)=>{
  //  return {abc: 'akjf'};
  //});
  //res.json(contests);
  //res.json(); 
});

app.listen(3002, () => {
  console.log('server is up and running at 3002');
});