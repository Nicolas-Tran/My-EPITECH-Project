const express = require("express");
const cors = require("cors");
const db = require("./models");
const Role = db.role;
const cookieSession = require("cookie-session");
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer')
const multer = require('multer');
const path = require('path')

const app = express();

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);


// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Db');
//   initial();
// });
const dbs = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Hackpasmoncomptestp:(1", /// CHANGE LE MOT DE PASSE
  database: "projectData",
})

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

var corsOptions = {
  origin: "http://localhost:8081"
};

// app.use(cors(corsOptions));
app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "cookie-session",
    secret: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: true
  })
  );
  
const transporter = nodemailer.createTransport({
  service: "Outlook365",
  auth: {
    user: "jobBoardNicoChun@outlook.com",
    pass: "Azeazeaze"
  },
  secure: true, // upgrades later with STARTTLS -- change this based on the PORT
});

app.post('/send_mail', (req, res) => {
  let { message } = req.body;
  let { name } = req.body;
  let { email } = req.body;
  let { company } = req.body;
  let { number } = req.body;
  let { lieu } = req.body;
  const mailData = {
    from: "jobBoardNicoChun@outlook.com",
    to: "jobBoardNicoChun@outlook.com",
    subject: "Candidature",
    html: `<div className="email" style="
        border: 1px solid black;
        padding: 20px;
        font-family: sans-serif;
        line-height: 2;
        font-size: 20px; 
        ">
        <h2>Hello ${company}!</h2>
        <p>${name} applied to your offer</>
        <p>message:<br/>${message}</p>
        <p>Here's ${name} information:<br/>Email:${email}<br/>Number:${number}<br/>Location:${lieu}</p>
        <hr/>
        <p>All the best, JobBoard</p>
         </div>`
  };

  transporter.sendMail(mailData, (error, info) => {
      if (error) {
          return console.log(error);
      }
      res.send({ message: "Mail send", message_id: info.messageId });
  });
});

app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM offers";
  dbs.query(sqlSelect, (err, result) => {
    res.send(result)
  })
})

app.get("/api/get/:id", (req, res) => {
  const id = req.params.id
  const sqlSelect = "SELECT * FROM users WHERE id = ?";
  dbs.query(sqlSelect, id, (err, result) => {
    if (err) {
      console.log(err, "ze")
    } else {
      res.send(result)
    }
  })
})

app.post("/api/apply", (req, res) => {
  const postId = req.body.postId;
  const applyerId = req.body.applyerId;
  const message = req.body.message;
  const sqlApply = "INSERT INTO applies (postId,applyerId,message) VALUES (?,?,?);"
  dbs.query(sqlApply, [postId, applyerId, message], (err, result) => {
    if (err) {
      console.log(err, "ze")
    } else {
      res.send(result)
    }  })
})

app.post("/api/insert", (req, res) => {
  const companyName = req.body.companyName;
  const description = req.body.description;
  const profile = req.body.profile;
  const companySize = req.body.companySize;
  const location = req.body.location;
  const wages = req.body.wages;
  const workTime = req.body.workTime;
  const fullDescription = req.body.fullDescription;
  const posterId = req.body.posterId;
  const sqlInsert = "INSERT INTO offers (companyName, description, profile, companySize, location, wages, workTime, fullDescription, posterId) VALUES (?,?,?,?,?,?,?,?,?);"
  dbs.query(sqlInsert, [companyName, description, profile, companySize, location, wages, workTime, fullDescription, posterId], (err, result) => {
    console.log(result)
  })
});

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
app.get("/api/getCompany", (req, res) => {
  const sqlSelect = "SELECT * FROM companies";
  dbs.query(sqlSelect, (err, result) => {
    res.send(result)
  })
})

