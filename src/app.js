const express = require('express');
const { Book } = require('./models/book');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
	res.send('Hello world');
});

app.post('/book', (req, res) => {
	const { title, author, publisher, releaseDate } = req.body;

	const newBook = new Book(null, title, author, publisher, releaseDate);

	newBook.save();

	res.status(200).json({ succcess: true, data: newBook });
});

app.post('/book/edit', (req, res) => {
	const { id, title, author, publisher, releaseDate } = req.body;

	const newBook = new Book(id, title, author, publisher, releaseDate);

	newBook.save();

	res.status(200).json({ succcess: true, data: newBook });
});

app.delete('/book', (req, res) => {
	const { ID } = req.body;

	Book.delete(ID);

	res.status(200).json({ succcess: true, msg: `Berhasil menghapus buku dengan ID ${ID}` });
});

app.listen(5000, () => {
	console.log('server is running on port 5000');
});
