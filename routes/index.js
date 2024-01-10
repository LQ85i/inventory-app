var express = require('express');
var router = express.Router();

const index_controller = require("../controllers/indexController");

router.get('/', index_controller.render_index);

module.exports = router;
