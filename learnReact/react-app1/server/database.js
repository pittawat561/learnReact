var express = require('express');
var app = express();
var mysql = require('mysql');
var cors = require('cors');

app.use(cors());
app.use(express.json());

var conn = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "nodejsdb"
});

app.get('/data', (req, res) => {
    conn.query("SELECT * FROM sample_data", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
});

app.post('/create', (req, res) => {
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const age = req.body.age;
    const gender = req.body.gender;

    conn.query("INSERT INTO sample_data (first_name, last_name, age, gender) VALUES(?,?,?,?)",
        [first_name, last_name, age, gender],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values inserted");
            }
        }
    )
})

app.delete('/delEmp/:id', (req, res) => {
    const id = req.params.id;
    conn.query("DELETE FROM sample_data WHERE id = ?", id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
})

app.listen('3001', () => {
    console.log('Server port 3001')
});