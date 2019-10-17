import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import DeleteBtn from "../components/DeleteBtn";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input } from "../components/Form";
// import { TextArea, FormBtn } from "../components/Form";
import Button from "../components/Button";
import { BookList, BookListItem } from "../components/BookList";

class Books extends Component {
  state = {
    books: [],
    favBooks: [],
    bookSearch: ""
  };

  componentDidMount = () => {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getBooks()
      .then(res => this.setState({ favBooks: res.data }))
      .catch(err => console.log(err));
  };
// Need to add the book to State upon add
  searchBooks = (searchQuery) => {
    API.searchBooks(searchQuery)
      .then(res => this.setState({ books: res.data }))
      .catch(err => console.log(err));
  }
// Gotta PUSH it to the state, not set the state. Get books form state, then push into books, then set state with the updated array
  deleteBook = (id) => {
    API.deleteBook(id)
    .then(res => this.setState({ books: res.data })) // Needs changing!
    .catch(err => console.log(err));
  }

  addFavorite = (bookDetails) => {
    console.log(`Adding ${bookDetails.title} to Favorites!`);
    API.saveBook(bookDetails)
      .then(res => this.setState({ favBooks: res.data }))
      .catch(err => console.log(err));
  }


  handleInputChange = event => {
    // Destructure the name and value properties off of event.target
    // Update the appropriate state
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  
  handleFormSubmit = (event) => {
    // When the form is submitted, prevent its default behavior, get recipes update the recipes state
    event.preventDefault();
    console.log(this.state.books);
    API.searchBooks(this.state.bookSearch)
      .then(res => {
        console.log(res.data)
        this.setState({ books: res.data })
      })
      .catch(err => console.log(err));
  };

  // addFavorite = () => {
  //   // When the form is submitted, prevent its default behavior, get recipes update the recipes state
  //   // event.preventDefault();
  //   console.log(this.state.favBooks);
  //   API.searchBooks(this.state.bookSearch)
  //     .then(res => {
  //       console.log(res.data)
  //       this.setState({ books: res.data })
  //     })
  //     .catch(err => console.log(err));
  // };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-4">
            <Jumbotron>
              <h1>Search for a Book!</h1>
            </Jumbotron>
            <Input
              name="bookSearch"
              value={this.state.bookSearch}
              onChange={this.handleInputChange}
              placeholder="Search For a Book"
            />
            <Button
              onClick={this.handleFormSubmit}
              type="success"
              className="input-lg"
            >
              Search
            </Button>

            
          </Col>

          {/* ====================================================================== */}

          <Col size="md-4 sm-3">
            <Jumbotron>
              <h1>Search Results</h1>
            </Jumbotron>
              {!this.state.books.length ? (
                <h1 className="text-center">No Results to Display</h1>
              ) : (
                <BookList>
                  {this.state.books.map(book => {
                    // Attempting to add in a catch just in case the book's thumbnail comes back as undefined.
                    if (book.volumeInfo.imageLinks === undefined) {
                      book.volumeInfo.imageLinks = {
                        thumbnail: "https://i.imgur.com/LwSai1H.jpg"
                      }
                    }
                    return (
                      <BookListItem
                        key={book.id}
                        bookid={book.id}
                        title={book.volumeInfo.title}
                        href={book.volumeInfo.infoLink}
                        description={book.volumeInfo.description}
                        authors={book.volumeInfo.authors}
                        thumbnail={book.volumeInfo.imageLinks.thumbnail}
                        addFavorite = {this.addFavorite}
                      />

                    );
                  })}
                </BookList>
              )}
            </Col>
          {/* ====================================================================== */}


          <Col size="md-4 sm-12">
            <Jumbotron>
              <h1>Saved Books</h1>
            </Jumbotron>
            {this.state.favBooks.length ? (
              <List>
                {this.state.favBooks.map(book => (
                  <ListItem key={book._id}>
                    <a href={"/books/" + book._id}>
                      <strong>
                        {book.title} by {book.author}
                        {book.image}
                      </strong>
                    </a>
                    <DeleteBtn
                    deleteBook = { () => this.deleteBook(book._id)} 
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
