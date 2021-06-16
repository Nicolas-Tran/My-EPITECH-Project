var express = require('express');
var app = express();
const con = require('../../config/db');
const mysql = require('mysql2');
var router = express.Router();
const date = new Date();

router.get('/', function (req, res) {
    con.query('SELECT * FROM todo', (err, rows) => {
        if(err) throw err;
        console.log(rows);
        res.json(rows);
    });
});

router.get('/:id', function (req, res) {
    con.query('SELECT * FROM todo WHERE id = ?', req.params.id, (err, rows) => {
        if (err) throw err;
        if (rows.length == 0)
            res.status(404).json({"msg" : "Not found"});
        else {
            var table = {title : rows[0].title,
                          description : rows[0].description,
                          due_time : new Date(rows[0].created_at).toISOString().slice(0, 19).replace('T', ' '),
                          user_id : rows[0].user_id,
                          status : rows[0].status};
            res.json(table);
        }
    });
});

router.post('/', function (req, res) {
    con.query("INSERT INTO todo (title,description,due_time,user_id,status) VALUES ('title', 'desc', ?, 3, 'todo');", date, (err, rows) => {
        if(err) throw err;
        con.query('SELECT * FROM todo', (err, rows) => {
            var table = {title : rows[0].title,
                         description : rows[0].description,
                         due_time : new Date(rows[0].created_at).toISOString().slice(0, 19).replace('T', ' '),
                         user_id : rows[0].user_id,
                         status : rows[0].status};
            console.log(table);
            res.json(table);
        });
    });
});

router.put('/:id', function (req, res) {
    con.query("UPDATE todo set title='Updated_title', description='Updated_desc', due_time=?, user_id=1, status='in progress' WHERE id = ?", [date.toISOString().slice(0, 19).replace('T', ' '), req.params.id], (err, rows) => {
        if (err) throw err;
        if (rows.length == 0)
            res.status(404).json({"msg" : "Not found"});
        else {
            con.query('SELECT * FROM todo WHERE id = ?', req.params.id, (err, rows) => {
                var table = {title : rows[0].title,
                             description : rows[0].description,
                             due_time : new Date(rows[0].created_at).toISOString().slice(0, 19).replace('T', ' '),
                             user_id : rows[0].user_id,
                             status : rows[0].status};
                console.log(table);
                res.json(table);
            });
        }
    });
});

router.delete('/:id', function (req, res) {
    con.query('SELECT * FROM todo WHERE id = ?', req.params.id, (err, rows) => {
        if (err) throw err;
        if (rows.length == 0)
            res.status(404).json({"msg" : "Not found"});
        else {
            con.query("DELETE FROM todo WHERE id = ?;", req.params.id, (err, rows) => {
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
