var express = require('express');
var router = express.Router();

const item_controller = require("../controllers/itemController");

router.post('/create', item_controller.add_item);
router.post('/update', item_controller.update_item);
router.post('/delete', item_controller.delete_item);
router.get('/new', item_controller.render_add_form);
router.post('/edit/:objectId', item_controller.render_edit_form);
router.get('/:objectId', item_controller.render_item);

module.exports = router;
