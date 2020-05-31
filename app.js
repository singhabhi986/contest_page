// load our app server using express somehow..
const express = require('express')
const app = express()
//const morgan = require('morgan')
//connecting mysql to server;
const mysql = require('mysql')
//connecting public folder
app.use(express.static('./public'));
//app.use(morgan('short'));
//to parse from form.html
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));



function getconnection(){
  return mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "Energisfail@000",
    database: 'sql_invoicing'
  });
};

app.post('/contest_create', (req,res)=>{
  console.log('creating a new contest...');
  console.log('title: ' + req.body.Title);
  const id = req.body.Id;
  const title = req.body.Title;
  const date = req.body.Date;
  const duration = req.body.Duration;
  const link = req.body.Link;
  //wrinting a query to insert form data
  const queryString = "INSERT INTO contests (id,title,date,duration, link) VALUES(?,?,?,?,?)";
  getconnection().query(queryString,[id,title,date,duration,link], (err,result,field)=>{
    if(err){
      console.log("inserting failed"+err);
      res.sendStatus(500); //internal server error
      return; //important
    } 
    console.log("inserted with id:" + id);
    res.end();
  });
  res.send("done");
  res.end;
});

app.get('/contests',(req, res)=>{
    //const id = req.params.id;
    //console.log("Fetching user with id: "+ id)
    console.log("Fetching CONTESTS");
    const connection = getconnection();

    const queryString = "SELECT * FROM contests";
    connection.query( queryString ,(err, rows, fields) => {

        //writing for err
        //strictly for query syntax
        if(err){
          console.log('failed to log query for users: '+ err);
          res.sendStatus(404);
          res.end;
          return; 
        }
    
        console.log('i think we fetched contests successfully');
    
        //query to change in database
        //const users = rows.map((row)=>{
        //  return {abc: 'akjf'};
        //});
        res.json(rows)
        //res.json(); 
      });
});

app.listen(3002, () =>{
    console.log('server is up and running at 3002');
  });