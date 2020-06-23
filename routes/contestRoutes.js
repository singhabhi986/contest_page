const express = require('express')
var sequelize = require('sequelize');
const router = express.Router()

//creating connection for contest_page database
var connection = new sequelize('contest_page', 'root', 'Energisfail@000', {
    dialect: 'mysql'
});

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

//POSTING NEW CONTEST
router.post('/contest_create', (req, res) => {
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

//SHOWING CONTEST LIST
router.get('/contests', (req, res) => {
    console.log("Fetching CONTESTS");
    connection.sync().then(function () {
        Contests.findAll().then(function (contests) {
            console.log(contests.length);
            res.json(contests);
        });
    });

    //console.log('i think we fetched contests successfully');
    res.end;
});

//exporting 
module.exports = router;