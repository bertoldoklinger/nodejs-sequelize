const express = require('express');
const exphbs = require('express-handlebars');
const pool = require('./db/db.js');

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json())

app.engine('.handlebars', exphbs.engine({ extname: '.handlebars', defaultLayout: "main" }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('home');
})

app.get('/books', (req, res) => {
  const sql = `SELECT * FROM books`

  pool.query(sql, (err, data) => {

    if (err) {
      console.log(err)
      return
    }

    const books = data

    res.render('books', { books })
  })
})


app.get('/books/:id', (req, res) => {
  const { id } = req.params

  const query = `SELECT * FROM books WHERE id = ${id}`

  pool.query(query, (err, data) => {
    if (err) {
      console.log(err)
      return
    }

    const book = data[0]

    res.render('book', { book })
  })
})

app.get('/books/edit/:id', (req, res) => {
  const { id } = req.params

  const sql = `SELECT * FROM books WHERE id = ${id}`

  pool.query(sql, (err, data) => {
    if (err) {
      console.log(err)
      return
    }
    const book = data[0]

    res.render('editbook', { book })
  })
})

app.post('/books/insertbook', (req, res) => {
  const { title, pageqty } = req.body

  const query = `INSERT INTO books (title, pageqty) VALUES('${title}', ${pageqty})`

  pool.query(query, (err, result) => {
    if (err) {
      console.log(err)
    }
    res.redirect('/')
  })
})

app.post('/books/updatebook', (req, res) => {
  const { id, title, pageqty } = req.body

  const sql = `UPDATE books SET title = '${title}', pageqty = '${pageqty}' WHERE id = ${id} `

  pool.query(sql, (err, data) => {
    if (err) {
      console.log(err)
      return
    }

    res.redirect('/books')
  })
})

app.post('/books/remove/:id', (req, res) => {
  const { id } = req.params

  const sql = `DELETE FROM books WHERE id='${id}'`

  pool.query(sql, (err) => {
    if (err) {
      console.log(err)
      return
    }

    res.redirect('/books')
  })
})


app.listen(3000, () => {
  console.log('Server started on port 3000');
})
