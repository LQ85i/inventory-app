var express = require('express');
var router = express.Router();

const category_controller = require("../controllers/categoryController");

router.post('/create', category_controller.add_category);
router.get('/', category_controller.render_categories);
router.post('/update', category_controller.update_category);
router.post('/delete', category_controller.delete_category);
router.get('/new', category_controller.render_add_form);
router.post('/edit/:objectId', category_controller.render_edit_form);
router.get('/:objectId', category_controller.render_items);

module.exports = router;
