import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import DeleteBtn from "../components/DeleteBtn";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import Button from "../components/Button";
import { BookList, BookListItem } from "../components/BookList";

class Books extends Component {
  state = {
    books: []
    // bookSearch: ""
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getBooks()
      .then(res => this.setState({ books: res.data }))
      .catch(err => console.log(err));
  };

  // searchBooks = (searchQuery) => {
  //   API.searchBooks(searchQuery)
  //     .then(res => this.setState({ books: res.data }))
  //     .catch(err => console.log(err));
  // }

  // handleInputChange = event => {
  //   // Destructure the name and value properties off of event.target
  //   // Update the appropriate state
  //   const { name, value } = event.target;
  //   this.setState({
  //     [name]: value
  //   });
  // };

  
  handleFormSubmit = event => {
    // When the form is submitted, prevent its default behavior, get recipes update the recipes state
    event.preventDefault();
    console.log(this.state.books);
    API.searchBooks(this.state.bookSearch)
      .then(res => this.setState({ books: res.data }))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-4">
            <Jumbotron>
              <h1>Search for a Book!</h1>
            </Jumbotron>
            <Input
              name="recipeSearch"
              value={this.state.bookSearch}
              // onChange={this.handleInputChange}
              placeholder="Search For a Book"
            />
            <Button
              onClick={this.handleFormSubmit}
              type="success"
              className="input-lg"
            >
              Search
            </Button>
            {/* <form> */}
              {/* <Input name="title" placeholder="Title (required)" /> */}
              {/* <Input name="author" placeholder="Author (required)" /> */}
              {/* <TextArea name="synopsis" placeholder="Synopsis (Optional)" /> */}
              {/* <FormBtn>Search for Book</FormBtn> */}
            {/* </form> */}
            
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
                    return (
                      <BookListItem
                        key={book.title}
                        title={book.title}
                        href={book.href}
                        ingredients={book.ingredients}
                        thumbnail={book.thumbnail}
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
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book._id}>
                    <a href={"/books/" + book._id}>
                      <strong>
                        {book.title} by {book.author}
                        {book.image}
                      </strong>
                    </a>
                    <DeleteBtn />
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
