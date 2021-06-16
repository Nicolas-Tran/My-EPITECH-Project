const  express = require ("express");
const  app = express();
const  port = 3000;
var todos = require('./routes/todos/todos');
var users = require('./routes/users/user');
var auth = require('./routes/auth/auth');

app.use('/todo', todos);

app.use('/user', users);

app.use('/auth', auth);

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
});
