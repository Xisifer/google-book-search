import React, { Component } from "react";
import { Col, Container } from "../components/Grid";
import { Input } from "../components/Form";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { BookList, BookListItem } from "../components/BookList";
import Button from "../components/Button";

class BookSearch extends Component {

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
          .then(res => this.setState({ books: res.data }, this.loadBooks()))
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



      
    render() {
        return (
        <Container fluid>
            {/* <Row> */}
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
                            onChange = {this.forceUpdate}
                        />

                        );
                    })}
                    </BookList>
                )}
                </Col>
            {/* ====================================================================== */}

            {/* </Row> */}
        </Container>
        )
    }
}

export default BookSearch;