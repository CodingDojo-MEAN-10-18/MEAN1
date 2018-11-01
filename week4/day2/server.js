const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');

const port = process.env.PORT || 8000;
const { Schema } = mongoose;
const app = express();

const AuthorSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  isAlive: {
    type: Boolean,
    default: true,
  },
  age: {
    type: Number,
    required: true,
    min: 1,
  },
  books: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Book'
    }
  ]
}, {
    timestamps: true,
  });


const BookSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  pages: {
    type: Number,
    required: true,
  },
  year: Number,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Author'
  },

  publisher: String,
});

const Author = mongoose.model('Author', AuthorSchema);
const Book = mongoose.model('Book', BookSchema);

mongoose.connect('mongodb://localhost:27017/books_and_authors', {
  useNewUrlParser: true
});

mongoose.connection.on('connected', () => console.log('Connected to mongodb'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(function (request, response, next) {
  console.log('request body', request.body);

  next();
})
app.use(express.static(path.join(__dirname, 'static')));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/authors', function (request, response) {
  Author.find({})
    .populate('books')
    .then(authors => {
      response.render('authors/index', { authors });
    })
});

app.get('/authors/new', function (request, response) {
  response.render('authors/new');
});

app.post('/authors', function (request, response) {
  console.log('creating author', request.body);

  Author.create(request.body)
    .then(author => {
      console.log('created author', author)
      response.redirect('/authors');
    })
    .catch(console.log)
});

app.get('/books', function (request, response) {
  Book.find({})
    .populate('author')
    .then(books => {
      response.render('books/index', { books });
    })
});

app.get('/books/new', function (request, response) {
  Author.find({})
    .then(authors => {
      response.render('books/new', { authors });
    })
});

app.post('/books', function (request, response) {
  console.log('creating book', request.body);
  Book.create(request.body)
    .then(book => {
      console.log('created book', book);

      return Author.findById(book.author)
        .then(author => {
          author.books.push(book._id);
          console.log('found author', author);

          return author.save();
        })
        .then(() => {
          response.redirect('/books');
        });
    })
    .catch(console.log);
});

app.listen(port, () => console.log(`Express server listening on port ${port}`));
