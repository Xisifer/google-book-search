const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bookSchema = new Schema({
  bookid: {type: String, },
  thumbnail: {type:String},
  description: {type: String},
  title: { type: String },
  authors: [{ type: String }],
  href: {type: String, }
});
const Book = mongoose.model("Book", bookSchema);
module.exports = Book;