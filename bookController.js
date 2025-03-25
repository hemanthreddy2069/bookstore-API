const Book = require('../models/Book');

exports.getBooks = async (req, res) => {
  const books = await Book.find().populate('author');
  res.json(books);
};

exports.getBookById = async (req, res) => {
  const book = await Book.findById(req.params.id).populate('author');
  if (!book) return res.status(404).send('Book not found');
  res.json(book);
};

exports.createBook = async (req, res) => {
  const book = new Book(req.body);
  await book.save();
  res.status(201).json(book);
};

exports.updateBook = async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!book) return res.status(404).send('Book not found');
  res.json(book);
};

exports.deleteBook = async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  if (!book) return res.status(404).send('Book not found');
  res.status(204).send();
};
