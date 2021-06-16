var express = require('express');
var app = express();
var router = express.Router();
const con = require('../../config/db');
const date = new Date();

router.get('/', function (req, res) {
    con.query('SELECT * FROM user', (err, rows) => {
        if(err) throw err;
        console.log(rows);
        res.json(rows);
    });
});

router.get('/users', function (req, res) {
    con.query('SELECT * FROM user', (err, rows) => {
        if(err) throw err;
        console.log(rows);
        res.json(rows);
    });
});

router.get('/:id', function (req, res) {
    con.query('SELECT * FROM user WHERE id = ?', req.params.id, (err, rows) => {
        if (err) throw err;
        if (rows.length == 0)
            res.status(404).json({"msg" : "Not found"});
        else {
            var table = {id : rows[0].id,
                         email : rows[0].email,
                         password : rows[0].password,
                         created_at : new Date(rows[0].created_at).toISOString().slice(0, 19).replace('T', ' '),
                         firstname : rows[0].firstname,
                         name : rows[0].name};
            res.json(table);
        }
    });
});

router.get('/:email', function (req, res) {
    con.query('SELECT * FROM user WHERE email = ?', req.params.email, (err, rows) => {
        if (err) throw err;
        if (rows.length == 0)
            res.status(404).json({"msg" : "Not found"});
        else {
            var table = {id : rows[0].id,
                         email : rows[0].email,
                         password : rows[0].password,
                         created_at : new Date(rows[0].created_at).toISOString().slice(0, 19).replace('T', ' '),
                         firstname : rows[0].firstname,
                         name : rows[0].name};
            res.json(table);
        }
    });
});

router.put('/:id', function (req, res) {
    con.query("UPDATE user set email='updatemail@test.eu', password='hashed passord', created_at=?, firstname=test, name='test' WHERE id = ?", [date.toISOString().slice(0, 19).replace('T', ' ')], (err, rows) => {
        if (err) throw err;
        if (rows.length == 0)
            res.status(404).json({"msg" : "Not found"});
        else {
            con.query('SELECT * FROM user', (err, rows) => {
                var table = {email: rows[0].email,
                             password : rows[0].password,
                             created_at : new Date(rows[0].created_at).toISOString().slice(0, 19).replace('T', ' '),
                             firstname : rows[0].firstname,
                             name : rows[0].name};
                console.log(table);
                res.json(table);
            });
        }
    });
});

router.delete('/:id', function (req, res) {
    con.query('SELECT * FROM user WHERE id = ?', req.params.id, (err, rows) => {
        if (err) throw err;
        if (rows.length == 0)
            res.status(404).json({"msg" : "Not found"});
        else {
            con.query("DELETE FROM user WHERE id = ?;", req.params.id, (err, rows) => {
                if (err) {
                    console.log('not deleted');
                    console.log(err);
                    return;
                }
                res.json({"msg" : `succesfully  deleted  record  number: ${req.params.id}`})
            });
        }
    });
});

module.exports = router;
