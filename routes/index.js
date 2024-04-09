var express = require('express');
var router = express.Router();

const index_controller = require("../controllers/indexController");

router.get('/', index_controller.render_landing);
router.get('/create-account', index_controller.render_create_account);
router.post('/sign-in', index_controller.sign_in);
router.post('/create-account', index_controller.create_account);

module.exports = router;
