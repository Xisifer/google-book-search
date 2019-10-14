const router = require("express").Router();
const booksController = require("../../controllers/booksController");

// Matches with "/api/books"
router.route("/")
  .get(booksController.findAll)
  .post(booksController.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(booksController.findById)
  .put(booksController.update)
  .delete(booksController.remove);

module.exports = router;

const axios = require("axios");

//matches up with "/api/books/search"
router.get("/search", (request, response) => {
  console.log(request.query);
  axios
    .get("https://www.googleapis.com/books/v1/volumes?q=" + request.query.q)
    .then(({ data: { results } }) => {
      console.log("Results are: ", results);
      response.json(results);
    })
    .catch(err => res.status(422).json(err));
});


module.exports = router;

