import React from "react";
import Thumbnail from "../Thumbnail";
import { Container, Row, Col } from "../Grid";
import {Button} from "reactstrap";
// import API from "../../utils/API";

// Exporting both RecipeList and RecipeListItem from this file

// RecipeList renders a bootstrap list item
export function BookList({ children }) {
  return <ul className="list-group">{children}</ul>;
}



// const addFavorite = (bookDetails) => {
//     console.log(`Adding ${bookDetails.title} to Favorites!`);
//     API.saveBook(bookDetails)
//       .then(res => console.log(res)) //this.setState({ favBooks: res.data }))
//       .catch(err => console.log(err));
// }


// RecipeListItem renders a bootstrap list item containing data from the recipe api call
export function BookListItem({
  bookid,
  thumbnail,
  description,
  title,
  authors,
  href,
  addFavorite
}) 
{
  return (
    <li className="list-group-item">
      <Container>
        <Row>
          <Col size="xs-4 sm-2">
            <Thumbnail src={thumbnail} />
          </Col>
          <Col size="xs-8 sm-9">
            <h3>{title}</h3>
            <p>Author: {authors}</p>
            <Button color="primary" size="lg" href={href}>View Book</Button>
            <Button color="primary" 
              size="lg" 
              // href={href} 
              onClick= { () => addFavorite({
                bookid,
                thumbnail,
                description,
                title,
                authors,
                href})}
            >
                Add to Favorites
            </Button>
          </Col>
        </Row>
      </Container>
    </li>
  );
}
