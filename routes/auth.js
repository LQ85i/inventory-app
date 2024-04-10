var express = require('express');
var router = express.Router();

const auth_controller = require("../controllers/authController");

router.use(auth_controller.set_currentUser);

router.get('/', auth_controller.render_landing);
router.get('/create-account', auth_controller.render_create_account);
router.get("/sign-out", auth_controller.sign_out);
router.post("/create-account", auth_controller.create_account);
router.post("/sign-in", auth_controller.sign_in)

module.exports = router;
