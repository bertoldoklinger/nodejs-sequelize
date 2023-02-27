const express = require('express');
const exphbs = require('express-handlebars');
const sequelize = require('./db/db.js');

const User = require('./models/User.js');

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json())

app.engine('.handlebars', exphbs.engine({ extname: '.handlebars', defaultLayout: "main" }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('home');
})


sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Server started on port 3000');
  })
}).catch((err) => {
  console.log(err);
})