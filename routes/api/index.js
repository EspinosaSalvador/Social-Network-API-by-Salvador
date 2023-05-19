const express = require("express");
const userRoutes = require("./user_routes");
const thoughtRoutes = require("./thougth_routes");

const router = express.Router();

// Routes
router.use("/users", userRoutes);
router.use("/thoughts", thoughtRoutes);

module.exports = router;