app.post("/api/insertCompany", (req, res) => {
  const companyName = req.body.companyName;
  const description = req.body.description;
  const profile = req.body.profile;
  const companySize = req.body.companySize;
  const location = req.body.location;
  const fullDescription = req.body.fullDescription;
  const sqlInsert = "INSERT INTO companies (companyName, description, profile, companySize, location, fullDescription) VALUES (?,?,?,?,?,?);"
  dbs.query(sqlInsert, [companyName, description, profile, companySize, location, fullDescription], (err, result) => {
    console.log(result, "zae")
  })
  res.send(result)
});

app.get("/api/myoffers/:id", (req, res) => {
  console.log(req.params.id, "azeze");
  const CompanyId = req.params.id;
  const sqlSelect = "SELECT * FROM offers WHERE posterId = ?";
  dbs.query(sqlSelect, [CompanyId],(err, result) => {
    res.send(result)
  })
})

app.get("/api/database", (req, res) => {
  // console.log(req, "aze");
  const sqlSelect = "show tables;";
  dbs.query(sqlSelect,(err, result) => {
    res.send(result)
  })
})

app.get("/api/tables/:name", (req, res) => {
  const table = req.params.name;
  const sqlSelect = `SELECT * FROM ${table}`;
  dbs.query(sqlSelect, (err, result) => {

  if (err) {
    console.log(err)
  }
  res.send(result)
  })
})

app.delete("/api/tables/delete/:table_name/:id", (req, res) => {
  const table = req.params.table_name;
  const name = req.params.id;
  const sqlDelete = `DELETE FROM ${table} WHERE id = ?`;
  dbs.query(sqlDelete, name, (err, result) => {
    console.log("data deleted")
    // return result
    console.log(result, "eez")
    if (err) {
      console.log(err, "ze")
    } else {
      res.send("updated")
    }
  });
});
////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////


app.delete("/api/delete/:id", (req, res) => {
  const name = req.params.id;
  const sqlDelete = "DELETE FROM offers WHERE id = ?";
  dbs.query(sqlDelete, name, (err, result) => {
    console.log("data deleted")
    // return result
    console.log(result, "eez")
    if (err) {
      console.log(err, "ze")
    } else {
      res.send("updated")
    }
  });
});

app.put("/api/update/:id", (req, res) => {
  const companyName = req.body.companyName;
  const description = req.body.description;
  const profile = req.body.profile;
  const companySize = req.body.companySize;
  const location = req.body.location;
  const wages = req.body.wages;
  const workTime = req.body.workTime;
  const fullDescription = req.body.fullDescription;
  const id = req.params.id;

  const sqlUpdate = "UPDATE offers SET companyName = ?,description = ?, profile = ?,companySize = ?,location = ?,wages = ?,workTime = ?,fullDescription = ? WHERE id = ?"

  dbs.query(sqlUpdate, [companyName, description, profile, companySize, location, wages, workTime, fullDescription, id], (err, result) => {
    console.log(result, "éééééééééééééééééé"
    if (err) {
      console.log(err, "ze")
    } else {
      res.send("updated")
    }
  })
  console.log(res, 'testresval')
})

app.put("/api/update/profile/:id", (req, res) => {
  const fullName = req.body.fullName;
  const email = req.body.email;
  const adress = req.body.adress;
  const number = req.body.number
  const id = req.params.id

  const sqlUpdate = "UPDATE users SET fullName = ?, email = ?, adress = ?, number = ? WHERE id = ?"

  dbs.query(sqlUpdate, [fullName, email, adress, number, id], (err, result) => {
    if (err) {
      console.log(err, "ze")
    } else {
      res.send("updated")
    }
  })
})


app.put("/api/update/profile/role/:id", (req, res) => {
  const role = req.body.role;
  const id = req.params.id

  const sqlUpdate = "UPDATE user_roles SET roleId = ? WHERE userId = ?"

  dbs.query(sqlUpdate, [role, id], (err, result) => {
    if (err) {
      console.log(err, "ze")
    } else {
      res.send("updated")
    }
  })
})

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });

  Role.create({
    id: 2,
    name: "admin"
  });
  Role.create({
    id: 3,
    name: "company"
  });
}
