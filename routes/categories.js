var express = require('express');
var router = express.Router();

const category_controller = require("../controllers/categoryController");

router.get('/', category_controller.render_categories);
router.get('/new-category', category_controller.render_new_category);
router.get('/new-item', category_controller.render_new_item);
router.post('/add-category', category_controller.add_category)
router.post('/add-item', category_controller.add_item)
router.get('/:objectId', category_controller.render_items);

module.exports = router;
