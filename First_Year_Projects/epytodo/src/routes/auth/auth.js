var express = require('express')
var app = express()
var env = require("dotenv").config();
const con = require('../../config/db')
var router = express.Router();

router.post('/register', function (req, res) {
    const { email, name, firstname, password } = req.body
    const register = `INSERT INTO user (email, name, firstname, password) VALUES (
        "${email}",
        "${name}",
        "${firstname}",
        "${password}"
        )`
    if (!email || !name || !firstname || !password) {
        res.status(404).send({ error: 'one value is null' })
        return
    }
    con.query(register, function (err) {
        if (err) {
            res.json({ "msg": "account already exists" })
        } else {
            con.query('SELECT * FROM user'), (err, rows) => {
                if (err) throw err;
                jwt.sign({ id: rows[0].user_id }, process.env.SECRET, { algorithm: 'RS256' }, function (err, token) {
                    console.log(token);
                });
                res.json({ "token": token });
            };
        }
    });
});

router.post("/login", function (req, res) {
    con.query("SELECT * FROM user WHERE email = ?",
        req.body.email,
        function (error, rows, fields) {
            if (error) {
                res.status(500).send({ msg: "internal server error" });
                return;
            }
            if (rows.length > 0) {
                if (req.body.password == rows[0].password) {
                    res.status(200).send({ token: jwt.sign({ id: rows[0].id, name: rows[0].name }, process.env.SECRET) });
                } else {
                    res.status(401).send({ token: "Invalid Credentials" });
                    return;
                }
            };
        });
});


module.exports = router;
