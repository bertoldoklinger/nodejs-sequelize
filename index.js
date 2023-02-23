const express = require('express');
const exphbs = require('express-handlebars');
const mysql = require('mysql');

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json())

app.engine('.handlebars', exphbs.engine({ extname: '.handlebars', defaultLayout: "main" }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('home');
})

app.post('/books/insertbook', (req, res) => {
  const { title, pageqty } = req.body

  const query = `INSERT INTO books (title, pageqty) VALUES ('${title}', ${pageqty})`

  conn.query(query, (err, result) => {
    if (err) {
      console.log(err)
    }
    res.redirect('/')
  })
})

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nodemysql'
})

conn.connect((err) => {
  if (err) {
    console.log(err);
  }

  console.log('Connected to MySQL');

  app.listen(3000, () => {
    console.log('Server started on port 3000');
  })
})

