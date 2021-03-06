const express = require("express");
const router = express.Router();

const controller = require('../controllers/file');

router.post("/", controller.create);
router.get("/:key", controller.get);

module.exports = router;