const fs = require('fs');
const path = require('path');

const bookPath = path.join(__dirname, '..', 'data', 'books.json');

class Book {
	id;
	title;
	author;
	publisher;
	releaseDate;

	constructor(id, title, author, publisher, releaseDate) {
		this.id = id;
		this.title = title;
		this.author = author;
		this.publisher = publisher;
		this.releaseDate = releaseDate;
	}

	save() {
		// baca dulu books.json
		fs.readFile(bookPath, 'utf-8', (err, data) => {
			let books = [{}];

			if (!err) {
				books = JSON.parse(data);
			}

			// cek apakah bukunya itu udah ada atau belum
			if (this.id) {
				// Kalau udah ada, update
				// Cari index buku yang mau di udpate di array
				const existingBookID = books.findIndex((book) => book.id === this.id);
				console.log('index: ', existingBookID);
				// copy array buku dan ubah data buku di index tadi
				const updatedBooks = [...books];
				updatedBooks[existingBookID] = this;
				// Tulis lagi ke file
				fs.writeFile(bookPath, JSON.stringify(updatedBooks), (err) => {
					if (err) {
						console.log(err);
					}
				});
			} else {
				// Belum ada -> tambah
				this.id = Math.random().toString(); // Kasih id
				books.push(this); // Push ke array books
				// Tulis kembali ke file
				fs.writeFile(bookPath, JSON.stringify(books), (err) => {
					if (err) {
						console.log(err);
					}
				});
			}
		});
	}

	static delete(ID) {
		// Baca file books
		fs.readFile(bookPath, 'utf-8', (err, data) => {
			if (!err) {
				// Parse ke array of book
				const books = JSON.parse(data);

				// Cari buku yang  mau dihapus
				const book = books.find((book) => book.id === ID);

				// Kalau ada bukunya
				if (book) {
					// Filter buku keluar dari array baru
					const newBooks = books.filter((book) => book.id !== ID);

					// Tulis kembali newBooks
					fs.writeFile(bookPath, JSON.stringify(newBooks), (err) => {
						if (err) {
							console.log(err);
						}
					});
				}
			}
		});
	}

	static getAllBooks(cb) {
		fs.readFile(bookPath, 'utf-8', (err, data) => {
			if (err) {
				return cb([]);
			}

			return cb(JSON.parse(data));
		});
	}

	static getBookByID(ID, cb) {
		// Baca file books
		fs.readFile(bookPath, 'utf-8', (err, data) => {
			if (!err) {
				// Parse ke array of book
				const books = JSON.parse(data);

				// Cari buku yang  mau dihapus
				const book = books.find((book) => book.id === ID);

				return cb(book);
			} else {
				return cb(null);
			}
		});
	}
}

module.exports = { Book };
