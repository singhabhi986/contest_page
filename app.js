const express = require('express')
const app = express()
//using contest.html and problem.html form public folder to create contest and form respectively
app.use(express.static('./public'));

//to parse from contest.html and problem.html
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: false
}));


const router_contest = require('./routes/contestRoutes');

//using problemRoutes.js
const router_problem = require('./routes/problemRoutes');

app.use(router_contest);
app.use(router_problem);

//MY LOCALHOST
app.listen(3002, () => {
  console.log('server is up and running at 3002');
});
