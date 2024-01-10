const asyncHandler = require("express-async-handler");

exports.render_index = asyncHandler(async (req, res, next) => {
    const page = "index"
    res.render('index', { title: 'Inventory Management App', page: page});
});
