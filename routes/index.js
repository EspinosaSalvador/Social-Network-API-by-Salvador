const router = require("express").Router();
const apiRoutes = require("./api");

router.use("/api", apiRoutes); // Add a leading slash (/) before "api"

router.use((req, res) => {
  return res.send("the route is incorrect!");
});

module.exports = router;
