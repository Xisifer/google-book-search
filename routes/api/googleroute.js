const router = require("express").Router();

const axios = require("axios");



// Hooking up the Google Route
router.get("/", (request, response) => {
  console.log("Our request.query is: ", request.query);
  axios
    .get("https://www.googleapis.com/books/v1/volumes?q=" + request.query.q)
    .then(({data}) => {
    //   console.log("Results are: ", results);
      console.log(data.items);
      response.json(data.items);
    })
    .catch(err => response.status(422).json(err));
});

module.exports = router;