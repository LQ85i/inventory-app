var express = require('express');
var router = express.Router();

const category_controller = require("../controllers/categoryController");

router.get('/', category_controller.render_categories);
router.get('/:objectId', category_controller.render_items);

module.exports = router;
