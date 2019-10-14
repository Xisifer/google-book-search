const router = require("express").Router();
const bookRoutes = require("./books");
const googleRoutes = require("./googleroute")

// Book routes
router.use("/books", bookRoutes);
router.use("/google", googleRoutes);

// Create a Google Books Route with this! (CTRL-CLICK on the require field). Then hook it up (insert?) the route we already created in books.js.

module.exports = router;
